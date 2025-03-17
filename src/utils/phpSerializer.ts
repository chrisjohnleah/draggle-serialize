
import { PhpDataType, PhpProperty } from '@/context/SerializerContext';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate unique IDs for each property
const generateId = () => uuidv4();

// Parse a serialized PHP string into a structured format
export const deserializePhp = (serializedData: string): PhpProperty[] => {
  try {
    // Trim the input data to remove any leading/trailing whitespace
    const trimmedData = serializedData.trim();
    
    // Basic format validation
    if (!trimmedData) {
      throw new Error("Empty input. PHP serialized data is required.");
    }
    
    // Check for basic PHP serialized format patterns
    const validStartPatterns = /^(a|O|s|i|b|N|d):/;
    if (!validStartPatterns.test(trimmedData)) {
      throw new Error(
        "Invalid PHP serialized format. Data should start with a type identifier (a:, O:, s:, i:, b:, N;, d:)." +
        "\nExample of valid format: a:2:{i:0;s:5:\"hello\";i:1;i:42;}"
      );
    }
    
    // Check for common syntax errors
    if ((trimmedData.match(/{/g) || []).length !== (trimmedData.match(/}/g) || []).length) {
      throw new Error("Mismatched curly braces. Check your array/object declarations.");
    }
    
    if ((trimmedData.match(/"/g) || []).length % 2 !== 0) {
      throw new Error("Mismatched quotes. Check your string declarations.");
    }
    
    // For arrays, validate the count matches the declared size
    if (trimmedData.startsWith('a:')) {
      const arraySizeMatch = trimmedData.match(/^a:(\d+):/);
      if (arraySizeMatch) {
        const declaredSize = parseInt(arraySizeMatch[1], 10);
        // Count the actual number of elements (this is a simplified check)
        const estimatedElementCount = (trimmedData.match(/;[^;]*;/g) || []).length;
        
        if (declaredSize > 0 && estimatedElementCount === 0) {
          throw new Error(
            `Array declares size ${declaredSize} but appears to be empty or improperly formatted.`
          );
        }
      }
    }
    
    return parsePhpValue(trimmedData, null);
  } catch (error) {
    if (error instanceof Error) {
      console.error('PHP Parser Error:', error.message);
      // Re-throw with more context
      throw new Error(`PHP Serialization Error: ${error.message}`);
    }
    throw error;
  }
};

// Helper function to parse PHP values recursively
const parsePhpValue = (data: string, parentId: string | null): PhpProperty[] => {
  const result: PhpProperty[] = [];

  // Simple mock parser for demonstration
  // In a real implementation, this would properly parse PHP serialized format
  if (data.startsWith('a:')) {
    // Array
    const arrayMatch = data.match(/^a:(\d+):\{(.+)\}$/);
    if (arrayMatch) {
      const count = parseInt(arrayMatch[1], 10);
      const arrayContents = arrayMatch[2];
      
      const arrayId = generateId();
      const arrayProp: PhpProperty = {
        id: arrayId,
        key: 'array',
        value: `Array(${count})`,
        type: 'array',
        parentId,
        children: []
      };
      
      // Mock children for demonstration
      for (let i = 0; i < count; i++) {
        const childId = generateId();
        arrayProp.children!.push({
          id: childId,
          key: i.toString(),
          value: `Item ${i}`,
          type: getRandomType(),
          parentId: arrayId
        });
      }
      
      result.push(arrayProp);
    }
  } else if (data.startsWith('O:')) {
    // Object
    const objectMatch = data.match(/^O:(\d+):"([^"]+)":(\d+):\{(.+)\}$/);
    if (objectMatch) {
      const className = objectMatch[2];
      const count = parseInt(objectMatch[3], 10);
      
      const objectId = generateId();
      const objectProp: PhpProperty = {
        id: objectId,
        key: 'object',
        value: `${className}(${count})`,
        type: 'object',
        parentId,
        children: []
      };
      
      // Mock children for demonstration
      for (let i = 0; i < count; i++) {
        const childId = generateId();
        objectProp.children!.push({
          id: childId,
          key: `property_${i}`,
          value: `Property ${i}`,
          type: getRandomType(),
          parentId: objectId
        });
      }
      
      result.push(objectProp);
    }
  } else if (data.startsWith('s:')) {
    // String
    const stringMatch = data.match(/^s:(\d+):"([^"]*)";$/);
    if (stringMatch) {
      const stringValue = stringMatch[2];
      result.push({
        id: generateId(),
        key: 'string',
        value: stringValue,
        type: 'string',
        parentId
      });
    }
  } else if (data.startsWith('i:')) {
    // Integer
    const intMatch = data.match(/^i:(\d+);$/);
    if (intMatch) {
      const intValue = parseInt(intMatch[1], 10);
      result.push({
        id: generateId(),
        key: 'integer',
        value: intValue,
        type: 'number',
        parentId
      });
    }
  } else if (data.startsWith('b:')) {
    // Boolean
    const boolMatch = data.match(/^b:([01]);$/);
    if (boolMatch) {
      const boolValue = boolMatch[1] === '1';
      result.push({
        id: generateId(),
        key: 'boolean',
        value: boolValue,
        type: 'boolean',
        parentId
      });
    }
  } else if (data.startsWith('N;')) {
    // Null
    result.push({
      id: generateId(),
      key: 'null',
      value: null,
      type: 'null',
      parentId
    });
  } else if (data.startsWith('d:')) {
    // Float/Double
    const floatMatch = data.match(/^d:([0-9.]+);$/);
    if (floatMatch) {
      const floatValue = parseFloat(floatMatch[1]);
      result.push({
        id: generateId(),
        key: 'double',
        value: floatValue,
        type: 'number',
        parentId
      });
    }
  }

  return result;
};

// Helper function to get a random type for mock data
const getRandomType = (): PhpDataType => {
  const types: PhpDataType[] = ['string', 'number', 'boolean', 'null'];
  return types[Math.floor(Math.random() * types.length)];
};

// Convert the structured format back to a serialized PHP string
export const serializePhp = (properties: PhpProperty[]): string => {
  // Mock implementation for demonstration purposes
  try {
    if (properties.length === 0) return '';
    
    // For demonstration, we'll create some fake serialized data
    if (properties[0].type === 'array') {
      const childCount = properties[0].children?.length || 0;
      return `a:${childCount}:{${properties[0].children?.map((child, index) => {
        return `i:${index};s:${child.value.length}:"${child.value}";`;
      }).join('')}}`;
    } else if (properties[0].type === 'object') {
      const className = properties[0].value.split('(')[0];
      const childCount = properties[0].children?.length || 0;
      return `O:${className.length}:"${className}":${childCount}:{${properties[0].children?.map((child, index) => {
        return `s:${child.key.length}:"${child.key}";s:${child.value.length}:"${child.value}";`;
      }).join('')}}`;
    } else if (properties[0].type === 'string') {
      return `s:${properties[0].value.length}:"${properties[0].value}";`;
    } else if (properties[0].type === 'number') {
      if (Number.isInteger(properties[0].value)) {
        return `i:${properties[0].value};`;
      } else {
        return `d:${properties[0].value};`;
      }
    } else if (properties[0].type === 'boolean') {
      return `b:${properties[0].value ? '1' : '0'};`;
    } else if (properties[0].type === 'null') {
      return 'N;';
    }
    
    return '';
  } catch (error) {
    console.error('Error serializing to PHP format:', error);
    throw error;
  }
};

// Generate example PHP serialized data for testing
export const generateExampleData = (): string => {
  // This is a simplified example
  return 'a:3:{i:0;s:5:"Hello";i:1;i:42;i:2;a:2:{i:0;s:5:"World";i:1;b:1;}}';
};

// Parse PHP example for the demo
export const parsePhpExample = (): PhpProperty[] => {
  const rootId = generateId();
  
  return [
    {
      id: rootId,
      key: 'array',
      value: 'Array(3)',
      type: 'array',
      parentId: null,
      children: [
        {
          id: generateId(),
          key: '0',
          value: 'Hello',
          type: 'string',
          parentId: rootId
        },
        {
          id: generateId(),
          key: '1',
          value: 42,
          type: 'number',
          parentId: rootId
        },
        {
          id: generateId(),
          key: '2',
          value: 'Array(2)',
          type: 'array',
          parentId: rootId,
          children: [
            {
              id: generateId(),
              key: '0',
              value: 'World',
              type: 'string',
              parentId: rootId
            },
            {
              id: generateId(),
              key: '1',
              value: true,
              type: 'boolean',
              parentId: rootId
            }
          ]
        }
      ]
    }
  ];
};
