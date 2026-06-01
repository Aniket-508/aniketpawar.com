"use client";

import { Volume2Icon, VolumeXIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSoundToggle } from "@/hooks/use-sound-toggle";
import { trackSoundToggle } from "@/lib/events";

export const SoundToggle = () => {
  const { enabled, toggleSound } = useSoundToggle();

  const handleToggle = () => {
    toggleSound();
    trackSoundToggle(!enabled);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" onClick={handleToggle}>
          {enabled ? <Volume2Icon /> : <VolumeXIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Toggle Sound
        <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  );
};
