import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Check } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

interface SavedAnalysis {
  id: string;
  name: string;
  formData: any;
  results: any;
  createdAt: string;
}

interface SaveAnalysisButtonProps {
  formData: any;
  results: any;
  variant?: 'default' | 'outline' | 'ghost';
}

export const SaveAnalysisButton = ({ formData, results, variant = 'outline' }: SaveAnalysisButtonProps) => {
  const [savedAnalyses, setSavedAnalyses] = useLocalStorage<SavedAnalysis[]>('saved-analyses', []);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    const analysis: SavedAnalysis = {
      id: Date.now().toString(),
      name: `Analysis for ${formData.location}`,
      formData,
      results,
      createdAt: new Date().toISOString(),
    };

    setSavedAnalyses(prev => [analysis, ...prev]);
    setIsSaved(true);
    toast.success('Analysis saved successfully!');
    
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <Button
      onClick={handleSave}
      variant={variant}
      size="sm"
      className="gap-2"
      disabled={isSaved}
    >
      {isSaved ? (
        <>
          <Check className="h-4 w-4" />
          Saved
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save Analysis
        </>
      )}
    </Button>
  );
};