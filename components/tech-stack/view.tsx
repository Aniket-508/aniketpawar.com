"use client";

import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import type { Variant } from "@/lib/events";
import { cn } from "@/lib/utils";

import { TechStackItem } from "./item";

interface TechStackViewProps {
  items: TechStackItem[];
  showHeader?: boolean;
  headerClassName?: string;
  defaultVariant?: Variant;
  viewClassName?: string;
}

const groupByCategory = (
  items: TechStackItem[]
): Record<string, TechStackItem[]> => {
  const grouped: Record<string, TechStackItem[]> = {};
  for (const item of items) {
    for (const category of item.categories) {
      (grouped[category] ??= []).push(item);
    }
  }
  return grouped;
};

const TechStackView = ({
  items,
  showHeader = true,
  headerClassName,
  viewClassName,
  defaultVariant = "list",
}: TechStackViewProps) => {
  const [variant, setVariant] = useState(defaultVariant);
  const grouped = groupByCategory(items);

  return (
    <>
      {showHeader && (
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            headerClassName
          )}
        >
          <div className="group/stack flex flex-1 items-center gap-1">
            <Title
              className="text-xl font-medium italic"
              render={<h2>{"stack."}</h2>}
            />
            <CopyLink
              title={"Stack"}
              className="hidden group-hover/stack:inline-flex"
            />
          </div>

          <ViewToggle value={variant} onChange={setVariant} section="stack" />
        </div>
      )}

      <div
        className={cn(
          "group relative",
          variant === "list" &&
            "divide-y divide-border [--badge-height:--spacing(6)] [--col-left-width:--spacing(40)]",
          viewClassName
        )}
      >
        {Object.entries(grouped).map(([category, catItems], index) => (
          <TechStackItem
            key={category}
            index={index}
            category={category}
            items={catItems}
            variant={variant}
          />
        ))}
      </div>
    </>
  );
};

export { TechStackView };
