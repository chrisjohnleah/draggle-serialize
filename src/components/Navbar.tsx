
import { ButtonIcon, GithubIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSerializer } from "@/context/SerializerContext";

const Navbar = () => {
  const { resetData } = useSerializer();

  return (
    <header className="w-full px-6 py-4 border-b bg-white/80 backdrop-blur-sm z-10 sticky top-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xl">PHP Serializer</span>
          <div className="text-xs px-2 py-0.5 bg-secondary rounded-full">Beta</div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={resetData}>
            New
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <InfoIcon className="h-4 w-4" />
            <span>Help</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <GithubIcon className="h-4 w-4" />
            <span>Source</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
