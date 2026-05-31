"use client";

import { Volume2Icon, VolumeXIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSoundToggle } from "@/hooks/use-sound-toggle";

export const SoundToggle = () => {
  const { enabled, toggleSound } = useSoundToggle();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            onClick={toggleSound}
          >
            {enabled ? <Volume2Icon /> : <VolumeXIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Toggle Sound
          <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
