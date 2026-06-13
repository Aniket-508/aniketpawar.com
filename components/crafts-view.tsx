"use client";

import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { CraftItem } from "@/components/craft-item";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import type { Variant } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { Craft } from "@/types/crafts";

interface CraftsViewProps {
  crafts: readonly Craft[];
  showHeader?: boolean;
  headerClassName?: string;
  defaultVariant?: Variant;
  viewClassName?: string;
}

const CraftsView = ({
  crafts,
  showHeader = true,
  headerClassName,
  viewClassName,
  defaultVariant = "list",
}: CraftsViewProps) => {
  const [variant, setVariant] = useState(defaultVariant);

  return (
    <>
      {showHeader && (
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            headerClassName
          )}
        >
          <div className="group/projects flex-1 flex items-center gap-1">
            <Title>{"crafts."}</Title>
            <CopyLink
              title={"Crafts"}
              className="hidden group-hover/projects:inline-flex"
            />
          </div>

          <ViewToggle value={variant} onChange={setVariant} section="crafts" />
        </div>
      )}

      <div
        className={cn(
          "group grid grid-cols-1",
          variant === "list" && "divide-y divide-border",
          viewClassName
        )}
      >
        {crafts.map((craft) => (
          <CraftItem
            key={craft.slug}
            {...craft}
            variant={variant}
            location={showHeader ? "home" : "listing"}
          />
        ))}
      </div>
    </>
  );
};

export { CraftsView };
