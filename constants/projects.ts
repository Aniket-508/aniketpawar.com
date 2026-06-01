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
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tambo AI",
      "React PDF",
      "Zustand",
      "Tailwind CSS v4",
      "Radix UI",
    ],
    title: "Openself",
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
    },
    slug: "vercel-doctor",
    tech: ["MDX", "Agent Skills", "Next.js", "Vercel", "TypeScript"],
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
    },
    slug: "better-og",
    tech: ["TypeScript", "Satori", "Takumi", "Next.js"],
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
    },
    slug: "awesome-oss-perks",
    tech: ["TypeScript", "Awesome List"],
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
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
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
    tech: ["TypeScript", "Next.js", "Vercel"],
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
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    title: "IG Posts Generator",
  },
  {
    category: "Open Source",
    date: {
      month: "May",
      year: 2026,
    },
    description:
      "A curated collection of brand logo styles and morphing treatments for design exploration.",
    links: {
      github: "https://github.com/Aniket-508/logomorphism",
    },
    slug: "logomorphism",
    tech: ["TypeScript", "React", "Tailwind CSS"],
    title: "Logomorphism",
  },
  {
    category: "Boilerplate",
    date: {
      month: "January",
      year: 2026,
    },
    description:
      "Monorepo boilerplate with Next.js web app and browser extension, sharing TypeScript, ESLint, Tailwind, and Prettier configs.",
    links: {
      github:
        "https://github.com/Aniket-508/turborepo-nextjs-wxt-shadcn-boilerplate",
    },
    slug: "turborepo-nextjs-wxt-shadcn-boilerplate",
    tech: ["Turborepo", "Next.js", "WXT", "shadcn/ui", "TypeScript"],
    title: "Turborepo Next + WXT Boilerplate",
  },
] satisfies readonly Project[];
