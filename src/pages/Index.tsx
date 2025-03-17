
import React from 'react';
import { SerializerProvider } from '@/context/SerializerContext';
import Navbar from '@/components/Navbar';
import FileUpload from '@/components/FileUpload';
import SerializedView from '@/components/SerializedView';
import ExportPanel from '@/components/ExportPanel';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <SerializerProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        
        <motion.main 
          className="flex-1 container mx-auto px-4 py-8 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-2">PHP Serialization Visualizer</h1>
              <p className="text-muted-foreground">
                Visualize, modify, and export PHP serialized data with an intuitive drag-and-drop interface.
              </p>
            </div>
            
            <FileUpload />
            <SerializedView />
            <ExportPanel />
          </div>
        </motion.main>
        
        <footer className="border-t py-6 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>PHP Serialization Visualizer - Frontend Tool</p>
            <p className="text-xs mt-1">All data processing happens in your browser. No server processing required.</p>
          </div>
        </footer>
      </div>
    </SerializerProvider>
  );
};

export default Index;
