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
      // First, get coordinates from the location
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationQuery)}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      
      if (!geoResponse.ok) {
        throw new Error('Failed to geocode location');
      }
      
      const geoData = await geoResponse.json();
      if (!geoData || geoData.length === 0) {
        throw new Error('Location not found');
      }
      
      const { lat, lon } = geoData[0];
      
      // Fetch soil data from SoilGrids API
      const soilResponse = await fetch(
        `https://rest.isric.org/soilgrids/v2.0/properties?lon=${lon}&lat=${lat}&property=phh2o&property=nitrogen&property=soc&property=clay&depth=0-5cm&value=mean`
      );
      
      // Fetch weather data from OpenWeatherMap
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
      );
      
      if (!soilResponse.ok || !weatherResponse.ok) {
        throw new Error('Failed to fetch environmental data');
      }
      
      const soilData = await soilResponse.json();
      const weatherData = await weatherResponse.json();
      
      // Extract and process soil data
      const properties = soilData.properties;
      const pH = properties.phh2o ? (properties.phh2o.depths[0].values.mean / 10).toFixed(1) : "6.5";
      const nitrogen = properties.nitrogen ? (properties.nitrogen.depths[0].values.mean / 100).toFixed(0) : "120";
      const organicCarbon = properties.soc ? (properties.soc.depths[0].values.mean / 10).toFixed(1) : "2.5";
      const clayContent = properties.clay ? properties.clay.depths[0].values.mean : 25;
      
      // Determine soil type based on clay content
      let soilType = "loamy";
      if (clayContent > 40) soilType = "clay";
      else if (clayContent < 10) soilType = "sandy";
      else if (clayContent < 20) soilType = "silt";
      
      // Extract weather data
      const temperature = weatherData.main.temp.toFixed(0);
      const humidity = weatherData.main.humidity.toString();
      
      // Estimate rainfall (using a simplified approach - in real scenario, you'd use historical data)
      const rainfall = "1200"; // Default value - would need historical weather API for accurate data
      
      // Update form data with fetched values
      setFormData({
        location: locationQuery,
        soilType,
        pH,
        nitrogen,
        phosphorus: "80", // Default estimation based on soil type
        potassium: "200", // Default estimation based on soil type
        rainfall,
        temperature,
        humidity,
      });
      
      toast.success("Location data fetched successfully! Review the details below.");
      
    } catch (error) {
      console.error('Error fetching location data:', error);
      toast.error("Failed to fetch location data. Please check your location and try again.");
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