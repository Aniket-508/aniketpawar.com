import type { ComponentType } from "react";

import { ClarityAnalyticsDemo } from "@/registry/examples/clarity-analytics-demo";
import { LinkRevealDemo } from "@/registry/examples/link-reveal-demo";
import { TokenUsageDemo } from "@/registry/examples/token-usage-demo";

/** Live preview rendered on registry index and detail pages, keyed by slug. */
const REGISTRY_DEMOS: Record<string, ComponentType> = {
  "clarity-analytics": ClarityAnalyticsDemo,
  "link-reveal": LinkRevealDemo,
  "token-usage": TokenUsageDemo,
};

export const getRegistryDemo = (slug: string): ComponentType | undefined =>
  REGISTRY_DEMOS[slug];
