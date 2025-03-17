
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';
import { deserializePhp, serializePhp } from '@/utils/phpSerializer';

export type PhpDataType = 'string' | 'number' | 'boolean' | 'null' | 'array' | 'object';

export interface PhpProperty {
  id: string;
  key: string;
  value: any;
  type: PhpDataType;
  parentId: string | null;
  children?: PhpProperty[];
  collapsed?: boolean;
}

interface SerializerContextType {
  serializedData: string;
  parsedData: PhpProperty[];
  isProcessing: boolean;
  processingError: string | null;
  setSerializedData: (data: string) => void;
  updateProperty: (id: string, updates: Partial<PhpProperty>) => void;
  moveProperty: (dragId: string, hoverId: string) => void;
  collapseProperty: (id: string) => void;
  exportData: () => string;
  resetData: () => void;
}

const SerializerContext = createContext<SerializerContextType | undefined>(undefined);

export const useSerializer = () => {
  const context = useContext(SerializerContext);
  if (!context) {
    throw new Error('useSerializer must be used within a SerializerProvider');
  }
  return context;
};

export const SerializerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [serializedData, setSerializedData] = useState<string>('');
  const [parsedData, setParsedData] = useState<PhpProperty[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingError, setProcessingError] = useState<string | null>(null);

  const processSerializedData = (data: string) => {
    if (!data.trim()) {
      setParsedData([]);
      setProcessingError(null);
      return;
    }

    setIsProcessing(true);
    setProcessingError(null);

    try {
      const parsed = deserializePhp(data);
      setParsedData(parsed);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error parsing PHP serialized data:', error);
      
      // Enhanced error message with more details
      let errorMessage = 'Invalid PHP serialized data format.';
      
      if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
      }
      
      // Add more specific validation guidance
      errorMessage += '\n\nCommon issues:';
      errorMessage += '\n• Incorrect format - PHP serialized data should start with a type identifier (a:, O:, s:, i:, etc.)';
      errorMessage += '\n• Missing quotes or semicolons';
      errorMessage += '\n• Mismatched array or object counts';
      errorMessage += '\n• Invalid character encoding';
      
      setProcessingError(errorMessage);
      setParsedData([]);
      setIsProcessing(false);
      
      toast({
        title: "Error parsing data",
        description: "The provided PHP serialized data is invalid. Check the error details below.",
        variant: "destructive"
      });
    }
  };

  const handleSetSerializedData = (data: string) => {
    setSerializedData(data);
    processSerializedData(data);
  };

  const findProperty = (
    properties: PhpProperty[],
    id: string
  ): [PhpProperty | null, PhpProperty[] | null, number] => {
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].id === id) {
        return [properties[i], properties, i];
      }

      if (properties[i].children) {
        const [found, parent, index] = findProperty(properties[i].children!, id);
        if (found) return [found, parent, index];
      }
    }

    return [null, null, -1];
  };

  const updateProperty = (id: string, updates: Partial<PhpProperty>) => {
    setParsedData(prevData => {
      const newData = [...prevData];
      const [property, parent, index] = findProperty(newData, id);
      
      if (property && parent) {
        parent[index] = { ...property, ...updates };
      }
      
      return newData;
    });
  };

  const moveProperty = (dragId: string, hoverId: string) => {
    if (dragId === hoverId) return;

    setParsedData(prevData => {
      const newData = [...prevData];
      
      const [dragItem, dragParent, dragIndex] = findProperty(newData, dragId);
      const [hoverItem, hoverParent, hoverIndex] = findProperty(newData, hoverId);
      
      if (dragItem && dragParent && hoverItem && hoverParent) {
        // Check if moving within the same parent
        if (dragParent === hoverParent) {
          // Remove the drag item
          const [removed] = dragParent.splice(dragIndex, 1);
          // Insert at the new position
          dragParent.splice(hoverIndex, 0, removed);
        }
      }
      
      return newData;
    });
  };

  const collapseProperty = (id: string) => {
    setParsedData(prevData => {
      const newData = [...prevData];
      const [property, parent, index] = findProperty(newData, id);
      
      if (property && parent && (property.type === 'array' || property.type === 'object')) {
        parent[index] = { 
          ...property, 
          collapsed: !property.collapsed 
        };
      }
      
      return newData;
    });
  };

  const exportData = () => {
    try {
      return serializePhp(parsedData);
    } catch (error) {
      console.error('Error serializing data:', error);
      toast({
        title: "Error exporting data",
        description: "Unable to convert the current structure back to PHP serialized format.",
        variant: "destructive"
      });
      return '';
    }
  };

  const resetData = () => {
    setSerializedData('');
    setParsedData([]);
    setProcessingError(null);
  };

  const value = {
    serializedData,
    parsedData,
    isProcessing,
    processingError,
    setSerializedData: handleSetSerializedData,
    updateProperty,
    moveProperty,
    collapseProperty,
    exportData,
    resetData
  };

  return (
    <SerializerContext.Provider value={value}>
      {children}
    </SerializerContext.Provider>
  );
};
