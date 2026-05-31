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

export const HapticsToggle = () => {
  const { enabled, toggleHaptics } = useHapticsToggle();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          onClick={toggleHaptics}
        >
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
