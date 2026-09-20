import type { Registry } from "shadcn/schema";

/**
 * Entry files only. `scripts/registry-closure.ts` walks their imports and adds
 * every transitive local file (plus npm dependencies) when registry.json is
 * generated, so distributed items are always self-contained.
 */
export const components: Registry["items"] = [
  {
    categories: ["effects"],
    description:
      "Animated link that reveals the website favicon and primary color on hover.",
    files: [
      {
        path: "registry/components/link-reveal/link-reveal.tsx",
        target: "@/components/link-reveal.tsx",
        type: "registry:component",
      },
      {
        path: "registry/components/link-reveal/server.ts",
        target: "@/lib/link-reveal.ts",
        type: "registry:lib",
      },
    ],
    name: "link-reveal",
    title: "Link Reveal",
    type: "registry:component",
  },
];
