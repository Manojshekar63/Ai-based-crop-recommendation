import { useState } from "react";
import { CropRecommendationForm } from "@/components/CropRecommendationForm";
import { CropRecommendations } from "@/components/CropRecommendations";
import { generateCropRecommendations } from "@/utils/cropRecommendation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf, Brain, BarChart3 } from "lucide-react";
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
  const [currentStep, setCurrentStep] = useState<"welcome" | "form" | "results">("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const recommendations = generateCropRecommendations(formData);
      setResults(recommendations);
      setCurrentStep("results");
      setIsLoading(false);
    }, 2000);
  };

  const resetToWelcome = () => {
    setCurrentStep("welcome");
    setResults(null);
  };

  if (currentStep === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
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
                  Smart Crop Recommendations
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  AI-powered insights for modern farmers. Get personalized crop recommendations 
                  based on your soil conditions, climate, and market trends.
                </p>
                <Button 
                  size="lg" 
                  onClick={() => setCurrentStep("form")}
                  className="bg-gradient-earth hover:shadow-glow transition-all duration-300 text-lg px-8 py-3"
                >
                  Start Analysis
                  <Brain className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How Our AI Helps You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-glow transition-all duration-300">
                <div className="mx-auto w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Soil Analysis</h3>
                <p className="text-muted-foreground">
                  Analyze soil pH, nutrients (NPK), and composition to match optimal crop requirements
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-glow transition-all duration-300">
                <div className="mx-auto w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Predictions</h3>
                <p className="text-muted-foreground">
                  Machine learning algorithms analyze weather patterns and predict best crop matches
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-glow transition-all duration-300">
                <div className="mx-auto w-16 h-16 bg-gradient-field rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Market Insights</h3>
                <p className="text-muted-foreground">
                  Real-time market prices and profitability analysis for informed decision making
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={resetToWelcome}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Farm Analysis</h1>
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
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep("form")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            New Analysis
          </Button>
          <h1 className="text-3xl font-bold">Crop Recommendations</h1>
        </div>
        
        {results && (
          <CropRecommendations 
            recommendations={results.recommendations}
            weatherData={results.weatherData}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
