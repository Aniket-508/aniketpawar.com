"use client";

import { LayoutGridIcon, TextAlignJustifyIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trackViewModeChange } from "@/lib/events";

type ViewVariant = "list" | "grid";

interface ViewToggleProps {
  value: ViewVariant;
  onChange: (value: ViewVariant) => void;
  section: "projects" | "crafts";
}

const ViewToggle = ({ value, onChange, section }: ViewToggleProps) => (
  <Tabs
    value={value}
    onValueChange={(next) => {
      if (!next) {
        return;
      }

      const variant = next as ViewVariant;
      trackViewModeChange(section, variant);
      onChange(variant);
    }}
  >
    <TabsList>
      <TabsTrigger
        value="list"
        title="List view"
        aria-label="List view"
        className="px-1"
      >
        <TextAlignJustifyIcon />
      </TabsTrigger>
      <TabsTrigger
        value="grid"
        title="Grid view"
        aria-label="Grid view"
        className="px-1"
      >
        <LayoutGridIcon />
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

export { ViewToggle, type ViewVariant };
