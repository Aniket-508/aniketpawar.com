import type { Registry } from "shadcn/schema";

export const components: Registry["items"] = [
  {
    categories: ["effects"],
    dependencies: ["motion"],
    description:
      "Animated link that reveals the website favicon and primary color on hover.",
    files: [
      {
        path: "registry/components/link-reveal/types.ts",
        type: "registry:lib",
      },
      {
        path: "registry/components/link-reveal/server.ts",
        type: "registry:lib",
      },
      {
        path: "registry/components/link-reveal/link-reveal.tsx",
        target: "@/components/link-reveal.tsx",
        type: "registry:component",
      },
    ],
    name: "link-reveal",
    title: "Link Reveal",
    type: "registry:component",
  },
];
