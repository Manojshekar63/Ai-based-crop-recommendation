import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Wheat, TrendingUp, Calendar, DollarSign, Droplets, Thermometer } from "lucide-react";

interface CropRecommendation {
  name: string;
  confidence: number;
  expectedYield: string;
  profitability: "High" | "Medium" | "Low";
  season: string;
  duration: string;
  waterRequirement: "Low" | "Medium" | "High";
  marketPrice: string;
  pros: string[];
  cons: string[];
}

interface CropRecommendationsProps {
  recommendations: CropRecommendation[];
  weatherData: {
    temperature: string;
    humidity: string;
    rainfall: string;
  };
}

export const CropRecommendations = ({ recommendations, weatherData }: CropRecommendationsProps) => {
  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case "High": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getWaterRequirementColor = (requirement: string) => {
    switch (requirement) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Weather Summary Card */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            Current Weather Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Thermometer className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="font-semibold">{weatherData.temperature}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-semibold">{weatherData.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Annual Rainfall</p>
                <p className="font-semibold">{weatherData.rainfall}mm</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((crop, index) => (
          <Card key={index} className="shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-field rounded-lg">
                    <Wheat className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{crop.name}</CardTitle>
                    <CardDescription>
                      AI Confidence: {crop.confidence}%
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getProfitabilityColor(crop.profitability)}>
                  {crop.profitability} Profit
                </Badge>
              </div>
              <Progress value={crop.confidence} className="mt-2" />
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Yield</p>
                    <p className="font-semibold">{crop.expectedYield}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Market Price</p>
                    <p className="font-semibold">{crop.marketPrice}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Best Season</p>
                    <p className="font-semibold">{crop.season}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className={`h-4 w-4 ${getWaterRequirementColor(crop.waterRequirement)}`} />
                  <div>
                    <p className="text-sm text-muted-foreground">Water Need</p>
                    <p className="font-semibold">{crop.waterRequirement}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Duration */}
              <div>
                <p className="text-sm text-muted-foreground">Growing Duration</p>
                <p className="font-semibold">{crop.duration}</p>
              </div>

              <Separator />

              {/* Pros and Cons */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-2">Advantages:</p>
                  <ul className="text-sm space-y-1">
                    {crop.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-red-700 mb-2">Considerations:</p>
                  <ul className="text-sm space-y-1">
                    {crop.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};