import { useState } from "react";
import { CropRecommendationForm } from "@/components/CropRecommendationForm";
import { CropRecommendations } from "@/components/CropRecommendations";
import { LocationDetectionForm } from "@/components/LocationDetectionForm";
import { OptionSelector } from "@/components/OptionSelector";
import { generateCropRecommendations } from "@/utils/cropRecommendation";
import { predictCrop } from "@/utils/mlApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf, Brain, BarChart3, FileBarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { SaveAnalysisButton } from "@/components/SaveAnalysisButton";
import { CropComparisonChart } from "@/components/CropComparisonChart";
import { ExportButton } from "@/components/ExportButton";
import { OnboardingTour } from "@/components/OnboardingTour";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import heroImage from "@/assets/hero-farm.jpg";

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

const Index = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<"welcome" | "options" | "automatic" | "manual" | "results">("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setFormData(formData);

    const useMl = ((import.meta as any).env?.VITE_USE_TF_ML || 'false') === 'true';
    if (useMl) {
      try {
        const features = {
          soil_ph: parseFloat(formData.pH),
          nitrogen: parseFloat(formData.nitrogen),
          phosphorus: parseFloat(formData.phosphorus),
          potassium: parseFloat(formData.potassium),
          organic_carbon: parseFloat((formData as any).organicCarbon || '0'),
          soil_texture: formData.soilType,
          rainfall: parseFloat(formData.rainfall),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
        };
        const resp = await predictCrop(features);
        const top = resp.recommended_crop;
        const fallback = generateCropRecommendations(formData);
        // Boost the top crop from ML in the displayed list
        const boosted = [
          {
            name: top,
            confidence: Math.round((resp.probabilities[top] || 0.9) * 100),
            expectedYield: "--",
            profitability: "High",
            season: "--",
            duration: "--",
            waterRequirement: "Medium",
            marketPrice: "--",
            pros: ["Recommended by ML model"],
            cons: [],
          },
          ...fallback.recommendations.filter((r: any) => r.name !== top).slice(0, 3),
        ];
        setResults({
          recommendations: boosted,
          weatherData: fallback.weatherData,
        });
        setCurrentStep("results");
        setIsLoading(false);
        return;
      } catch (e) {
        console.warn('ML API failed, falling back to rules', e);
      }
    }

    // Fallback to rule-based engine
    const recommendations = generateCropRecommendations(formData);
    setResults(recommendations);
    setCurrentStep("results");
    setIsLoading(false);
  };

  const handleLocationSubmit = async (locationData: any) => {
    setIsLoading(true);
    
    // Convert location data to FormData format
    const convertedFormData: FormData = {
      location: locationData.location,
      soilType: locationData.soilData.soilTexture,
      pH: locationData.soilData.pH.toString(),
      nitrogen: locationData.soilData.nitrogen.toString(),
      phosphorus: locationData.soilData.phosphorus.toString(),
      potassium: locationData.soilData.potassium.toString(),
      // @ts-ignore add for ML features when available
      organicCarbon: (locationData.soilData.organicCarbon ?? 0).toString(),
      rainfall: locationData.climateData.rainfall.toString(),
      temperature: locationData.climateData.temperature.toString(),
      humidity: locationData.climateData.humidity.toString(),
    };
    
    setFormData(convertedFormData);
    
    const useMl = ((import.meta as any).env?.VITE_USE_TF_ML || 'false') === 'true';
    if (useMl) {
      try {
        const features = {
          soil_ph: parseFloat(convertedFormData.pH),
          nitrogen: parseFloat(convertedFormData.nitrogen),
          phosphorus: parseFloat(convertedFormData.phosphorus),
          potassium: parseFloat(convertedFormData.potassium),
          organic_carbon: parseFloat((convertedFormData as any).organicCarbon || '0'),
          soil_texture: convertedFormData.soilType,
          rainfall: parseFloat(convertedFormData.rainfall),
          temperature: parseFloat(convertedFormData.temperature),
          humidity: parseFloat(convertedFormData.humidity),
        };
        const resp = await predictCrop(features);
        const top = resp.recommended_crop;
        const fallback = generateCropRecommendations(convertedFormData);
        const boosted = [
          {
            name: top,
            confidence: Math.round((resp.probabilities[top] || 0.9) * 100),
            expectedYield: "--",
            profitability: "High",
            season: "--",
            duration: "--",
            waterRequirement: "Medium",
            marketPrice: "--",
            pros: ["Recommended by ML model"],
            cons: [],
          },
          ...fallback.recommendations.filter((r: any) => r.name !== top).slice(0, 3),
        ];
        setResults({ recommendations: boosted, weatherData: fallback.weatherData });
        setCurrentStep("results");
        setIsLoading(false);
        return;
      } catch (e) {
        console.warn('ML API failed, falling back to rules', e);
      }
    }

    const recommendations = generateCropRecommendations(convertedFormData);
    setResults(recommendations);
    setCurrentStep("results");
    setIsLoading(false);
  };

  const resetToWelcome = () => {
    setCurrentStep("welcome");
    setResults(null);
    setFormData(null);
    setShowComparison(false);
  };

  const goToOptions = () => {
    setCurrentStep("options");
  };

  if (currentStep === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
        {/* Navigation */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <LanguageSelector />
          <div data-tour="dashboard">
            <Link to="/dashboard">
              <Button variant="outline" className="bg-white/90 backdrop-blur-sm">
                <FileBarChart className="h-4 w-4 mr-2" />
                {t('dashboard')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative">
          <div 
            className="h-[60vh] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/30" />
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {t('smart_crop_recommendations')}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  {t('hero_subtitle')}
                </p>
                <Button 
                  size="lg" 
                  onClick={goToOptions}
                  className="bg-gradient-earth hover:shadow-glow transition-all duration-300 text-lg px-8 py-3"
                  data-tour="start-analysis"
                >
                  {t('start_analysis')}
                  <Brain className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4" data-tour="features">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('how_ai_helps')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-glow transition-all duration-300">
                <div className="mx-auto w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('soil_analysis')}</h3>
                <p className="text-muted-foreground">
                  {t('soil_analysis_desc')}
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-glow transition-all duration-300">
                <div className="mx-auto w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('ai_predictions')}</h3>
                <p className="text-muted-foreground">
                  {t('ai_predictions_desc')}
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-glow transition-all duration-300">
                <div className="mx-auto w-16 h-16 bg-gradient-field rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('market_insights')}</h3>
                <p className="text-muted-foreground">
                  {t('market_insights_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <OnboardingTour />
      </div>
    );
  }

  if (currentStep === "options") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="absolute top-4 right-4">
            <LanguageSelector />
          </div>
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={resetToWelcome}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('back')}
            </Button>
          </div>
          
          <OptionSelector 
            onSelectAutomatic={() => setCurrentStep("automatic")}
            onSelectManual={() => setCurrentStep("manual")}
          />
        </div>
      </div>
    );
  }

  if (currentStep === "automatic") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="absolute top-4 right-4">
            <LanguageSelector />
          </div>
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep("options")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('back')}
            </Button>
            <h1 className="text-3xl font-bold">{t('automatic_location_detection')}</h1>
          </div>
          
          <LocationDetectionForm 
            onSubmit={handleLocationSubmit} 
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  if (currentStep === "manual") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="absolute top-4 right-4">
            <LanguageSelector />
          </div>
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep("options")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('back')}
            </Button>
            <h1 className="text-3xl font-bold">{t('farm_analysis')}</h1>
          </div>
          
          <CropRecommendationForm 
            onSubmit={handleFormSubmit} 
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep("options")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('new_analysis')}
            </Button>
            <h1 className="text-3xl font-bold">{t('crop_recommendations')}</h1>
          </div>
          
          {results && formData && (
            <div className="flex items-center gap-2">
              <SaveAnalysisButton formData={formData} results={results} />
              <ExportButton formData={formData} results={results} type="print" />
              <ExportButton formData={formData} results={results} type="pdf" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComparison(!showComparison)}
                className="gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                {showComparison ? t('hide_comparison') : t('show_comparison')}
              </Button>
            </div>
          )}
        </div>
        
        {results && (
          <div className="space-y-8">
            {showComparison && (
              <CropComparisonChart recommendations={results.recommendations} />
            )}
            
            <CropRecommendations 
              recommendations={results.recommendations}
              weatherData={results.weatherData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
