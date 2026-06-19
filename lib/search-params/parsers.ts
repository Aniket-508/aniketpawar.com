import { parseAsString, parseAsStringLiteral } from "nuqs";

import { FAVORITE_CATEGORIES } from "@/constants/favorites";
import { PROJECT_SOURCES } from "@/constants/projects";
import type { Variant } from "@/lib/events";
import type { ProjectSource } from "@/types/projects";

export const VIEW_VALUES = [
  "list",
  "grid",
] as const satisfies readonly Variant[];

export const VIEW_DEFAULT: Variant = "list";

export const SEARCH_QUERY_DEFAULT = "";

export const FAVORITE_CATEGORY_DEFAULT = "All" as const;

const projectSourceValues = PROJECT_SOURCES.map((source) => source.value) as [
  ProjectSource,
  ...ProjectSource[],
];

export const projectSourceParser = parseAsStringLiteral(projectSourceValues);

export const viewParser = parseAsStringLiteral(VIEW_VALUES);

export const favoriteCategoryParser = parseAsStringLiteral(FAVORITE_CATEGORIES);

export const searchQueryParser = parseAsString;

export const listingSearchParamsOptions = { history: "push" as const };

export type FavoriteFilterCategory = (typeof FAVORITE_CATEGORIES)[number];
