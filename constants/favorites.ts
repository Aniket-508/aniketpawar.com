import type { Favorite } from "@/types/favorites";

export const FAVORITES = [
  {
    category: "Products",
    description: "I live here. This is my second address.",
    slug: "opencode",
    title: "OpenCode",
    url: "https://opencode.ai",
  },
  {
    category: "People",
    description: "Design engineer at Linear",
    slug: "emil-kowalski",
    title: "Emil Kowalski",
    url: "https://emilkowal.ski",
  },
  {
    category: "Fonts",
    description: "Beautiful mono font for devs",
    slug: "mono-lisa",
    title: "MonoLisa",
    url: "https://www.monolisa.dev",
  },
  {
    category: "Sites",
    description: "Web guidelines I abide by",
    slug: "vercel-design",
    title: "Vercel Design",
    url: "https://vercel.com/design/guidelines",
  },
  {
    category: "Products",
    description: "The very best in iOS",
    slug: "spotted-in-prod",
    title: "Spotted in Prod",
    url: "https://www.spottedinprod.com",
  },
  {
    category: "Fonts",
    description: "Product font I blindly use",
    slug: "geist-geist-mono",
    title: "Geist & Geist Mono",
    url: "https://vercel.com",
  },
  {
    category: "Media",
    description: "Inspiring founder stories and businesses",
    slug: "starter-story",
    title: "Starter Story",
    url: "https://www.youtube.com/@starterstory",
  },
] as const satisfies readonly Favorite[];

export const FAVORITE_CATEGORIES = [
  "All",
  "Products",
  "People",
  "Sites",
  "Fonts",
  "Media",
] as const;
