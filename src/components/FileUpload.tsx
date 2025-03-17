
import React, { useRef, useState } from 'react';
import { UploadIcon, FileIcon, ClipboardIcon, FileCodeIcon, AlertCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSerializer } from '@/context/SerializerContext';
import { toast } from '@/components/ui/use-toast';
import { generateExampleData } from '@/utils/phpSerializer';
import { motion } from 'framer-motion';

const FileUpload: React.FC = () => {
  const { setSerializedData, processingError } = useSerializer();
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualInputValue, setManualInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Accept more file types
    const validFileTypes = ['.txt', '.php', '.json', '.serialized', '.ser', '.data'];
    const isValidFileType = validFileTypes.some(type => file.name.toLowerCase().endsWith(type));
    
    if (!isValidFileType) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a file containing serialized PHP data (.txt, .php, .json, .serialized, .ser, .data)",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setSerializedData(content);
      toast({
        title: "File loaded",
        description: `Successfully loaded ${file.name}`,
      });
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
    
    toast({
      title: "Data processed",
      description: "Your serialized data has been loaded successfully.",
    });
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
      
      toast({
        title: "Clipboard content pasted",
        description: "Data from clipboard has been pasted. Click 'Process Data' to continue.",
      });
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
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      
      // Same validation as handleFileChange
      const validFileTypes = ['.txt', '.php', '.json', '.serialized', '.ser', '.data'];
      const isValidFileType = validFileTypes.some(type => file.name.toLowerCase().endsWith(type));
      
      if (!isValidFileType) {
        toast({
          title: "Unsupported file type",
          description: "Please upload a file containing serialized PHP data (.txt, .php, .json, .serialized, .ser, .data)",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSerializedData(content);
        toast({
          title: "File loaded",
          description: `Successfully loaded ${file.name}`,
        });
      };
      reader.onerror = () => {
        toast({
          title: "Error reading file",
          description: "There was a problem reading the uploaded file.",
          variant: "destructive"
        });
      };
      reader.readAsText(file);
    }
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
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Textarea 
              placeholder="Paste your serialized PHP data here..." 
              value={manualInputValue}
              onChange={(e) => setManualInputValue(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex items-center gap-2">
              <Button 
                onClick={handleManualInputSubmit}
                className="transition-all hover:scale-105"
              >
                Process Data
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsManualInput(false)}
                className="transition-all hover:scale-105"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
                isDragging 
                  ? 'border-primary bg-primary/10' 
                  : 'hover:bg-secondary/50 hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".txt,.php,.json,.serialized,.ser,.data"
              />
              <motion.div
                animate={{ y: isDragging ? -5 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <UploadIcon className="h-8 w-8 text-muted-foreground mb-3" />
              </motion.div>
              <p className="text-sm font-medium">Upload File</p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag and drop or click to upload (.txt, .php, .json, etc.)
              </p>
            </motion.div>
            
            <motion.div 
              onClick={() => setIsManualInput(true)}
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg hover:bg-secondary/50 hover:border-primary/50 cursor-pointer transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileCodeIcon className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Manual Input</p>
              <p className="text-xs text-muted-foreground mt-1">Type or paste serialized data</p>
            </motion.div>
            
            <motion.div 
              onClick={handlePaste}
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg hover:bg-secondary/50 hover:border-primary/50 cursor-pointer transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ClipboardIcon className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Paste from Clipboard</p>
              <p className="text-xs text-muted-foreground mt-1">Paste serialized data from clipboard</p>
            </motion.div>
          </div>
        )}
        
        {processingError && (
          <motion.div 
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm overflow-auto max-h-[300px]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-2 mb-2">
              <AlertCircleIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <h3 className="font-medium">Error Parsing PHP Serialized Data</h3>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-xs mt-2">{processingError}</pre>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadExampleData} 
            className="text-xs transition-colors hover:bg-secondary"
          >
            <FileIcon className="h-3 w-3 mr-1" />
            Load Example
          </Button>
        </motion.div>
        <p className="text-xs text-muted-foreground">
          Serialized PHP data will be processed entirely in your browser.
        </p>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
