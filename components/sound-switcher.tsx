"use client";

import { Volume2, VolumeX } from "lucide-react";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useSoundEnabled } from "@/providers/sound-provider";

const SOUND_OPTIONS = [
  { icon: Volume2, label: "on", value: true },
  { icon: VolumeX, label: "off", value: false },
] as const;

export const SoundSwitcher = () => {
  const { enabled, setEnabled } = useSoundEnabled();
  const isMounted = useMounted();

  if (!isMounted) {
    return <div className="flex h-7 w-14" />;
  }

  return (
    <div
      className="inline-flex items-center rounded-full bg-background inset-ring-1 inset-ring-border"
      role="radiogroup"
      aria-label="Sound"
    >
      {SOUND_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = enabled === option.value;

        return (
          <button
            key={option.label}
            type="button"
            data-active={isActive}
            className={cn(
              "relative flex size-7 items-center justify-center rounded-full text-muted-foreground transition-[color,box-shadow] hover:text-foreground data-[active=true]:text-foreground data-[active=true]:inset-ring-1 data-[active=true]:inset-ring-border [&_svg]:size-3.5"
            )}
            role="radio"
            aria-checked={isActive}
            aria-label={`Switch sound ${option.label}`}
            onClick={() => setEnabled(option.value)}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};
