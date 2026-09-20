import type { Writing } from "@/types/writing";

export const WRITINGS = [
  {
    category: "Thoughts",
    date: {
      month: "July",
      year: 2026,
    },
    description:
      "Why clarity is the most underrated skill in software engineering, and how writing clearly changes how you think.",
    slug: "clarity",
    title: "Clarity",
  },
  {
    category: "Design",
    date: {
      month: "July",
      year: 2026,
    },
    description:
      "Building token-scale design systems that adapt fluidly across every breakpoint and density.",
    slug: "tockscale-components",
    title: "Tokscale Components",
  },
] as const satisfies readonly Writing[];
