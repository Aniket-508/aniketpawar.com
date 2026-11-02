"use client";

import { LayoutGridIcon, TextAlignJustifyIcon } from "lucide-react";
import { useRef } from "react";
import { flushSync } from "react-dom";

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
  const transition = useRef<ViewTransition | null>(null);

  return (
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
          types: ["view-mode"],
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
  );
};

export { ViewToggle };
