import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ArrowLeft, Calendar, MapPin, Trash2, Eye, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface SavedAnalysis {
  id: string;
  name: string;
  formData: any;
  results: any;
  createdAt: string;
}

const Dashboard = () => {
  const [savedAnalyses, setSavedAnalyses] = useLocalStorage<SavedAnalysis[]>('saved-analyses', []);
  const [selectedAnalysis, setSelectedAnalysis] = useState<SavedAnalysis | null>(null);

  const handleDelete = (id: string) => {
    setSavedAnalyses(prev => prev.filter(analysis => analysis.id !== id));
    toast.success('Analysis deleted');
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (selectedAnalysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedAnalysis(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Saved Analysis Details</h1>
          </div>

          {/* Analysis Summary */}
          <Card className="mb-6 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {selectedAnalysis.name}
              </CardTitle>
              <CardDescription>
                Saved on {formatDate(selectedAnalysis.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{selectedAnalysis.formData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Soil Type</p>
                  <p className="font-semibold">{selectedAnalysis.formData.soilType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recommendations</p>
                  <p className="font-semibold">{selectedAnalysis.results.recommendations.length} crops</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedAnalysis.results.recommendations.map((crop: any, index: number) => (
              <Card key={index} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{crop.name}</CardTitle>
                      <CardDescription>
                        AI Confidence: {crop.confidence}%
                      </CardDescription>
                    </div>
                    <Badge variant={crop.profitability === 'High' ? 'default' : 'secondary'}>
                      {crop.profitability} Profit
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Yield:</span>
                      <span className="font-semibold">{crop.expectedYield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Price:</span>
                      <span className="font-semibold">{crop.marketPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Season:</span>
                      <span className="font-semibold">{crop.season}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold">{crop.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">My Farm Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-earth rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{savedAnalyses.length}</p>
                  <p className="text-muted-foreground">Saved Analyses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-sky rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {new Set(savedAnalyses.map(a => a.formData.location)).size}
                  </p>
                  <p className="text-muted-foreground">Locations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-field rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {savedAnalyses.length > 0 ? 
                      Math.ceil((Date.now() - new Date(savedAnalyses[savedAnalyses.length - 1].createdAt).getTime()) / (1000 * 60 * 60 * 24))
                      : 0
                    }
                  </p>
                  <p className="text-muted-foreground">Days Since First</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Analyses */}
        {savedAnalyses.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="py-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Saved Analyses</h3>
              <p className="text-muted-foreground mb-4">
                Start by creating your first crop recommendation analysis
              </p>
              <Link to="/">
                <Button className="bg-gradient-earth">
                  Start Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Saved Analyses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedAnalyses.map((analysis) => (
                <Card key={analysis.id} className="shadow-soft hover:shadow-glow transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-start justify-between">
                      <span className="truncate">{analysis.name}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(analysis.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Soil:</span>
                        <span>{analysis.formData.soilType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">pH:</span>
                        <span>{analysis.formData.pH}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Crops:</span>
                        <span>{analysis.results.recommendations.length} recommendations</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAnalysis(analysis)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(analysis.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;