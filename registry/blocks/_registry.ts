import type { Registry } from "shadcn/schema";

/**
 * Blocks compose charts, metrics and callouts into a full section, so they ship
 * a much larger file closure than single components. Only entry files are
 * listed here; `scripts/registry-closure.ts` resolves the rest.
 */
export const blocks: Registry["items"] = [
  {
    categories: ["analytics"],
    description:
      "Microsoft Clarity analytics integration for tracking user behavior and session recordings.",
    files: [
      {
        path: "registry/blocks/clarity-analytics/clarity-analytics.tsx",
        target: "@/components/clarity-analytics.tsx",
        type: "registry:component",
      },
    ],
    name: "clarity-analytics",
    title: "Clarity Analytics",
    type: "registry:block",
  },
  {
    categories: ["analytics"],
    description:
      "Display AI token usage statistics including input/output tokens and cost tracking.",
    files: [
      {
        path: "registry/blocks/token-usage/token-usage.tsx",
        target: "@/components/token-usage.tsx",
        type: "registry:component",
      },
    ],
    name: "token-usage",
    title: "Token Usage",
    type: "registry:block",
  },
];
