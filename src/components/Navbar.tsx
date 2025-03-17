
import { GithubIcon, InfoIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSerializer } from "@/context/SerializerContext";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { resetData } = useSerializer();

  return (
    <motion.header 
      className="w-full px-6 py-3 border-b bg-white/80 backdrop-blur-md z-10 sticky top-0"
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
          <Logo size="md" />
          <div>
            <span className="font-semibold text-xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">PHP Serializer</span>
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
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetData}
                className="flex items-center gap-1 hover:bg-purple-50"
              >
                <RefreshCw className="h-4 w-4" />
                <span>New</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset to start fresh</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
              >
                <InfoIcon className="h-4 w-4 text-purple-500" />
                <span>Help</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View documentation</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
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

export default Navbar;
