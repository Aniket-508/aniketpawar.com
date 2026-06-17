export type FavoriteCategory =
  | "People"
  | "Products"
  | "Sites"
  | "Fonts"
  | "Media";

export interface Favorite {
  slug: string;
  title: string;
  description: string;
  category: FavoriteCategory;
  url: string;
  favicon?: string;
}
