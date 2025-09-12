import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface LocationData {
  latitude: number;
  longitude: number;
  location: string;
  soilData: {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organicCarbon: number;
    soilTexture: string;
  };
  climateData: {
    temperature: number;
    rainfall: number;
    humidity: number;
  };
}

interface LocationDetectionFormProps {
  onSubmit: (data: LocationData) => void;
  isLoading: boolean;
}

export const LocationDetectionForm = ({ onSubmit, isLoading }: LocationDetectionFormProps) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<"initial" | "detecting" | "fetching" | "display">("initial");
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [error, setError] = useState<string>("");

  // Get precise coords first; if that fails, surface a clear error (avoid misleading defaults)
  const getPosition = (): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error("Geolocation unsupported"));
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      });
    });

  const handleLocationDetection = async () => {
    try {
      setError("");
      setStep("detecting");

      const pos = await getPosition();
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      setStep("fetching");
      const [place, soil, climate] = await Promise.all([
        fetchLocationName(lat, lon),
        fetchSoilData(lat, lon),       // <— SoilGrids REST API used here
        fetchClimateData(lat, lon),    // <— OpenWeather/Open‑Meteo
      ]);

      const data: LocationData = {
        latitude: lat,
        longitude: lon,
        location: place,
        soilData: soil,
        climateData: climate,
      };

      setLocationData(data);
      setStep("display");
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to detect location.");
      setStep("initial");
    }
  };

  // Reverse‑geocode coords -> place name (Nominatim, keyless)
  const fetchLocationName = async (lat: number, lon: number): Promise<string> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
      const res = await fetch(url, { headers: { "Accept-Language": "en" } });
      const j = await res.json();
      return j?.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    } catch {
      return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }
  };

  // SoilGrids v2.0 REST API — fetch pH, nitrogen, organic carbon, texture inputs
  const fetchSoilData = async (lat: number, lon: number) => {
    const props = [
      "phh2o",   // pH in water (reported as pH*10)
      "nitrogen",// total nitrogen (g/kg)
      "soc",     // soil organic carbon (g/kg)
      "sand", "silt", "clay" // texture %
    ];
    const url =
      `https://rest.isric.org/soilgrids/v2.0/properties/query?lat=${lat}&lon=${lon}` +
      props.map(p => `&property=${p}`).join("") +
      `&depth=0-5cm&value=mean`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Soil data unavailable");
    const data = await res.json();

    // Helper to extract value for a layer at the first depth (0–5cm)
    const getMean = (name: string): number | null => {
      const layers = (data?.properties?.layers ?? data?.layers) as any[];
      const layer = layers?.find((l) => l?.name === name);
      if (!layer) return null;
      // values.mean can be a number or array (per depth)
      const v = layer?.values?.mean;
      if (Array.isArray(v)) return typeof v[0] === "number" ? v[0] : null;
      return typeof v === "number" ? v : null;
    };

    const phRaw = getMean("phh2o");           // unit pH*10
    const n_gkg = getMean("nitrogen");        // g/kg
    const soc_gkg = getMean("soc");           // g/kg
    const sand = getMean("sand");             // %
    const silt = getMean("silt");             // %
    const clay = getMean("clay");             // %

    // Conversions
    const pH = phRaw != null ? +(phRaw / 10).toFixed(1) : 6.5;
    const nitrogen = n_gkg != null ? Math.round(n_gkg * 1000) : 120; // mg/kg
    const organicCarbon = soc_gkg != null ? +(soc_gkg / 10).toFixed(1) : 1.5; // % (approx)

    // Simple texture label
    let soilTexture = "Loamy";
    if (typeof clay === "number" && clay > 40) soilTexture = "Clay";
    else if (typeof sand === "number" && sand > 70) soilTexture = "Sandy";

    // SoilGrids does not provide P & K; set heuristic defaults or leave null-equivalent values
    const phosphorus = 75; // mg/kg (heuristic placeholder)
    const potassium = 225; // mg/kg (heuristic placeholder)

    return {
      pH,
      nitrogen,
      phosphorus,
      potassium,
      organicCarbon,
      soilTexture,
    };
  };

  // Weather via OpenWeather (with VITE_OPENWEATHER_API_KEY); fallback to Open‑Meteo if no key/429.
  const fetchClimateData = async (lat: number, lon: number) => {
    const key = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;

    if (key) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
        );
        if (!res.ok) throw new Error(String(res.status));
        const j = await res.json();
        const temperature = Math.round(j?.main?.temp ?? 26);
        const humidity = Math.round(j?.main?.humidity ?? 70);
        // Rainfall from last hour if available, else estimate via Open‑Meteo fallback below
        const rainfallNow = j?.rain?.["1h"] ?? j?.rain?.["3h"] ?? null;

        if (rainfallNow != null) {
          return { temperature, rainfall: Math.round(rainfallNow), humidity };
        }
        // fall through to Open‑Meteo for better rainfall climatology
      } catch (e) {
        console.warn("OpenWeather failed, falling back to Open‑Meteo:", e);
      }
    }

    // Fallback: Open‑Meteo (keyless) — use current and monthly mean rainfall estimate
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation&hourly=precipitation&forecast_days=1`
    );
    const j = await res.json();
    const temperature = Math.round(j?.current?.temperature_2m ?? 26);
    const humidity = Math.round(j?.current?.relative_humidity_2m ?? 70);
    // Simple aggregation for today's rainfall
    const hourly = (j?.hourly?.precipitation as number[] | undefined) ?? [];
    const rainfall = Math.round(hourly.reduce((a, b) => a + (b || 0), 0));

    return { temperature, rainfall, humidity };
  };

  const estimateAnnualRainfall = (lat: number, lon: number): number => {
    // Optional: keep if any place still uses it; not required with OpenWeather/Open‑Meteo daily
    return 1200;
  };

  const handleProceedWithData = () => {
    if (!locationData) return;
    onSubmit(locationData);
  };

  if (step === "detecting") {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-soft">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
            <h3 className="text-lg font-semibold">{t('detecting_location')}</h3>
            <p className="text-muted-foreground">{t('allow_location_access')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === "fetching") {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-soft">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
            <h3 className="text-lg font-semibold">{t('fetching_soil_climate_data')}</h3>
            <p className="text-muted-foreground">{t('analyzing_your_location')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === "display" && locationData) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-soft">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-earth bg-clip-text text-transparent flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            {t('location_data_detected')}
          </CardTitle>
          <CardDescription>
            {t('detected_location_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location Info */}
          <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">{locationData.location}</span>
            <Badge variant="outline" className="ml-auto">
              {locationData.latitude.toFixed(4)}, {locationData.longitude.toFixed(4)}
            </Badge>
          </div>

          {/* Soil Properties */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t('detected_soil_properties')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-sm text-muted-foreground">pH {t('level')}</div>
                <div className="text-xl font-bold">{locationData.soilData.pH}</div>
                <div className="text-xs text-muted-foreground">
                  {locationData.soilData.pH < 6.5 ? t('acidic') : 
                   locationData.soilData.pH > 7.5 ? t('alkaline') : t('neutral')}
                </div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-sm text-muted-foreground">{t('nitrogen')} (N)</div>
                <div className="text-xl font-bold">{locationData.soilData.nitrogen} mg/kg</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-sm text-muted-foreground">{t('phosphorus')} (P)</div>
                <div className="text-xl font-bold">{locationData.soilData.phosphorus} mg/kg</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-sm text-muted-foreground">{t('potassium')} (K)</div>
                <div className="text-xl font-bold">{locationData.soilData.potassium} mg/kg</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-sm text-muted-foreground">{t('soil_texture')}</div>
                <div className="text-xl font-bold capitalize">{locationData.soilData.soilTexture}</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-sm text-muted-foreground">{t('organic_carbon')}</div>
                <div className="text-xl font-bold">{locationData.soilData.organicCarbon}%</div>
              </div>
            </div>
          </div>

          {/* Climate Data */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t('detected_climate_conditions')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-sm text-muted-foreground">{t('temperature')}</div>
                <div className="text-xl font-bold">{locationData.climateData.temperature}°C</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-sm text-muted-foreground">{t('annual_rainfall')}</div>
                <div className="text-xl font-bold">{locationData.climateData.rainfall} mm</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-sm text-muted-foreground">{t('humidity')}</div>
                <div className="text-xl font-bold">{locationData.climateData.humidity}%</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleProceedWithData}
              className="flex-1 bg-gradient-earth hover:shadow-glow transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? t('analyzing') : t('get_crop_recommendations')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setStep("initial")}
              disabled={isLoading}
            >
              {t('detect_again')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-earth bg-clip-text text-transparent">
          {t('automatic_location_detection')}
        </CardTitle>
        <CardDescription>
          {t('automatic_detection_description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="p-4 bg-secondary/50 rounded-lg">
            <h4 className="font-medium mb-2">{t('what_we_detect')}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {t('exact_coordinates')}</li>
              <li>• {t('soil_ph_nutrients')}</li>
              <li>• {t('local_climate_data')}</li>
              <li>• {t('soil_texture_composition')}</li>
            </ul>
          </div>
          
          <Button 
            onClick={handleLocationDetection}
            className="w-full bg-gradient-earth hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            <MapPin className="mr-2 h-5 w-5" />
            {t('detect_my_location')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};