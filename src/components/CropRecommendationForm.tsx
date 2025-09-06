import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

interface FormData {
  location: string;
  soilType: string;
  pH: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
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
  const [location, setLocation] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location: "",
    soilType: "",
    pH: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    rainfall: "",
    temperature: "",
    humidity: "",
  });

  const fetchLocationData = async (locationQuery: string) => {
    setIsDataLoading(true);
    try {
      // Determine OpenWeather API key from localStorage or env
      const keyFromStorage = (() => {
        try {
          return window.localStorage.getItem('openweather_api_key') || undefined;
        } catch {
          return undefined;
        }
      })();
      // Note: env vars may be undefined in this environment
      const keyFromEnv = (import.meta as any)?.env?.VITE_OPENWEATHER_API_KEY as string | undefined;
      const OPENWEATHER_API_KEY = keyFromStorage || keyFromEnv;

      // 1) Geocode: Use OpenWeather geocoding if API key exists, otherwise fallback to Nominatim (no key)
      let lat: number, lon: number, resolvedLabel = locationQuery;
      if (OPENWEATHER_API_KEY) {
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationQuery)}&limit=1&appid=${OPENWEATHER_API_KEY}`
        );
        if (!geoResponse.ok) throw new Error('Failed to geocode location (OpenWeather)');
        const geoData = await geoResponse.json();
        if (!geoData || geoData.length === 0) throw new Error('Location not found');
        lat = geoData[0].lat;
        lon = geoData[0].lon;
        resolvedLabel = [geoData[0].name, geoData[0].state, geoData[0].country].filter(Boolean).join(', ');
      } else {
        const nominatim = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}&limit=1&addressdetails=1`,
          { headers: { 'Accept-Language': 'en', 'User-Agent': 'Lovable-Crop-App/1.0' } }
        );
        if (!nominatim.ok) throw new Error('Failed to geocode location (Nominatim)');
        const geo = await nominatim.json();
        if (!geo || geo.length === 0) throw new Error('Location not found');
        lat = parseFloat(geo[0].lat);
        lon = parseFloat(geo[0].lon);
        resolvedLabel = geo[0].display_name || resolvedLabel;
      }

      // 2) Fetch soil data from SoilGrids API
      const soilResponse = await fetch(
        `https://rest.isric.org/soilgrids/v2.0/properties?lon=${lon}&lat=${lat}&property=phh2o&property=nitrogen&property=soc&property=clay&depth=0-5cm&value=mean`
      );

      // 3) Fetch weather data: Prefer OpenWeather if key exists, else fallback to Open-Meteo (no key)
      let temperatureC = '25';
      let humidityPct = '70';
      let rainfallMm = '0';
      if (OPENWEATHER_API_KEY) {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        if (!weatherResponse.ok) throw new Error('Failed to fetch weather data (OpenWeather)');
        const weatherData = await weatherResponse.json();
        temperatureC = String(Math.round(weatherData.main?.temp ?? 25));
        humidityPct = String(Math.round(weatherData.main?.humidity ?? 70));
        // OpenWeather current rain (last 1h) if available
        rainfallMm = String(weatherData.rain?.['1h'] ?? 0);
      } else {
        const openMeteo = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation&timezone=auto`
        );
        if (!openMeteo.ok) throw new Error('Failed to fetch weather data (Open-Meteo)');
        const meteo = await openMeteo.json();
        temperatureC = String(Math.round(meteo.current?.temperature_2m ?? 25));
        humidityPct = String(Math.round(meteo.current?.relative_humidity_2m ?? 70));
        rainfallMm = String(meteo.current?.precipitation ?? 0);
      }

      if (!soilResponse.ok) throw new Error('Failed to fetch soil data');
      const soilData = await soilResponse.json();

      // Extract and process soil data safely
      const properties = soilData?.properties ?? {};
      const phRaw = properties.phh2o?.depths?.[0]?.values?.mean;
      const nitrogenRaw = properties.nitrogen?.depths?.[0]?.values?.mean;
      const socRaw = properties.soc?.depths?.[0]?.values?.mean;
      const clayContent = properties.clay?.depths?.[0]?.values?.mean;

      const pH = phRaw != null ? (phRaw / 10).toFixed(1) : '6.5';
      const nitrogen = nitrogenRaw != null ? (nitrogenRaw / 100).toFixed(0) : '120';
      const organicCarbon = socRaw != null ? (socRaw / 10).toFixed(1) : '2.5';
      const clayVal = typeof clayContent === 'number' ? clayContent : 25;

      let soilType = 'loamy';
      if (clayVal > 40) soilType = 'clay';
      else if (clayVal < 10) soilType = 'sandy';
      else if (clayVal < 20) soilType = 'silt';

      setFormData({
        location: resolvedLabel,
        soilType,
        pH,
        nitrogen,
        phosphorus: '80',
        potassium: '200',
        rainfall: rainfallMm,
        temperature: temperatureC,
        humidity: humidityPct,
      });

      toast.success('Location data fetched successfully!');
    } catch (error) {
      console.error('Error fetching location data:', error);
      toast.error('Failed to fetch location data. Please check your location and try again.');
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      fetchLocationData(location.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-earth bg-clip-text text-transparent">
          {t('crop_recommendation_analysis')}
        </CardTitle>
        <CardDescription>
          Enter your farm location to get personalized crop recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Input Form */}
        <form onSubmit={handleLocationSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <Label className="text-base font-semibold">Farm Location</Label>
            </div>
            <div>
              <Label htmlFor="location">Enter your farm address or city</Label>
              <Input
                id="location"
                placeholder="e.g., Punjab, India or New Delhi, India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-2"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isDataLoading || !location.trim()}
          >
            {isDataLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching location data...
              </>
            ) : (
              "Get Location Data"
            )}
          </Button>
        </form>

        {/* Auto-fetched Data Preview */}
        {formData.location && (
          <div className="border rounded-lg p-4 bg-muted/20">
            <h3 className="font-semibold text-lg mb-3">Detected Farm Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Location:</span> {formData.location}
              </div>
              <div>
                <span className="font-medium">Soil Type:</span> {formData.soilType}
              </div>
              <div>
                <span className="font-medium">Soil pH:</span> {formData.pH}
              </div>
              <div>
                <span className="font-medium">Temperature:</span> {formData.temperature}°C
              </div>
              <div>
                <span className="font-medium">Humidity:</span> {formData.humidity}%
              </div>
              <div>
                <span className="font-medium">Estimated Rainfall:</span> {formData.rainfall}mm
              </div>
            </div>
          </div>
        )}

        {/* Submit for Recommendations */}
        {formData.location && (
          <form onSubmit={handleSubmit}>
            <Button 
              type="submit" 
              className="w-full bg-gradient-earth hover:shadow-glow transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('analyzing')}
                </>
              ) : (
                "Get Crop Recommendations"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};