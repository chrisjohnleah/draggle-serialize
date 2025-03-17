
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSerializer } from '@/context/SerializerContext';
import PropertyNode from './PropertyNode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { Code2Icon, DownloadIcon, RefreshCwIcon } from 'lucide-react';

const SerializedView: React.FC = () => {
  const { parsedData, isProcessing, exportData } = useSerializer();

  const handleExport = () => {
    const serialized = exportData();
    if (serialized) {
      navigator.clipboard.writeText(serialized).then(
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
    }
  };

  const handleDownload = () => {
    const serialized = exportData();
    if (serialized) {
      const blob = new Blob([serialized], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'serialized-php-data.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (parsedData.length === 0 && !isProcessing) {
    return null;
  }

  return (
    <Card className="w-full mb-8 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">PHP Serialized Structure</CardTitle>
        <CardDescription>
          Drag and drop properties to reorganize the structure. Changes are synchronized automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="serialized-container bg-gray-50 p-4 rounded-lg overflow-auto mb-4">
          {isProcessing ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-4/5" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          ) : (
            <DndProvider backend={HTML5Backend}>
              <div className="pb-2">
                {parsedData.map((property) => (
                  <PropertyNode key={property.id} property={property} />
                ))}
              </div>
            </DndProvider>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="default" onClick={handleExport}>
            <Code2Icon className="h-4 w-4 mr-2" />
            Copy Serialized
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <RefreshCwIcon className="h-4 w-4 mr-1" />
          Reset Structure
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SerializedView;
