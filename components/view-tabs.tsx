"use client";

import { LayoutGridIcon, TextAlignJustifyIcon } from "lucide-react";

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

const ViewToggle = ({ value, onChange, section }: ViewToggleProps) => (
  <Tabs
    value={value}
    onValueChange={(next) => {
      if (!next) {
        return;
      }

      const variant = next as Variant;
      trackViewModeChange(section, variant);
      onChange(variant);
    }}
  >
    <TabsList>
      <Tooltip disabled={value === "list"}>
        <TooltipTrigger
          render={
            <TabsTrigger value="list" aria-label="List view" className="px-1" />
          }
        >
          <TextAlignJustifyIcon />
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>List view</TooltipContent>
      </Tooltip>
      <Tooltip disabled={value === "grid"}>
        <TooltipTrigger
          render={
            <TabsTrigger value="grid" aria-label="Grid view" className="px-1" />
          }
        >
          <LayoutGridIcon />
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>Grid view</TooltipContent>
      </Tooltip>
    </TabsList>
  </Tabs>
);

export { ViewToggle };
