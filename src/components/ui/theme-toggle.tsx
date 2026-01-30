import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const next = {
      light: "dark",
      dark: "light",
    };
    setTheme(next[theme]);
  };

  const icons = {
    light: Sun,
    dark: Moon,
  };

  const labels = {
    light: "라이트 모드",
    dark: "다크 모드",
  };

  const Icon = icons[theme];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            aria-label={`현재: ${labels[theme]}`}
          >
            <Icon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{labels[theme]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
