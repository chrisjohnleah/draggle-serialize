
import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CircleHelp, 
  FileQuestion, 
  Upload, 
  Layers, 
  Download, 
  Code, 
  MessageCircleQuestion,
  ExternalLink
} from "lucide-react";

const Help = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-purple-50/20 to-gray-100">
      <main className="flex-1 container mx-auto px-4 py-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.div variants={item} className="mb-8 text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <CircleHelp className="inline-block mr-2 text-purple-600" size={36} />
              PHP Serializer Help Documentation
            </motion.h1>
            <motion.p className="text-muted-foreground max-w-2xl mx-auto">
              Learn how to use the PHP Serialization Visualizer tool effectively
            </motion.p>
          </motion.div>

          <ScrollArea className="h-[calc(100vh-220px)] pr-4">
            <motion.div 
              variants={container}
              className="space-y-8 pb-8"
            >
              <motion.section variants={item} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-purple-100">
                <h2 className="text-2xl font-semibold flex items-center text-purple-800 mb-4">
                  <FileQuestion className="mr-2" size={24} />
                  What is PHP Serialization?
                </h2>
                <p className="text-gray-700 mb-4">
                  PHP serialization is a process that converts complex data structures like arrays and objects 
                  into a string format that can be stored or transmitted. This is commonly used for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Storing data in databases or caches</li>
                  <li>Passing data between different PHP applications</li>
                  <li>Preserving data between HTTP requests (in cookies or sessions)</li>
                </ul>
              </motion.section>

              <motion.section variants={item} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-purple-100">
                <h2 className="text-2xl font-semibold flex items-center text-purple-800 mb-4">
                  <Upload className="mr-2" size={24} />
                  Uploading Serialized Data
                </h2>
                <p className="text-gray-700 mb-3">
                  To begin working with serialized PHP data:
                </p>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li>Use the File Upload component to select a file containing serialized PHP data</li>
                  <li>You can upload files with extensions: <code className="bg-gray-100 px-1 py-0.5 rounded">.txt</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">.php</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">.json</code>, or others</li>
                  <li>Alternatively, paste serialized data directly into the text area</li>
                  <li>Click "Parse" to visualize the data structure</li>
                </ol>
                <div className="mt-4 p-3 bg-purple-50 rounded-md border border-purple-100">
                  <p className="text-sm text-purple-800 font-medium">Troubleshooting Parse Errors:</p>
                  <p className="text-sm text-gray-600 mt-1">
                    If parsing fails, check that your data is correctly formatted PHP serialized data. 
                    The tool will attempt to provide error details to help identify the problem.
                  </p>
                </div>
              </motion.section>

              <motion.section variants={item} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-purple-100">
                <h2 className="text-2xl font-semibold flex items-center text-purple-800 mb-4">
                  <Layers className="mr-2" size={24} />
                  Working with Serialized View
                </h2>
                <p className="text-gray-700 mb-3">
                  After successfully parsing your serialized data:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The data will be presented in a hierarchical tree structure</li>
                  <li>Arrays and objects can be expanded/collapsed</li>
                  <li>Keys and values are color-coded by data type for easy identification</li>
                  <li>You can drag and drop items to reorganize the structure</li>
                  <li>Edit values directly by clicking on them</li>
                </ul>
              </motion.section>

              <motion.section variants={item} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-purple-100">
                <h2 className="text-2xl font-semibold flex items-center text-purple-800 mb-4">
                  <Download className="mr-2" size={24} />
                  Exporting Modified Data
                </h2>
                <p className="text-gray-700 mb-3">
                  When you're finished modifying the serialized structure:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use the Export Panel to convert your visual structure back to serialized format</li>
                  <li>Select from available export options (Serialized PHP, JSON, etc.)</li>
                  <li>Copy the exported data to your clipboard</li>
                  <li>Optionally download the data as a file</li>
                </ul>
              </motion.section>

              <motion.section variants={item} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-purple-100">
                <h2 className="text-2xl font-semibold flex items-center text-purple-800 mb-4">
                  <Code className="mr-2" size={24} />
                  Example Serialized Data
                </h2>
                <p className="text-gray-700 mb-3">
                  If you need sample data to experiment with, try these examples:
                </p>
                <div className="bg-gray-100 p-3 rounded-md overflow-x-auto mb-3">
                  <pre className="text-sm text-gray-800">
                    <code>{`a:3:{i:0;s:5:"apple";i:1;s:6:"orange";i:2;s:6:"banana";}`}</code>
                  </pre>
                  <p className="text-xs text-gray-500 mt-1">A simple indexed array with three string values</p>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                  <pre className="text-sm text-gray-800">
                    <code>{`O:4:"User":3:{s:4:"name";s:5:"Alice";s:3:"age";i:30;s:5:"email";s:15:"alice@mail.com";}`}</code>
                  </pre>
                  <p className="text-xs text-gray-500 mt-1">A User object with name, age, and email properties</p>
                </div>
              </motion.section>

              <motion.section variants={item} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-purple-100">
                <h2 className="text-2xl font-semibold flex items-center text-purple-800 mb-4">
                  <MessageCircleQuestion className="mr-2" size={24} />
                  Additional Support
                </h2>
                <p className="text-gray-700 mb-3">
                  If you encounter issues or have questions about the PHP Serialization Visualizer:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Visit our GitHub repository for the latest updates and documentation</li>
                  <li>Submit issues through the GitHub issue tracker</li>
                  <li>Contribute to the project by submitting pull requests</li>
                </ul>
                <div className="mt-4">
                  <a 
                    href="https://github.com/chrisjohnleah/draggle-serialize" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    View on GitHub <ExternalLink className="ml-1" size={16} />
                  </a>
                </div>
              </motion.section>
            </motion.div>
          </ScrollArea>
        </motion.div>
      </main>
      
      <motion.footer 
        className="border-t py-6 bg-white/80 backdrop-blur-sm mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>PHP Serialization Visualizer - Frontend Tool</p>
          <p className="text-xs mt-1">All data processing happens in your browser. No server processing required.</p>
          <div className="text-xs mt-2">
            <a 
              href="https://github.com/chrisjohnleah/draggle-serialize" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 transition-colors underline"
            >
              Open Source on GitHub
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Help;
