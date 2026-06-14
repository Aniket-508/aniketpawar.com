import type { Project } from "@/types/projects";

export const HOME_FEATURED_PROJECT_COUNT = 4 as const;

export const PROJECTS = [
  {
    category: "Open Source",
    date: {
      month: "January",
      year: 2026,
    },
    description:
      "A collection of 316 beautifully animated Heroicons for React.",
    featured: true,
    links: {
      github: "https://github.com/Aniket-508/heroicons-animated",
      website: "https://heroicons-animated.com/",
    },
    slug: "heroicons-animated",
    source: "personal",
    title: "heroicons-animated",
  },
  {
    category: "Product",
    date: {
      month: "Feb",
      year: 2025,
    },
    description:
      "Publish your Peerlist article effortlessly to multiple platforms, including DEV.to, Hashnode, Medium, Ghost and more.",
    featured: true,
    links: {
      website: "https://peerlistpublish.vercel.app",
    },
    slug: "peerlist-publish",
    source: "personal",
    title: "Peerlist Publish",
  },
  {
    category: "Product",
    date: {
      month: "May",
      year: 2026,
    },
    description:
      "An AI-powered resume builder with interactive chat, real-time preview, and high-quality PDF export — Cursor for resumes.",
    links: {
      github: "https://github.com/Aniket-508/openself",
      website: "https://openself.vercel.app",
    },
    slug: "openself",
    source: "personal",
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
    source: "personal",
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
    links: {
      github: "https://github.com/Aniket-508/better-og",
      website: "https://better-og.vercel.app",
    },
    slug: "better-og",
    source: "personal",
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
    source: "personal",
    title: "Awesome OSS Perks",
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
    source: "personal",
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
    source: "personal",
    title: "IG Posts Generator",
  },
  {
    category: "Open Source",
    date: {
      month: "January",
      year: 2026,
    },
    description:
      "A template for building and publishing your own custom shadcn registry components.",
    featured: true,
    links: {
      github: "https://github.com/shadcn-labs/startercn",
      website: "https://startercn.vercel.app",
    },
    slug: "startercn",
    source: "shadcn-labs",
    title: "startercn",
  },
  {
    category: "Open Source",
    date: {
      month: "February",
      year: 2026,
    },
    description:
      "Ready-to-use, customizable terminal UI components for React, built on Ink and OpenTUI.",
    featured: true,
    links: {
      github: "https://github.com/shadcn-labs/termcn",
      website: "https://termcn.vercel.app",
    },
    slug: "termcn",
    source: "shadcn-labs",
    title: "termcn",
  },
  {
    category: "Open Source",
    date: {
      month: "March",
      year: 2026,
    },
    description:
      "Ready-to-use, customizable video components for React, built on Editframe.",
    featured: true,
    links: {
      github: "https://github.com/shadcn-labs/framecn",
      website: "https://framecn.vercel.app",
    },
    slug: "framecn",
    source: "shadcn-labs",
    title: "framecn",
  },
  {
    category: "Open Source",
    date: {
      month: "April",
      year: 2026,
    },
    description:
      "Ready-to-use, customizable Open Graph image components for React, built on Satori.",
    featured: true,
    links: {
      github: "https://github.com/shadcn-labs/ogimagecn",
      website: "https://ogimagecn.vercel.app",
    },
    slug: "ogimagecn",
    source: "shadcn-labs",
    title: "ogimagecn",
  },
  {
    category: "Open Source",
    date: {
      month: "May",
      year: 2026,
    },
    description:
      "Ready-to-use, customizable email components for React, built on React Email.",
    links: {
      github: "https://github.com/shadcn-labs/emailcn",
      website: "https://emailcn.vercel.app",
    },
    slug: "emailcn",
    source: "shadcn-labs",
    title: "emailcn",
  },
  {
    category: "Open Source",
    date: {
      month: "June",
      year: 2026,
    },
    description:
      "Ready-to-use, customizable presentation components for React, built on reveal.js.",
    links: {
      github: "https://github.com/shadcn-labs/slidecn",
      website: "https://slidecn.vercel.app",
    },
    slug: "slidecn",
    source: "shadcn-labs",
    title: "slidecn",
  },
] satisfies readonly Project[];
