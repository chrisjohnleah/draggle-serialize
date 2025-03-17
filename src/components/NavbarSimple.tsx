
import React from "react";
import { GithubIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const NavbarSimple = () => {
  return (
    <motion.header 
      className="w-full px-6 py-3 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10 sticky top-0"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Link to="/">
            <Logo size="md" />
          </Link>
          <div>
            <span className="font-semibold text-xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-purple-200">PHP Serializer</span>
            <Badge className="ml-2 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700">Beta</Badge>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 hover:bg-purple-50 dark:hover:bg-purple-950"
                >
                  <span>Home</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return to main page</p>
            </TooltipContent>
          </Tooltip>

          <ThemeToggle />

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/help">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-purple-200 hover:bg-purple-50 hover:border-purple-300 dark:border-purple-800 dark:hover:bg-purple-950 dark:hover:border-purple-700"
                >
                  <InfoIcon className="h-4 w-4 text-purple-500" />
                  <span>Help</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View help documentation</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="https://github.com/chrisjohnleah/draggle-serialize"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-purple-200 hover:bg-purple-50 hover:border-purple-300 dark:border-purple-800 dark:hover:bg-purple-950 dark:hover:border-purple-700"
                >
                  <GithubIcon className="h-4 w-4 text-purple-500" />
                  <span>Source</span>
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>View source code</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default NavbarSimple;
