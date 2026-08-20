"use client";

import { SquareMenuIcon, Table2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useGridMode } from "@/providers/grid-mode-provider";

const GRID_OPTIONS = [
  { icon: SquareMenuIcon, label: "off", value: false },
  { icon: Table2Icon, label: "on", value: true },
] as const;

export const GridModeSwitcher = () => {
  const { enabled, toggleGridMode } = useGridMode();

  return (
    <div
      className="inline-flex items-center rounded-full bg-background inset-ring-1 inset-ring-border"
      role="radiogroup"
      aria-label="Grid mode"
    >
      {GRID_OPTIONS.map((option) => {
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
            aria-label={`Grid mode ${option.label}`}
            onClick={toggleGridMode}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};
