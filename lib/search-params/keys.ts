export const QUERY_KEYS = {
  crafts: {
    page: {
      view: "view",
    },
    section: {
      view: "crafts-view",
    },
  },
  favorites: {
    page: {
      category: "category",
      q: "q",
      view: "view",
    },
    section: {
      view: "favorites-view",
    },
  },
  projects: {
    page: {
      source: "source",
      view: "view",
    },
    section: {
      source: "projects-source",
      view: "projects-view",
    },
  },
  stack: {
    page: {
      view: "view",
    },
    section: {
      view: "stack-view",
    },
  },
} as const;

export type CraftsPageQueryKeys = typeof QUERY_KEYS.crafts.page;
export type CraftsSectionQueryKeys = typeof QUERY_KEYS.crafts.section;
export type FavoritesPageQueryKeys = typeof QUERY_KEYS.favorites.page;
export type FavoritesSectionQueryKeys = typeof QUERY_KEYS.favorites.section;
export type ProjectsPageQueryKeys = typeof QUERY_KEYS.projects.page;
export type ProjectsSectionQueryKeys = typeof QUERY_KEYS.projects.section;
export type StackPageQueryKeys = typeof QUERY_KEYS.stack.page;
export type StackSectionQueryKeys = typeof QUERY_KEYS.stack.section;

export interface ProjectFilterQueryKeys {
  source: string;
  view: string;
}
