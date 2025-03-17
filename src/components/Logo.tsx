
import React from 'react';
import { motion } from 'framer-motion';
import { Code, CodeXml } from 'lucide-react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: {
      container: 'h-6 w-6',
      icon: 'h-5 w-5',
      smallIcon: 'h-3 w-3'
    },
    md: {
      container: 'h-8 w-8',
      icon: 'h-7 w-7',
      smallIcon: 'h-4 w-4'
    },
    lg: {
      container: 'h-12 w-12',
      icon: 'h-10 w-10',
      smallIcon: 'h-6 w-6'
    }
  };

  return (
    <motion.div 
      className={`relative flex items-center justify-center rounded-lg ${sizes[size].container}`}
      initial={{ rotate: -5 }}
      animate={{ 
        rotate: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <CodeXml className={`text-primary ${sizes[size].icon} absolute`} />
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.3, duration: 0.4 }
        }}
        className="absolute bottom-0 right-0"
      >
        <Code className={`text-purple-500 ${sizes[size].smallIcon}`} />
      </motion.div>
    </motion.div>
  );
};

export default Logo;
