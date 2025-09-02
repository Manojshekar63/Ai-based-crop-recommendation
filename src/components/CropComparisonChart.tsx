import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

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

interface CropComparisonChartProps {
  recommendations: CropRecommendation[];
}

export const CropComparisonChart = ({ recommendations }: CropComparisonChartProps) => {
  // Convert data for charts
  const barChartData = recommendations.map(crop => ({
    name: crop.name.length > 10 ? crop.name.substring(0, 10) + '...' : crop.name,
    fullName: crop.name,
    confidence: crop.confidence,
    yield: parseFloat(crop.expectedYield.replace(/[^0-9.]/g, '')) || 0,
    price: parseFloat(crop.marketPrice.replace(/[^0-9.]/g, '')) || 0,
  }));

  // Convert water requirement and profitability to numerical values for radar chart
  const getWaterScore = (requirement: string) => {
    switch (requirement) {
      case 'Low': return 25;
      case 'Medium': return 50;
      case 'High': return 75;
      default: return 0;
    }
  };

  const getProfitScore = (profitability: string) => {
    switch (profitability) {
      case 'High': return 90;
      case 'Medium': return 60;
      case 'Low': return 30;
      default: return 0;
    }
  };

  const radarData = [
    {
      subject: 'Confidence',
      ...Object.fromEntries(
        recommendations.slice(0, 3).map((crop, index) => [
          crop.name.length > 8 ? crop.name.substring(0, 8) + '...' : crop.name,
          crop.confidence
        ])
      )
    },
    {
      subject: 'Profitability',
      ...Object.fromEntries(
        recommendations.slice(0, 3).map((crop, index) => [
          crop.name.length > 8 ? crop.name.substring(0, 8) + '...' : crop.name,
          getProfitScore(crop.profitability)
        ])
      )
    },
    {
      subject: 'Water Efficiency',
      ...Object.fromEntries(
        recommendations.slice(0, 3).map((crop, index) => [
          crop.name.length > 8 ? crop.name.substring(0, 8) + '...' : crop.name,
          100 - getWaterScore(crop.waterRequirement)
        ])
      )
    },
    {
      subject: 'Market Score',
      ...Object.fromEntries(
        recommendations.slice(0, 3).map((crop, index) => [
          crop.name.length > 8 ? crop.name.substring(0, 8) + '...' : crop.name,
          Math.min(parseFloat(crop.marketPrice.replace(/[^0-9.]/g, '')) || 0, 100)
        ])
      )
    }
  ];

  const radarCrops = recommendations.slice(0, 3).map(crop => ({
    name: crop.name.length > 8 ? crop.name.substring(0, 8) + '...' : crop.name,
    fullName: crop.name
  }));

  return (
    <div className="space-y-6">
      {/* Confidence Comparison */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Crop Confidence Comparison
          </CardTitle>
          <CardDescription>
            AI confidence levels and expected yield comparison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  labelFormatter={(label, payload) => {
                    const item = payload?.[0]?.payload;
                    return item?.fullName || label;
                  }}
                />
                <Bar 
                  dataKey="confidence" 
                  name="AI Confidence %" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Factor Radar Comparison */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Multi-Factor Analysis
          </CardTitle>
          <CardDescription>
            Compare top 3 crops across key factors (higher values are better)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid className="opacity-30" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  fontSize={10}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                {radarCrops.map((crop, index) => (
                  <Radar
                    key={crop.name}
                    name={crop.fullName}
                    dataKey={crop.name}
                    stroke={`hsl(${142 + index * 60}, 45%, ${35 + index * 15}%)`}
                    fill={`hsl(${142 + index * 60}, 45%, ${35 + index * 15}%)`}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {radarCrops.map((crop, index) => (
              <Badge 
                key={crop.name}
                variant="outline"
                style={{ 
                  borderColor: `hsl(${142 + index * 60}, 45%, ${35 + index * 15}%)`,
                  color: `hsl(${142 + index * 60}, 45%, ${35 + index * 15}%)`
                }}
              >
                {crop.fullName}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};