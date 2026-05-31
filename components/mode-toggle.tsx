"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export const ModeToggle = () => {
  const { toggleTheme } = useThemeToggle();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" onClick={toggleTheme}>
          <Icons.theme />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Toggle Mode
        <Kbd>D</Kbd>
      </TooltipContent>
    </Tooltip>
  );
};
