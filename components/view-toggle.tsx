"use client";

import { LayoutGridIcon, TextAlignJustifyIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { trackViewModeChange } from "@/lib/events";

type ViewVariant = "list" | "grid";

interface ViewToggleProps {
  value: ViewVariant;
  onChange: (value: ViewVariant) => void;
  section: "projects" | "crafts";
}

const ViewToggle = ({ value, onChange, section }: ViewToggleProps) => (
  <ToggleGroup
    type="single"
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
    <ToggleGroupItem value="list" className="h-8 w-8" aria-label="List view">
      <TextAlignJustifyIcon className="size-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="grid" className="h-8 w-8" aria-label="Grid view">
      <LayoutGridIcon className="size-4" />
    </ToggleGroupItem>
  </ToggleGroup>
);

export { ViewToggle, type ViewVariant };
