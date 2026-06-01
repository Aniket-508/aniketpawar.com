import type { Project } from "@/types/projects";

export const HOME_FEATURED_PROJECT_COUNT = 4 as const;

export const PROJECTS = [
  {
    category: "Product",
    date: {
      month: "May",
      year: 2026,
    },
    description:
      "An AI-powered resume builder with interactive chat, real-time preview, and high-quality PDF export — Cursor for resumes.",
    featured: true,
    links: {
      github: "https://github.com/Aniket-508/openself",
      website: "https://openself.vercel.app",
    },
    slug: "openself",
    title: "OpenSelf",
  },
  {
    category: "Tool",
    date: {
      month: "April",
      year: 2026,
    },
    description:
      "A skill and toolkit that lets coding agents diagnose and fix patterns that inflate your Vercel bill on Next.js projects.",
    featured: true,
    links: {
      github: "https://github.com/Aniket-508/vercel-doctor",
      website: "https://www.vercel-doctor.com",
    },
    slug: "vercel-doctor",
    title: "Vercel Doctor",
  },
  {
    category: "Tool",
    date: {
      month: "March",
      year: 2026,
    },
    description:
      "An open Graph image toolkit for generating beautiful, consistent social preview images with Satori and Takumi.",
    featured: true,
    links: {
      github: "https://github.com/Aniket-508/better-og",
      website: "https://better-og.vercel.app",
    },
    slug: "better-og",
    title: "Better OG",
  },
  {
    category: "Open Source",
    date: {
      month: "May",
      year: 2026,
    },
    description:
      "A curated list of perks, credits, and programs available to open source maintainers and projects.",
    featured: true,
    links: {
      github: "https://github.com/Aniket-508/awesome-oss-perks",
      website: "https://www.ossperks.com",
    },
    slug: "awesome-oss-perks",
    title: "Awesome OSS Perks",
  },
  {
    category: "Open Source",
    date: {
      month: "January",
      year: 2026,
    },
    description:
      "A collection of 316 beautifully animated Heroicons for React.",
    links: {
      github: "https://github.com/Aniket-508/heroicons-animated",
      website: "https://heroicons-animated.com/",
    },
    slug: "heroicons-animated",
    title: "heroicons-animated",
  },
  {
    category: "API",
    date: {
      month: "February",
      year: 2026,
    },
    description:
      "Free, open-source API delivering curated quotes from India's most successful entrepreneurs.",
    links: {
      github: "https://github.com/Aniket-508/indian-quotes-api",
      website: "https://indian-quotes-api.vercel.app/",
    },
    slug: "indian-quotes-api",
    title: "Indian Quotes API",
  },
  {
    category: "Product",
    date: {
      month: "January",
      year: 2026,
    },
    description:
      "Generate posts for your socials with templates from popular Instagram pages in a few clicks.",
    links: {
      github: "https://github.com/Aniket-508/instagram-posts-generator",
      website: "https://instagram-posts-generator.vercel.app/",
    },
    slug: "instagram-posts-generator",
    title: "IG Posts Generator",
  },
] satisfies readonly Project[];
