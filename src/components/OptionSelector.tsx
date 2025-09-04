import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Edit3, Zap, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface OptionSelectorProps {
  onSelectAutomatic: () => void;
  onSelectManual: () => void;
}

export const OptionSelector = ({ onSelectAutomatic, onSelectManual }: OptionSelectorProps) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{t('choose_option')}</h2>
        <p className="text-muted-foreground text-lg">
          {t('select_preferred_method')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Automatic Option */}
        <Card className="shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer group"
              onClick={onSelectAutomatic}>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">{t('automatic_recommendations')}</CardTitle>
            <CardDescription className="text-base">
              {t('automatic_detection_description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-green-500" />
                <span>{t('instant_analysis')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>{t('saves_time')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-purple-500" />
                <span>{t('precise_location_data')}</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-gradient-earth hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              {t('use_automatic_detection')}
            </Button>
          </CardContent>
        </Card>

        {/* Manual Option */}
        <Card className="shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer group"
              onClick={onSelectManual}>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Edit3 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">{t('manual_input')}</CardTitle>
            <CardDescription className="text-base">
              {t('manual_input_description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Edit3 className="h-4 w-4 text-orange-500" />
                <span>{t('full_control')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-green-500" />
                <span>{t('no_location_needed')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>{t('custom_parameters')}</span>
              </div>
            </div>
            
            <Button 
              variant="outline"
              className="w-full border-2 hover:bg-accent transition-all duration-300"
              size="lg"
            >
              {t('use_manual_input')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};