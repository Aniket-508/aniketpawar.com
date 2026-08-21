"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { icon: MonitorIcon, value: "system" },
  { icon: SunIcon, value: "light" },
  { icon: MoonIcon, value: "dark" },
] as const;

export const ModeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();

  if (!isMounted) {
    return <div className="flex h-7 w-[5.25rem]" />;
  }

  return (
    <div
      className="inline-flex items-center rounded-full bg-background inset-ring-1 inset-ring-border"
      role="radiogroup"
      aria-label="Theme"
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            data-active={isActive}
            className={cn(
              "relative flex size-7 items-center justify-center rounded-full text-muted-foreground transition-[color,box-shadow] hover:text-foreground data-[active=true]:text-foreground data-[active=true]:inset-ring-1 data-[active=true]:inset-ring-border [&_svg]:size-3.5"
            )}
            role="radio"
            aria-checked={isActive}
            aria-label={`Switch to ${option.value} theme`}
            onClick={() => setTheme(option.value)}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};
