export type FavoriteCategory =
  | "Design"
  | "Development"
  | "People"
  | "Products"
  | "Media"
  | "Books"
  | "Fonts"
  | "Icons"
  | "Analytics";

export interface Favorite {
  slug: string;
  title: string;
  description: string;
  category: FavoriteCategory;
  url: string;
  favicon?: string;
}
