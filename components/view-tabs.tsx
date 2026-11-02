"use client";

import { LayoutGridIcon, TextAlignJustifyIcon } from "lucide-react";
import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trackViewModeChange } from "@/lib/events";
import type { Section, Variant } from "@/lib/events";

interface ViewToggleProps {
  value: Variant;
  onChange: (value: Variant) => void;
  section: Section;
}

const ViewToggle = ({ value, onChange, section }: ViewToggleProps) => {
  const [slowMode, setSlowMode] = useState(false);
  const slowModeId = useId();
  const transition = useRef<ViewTransition | null>(null);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Switch
          id={slowModeId}
          size="sm"
          checked={slowMode}
          onCheckedChange={setSlowMode}
        />
        <label
          htmlFor={slowModeId}
          className="cursor-pointer text-sm text-muted-foreground"
        >
          Slow mode
        </label>
      </div>

      <Tabs
        value={value}
        onValueChange={(next) => {
          if (!next || next === value) {
            return;
          }

          const variant = next as Variant;
          trackViewModeChange(section, variant);
          transition.current?.skipTransition();

          if (
            !document.startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ) {
            onChange(variant);
            return;
          }

          transition.current = document.startViewTransition({
            types: slowMode ? ["view-mode", "slow-view-mode"] : ["view-mode"],
            update: () => flushSync(() => onChange(variant)),
          });
        }}
      >
        <TabsList>
          <Tooltip disabled={value === "list"}>
            <TooltipTrigger
              render={
                <TabsTrigger value="list" aria-label="List" className="px-1" />
              }
            >
              <TextAlignJustifyIcon />
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>List</TooltipContent>
          </Tooltip>
          <Tooltip disabled={value === "grid"}>
            <TooltipTrigger
              render={
                <TabsTrigger
                  value="grid"
                  aria-label="Showcase"
                  className="px-1"
                />
              }
            >
              <LayoutGridIcon />
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>Showcase</TooltipContent>
          </Tooltip>
        </TabsList>
      </Tabs>
    </div>
  );
};

export { ViewToggle };
