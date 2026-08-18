import { ASSETS } from "@/constants/links";
import { ROUTES } from "@/constants/routes";

export interface UiComponent {
  slug: string;
  title: string;
  description: string;
  preview: string;
  addedAt: string;
  category: string;
  dependencies: string[];
}

const UI_COMPONENTS: readonly UiComponent[] = [
  {
    addedAt: "Jan 2025",
    category: "effects",
    dependencies: ["motion"],
    description:
      "Animated link that reveals the website favicon and primary color on hover.",
    preview: ASSETS.CRUD_DIALOG_ANIMATION,
    slug: "link-reveal",
    title: "Link Reveal",
  },
  {
    addedAt: "Jan 2025",
    category: "analytics",
    dependencies: ["@microsoft/clarity"],
    description:
      "Microsoft Clarity analytics integration for tracking user behavior and session recordings.",
    preview: ASSETS.FOUNDER_LETTER_ANIMATION,
    slug: "clarity-analytics",
    title: "Clarity Analytics",
  },
  {
    addedAt: "Jan 2025",
    category: "analytics",
    dependencies: [],
    description:
      "Display AI token usage statistics including input/output tokens and cost tracking.",
    preview: ASSETS.CRUD_DIALOG_ANIMATION,
    slug: "token-usage",
    title: "Token Usage",
  },
] as const;

export const getUiComponents = () => UI_COMPONENTS;

export const getUiComponentBySlug = (slug: string): UiComponent | undefined =>
  UI_COMPONENTS.find((c) => c.slug === slug);

export const getUiComponentSlugs = (): string[] =>
  UI_COMPONENTS.map((c) => c.slug);

export const uiComponentBreadcrumbs = (component?: {
  name: string;
  slug: string;
}) => [
  { name: "Home", path: ROUTES.HOME },
  { name: "UI", path: ROUTES.UI },
  ...(component
    ? [{ name: component.name, path: `${ROUTES.UI}/${component.slug}` }]
    : []),
];
