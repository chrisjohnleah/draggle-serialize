
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSerializer } from '@/context/SerializerContext';
import { ClipboardCopyIcon, DownloadIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ExportPanel: React.FC = () => {
  const { exportData, parsedData } = useSerializer();
  const [showExport, setShowExport] = useState(false);
  const [serializedOutput, setSerializedOutput] = useState('');

  const handleGenerateExport = () => {
    const data = exportData();
    setSerializedOutput(data);
    setShowExport(true);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(serializedOutput).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: "The serialized PHP data has been copied to your clipboard.",
        });
      },
      () => {
        toast({
          title: "Failed to copy",
          description: "Unable to copy to clipboard. Please try again.",
          variant: "destructive"
        });
      }
    );
  };

  const handleDownload = () => {
    const blob = new Blob([serializedOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'serialized-php-data.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (parsedData.length === 0) {
    return null;
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Export Serialized PHP Data</CardTitle>
        <CardDescription>
          Generate serialized PHP data from the current structure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showExport ? (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowExport(false)}
                className="text-xs flex items-center gap-1"
              >
                <EyeOffIcon className="h-3 w-3" />
                Hide
              </Button>
            </div>
            <Textarea
              value={serializedOutput}
              readOnly
              className="min-h-[120px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={handleCopyToClipboard} className="gap-1">
                <ClipboardCopyIcon className="h-4 w-4" />
                Copy to Clipboard
              </Button>
              <Button variant="outline" onClick={handleDownload} className="gap-1">
                <DownloadIcon className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button onClick={handleGenerateExport} className="gap-1">
              <EyeIcon className="h-4 w-4" />
              Generate Export
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExportPanel;
