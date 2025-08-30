// Simulated AI crop recommendation engine for MVP
interface SoilData {
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  soilType: string;
}

interface ClimateData {
  temperature: number;
  rainfall: number;
  humidity: number;
}

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

// Crop database with optimal conditions
const cropDatabase = [
  {
    name: "Rice",
    optimalConditions: {
      pH: { min: 5.5, max: 7.5 },
      nitrogen: { min: 80, max: 150 },
      phosphorus: { min: 40, max: 80 },
      potassium: { min: 150, max: 300 },
      temperature: { min: 20, max: 35 },
      rainfall: { min: 1000, max: 2000 },
      humidity: { min: 60, max: 90 },
      soilTypes: ["clay", "loamy", "silt"]
    },
    details: {
      expectedYield: "3-5 tons/hectare",
      profitability: "High" as const,
      season: "Monsoon (June-October)",
      duration: "120-150 days",
      waterRequirement: "High" as const,
      marketPrice: "₹20-25/kg",
      pros: [
        "High demand and stable market",
        "Good yield potential in suitable conditions",
        "Government support and subsidies available"
      ],
      cons: [
        "Requires consistent water supply",
        "Vulnerable to pest attacks",
        "Labor intensive harvesting"
      ]
    }
  },
  {
    name: "Wheat",
    optimalConditions: {
      pH: { min: 6.0, max: 7.5 },
      nitrogen: { min: 100, max: 200 },
      phosphorus: { min: 60, max: 100 },
      potassium: { min: 80, max: 150 },
      temperature: { min: 15, max: 25 },
      rainfall: { min: 400, max: 800 },
      humidity: { min: 50, max: 70 },
      soilTypes: ["loamy", "clay", "silt"]
    },
    details: {
      expectedYield: "2.5-4 tons/hectare",
      profitability: "High" as const,
      season: "Winter (November-April)",
      duration: "120-140 days",
      waterRequirement: "Medium" as const,
      marketPrice: "₹18-22/kg",
      pros: [
        "Excellent storage life",
        "Multiple varieties available",
        "Good market infrastructure"
      ],
      cons: [
        "Sensitive to temperature fluctuations",
        "Requires timely irrigation",
        "Pest management needed"
      ]
    }
  },
  {
    name: "Maize (Corn)",
    optimalConditions: {
      pH: { min: 5.8, max: 7.0 },
      nitrogen: { min: 120, max: 200 },
      phosphorus: { min: 60, max: 120 },
      potassium: { min: 100, max: 200 },
      temperature: { min: 20, max: 30 },
      rainfall: { min: 600, max: 1200 },
      humidity: { min: 60, max: 80 },
      soilTypes: ["loamy", "sandy", "clay"]
    },
    details: {
      expectedYield: "4-6 tons/hectare",
      profitability: "Medium" as const,
      season: "Monsoon & Winter",
      duration: "90-120 days",
      waterRequirement: "Medium" as const,
      marketPrice: "₹15-18/kg",
      pros: [
        "Fast growing crop",
        "Multiple uses (food, feed, industrial)",
        "Good adaptability to different conditions"
      ],
      cons: [
        "Requires good drainage",
        "Susceptible to lodging in heavy rains",
        "Storage requires proper drying"
      ]
    }
  },
  {
    name: "Soybean",
    optimalConditions: {
      pH: { min: 6.0, max: 7.5 },
      nitrogen: { min: 60, max: 120 },
      phosphorus: { min: 80, max: 150 },
      potassium: { min: 100, max: 180 },
      temperature: { min: 20, max: 30 },
      rainfall: { min: 600, max: 1000 },
      humidity: { min: 65, max: 85 },
      soilTypes: ["loamy", "clay", "sandy"]
    },
    details: {
      expectedYield: "1.5-2.5 tons/hectare",
      profitability: "High" as const,
      season: "Monsoon (June-October)",
      duration: "90-110 days",
      waterRequirement: "Medium" as const,
      marketPrice: "₹35-45/kg",
      pros: [
        "High protein content",
        "Nitrogen fixation improves soil",
        "Good export potential"
      ],
      cons: [
        "Sensitive to water logging",
        "Price volatility in market",
        "Requires proper seed treatment"
      ]
    }
  },
  {
    name: "Cotton",
    optimalConditions: {
      pH: { min: 5.5, max: 8.0 },
      nitrogen: { min: 100, max: 180 },
      phosphorus: { min: 40, max: 80 },
      potassium: { min: 100, max: 200 },
      temperature: { min: 21, max: 35 },
      rainfall: { min: 500, max: 1000 },
      humidity: { min: 60, max: 80 },
      soilTypes: ["clay", "loamy", "sandy"]
    },
    details: {
      expectedYield: "1-2 tons/hectare",
      profitability: "Medium" as const,
      season: "Summer (April-October)",
      duration: "150-180 days",
      waterRequirement: "High" as const,
      marketPrice: "₹45-55/kg",
      pros: [
        "High market value",
        "Good industrial demand",
        "Long harvesting period"
      ],
      cons: [
        "High water requirement",
        "Intensive pest management needed",
        "Long growing period"
      ]
    }
  },
  {
    name: "Sugarcane",
    optimalConditions: {
      pH: { min: 6.0, max: 8.5 },
      nitrogen: { min: 150, max: 300 },
      phosphorus: { min: 80, max: 150 },
      potassium: { min: 200, max: 400 },
      temperature: { min: 20, max: 35 },
      rainfall: { min: 1000, max: 1500 },
      humidity: { min: 70, max: 90 },
      soilTypes: ["clay", "loamy", "silt"]
    },
    details: {
      expectedYield: "60-80 tons/hectare",
      profitability: "High" as const,
      season: "Year-round planting",
      duration: "12-18 months",
      waterRequirement: "High" as const,
      marketPrice: "₹2.5-3.5/kg",
      pros: [
        "Very high yield potential",
        "Guaranteed procurement by mills",
        "Ratoon crops possible"
      ],
      cons: [
        "Very long growing period",
        "High initial investment",
        "Requires consistent water supply"
      ]
    }
  }
];

function calculateCompatibilityScore(crop: any, soil: SoilData, climate: ClimateData): number {
  let score = 0;
  let factors = 0;

  // pH compatibility
  const pHScore = soil.pH >= crop.optimalConditions.pH.min && soil.pH <= crop.optimalConditions.pH.max ? 100 : 
    Math.max(0, 100 - Math.abs(soil.pH - (crop.optimalConditions.pH.min + crop.optimalConditions.pH.max) / 2) * 20);
  score += pHScore;
  factors++;

  // Nutrient compatibility
  const nitrogenScore = soil.nitrogen >= crop.optimalConditions.nitrogen.min && soil.nitrogen <= crop.optimalConditions.nitrogen.max ? 100 :
    Math.max(0, 100 - Math.abs(soil.nitrogen - (crop.optimalConditions.nitrogen.min + crop.optimalConditions.nitrogen.max) / 2) / 2);
  score += nitrogenScore;
  factors++;

  const phosphorusScore = soil.phosphorus >= crop.optimalConditions.phosphorus.min && soil.phosphorus <= crop.optimalConditions.phosphorus.max ? 100 :
    Math.max(0, 100 - Math.abs(soil.phosphorus - (crop.optimalConditions.phosphorus.min + crop.optimalConditions.phosphorus.max) / 2) / 2);
  score += phosphorusScore;
  factors++;

  const potassiumScore = soil.potassium >= crop.optimalConditions.potassium.min && soil.potassium <= crop.optimalConditions.potassium.max ? 100 :
    Math.max(0, 100 - Math.abs(soil.potassium - (crop.optimalConditions.potassium.min + crop.optimalConditions.potassium.max) / 2) / 2);
  score += potassiumScore;
  factors++;

  // Climate compatibility
  const tempScore = climate.temperature >= crop.optimalConditions.temperature.min && climate.temperature <= crop.optimalConditions.temperature.max ? 100 :
    Math.max(0, 100 - Math.abs(climate.temperature - (crop.optimalConditions.temperature.min + crop.optimalConditions.temperature.max) / 2) * 5);
  score += tempScore;
  factors++;

  const rainfallScore = climate.rainfall >= crop.optimalConditions.rainfall.min && climate.rainfall <= crop.optimalConditions.rainfall.max ? 100 :
    Math.max(0, 100 - Math.abs(climate.rainfall - (crop.optimalConditions.rainfall.min + crop.optimalConditions.rainfall.max) / 2) / 10);
  score += rainfallScore;
  factors++;

  const humidityScore = climate.humidity >= crop.optimalConditions.humidity.min && climate.humidity <= crop.optimalConditions.humidity.max ? 100 :
    Math.max(0, 100 - Math.abs(climate.humidity - (crop.optimalConditions.humidity.min + crop.optimalConditions.humidity.max) / 2) * 2);
  score += humidityScore;
  factors++;

  // Soil type compatibility
  const soilTypeScore = crop.optimalConditions.soilTypes.includes(soil.soilType) ? 100 : 50;
  score += soilTypeScore;
  factors++;

  return Math.round(score / factors);
}

export function generateCropRecommendations(formData: any): {
  recommendations: CropRecommendation[];
  weatherData: { temperature: string; humidity: string; rainfall: string };
} {
  const soilData: SoilData = {
    pH: parseFloat(formData.pH),
    nitrogen: parseFloat(formData.nitrogen),
    phosphorus: parseFloat(formData.phosphorus),
    potassium: parseFloat(formData.potassium),
    soilType: formData.soilType
  };

  const climateData: ClimateData = {
    temperature: parseFloat(formData.temperature),
    rainfall: parseFloat(formData.rainfall),
    humidity: parseFloat(formData.humidity)
  };

  // Calculate compatibility scores for all crops
  const scoredCrops = cropDatabase.map(crop => ({
    ...crop,
    confidence: calculateCompatibilityScore(crop, soilData, climateData)
  }));

  // Sort by confidence and take top 4
  const topCrops = scoredCrops
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 4);

  const recommendations: CropRecommendation[] = topCrops.map(crop => ({
    name: crop.name,
    confidence: crop.confidence,
    expectedYield: crop.details.expectedYield,
    profitability: crop.details.profitability,
    season: crop.details.season,
    duration: crop.details.duration,
    waterRequirement: crop.details.waterRequirement,
    marketPrice: crop.details.marketPrice,
    pros: crop.details.pros,
    cons: crop.details.cons
  }));

  return {
    recommendations,
    weatherData: {
      temperature: formData.temperature,
      humidity: formData.humidity,
      rainfall: formData.rainfall
    }
  };
}