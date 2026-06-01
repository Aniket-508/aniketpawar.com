"use client";

import { VibrateIcon, VibrateOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHapticsToggle } from "@/hooks/use-haptics-toggle";
import { trackHapticsToggle } from "@/lib/events";

export const HapticsToggle = () => {
  const { enabled, toggleHaptics } = useHapticsToggle();

  const handleToggle = () => {
    toggleHaptics();
    trackHapticsToggle(!enabled);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" onClick={handleToggle}>
          {enabled ? <VibrateIcon /> : <VibrateOffIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Toggle Haptics
        <Kbd>H</Kbd>
      </TooltipContent>
    </Tooltip>
  );
};
