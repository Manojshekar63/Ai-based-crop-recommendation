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

  const handleLocationDetection = async () => {
    setStep("detecting");
    setError("");

  // Helper to promisify geolocation
    const getPosition = (options: PositionOptions) =>
      new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("GEO_NOT_SUPPORTED"));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

    // Fallback via IP when GPS is unavailable (approximate)
    const getIpLocation = async (): Promise<{ latitude: number; longitude: number }> => {
      try {
        // Primary: ipapi.co (no key, CORS-enabled)
        const r1 = await fetch("https://ipapi.co/json/");
        if (r1.ok) {
          const j = await r1.json();
          if (j && typeof j.latitude === "number" && typeof j.longitude === "number") {
            return { latitude: j.latitude, longitude: j.longitude };
          }
        }
      } catch {}
      try {
        // Secondary: ipwho.is (no key)
        const r2 = await fetch("https://ipwho.is/");
        if (r2.ok) {
          const j2 = await r2.json();
          if (j2?.success && typeof j2.latitude === "number" && typeof j2.longitude === "number") {
            return { latitude: j2.latitude, longitude: j2.longitude };
          }
        }
      } catch {}
      throw new Error("IP_FALLBACK_FAILED");
    };

    try {
      // Check permission up front to avoid misleading IP fallback when explicitly denied
      const permState = await (navigator.permissions?.query as any)?.({ name: 'geolocation' as any }).catch(() => null);

      if (permState && permState.state === 'denied') {
        // User explicitly denied: show clear error and stop.
        setError(t('location_permission_denied'));
        setStep('initial');
        return;
      }

      // Try high-accuracy first, refine with watchPosition briefly, then low-accuracy, then IP fallback
      let coords: { latitude: number; longitude: number } | null = null;
      try {
        const pos = await getPosition({ enableHighAccuracy: true, timeout: 9000, maximumAge: 0 });
        coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };

        // Quick refinement using watchPosition up to 8s or until accuracy < 100m
        if (navigator.geolocation && typeof navigator.geolocation.watchPosition === 'function') {
          await new Promise<void>((resolve) => {
            const started = Date.now();
            const watchId = navigator.geolocation.watchPosition(
              (p) => {
                const acc = p.coords.accuracy ?? 99999;
                // Replace coords if better
                if (!coords || acc < 100) {
                  coords = { latitude: p.coords.latitude, longitude: p.coords.longitude };
                }
                if (acc < 100 || Date.now() - started > 8000) {
                  navigator.geolocation.clearWatch(watchId);
                  resolve();
                }
              },
              () => {
                try { navigator.geolocation.clearWatch(watchId); } catch {}
                resolve();
              },
              { enableHighAccuracy: true, maximumAge: 0 }
            );
          });
        }
      } catch (e1) {
        try {
          const pos2 = await getPosition({ enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
          coords = { latitude: pos2.coords.latitude, longitude: pos2.coords.longitude };
        } catch (e2) {
          // If permission is not denied but device couldn't deliver a fix, fall back to approximate IP location
          // Only do this when permission is prompt/granted but position unavailable or timed out
          if (!permState || permState.state !== 'denied') {
            coords = await getIpLocation();
          }
        }
      }

      if (!coords) {
        throw new Error("NO_COORDS");
      }

      const { latitude, longitude } = coords;
      setStep("fetching");

      // Fetch downstream data in sequence to keep logic simple
      const locationName = await fetchLocationName(latitude, longitude);
      const soilData = await fetchSoilData(latitude, longitude);
      const climateData = await fetchClimateData(latitude, longitude);

      const data: LocationData = {
        latitude,
        longitude,
        location: locationName,
        soilData,
        climateData
      };

      setLocationData(data);
      setStep("display");
    } catch (err: any) {
      console.error("Location detection failed:", err);
      if (err?.message === "GEO_NOT_SUPPORTED") {
        setError(t('geolocation_not_supported'));
  } else if (err?.message === "IP_FALLBACK_FAILED" || err?.message === "NO_COORDS") {
        setError(t('location_unavailable'));
      } else {
        setError(t('location_unknown_error'));
      }
      setStep("initial");
    }
  };

  const fetchLocationName = async (lat: number, lon: number): Promise<string> => {
    try {
      // Use OpenStreetMap Nominatim reverse geocoding (no API key)
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
      const response = await fetch(url, { headers: { "Accept": "application/json" } });
      const data = await response.json();

      const addr = data?.address || {};
      const locality = addr.city || addr.town || addr.village || addr.hamlet || data?.name;
      const state = addr.state || addr.county;
      const country = addr.country;
      if (locality || state || country) {
        return [locality, state, country].filter(Boolean).join(', ');
      }
      return data?.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    } catch (error) {
      return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }
  };

  const fetchSoilData = async (lat: number, lon: number) => {
    try {
      // SoilGrids API endpoints for different soil properties
      const properties = ['phh2o', 'nitrogen', 'ocd', 'sand', 'silt', 'clay'];
      const depth = '0-5cm'; // Surface layer
      
      const promises = properties.map(prop => 
        fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=${prop}&depth=${depth}&value=mean`)
          .then(res => res.json())
      );

      const results = await Promise.all(promises);
      
      // Extract and convert values
      const pH = results[0]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 6.5;
      const nitrogen = results[1]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 100 || 120;
      const organicCarbon = results[2]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 15;
      const sand = results[3]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 40;
      const silt = results[4]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 30;
      const clay = results[5]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 30;

      // Determine soil texture based on sand/silt/clay percentages
      let soilTexture = "loamy";
      if (sand > 50) soilTexture = "sandy";
      else if (clay > 40) soilTexture = "clay";
      else if (silt > 40) soilTexture = "silt";

      // Calculate approximate NPK values based on organic carbon and typical soil composition
      const phosphorus = Math.round(organicCarbon * 5); // Rough estimation
      const potassium = Math.round(organicCarbon * 15); // Rough estimation

      return {
        pH: Math.round(pH * 10) / 10,
        nitrogen: Math.round(nitrogen),
        phosphorus: Math.max(40, Math.min(120, phosphorus)),
        potassium: Math.max(100, Math.min(300, potassium)),
        organicCarbon: Math.round(organicCarbon * 10) / 10,
        soilTexture
      };
    } catch (error) {
      console.error("Error fetching soil data:", error);
      // Return default values if API fails
      return {
        pH: 6.5,
        nitrogen: 120,
        phosphorus: 80,
        potassium: 200,
        organicCarbon: 15,
        soilTexture: "loamy"
      };
    }
  };

  const fetchClimateData = async (lat: number, lon: number) => {
    try {
      // Use Open-Meteo (no key) for current weather
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`;
      const r = await fetch(url);
      const j = await r.json();

      const temperature = j?.current?.temperature_2m ?? 25;
      const humidity = j?.current?.relative_humidity_2m ?? 70;

      // Estimate annual rainfall based on location (simplified for MVP)
      const rainfall = estimateAnnualRainfall(lat, lon);

      return {
        temperature: Math.round(temperature),
        rainfall,
        humidity: Math.round(humidity)
      };
    } catch (error) {
      console.error("Error fetching climate data:", error);
      // Return default values if API fails
      return {
        temperature: 25,
        rainfall: 1000,
        humidity: 70
      };
    }
  };

  const estimateAnnualRainfall = (lat: number, lon: number): number => {
    // Simplified rainfall estimation based on latitude
    // This is a rough approximation for MVP purposes
    const absLat = Math.abs(lat);
    
    if (absLat < 23.5) { // Tropical regions
      return Math.round(1200 + Math.random() * 800); // 1200-2000mm
    } else if (absLat < 35) { // Subtropical
      return Math.round(600 + Math.random() * 600); // 600-1200mm
    } else { // Temperate
      return Math.round(400 + Math.random() * 800); // 400-1200mm
    }
  };

  const handleProceedWithData = () => {
    if (locationData) {
      onSubmit(locationData);
    }
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