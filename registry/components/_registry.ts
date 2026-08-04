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
  {
    categories: ["analytics"],
    dependencies: [
      "date-fns",
      "recharts",
      "@number-flow/react",
      "@visx/grid",
      "@visx/scale",
      "@visx/shape",
      "@visx/curve",
      "motion",
    ],
    description:
      "Microsoft Clarity analytics integration for tracking user behavior and session recordings.",
    files: [
      {
        path: "registry/types/clarity.ts",
        type: "registry:lib",
      },
      {
        path: "registry/lib/format.ts",
        type: "registry:lib",
      },
      {
        path: "registry/components/shared/animated-number.tsx",
        target: "@/components/animated-number.tsx",
        type: "registry:component",
      },
      {
        path: "registry/components/shared/callout.tsx",
        target: "@/components/ui/callout.tsx",
        type: "registry:component",
      },
      {
        path: "registry/components/shared/metric.tsx",
        target: "@/components/ui/metric.tsx",
        type: "registry:component",
      },
      {
        path: "components/charts/chart-context.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/chart-defs.ts",
        type: "registry:lib",
      },
      {
        path: "components/charts/chart-reveal-clip.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/animation.ts",
        type: "registry:lib",
      },
      {
        path: "components/charts/use-chart-interaction.ts",
        type: "registry:lib",
      },
      {
        path: "components/charts/time-series-chart-shell.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/grid.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/line.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/line-chart.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/tooltip/index.ts",
        type: "registry:lib",
      },
      {
        path: "registry/components/clarity-analytics/clarity-analytics.tsx",
        target: "@/components/clarity-analytics.tsx",
        type: "registry:component",
      },
    ],
    name: "clarity-analytics",
    title: "Clarity Analytics",
    type: "registry:component",
  },
  {
    categories: ["analytics"],
    dependencies: [
      "date-fns",
      "recharts",
      "@number-flow/react",
      "@visx/grid",
      "@visx/scale",
      "@visx/shape",
      "@visx/curve",
      "motion",
    ],
    description:
      "Display AI token usage statistics including input/output tokens and cost tracking.",
    files: [
      {
        path: "registry/types/tokscale.ts",
        type: "registry:lib",
      },
      {
        path: "registry/lib/format.ts",
        type: "registry:lib",
      },
      {
        path: "registry/lib/models.ts",
        type: "registry:lib",
      },
      {
        path: "registry/components/shared/animated-number.tsx",
        target: "@/components/animated-number.tsx",
        type: "registry:component",
      },
      {
        path: "registry/components/shared/callout.tsx",
        target: "@/components/ui/callout.tsx",
        type: "registry:component",
      },
      {
        path: "registry/components/shared/metric.tsx",
        target: "@/components/ui/metric.tsx",
        type: "registry:component",
      },
      {
        path: "registry/components/shared/provider-logo.tsx",
        target: "@/components/stats/provider-logo.tsx",
        type: "registry:component",
      },
      {
        path: "components/charts/chart-context.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/chart-defs.ts",
        type: "registry:lib",
      },
      {
        path: "components/charts/chart-reveal-clip.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/animation.ts",
        type: "registry:lib",
      },
      {
        path: "components/charts/use-chart-interaction.ts",
        type: "registry:lib",
      },
      {
        path: "components/charts/time-series-chart-shell.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/grid.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/line.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/line-chart.tsx",
        type: "registry:lib",
      },
      {
        path: "components/charts/tooltip/index.ts",
        type: "registry:lib",
      },
      {
        path: "components/stats/tokens-chart.tsx",
        type: "registry:lib",
      },
      {
        path: "registry/components/token-usage/token-usage.tsx",
        target: "@/components/token-usage.tsx",
        type: "registry:component",
      },
    ],
    name: "token-usage",
    title: "Token Usage",
    type: "registry:component",
  },
  {
    categories: ["examples"],
    dependencies: ["motion"],
    description: "Demo example for Link Reveal component.",
    files: [
      {
        path: "registry/examples/link-reveal-demo.tsx",
        type: "registry:example",
      },
    ],
    name: "link-reveal-demo",
    title: "Link Reveal Demo",
    type: "registry:example",
  },
  {
    categories: ["examples"],
    dependencies: ["date-fns", "recharts"],
    description: "Demo example for Clarity Analytics component.",
    files: [
      {
        path: "registry/examples/clarity-analytics-demo.tsx",
        type: "registry:example",
      },
    ],
    name: "clarity-analytics-demo",
    title: "Clarity Analytics Demo",
    type: "registry:example",
  },
  {
    categories: ["examples"],
    dependencies: ["date-fns", "recharts"],
    description: "Demo example for Token Usage component.",
    files: [
      {
        path: "registry/examples/token-usage-demo.tsx",
        type: "registry:example",
      },
    ],
    name: "token-usage-demo",
    title: "Token Usage Demo",
    type: "registry:example",
  },
];
