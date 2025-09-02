import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

interface ExportButtonProps {
  formData: any;
  results: any;
  type: 'pdf' | 'print';
}

export const ExportButton = ({ formData, results, type }: ExportButtonProps) => {
  const handleExport = () => {
    if (type === 'print') {
      // Create a print-friendly version
      const printContent = createPrintContent(formData, results);
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.onload = () => {
          printWindow.print();
          printWindow.close();
        };
        toast.success('Print dialog opened');
      }
    } else {
      // For PDF, we'll use the browser's print to PDF feature
      const printContent = createPrintContent(formData, results);
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        toast.success('Use Ctrl+P or Cmd+P to save as PDF');
      }
    }
  };

  const createPrintContent = (formData: any, results: any) => {
    const date = new Date().toLocaleDateString();
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Crop Recommendation Report - ${formData.location}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #22c55e;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #166534;
              margin: 0;
            }
            .section {
              margin-bottom: 30px;
            }
            .section h2 {
              color: #166534;
              border-left: 4px solid #22c55e;
              padding-left: 10px;
            }
            .farm-details {
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .crop-recommendation {
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 15px;
              margin-bottom: 15px;
            }
            .crop-name {
              font-size: 18px;
              font-weight: bold;
              color: #166534;
            }
            .confidence {
              background: #22c55e;
              color: white;
              padding: 2px 8px;
              border-radius: 4px;
              font-size: 12px;
            }
            .metrics {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              margin: 10px 0;
            }
            .metric {
              background: #f1f5f9;
              padding: 8px;
              border-radius: 4px;
            }
            .pros-cons {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-top: 10px;
            }
            .pros, .cons {
              font-size: 14px;
            }
            .pros h4 {
              color: #059669;
            }
            .cons h4 {
              color: #dc2626;
            }
            ul {
              margin: 5px 0;
              padding-left: 20px;
            }
            @media print {
              body { margin: 0; }
              .header { page-break-after: avoid; }
              .crop-recommendation { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🌾 Smart Crop Recommendation Report</h1>
            <p>Generated on ${date} for ${formData.location}</p>
          </div>

          <div class="section">
            <h2>📍 Farm Details</h2>
            <div class="farm-details">
              <p><strong>Location:</strong> ${formData.location}</p>
              <p><strong>Soil Type:</strong> ${formData.soilType}</p>
              <p><strong>Soil pH:</strong> ${formData.pH}</p>
              <p><strong>Nutrients:</strong> N: ${formData.nitrogen}mg/kg, P: ${formData.phosphorus}mg/kg, K: ${formData.potassium}mg/kg</p>
              <p><strong>Climate:</strong> ${formData.temperature}°C, ${formData.humidity}% humidity, ${formData.rainfall}mm rainfall</p>
            </div>
          </div>

          <div class="section">
            <h2>🌱 Recommended Crops</h2>
            ${results.recommendations.map((crop: any, index: number) => `
              <div class="crop-recommendation">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span class="crop-name">${index + 1}. ${crop.name}</span>
                  <span class="confidence">${crop.confidence}% Confidence</span>
                </div>
                
                <div class="metrics">
                  <div class="metric">
                    <strong>Expected Yield:</strong> ${crop.expectedYield}
                  </div>
                  <div class="metric">
                    <strong>Market Price:</strong> ${crop.marketPrice}
                  </div>
                  <div class="metric">
                    <strong>Season:</strong> ${crop.season}
                  </div>
                  <div class="metric">
                    <strong>Duration:</strong> ${crop.duration}
                  </div>
                </div>

                <div class="pros-cons">
                  <div class="pros">
                    <h4>✓ Advantages:</h4>
                    <ul>
                      ${crop.pros.map((pro: string) => `<li>${pro}</li>`).join('')}
                    </ul>
                  </div>
                  <div class="cons">
                    <h4>⚠ Considerations:</h4>
                    <ul>
                      ${crop.cons.map((con: string) => `<li>${con}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <h2>📊 Weather Analysis</h2>
            <div class="farm-details">
              <p><strong>Temperature:</strong> ${results.weatherData.temperature}°C</p>
              <p><strong>Humidity:</strong> ${results.weatherData.humidity}%</p>
              <p><strong>Annual Rainfall:</strong> ${results.weatherData.rainfall}mm</p>
            </div>
          </div>

          <footer style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #6b7280; font-size: 12px;">
            Generated by Smart Crop Recommendation System | AI-Powered Agricultural Insights
          </footer>
        </body>
      </html>
    `;
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {type === 'print' ? (
        <>
          <Printer className="h-4 w-4" />
          Print Report
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Export PDF
        </>
      )}
    </Button>
  );
};