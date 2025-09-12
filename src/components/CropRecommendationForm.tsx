import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface FormData {
  location: string;
  soilType: string;
  pH: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  organicCarbon?: string;
  rainfall: string;
  temperature: string;
  humidity: string;
}

interface CropRecommendationFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export const CropRecommendationForm = ({ onSubmit, isLoading }: CropRecommendationFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    location: "",
    soilType: "",
    pH: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  organicCarbon: "",
    rainfall: "",
    temperature: "",
    humidity: "",
  });
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleFetchAndSubmit();
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFetchAndSubmit = async () => {
    if (!formData.location.trim()) return;
    setFetching(true);
    setError("");

    try {
      // 1) Geocode address -> lat/lon
      const geo = await geocodeAddress(formData.location.trim());
      if (!geo) throw new Error("GEOCODE_FAIL");

      // 2) Fetch soil and climate
      const soil = await fetchSoilData(geo.lat, geo.lon);
      const climate = await fetchClimateData(geo.lat, geo.lon);

      // 3) Build final payload (pre-filled, hidden/read-only to user)
      const finalForm: FormData = {
        location: geo.displayName,
        soilType: soil.soilTexture,
        pH: String(soil.pH),
        nitrogen: String(soil.nitrogen),
        phosphorus: String(soil.phosphorus),
        potassium: String(soil.potassium),
  organicCarbon: String(soil.organicCarbon),
        rainfall: String(climate.rainfall),
        temperature: String(climate.temperature),
        humidity: String(climate.humidity),
      };
      setFormData(finalForm);
      onSubmit(finalForm);
    } catch (err) {
      console.error(err);
      setError(t('error_fetching_data'));
    } finally {
      setFetching(false);
    }
  };

  // Geocode using OpenStreetMap Nominatim (no key required)
  const geocodeAddress = async (q: string): Promise<{ lat: number; lon: number; displayName: string } | null> => {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&limit=1`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    const j = await res.json();
    if (Array.isArray(j) && j.length > 0) {
      return { lat: parseFloat(j[0].lat), lon: parseFloat(j[0].lon), displayName: j[0].display_name };
    }
    return null;
  };

  // SoilGrids fetch – similar to automatic detection
  const fetchSoilData = async (lat: number, lon: number) => {
    try {
      const properties = ['phh2o', 'nitrogen', 'ocd', 'sand', 'silt', 'clay'];
      const depth = '0-5cm';
      const promises = properties.map(prop =>
        fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=${prop}&depth=${depth}&value=mean`).then(r => r.json())
      );
      const results = await Promise.all(promises);
      const pH = results[0]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 6.5;
      const nitrogen = results[1]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 100 || 120;
      const organicCarbon = results[2]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 15;
      const sand = results[3]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 40;
      const silt = results[4]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 30;
      const clay = results[5]?.properties?.layers?.[0]?.depths?.[0]?.values?.mean / 10 || 30;
      let soilTexture = "loamy";
      if (sand > 50) soilTexture = "sandy";
      else if (clay > 40) soilTexture = "clay";
      else if (silt > 40) soilTexture = "silt";
      const phosphorus = Math.round(organicCarbon * 5);
      const potassium = Math.round(organicCarbon * 15);
      return {
        pH: Math.round(pH * 10) / 10,
        nitrogen: Math.round(nitrogen),
        phosphorus: Math.max(40, Math.min(120, phosphorus)),
        potassium: Math.max(100, Math.min(300, potassium)),
        organicCarbon: Math.round(organicCarbon * 10) / 10,
        soilTexture
      };
    } catch (e) {
      console.error('soil error', e);
      return { pH: 6.5, nitrogen: 120, phosphorus: 80, potassium: 200, organicCarbon: 15, soilTexture: 'loamy' };
    }
  };

  const fetchClimateData = async (lat: number, lon: number) => {
    const apiKey = (import.meta as any).env?.VITE_OPENWEATHER_API_KEY as string | undefined;
    try {
      if (apiKey) {
        const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const j = await r.json();
        const temperature = j?.main?.temp ?? 25;
        const humidity = j?.main?.humidity ?? 70;
        // If current rain data exists use last 1h (mm), else estimate annual
        const rain1h = j?.rain?.['1h'];
        const rainfall = typeof rain1h === 'number' ? Math.round(rain1h) : estimateAnnualRainfall(lat, lon);
        return { temperature: Math.round(temperature), humidity: Math.round(humidity), rainfall };
      }
    } catch (e) {
      console.error('openweather error', e);
    }
    // Fallback: Open-Meteo (no key)
    try {
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`);
      const j = await r.json();
      const temperature = j?.current?.temperature_2m ?? 25;
      const humidity = j?.current?.relative_humidity_2m ?? 70;
      const rainfall = estimateAnnualRainfall(lat, lon);
      return { temperature: Math.round(temperature), humidity: Math.round(humidity), rainfall };
    } catch (e) {
      console.error('open-meteo error', e);
      return { temperature: 25, humidity: 70, rainfall: 1000 };
    }
  };

  const estimateAnnualRainfall = (lat: number, _lon: number): number => {
    const absLat = Math.abs(lat);
    if (absLat < 23.5) return Math.round(1200 + Math.random() * 800);
    if (absLat < 35) return Math.round(600 + Math.random() * 600);
    return Math.round(400 + Math.random() * 800);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-earth bg-clip-text text-transparent">
          {t('crop_recommendation_analysis')}
        </CardTitle>
        <CardDescription>
          {t('enter_farm_details')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location only */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <Label className="text-base font-semibold">{t('location')}</Label>
            </div>
            <div>
              <Label htmlFor="location">{t('farm_location')}</Label>
              <Input
                id="location"
                placeholder="e.g., Punjab, India"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
              {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-earth hover:shadow-glow transition-all duration-300"
            disabled={isLoading || fetching}
          >
            {isLoading || fetching ? (
              <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> {t('analyzing')}</span>
            ) : t('get_crop_recommendations')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};