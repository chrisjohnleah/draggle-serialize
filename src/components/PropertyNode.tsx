
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PhpProperty, useSerializer } from '@/context/SerializerContext';
import { ChevronDownIcon, ChevronRightIcon, GripIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyNodeProps {
  property: PhpProperty;
  depth?: number;
}

const PropertyNode: React.FC<PropertyNodeProps> = ({ property, depth = 0 }) => {
  const { updateProperty, moveProperty, collapseProperty } = useSerializer();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'PROPERTY',
    item: { id: property.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'PROPERTY',
    hover(item: { id: string }, monitor) {
      if (!ref.current) return;
      
      const dragId = item.id;
      const hoverId = property.id;
      
      // Don't replace items with themselves
      if (dragId === hoverId) {
        return;
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      moveProperty(dragId, hoverId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleToggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    collapseProperty(property.id);
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'string':
        return 'php-string';
      case 'number':
        return 'php-number';
      case 'boolean':
        return 'php-boolean';
      case 'null':
        return 'php-null';
      case 'array':
        return 'php-array';
      case 'object':
        return 'php-object';
      default:
        return '';
    }
  };

  const renderPropertyValue = () => {
    switch (property.type) {
      case 'string':
        return <span className="php-string">"{property.value}"</span>;
      case 'number':
        return <span className="php-number">{property.value}</span>;
      case 'boolean':
        return <span className="php-boolean">{property.value ? 'true' : 'false'}</span>;
      case 'null':
        return <span className="php-null">null</span>;
      case 'array':
      case 'object':
        return <span className={getTypeColor(property.type)}>{property.value}</span>;
      default:
        return <span>{String(property.value)}</span>;
    }
  };

  drag(drop(ref));

  return (
    <div 
      ref={dragPreview}
      className={cn(
        "animate-fade-in transition-all",
        isDragging && "opacity-50"
      )}
      style={{ marginLeft: `${depth * 20}px` }}
    >
      <div 
        ref={ref}
        className={cn(
          "property-node group flex items-center mb-1 transition-all border",
          isDragging ? "property-node-dragging" : "",
          isOver ? "bg-blue-50" : "bg-white",
          (property.type === 'array' || property.type === 'object') && "font-medium"
        )}
      >
        <div 
          ref={drag}
          className="drag-handle p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripIcon className="h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex-1 flex items-center overflow-hidden">
          {(property.type === 'array' || property.type === 'object') && (
            <button 
              className="flex-shrink-0 p-1 hover:bg-secondary rounded-full"
              onClick={handleToggleCollapse}
            >
              {property.collapsed ? (
                <ChevronRightIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </button>
          )}
          
          <div className="mr-2 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            {property.key}:
          </div>
          
          <div className="font-mono text-sm">{renderPropertyValue()}</div>
        </div>
      </div>
      
      {(property.type === 'array' || property.type === 'object') && 
       property.children && 
       !property.collapsed && (
        <div className="pl-4 border-l border-gray-200 ml-2">
          {property.children.map((child) => (
            <PropertyNode 
              key={child.id} 
              property={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyNode;
