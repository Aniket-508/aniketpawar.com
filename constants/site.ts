import type { NavGroup, NavItem } from "@/types/nav";

import { ROUTES } from "./routes";
import { getBaseUrl } from "./url";
import { NAME, USER } from "./user";

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    AVATAR: USER.avatar,
    NAME,
    TWITTER: "@alaymanguy",
  },
  DESCRIPTION: {
    LONG: "Frontend engineer based in Mumbai, India. I care deeply about visual craft and obsess over building products that feel fast, polished, and human. I run Shadcn Labs, an open-source org pushing the limits of the shadcn/ui ecosystem.",
    SHORT:
      "Frontend engineer obsessed with visual craft and building fast, polished, human-centric products.",
  },
  KEYWORDS: [
    "Aniket Pawar",
    "Software Engineer",
    "Product Builder",
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "Tailwind CSS",
    "UI/UX Design",
    "Design Engineering",
    "Web Development",
    "Portfolio",
  ],
  NAME,
  OG_IMAGE:
    "https://ik.imagekit.io/2oajjadqkz/portfolio-image.png?updatedAt=1708090929752",
  URL: baseUrl,
} as const;

export const META_THEME_COLORS = {
  dark: "#0a0a0a",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};

export const NAV_STANDALONE: NavItem[] = [
  {
    href: ROUTES.HOME,
    id: "home",
    label: "home",
  },
  {
    href: ROUTES.WRITING,
    id: "writing",
    label: "writing",
  },
  {
    href: ROUTES.CONTACT,
    id: "contact",
    label: "contact",
  },
];

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "work",
    items: [
      {
        href: ROUTES.USES,
        id: "uses",
        label: "uses",
      },
      {
        href: ROUTES.PROJECTS,
        id: "projects",
        label: "projects",
      },
      {
        href: ROUTES.CRAFTS,
        id: "crafts",
        label: "crafts",
      },
      {
        href: ROUTES.EXPERIENCES,
        id: "experiences",
        label: "experience",
      },
      {
        href: ROUTES.TESTIMONIALS,
        id: "testimonials",
        label: "testimonials",
      },
      // {
      //   href: ROUTES.BLOG,
      //   id: "blog",
      //   label: "blog",
      // },
    ],
    label: "work",
  },
  // {
  //   id: "ui",
  //   label: "ui",
  //   items: [
  //     {
  //       href: ROUTES.COMPONENTS,
  //       id: "components",
  //       label: "components",
  //     },
  //     {
  //       href: ROUTES.BLOCKS,
  //       id: "blocks",
  //       label: "blocks",
  //     },
  //   ],
  // },
  {
    id: "extras",
    items: [
      {
        href: ROUTES.FAVORITES,
        id: "favorites",
        label: "favorites",
      },
      {
        href: ROUTES.STATS,
        id: "stats",
        label: "stats",
      },
      {
        href: ROUTES.COLOPHON,
        id: "colophon",
        label: "colophon",
      },
      {
        href: ROUTES.SPONSORS,
        id: "sponsor",
        label: "sponsors",
      },
    ],
    label: "extras",
  },
];
