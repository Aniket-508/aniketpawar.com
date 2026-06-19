"use client";

import { Suspense } from "react";

import { CopyLink } from "@/components/copy-link";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import type { Variant } from "@/lib/events";
import { useViewQueryState } from "@/lib/search-params/hooks";
import { VIEW_DEFAULT } from "@/lib/search-params/parsers";
import { cn } from "@/lib/utils";
import type { Craft } from "@/types/crafts";

import { CraftItem } from "./item";

interface CraftsViewGridProps {
  crafts: readonly Craft[];
  variant: Variant;
  showHeader?: boolean;
  viewClassName?: string;
}

const CraftsViewGrid = ({
  crafts,
  variant,
  showHeader = true,
  viewClassName,
}: CraftsViewGridProps) => (
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
        showHeader={showHeader}
      />
    ))}
  </div>
);

interface CraftsViewContentProps {
  crafts: readonly Craft[];
  viewQueryKey: string;
  defaultView?: Variant;
  showHeader?: boolean;
  viewClassName?: string;
}

const CraftsViewContent = ({
  crafts,
  viewQueryKey,
  defaultView = VIEW_DEFAULT,
  showHeader = true,
  viewClassName,
}: CraftsViewContentProps) => {
  const [variant] = useViewQueryState(viewQueryKey, defaultView);

  return (
    <CraftsViewGrid
      crafts={crafts}
      variant={variant}
      showHeader={showHeader}
      viewClassName={viewClassName}
    />
  );
};

interface CraftsViewProps {
  crafts: readonly Craft[];
  viewQueryKey: string;
  defaultView?: Variant;
  showHeader?: boolean;
  headerClassName?: string;
  viewClassName?: string;
}

const CraftsView = ({
  crafts,
  viewQueryKey,
  defaultView = VIEW_DEFAULT,
  showHeader = true,
  headerClassName,
  viewClassName,
}: CraftsViewProps) => (
  <>
    {showHeader && (
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          headerClassName
        )}
      >
        <div className="group/projects flex flex-1 flex items-center gap-1">
          <Title
            className="text-xl font-medium italic"
            render={<h2>{"crafts."}</h2>}
          />
          <CopyLink
            title={"Crafts"}
            className="hidden group-hover/projects:inline-flex"
          />
        </div>

        <Suspense>
          <ViewToggle
            queryKey={viewQueryKey}
            section="crafts"
            defaultValue={defaultView}
          />
        </Suspense>
      </div>
    )}

    <Suspense>
      <CraftsViewContent
        crafts={crafts}
        viewQueryKey={viewQueryKey}
        defaultView={defaultView}
        showHeader={showHeader}
        viewClassName={viewClassName}
      />
    </Suspense>
  </>
);

export { CraftsView, CraftsViewContent, CraftsViewGrid };
