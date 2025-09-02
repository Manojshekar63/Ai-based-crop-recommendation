import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface TourStep {
  id: string;
  title: string;
  content: string;
  targetSelector?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: '🌾 Welcome to Smart Crop Recommendations!',
    content: 'Get AI-powered crop suggestions based on your soil conditions, climate, and market trends. Let\'s take a quick tour!',
    position: 'center'
  },
  {
    id: 'hero-button',
    title: '🚀 Start Your Analysis',
    content: 'Click "Start Analysis" to begin entering your farm details and get personalized crop recommendations.',
    targetSelector: '[data-tour="start-analysis"]',
    position: 'bottom'
  },
  {
    id: 'features',
    title: '✨ Powerful Features',
    content: 'Our AI analyzes soil composition, weather patterns, and market data to give you the best crop recommendations.',
    targetSelector: '[data-tour="features"]',
    position: 'top'
  },
  {
    id: 'navigation',
    title: '📊 Dashboard Access',
    content: 'Access your saved analyses and track your farming decisions over time from the dashboard.',
    targetSelector: '[data-tour="dashboard"]',
    position: 'bottom'
  }
];

export const OnboardingTour = () => {
  const [hasSeenTour, setHasSeenTour] = useLocalStorage('has-seen-tour', false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasSeenTour) {
      // Small delay to ensure DOM is ready
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, [hasSeenTour]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setHasSeenTour(true);
    setIsVisible(false);
  };

  const handleSkip = () => {
    setHasSeenTour(true);
    setIsVisible(false);
  };

  if (!isVisible || hasSeenTour) {
    return null;
  }

  const currentStepData = tourSteps[currentStep];
  const isCenter = currentStepData.position === 'center';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      {/* Spotlight effect */}
      {currentStepData.targetSelector && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute bg-white/10 rounded-lg border-2 border-primary/50 shadow-glow animate-pulse"
            style={{
              // This would need to be calculated based on the target element's position
              // For now, we'll just show the tour without spotlight
            }}
          />
        </div>
      )}

      {/* Tour Card */}
      <div 
        className={`fixed ${
          isCenter 
            ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' 
            : 'top-20 left-1/2 transform -translate-x-1/2'
        }`}
      >
        <Card className="w-96 max-w-[90vw] shadow-glow border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {currentStepData.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {currentStepData.content}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Progress indicator */}
              <div className="flex space-x-2">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full flex-1 ${
                      index <= currentStep 
                        ? 'bg-primary' 
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between">
                <div>
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      size="sm"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    size="sm"
                    className="text-muted-foreground"
                  >
                    Skip Tour
                  </Button>
                  <Button
                    onClick={handleNext}
                    size="sm"
                    className="bg-gradient-earth"
                  >
                    {currentStep === tourSteps.length - 1 ? (
                      'Get Started'
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Step counter */}
              <p className="text-center text-sm text-muted-foreground">
                {currentStep + 1} of {tourSteps.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};