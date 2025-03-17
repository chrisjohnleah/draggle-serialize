
import React from 'react';
import { SerializerProvider } from '@/context/SerializerContext';
import Navbar from '@/components/Navbar';
import FileUpload from '@/components/FileUpload';
import SerializedView from '@/components/SerializedView';
import ExportPanel from '@/components/ExportPanel';
import { motion } from 'framer-motion';

const Index = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <SerializerProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-purple-50/20 to-gray-100">
        <Navbar />
        
        <motion.main 
          className="flex-1 container mx-auto px-4 py-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div 
              className="mb-8 text-center"
              variants={fadeInUp}
              custom={1}
            >
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
                PHP Serialization Visualizer
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visualize, modify, and export PHP serialized data with an intuitive drag-and-drop interface.
                All processing happens in your browser.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} custom={2}>
              <FileUpload />
            </motion.div>
            
            <motion.div variants={fadeInUp} custom={3} className="pt-2">
              <SerializedView />
            </motion.div>
            
            <motion.div variants={fadeInUp} custom={4} className="pt-2">
              <ExportPanel />
            </motion.div>
          </div>
        </motion.main>
        
        <motion.footer 
          className="border-t py-6 bg-white/80 backdrop-blur-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>PHP Serialization Visualizer - Frontend Tool</p>
            <p className="text-xs mt-1">All data processing happens in your browser. No server processing required.</p>
          </div>
        </motion.footer>
      </div>
    </SerializerProvider>
  );
};

export default Index;
