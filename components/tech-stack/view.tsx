"use client";

import { Suspense } from "react";

import { CopyLink } from "@/components/copy-link";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import type { Variant } from "@/lib/events";
import { useViewQueryState } from "@/lib/search-params/hooks";
import { VIEW_DEFAULT } from "@/lib/search-params/parsers";
import { cn } from "@/lib/utils";

import { TechStackItem } from "./item";

interface TechStackViewGridProps {
  items: TechStackItem[];
  variant: Variant;
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

const TechStackViewGrid = ({
  items,
  variant,
  viewClassName,
}: TechStackViewGridProps) => {
  const grouped = groupByCategory(items);

  return (
    <div
      className={cn(
        "group relative",
        variant === "list" &&
          "divide-y divide-border [--badge-height:--spacing(6)] [--col-left-width:--spacing(40)]",
        viewClassName
      )}
    >
      {Object.entries(grouped).map(([category, categoryItems], index) => (
        <TechStackItem
          key={category}
          index={index}
          category={category}
          items={categoryItems}
          variant={variant}
        />
      ))}
    </div>
  );
};

interface TechStackViewContentProps {
  items: TechStackItem[];
  viewQueryKey: string;
  defaultView?: Variant;
  viewClassName?: string;
}

const TechStackViewContent = ({
  items,
  viewQueryKey,
  defaultView = VIEW_DEFAULT,
  viewClassName,
}: TechStackViewContentProps) => {
  const [variant] = useViewQueryState(viewQueryKey, defaultView);

  return (
    <TechStackViewGrid
      items={items}
      variant={variant}
      viewClassName={viewClassName}
    />
  );
};

interface TechStackViewProps {
  items: TechStackItem[];
  viewQueryKey: string;
  defaultView?: Variant;
  showHeader?: boolean;
  headerClassName?: string;
  viewClassName?: string;
}

const TechStackView = ({
  items,
  viewQueryKey,
  defaultView = VIEW_DEFAULT,
  showHeader = true,
  headerClassName,
  viewClassName,
}: TechStackViewProps) => (
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

        <Suspense>
          <ViewToggle
            queryKey={viewQueryKey}
            section="stack"
            defaultValue={defaultView}
          />
        </Suspense>
      </div>
    )}

    <Suspense>
      <TechStackViewContent
        items={items}
        viewQueryKey={viewQueryKey}
        defaultView={defaultView}
        viewClassName={viewClassName}
      />
    </Suspense>
  </>
);

export { TechStackView, TechStackViewContent, TechStackViewGrid };
