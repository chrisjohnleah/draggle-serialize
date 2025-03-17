
import React, { useRef, useState } from 'react';
import { UploadIcon, FileIcon, PasteIcon, FileCodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSerializer } from '@/context/SerializerContext';
import { toast } from '@/components/ui/use-toast';
import { generateExampleData } from '@/utils/phpSerializer';

const FileUpload: React.FC = () => {
  const { setSerializedData, processingError } = useSerializer();
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualInputValue, setManualInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.name.endsWith('.txt') && !file.name.endsWith('.php')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt or .php file containing serialized PHP data.",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setSerializedData(content);
    };
    reader.onerror = () => {
      toast({
        title: "Error reading file",
        description: "There was a problem reading the uploaded file.",
        variant: "destructive"
      });
    };
    reader.readAsText(file);
  };

  const handleManualInputSubmit = () => {
    if (!manualInputValue.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter serialized PHP data.",
        variant: "destructive"
      });
      return;
    }
    
    setSerializedData(manualInputValue);
    setIsManualInput(false);
    setManualInputValue('');
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (!clipboardText.trim()) {
        toast({
          title: "Empty clipboard",
          description: "The clipboard does not contain any text.",
          variant: "destructive"
        });
        return;
      }
      setManualInputValue(clipboardText);
      setIsManualInput(true);
    } catch (error) {
      toast({
        title: "Clipboard access denied",
        description: "Unable to access clipboard. Please paste manually.",
        variant: "destructive"
      });
    }
  };

  const loadExampleData = () => {
    const example = generateExampleData();
    setSerializedData(example);
    toast({
      title: "Example data loaded",
      description: "Example serialized PHP data has been loaded successfully.",
    });
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Import PHP Serialized Data</CardTitle>
        <CardDescription>
          Upload a file or paste serialized PHP data to visualize and modify its structure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isManualInput ? (
          <div className="space-y-4">
            <Textarea 
              placeholder="Paste your serialized PHP data here..." 
              value={manualInputValue}
              onChange={(e) => setManualInputValue(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex items-center gap-2">
              <Button onClick={handleManualInputSubmit}>Process Data</Button>
              <Button variant="outline" onClick={() => setIsManualInput(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors animate-fade-in"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".txt,.php"
              />
              <UploadIcon className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Upload File</p>
              <p className="text-xs text-muted-foreground mt-1">Drag and drop or click to upload</p>
            </div>
            
            <div 
              onClick={() => setIsManualInput(true)}
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors animate-fade-in"
            >
              <FileCodeIcon className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Manual Input</p>
              <p className="text-xs text-muted-foreground mt-1">Type or paste serialized data</p>
            </div>
            
            <div 
              onClick={handlePaste}
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors animate-fade-in"
            >
              <PasteIcon className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Paste from Clipboard</p>
              <p className="text-xs text-muted-foreground mt-1">Paste serialized data from clipboard</p>
            </div>
          </div>
        )}
        
        {processingError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {processingError}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={loadExampleData} className="text-xs">
          <FileIcon className="h-3 w-3 mr-1" />
          Load Example
        </Button>
        <p className="text-xs text-muted-foreground">
          Serialized PHP data will be processed entirely in your browser.
        </p>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
