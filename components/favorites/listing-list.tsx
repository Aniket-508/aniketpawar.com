"use client";

import { useMemo } from "react";

import { FavoritesViewGrid } from "@/components/favorites/view";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { FAVORITES } from "@/constants/favorites";
import { useFavoritesListingFilters } from "@/lib/search-params/hooks";
import type { FavoritesListingDefaults } from "@/lib/search-params/hooks";
import { QUERY_KEYS } from "@/lib/search-params/keys";
import type { FavoritesPageQueryKeys } from "@/lib/search-params/keys";

interface FavoritesListingListProps {
  previews?: Record<string, GlimpseData>;
  queryKeys?: FavoritesPageQueryKeys;
  defaults?: FavoritesListingDefaults;
}

const EMPTY_PREVIEWS: Record<string, GlimpseData> = {};

const FavoritesListingList = ({
  previews = EMPTY_PREVIEWS,
  queryKeys = QUERY_KEYS.favorites.page,
  defaults,
}: FavoritesListingListProps) => {
  const { category, q, view } = useFavoritesListingFilters(queryKeys, defaults);

  const filteredFavorites = useMemo(
    () =>
      FAVORITES.filter((favorite) => {
        const normalizedQuery = q.trim().toLowerCase();
        const matchesSearch =
          normalizedQuery === "" ||
          favorite.title.toLowerCase().includes(normalizedQuery) ||
          favorite.description.toLowerCase().includes(normalizedQuery);

        const matchesCategory =
          category === "All" || favorite.category === category;

        return matchesSearch && matchesCategory;
      }),
    [category, q]
  );

  return (
    <FavoritesViewGrid
      favorites={filteredFavorites}
      variant={view}
      showHeader={false}
      previews={previews}
    />
  );
};

export { FavoritesListingList };
