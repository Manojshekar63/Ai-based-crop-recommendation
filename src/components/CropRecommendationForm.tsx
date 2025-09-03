import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Droplets, Thermometer, Wind } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          {/* Location Section */}
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
            </div>
          </div>

          {/* Soil Properties Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">{t('soil_properties')}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soilType">{t('soil_type')}</Label>
                <Select onValueChange={(value) => handleInputChange("soilType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select_soil_type')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandy">{t('sandy')}</SelectItem>
                    <SelectItem value="loamy">{t('loamy')}</SelectItem>
                    <SelectItem value="clay">{t('clay')}</SelectItem>
                    <SelectItem value="silt">{t('silt')}</SelectItem>
                    <SelectItem value="peaty">{t('peaty')}</SelectItem>
                    <SelectItem value="chalky">{t('chalky')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pH">Soil pH</Label>
                <Input
                  id="pH"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  placeholder="6.5"
                  value={formData.pH}
                  onChange={(e) => handleInputChange("pH", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nitrogen">Nitrogen (N) mg/kg</Label>
                <Input
                  id="nitrogen"
                  type="number"
                  placeholder="120"
                  value={formData.nitrogen}
                  onChange={(e) => handleInputChange("nitrogen", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phosphorus">Phosphorus (P) mg/kg</Label>
                <Input
                  id="phosphorus"
                  type="number"
                  placeholder="80"
                  value={formData.phosphorus}
                  onChange={(e) => handleInputChange("phosphorus", e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="potassium">Potassium (K) mg/kg</Label>
                <Input
                  id="potassium"
                  type="number"
                  placeholder="200"
                  value={formData.potassium}
                  onChange={(e) => handleInputChange("potassium", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Climate Data Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">{t('climate_conditions')}</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <Label htmlFor="rainfall">{t('annual_rainfall')}</Label>
                </div>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="1200"
                  value={formData.rainfall}
                  onChange={(e) => handleInputChange("rainfall", e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <Label htmlFor="temperature">{t('avg_temperature')}</Label>
                </div>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="25"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange("temperature", e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="humidity">{t('humidity')}</Label>
                </div>
                <Input
                  id="humidity"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="70"
                  value={formData.humidity}
                  onChange={(e) => handleInputChange("humidity", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-earth hover:shadow-glow transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? t('analyzing') : t('get_crop_recommendations')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};