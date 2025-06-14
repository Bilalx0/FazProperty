import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx';
import { Loader2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { DashLayout } from '@/components/layout/dash-layout.jsx';

interface ImportResult {
  message: string;
  total: number;
  processed: number;
  errors: number;
  results: Array<{
    reference: string;
    action: 'created' | 'updated';
    id: number;
  }>;
  errorDetails: Array<{
    reference: string;
    error: string;
  }>;
}

export default function ImportProperties() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/import-properties');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to import properties');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Import Properties from XML</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>XML Import Tool</CardTitle>
            <CardDescription>
              Import properties from the XML feed at <code>https://zoho.nordstern.ae/property_finder.xml</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This tool will fetch property data from the XML feed, parse it, and import it into the database.
              Existing properties (matched by reference) will be updated, and new properties will be created.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleImport} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Start Import
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Import Completed
              </CardTitle>
              <CardDescription>
                Processed {result.processed} out of {result.total} properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{result.results.filter(r => r.action === 'created').length}</div>
                  <div className="text-sm text-green-600">Created</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{result.results.filter(r => r.action === 'updated').length}</div>
                  <div className="text-sm text-blue-600">Updated</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-700">{result.errors}</div>
                  <div className="text-sm text-red-600">Errors</div>
                </div>
              </div>

              {result.results.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Processed Properties</h3>
                  <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                    {result.results.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <span className="font-medium">{item.reference}</span>
                          <span className="text-gray-500 ml-2">ID: {item.id}</span>
                        </div>
                        <Badge variant={item.action === 'created' ? 'default' : 'secondary'}>
                          {item.action === 'created' ? 'Created' : 'Updated'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.errorDetails.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Errors</h3>
                  <div className="max-h-60 overflow-y-auto border rounded-md p-2 bg-red-50">
                    {result.errorDetails.map((item, index) => (
                      <div key={index} className="py-2 border-b last:border-0">
                        <div className="font-medium">{item.reference}</div>
                        <div className="text-red-600 text-sm">{item.error}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashLayout>
  );
}