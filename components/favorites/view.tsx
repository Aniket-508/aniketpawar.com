"use client";

import { Suspense } from "react";

import { CopyLink } from "@/components/copy-link";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import type { Variant } from "@/lib/events";
import { useViewQueryState } from "@/lib/search-params/hooks";
import { VIEW_DEFAULT } from "@/lib/search-params/parsers";
import { cn } from "@/lib/utils";
import type { Favorite } from "@/types/favorites";

import { FavoriteItem } from "./item";

interface FavoritesViewGridProps {
  favorites: readonly Favorite[];
  variant: Variant;
  showHeader?: boolean;
  viewClassName?: string;
  previews?: Record<string, GlimpseData>;
}

const FavoritesViewGrid = ({
  favorites,
  variant,
  showHeader = true,
  viewClassName,
  previews,
}: FavoritesViewGridProps) => (
  <div
    className={cn(
      "group grid grid-cols-1",
      variant === "grid" &&
        "sm:grid-cols-2 sm:[&>*:nth-child(2n+1)]:pr-4 sm:[&>*:nth-child(2n+2)]:pl-4 [&>*:nth-child(2n+1)]:pb-4 [&>*:nth-child(2n+2)]:pb-4",
      variant === "list" && "divide-y divide-border",
      viewClassName
    )}
  >
    {favorites.length === 0 && (
      <p className="text-muted-foreground py-8 text-center text-sm">
        No favorites found.
      </p>
    )}
    {favorites.map((favorite) => (
      <FavoriteItem
        key={favorite.slug}
        {...favorite}
        variant={variant}
        showHeader={showHeader}
        preview={previews?.[favorite.url]}
      />
    ))}
  </div>
);

interface FavoritesViewContentProps {
  favorites: readonly Favorite[];
  viewQueryKey: string;
  defaultView?: Variant;
  showHeader?: boolean;
  viewClassName?: string;
  previews?: Record<string, GlimpseData>;
}

const FavoritesViewContent = ({
  favorites,
  viewQueryKey,
  defaultView = VIEW_DEFAULT,
  showHeader = true,
  viewClassName,
  previews,
}: FavoritesViewContentProps) => {
  const [variant] = useViewQueryState(viewQueryKey, defaultView);

  return (
    <FavoritesViewGrid
      favorites={favorites}
      variant={variant}
      showHeader={showHeader}
      viewClassName={viewClassName}
      previews={previews}
    />
  );
};

interface FavoritesViewProps {
  favorites: readonly Favorite[];
  viewQueryKey: string;
  defaultView?: Variant;
  showHeader?: boolean;
  headerClassName?: string;
  viewClassName?: string;
  previews?: Record<string, GlimpseData>;
}

const FavoritesView = ({
  favorites,
  viewQueryKey,
  defaultView = VIEW_DEFAULT,
  showHeader = true,
  headerClassName,
  viewClassName,
  previews,
}: FavoritesViewProps) => (
  <>
    {showHeader && (
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          headerClassName
        )}
      >
        <div className="group/favorites flex flex-1 items-center gap-1">
          <Title
            className="text-xl font-medium italic"
            render={<h2>{"favorites."}</h2>}
          />
          <CopyLink
            title={"Favorites"}
            className="hidden group-hover/favorites:inline-flex"
          />
        </div>

        <Suspense>
          <ViewToggle
            queryKey={viewQueryKey}
            section="favorites"
            defaultValue={defaultView}
          />
        </Suspense>
      </div>
    )}

    <Suspense>
      <FavoritesViewContent
        favorites={favorites}
        viewQueryKey={viewQueryKey}
        defaultView={defaultView}
        showHeader={showHeader}
        viewClassName={viewClassName}
        previews={previews}
      />
    </Suspense>
  </>
);

export { FavoritesView, FavoritesViewContent, FavoritesViewGrid };
