import React from 'react';
import { SerializerProvider } from '@/context/SerializerContext';
import Navbar from '@/components/Navbar';
import FileUpload from '@/components/FileUpload';
import SerializedView from '@/components/SerializedView';
import ExportPanel from '@/components/ExportPanel';
import { motion } from 'framer-motion';
import { InfoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24
      }
    }
  };

  return (
    <SerializerProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-purple-50/20 to-gray-100">
        <Navbar />
        
        <motion.main 
          className="flex-1 container mx-auto px-4 py-6"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div 
              className="mb-6 text-center"
              variants={item}
            >
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                PHP Serialization Visualizer
              </motion.h1>
              <motion.p 
                className="text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Visualize, modify, and export PHP serialized data with an intuitive drag-and-drop interface.
                All processing happens in your browser.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-3"
              >
                <Link 
                  to="/help"
                  className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <InfoIcon className="h-4 w-4 mr-1" />
                  Need help? Check out our documentation
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div variants={item} className="hover:shadow-purple transition-all duration-300">
              <FileUpload />
            </motion.div>
            
            <motion.div variants={item} className="pt-2 hover:shadow-purple transition-all duration-300">
              <SerializedView />
            </motion.div>
            
            <motion.div variants={item} className="pt-2 hover:shadow-purple transition-all duration-300">
              <ExportPanel />
            </motion.div>
          </div>
        </motion.main>
        
        <motion.footer 
          className="border-t py-6 bg-white/80 backdrop-blur-sm mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              PHP Serialization Visualizer - Frontend Tool
            </motion.p>
            <motion.p 
              className="text-xs mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              All data processing happens in your browser. No server processing required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="text-xs mt-2"
            >
              <a 
                href="https://github.com/chrisjohnleah/draggle-serialize" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-colors underline"
              >
                Open Source on GitHub
              </a>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </SerializerProvider>
  );
};

export default Index;
