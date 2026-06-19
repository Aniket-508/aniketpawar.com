"use client";

import { useQueryState } from "nuqs";
import { useMemo } from "react";

import { DEFAULT_PROJECT_SOURCE } from "@/constants/projects";
import type { Variant } from "@/lib/events";
import type { ProjectSource } from "@/types/projects";

import type { FavoritesPageQueryKeys, ProjectFilterQueryKeys } from "./keys";
import {
  FAVORITE_CATEGORY_DEFAULT,
  favoriteCategoryParser,
  listingSearchParamsOptions,
  projectSourceParser,
  SEARCH_QUERY_DEFAULT,
  searchQueryParser,
  VIEW_DEFAULT,
  viewParser,
} from "./parsers";
import type { FavoriteFilterCategory } from "./parsers";

const useViewQueryState = (
  queryKey: string,
  defaultValue: Variant = VIEW_DEFAULT
) => {
  const parser = useMemo(
    () =>
      viewParser
        .withDefault(defaultValue)
        .withOptions(listingSearchParamsOptions),
    [defaultValue]
  );

  return useQueryState(queryKey, parser);
};

const useProjectSourceQueryState = (
  queryKey: string,
  defaultValue: ProjectSource = DEFAULT_PROJECT_SOURCE
) => {
  const parser = useMemo(
    () =>
      projectSourceParser
        .withDefault(defaultValue)
        .withOptions(listingSearchParamsOptions),
    [defaultValue]
  );

  return useQueryState(queryKey, parser);
};

const useFavoriteCategoryQueryState = (
  queryKey: string,
  defaultValue: FavoriteFilterCategory = FAVORITE_CATEGORY_DEFAULT
) => {
  const parser = useMemo(
    () =>
      favoriteCategoryParser
        .withDefault(defaultValue)
        .withOptions(listingSearchParamsOptions),
    [defaultValue]
  );

  return useQueryState(queryKey, parser);
};

const useSearchQueryState = (
  queryKey: string,
  defaultValue: string = SEARCH_QUERY_DEFAULT
) => {
  const parser = useMemo(
    () =>
      searchQueryParser
        .withDefault(defaultValue)
        .withOptions(listingSearchParamsOptions),
    [defaultValue]
  );

  return useQueryState(queryKey, parser);
};

interface FavoritesListingDefaults {
  q?: string;
  category?: FavoriteFilterCategory;
  view?: Variant;
}

const useFavoritesListingFilters = (
  queryKeys: FavoritesPageQueryKeys,
  defaults: FavoritesListingDefaults = {}
) => {
  const [q] = useSearchQueryState(queryKeys.q, defaults.q);
  const [category] = useFavoriteCategoryQueryState(
    queryKeys.category,
    defaults.category
  );
  const [view] = useViewQueryState(queryKeys.view, defaults.view);

  return { category, q, view };
};

interface ProjectsListingDefaults {
  source?: ProjectSource;
  view?: Variant;
}

const useProjectsListingFilters = (
  queryKeys: ProjectFilterQueryKeys,
  defaults: ProjectsListingDefaults = {}
) => {
  const [source] = useProjectSourceQueryState(
    queryKeys.source,
    defaults.source
  );
  const [view] = useViewQueryState(queryKeys.view, defaults.view);

  return { source, view };
};

export {
  useFavoriteCategoryQueryState,
  useFavoritesListingFilters,
  useProjectSourceQueryState,
  useProjectsListingFilters,
  useSearchQueryState,
  useViewQueryState,
};

export type { FavoritesListingDefaults, ProjectsListingDefaults };
