"use client";

import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import type { Variant } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { Favorite } from "@/types/favorites";

import { FavoriteItem } from "./item";

interface FavoritesViewProps {
  favorites: readonly Favorite[];
  showHeader?: boolean;
  headerClassName?: string;
  variant?: Variant;
  defaultVariant?: Variant;
  onVariantChange?: (variant: Variant) => void;
  viewClassName?: string;
  previews?: Record<string, GlimpseData>;
}

const FavoritesView = ({
  favorites,
  showHeader = true,
  headerClassName,
  variant: controlledVariant,
  defaultVariant = "list",
  onVariantChange,
  viewClassName,
  previews,
}: FavoritesViewProps) => {
  const [internalVariant, setInternalVariant] = useState(defaultVariant);

  const variant = controlledVariant ?? internalVariant;
  const setVariant = onVariantChange ?? setInternalVariant;

  return (
    <>
      {showHeader && (
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            headerClassName
          )}
        >
          <div className="group/favorites flex-1 flex items-center gap-1">
            <Title
              className="text-xl font-medium italic"
              render={<h2>{"favorites."}</h2>}
            />
            <CopyLink
              title={"Favorites"}
              className="hidden group-hover/favorites:inline-flex"
            />
          </div>

          <ViewToggle
            value={variant}
            onChange={setVariant}
            section="favorites"
          />
        </div>
      )}

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
    </>
  );
};

export { FavoritesView };
