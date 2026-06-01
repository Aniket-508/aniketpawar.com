"use client";

import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { CraftItem } from "@/components/craft-item";
import { Title } from "@/components/ui/title";
import type { ViewVariant } from "@/components/view-toggle";
import { ViewToggle } from "@/components/view-toggle";
import { cn } from "@/lib/utils";
import type { Craft } from "@/types/crafts";

interface CraftsViewProps {
  crafts: readonly Craft[];
  showHeader?: boolean;
  headerClassName?: string;
  defaultVariant?: ViewVariant;
  viewClassName?: string;
}

const CraftsView = ({
  crafts,
  showHeader = true,
  headerClassName,
  viewClassName,
  defaultVariant = "grid",
}: CraftsViewProps) => {
  const [variant, setVariant] = useState(defaultVariant);

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          headerClassName
        )}
      >
        {showHeader && (
          <div className="group/projects flex-1 flex items-center gap-2">
            <Title>{"crafts."}</Title>
            <CopyLink
              title={"Crafts"}
              className="hidden size-4 group-hover/projects:inline"
            />
          </div>
        )}
        <ViewToggle value={variant} onChange={setVariant} />
      </div>

      <div className={cn("grid grid-cols-1 gap-8", viewClassName)}>
        {crafts.map((craft) => (
          <CraftItem key={craft.slug} {...craft} variant={variant} />
        ))}
      </div>
    </>
  );
};

export { CraftsView };
