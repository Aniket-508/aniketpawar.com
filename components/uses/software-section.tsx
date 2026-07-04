import { Section } from "@/components/ui/section";
import { ViewAllButton } from "@/components/view-all-button";
import { ROUTES } from "@/constants/routes";
import { TECH_STACK } from "@/constants/tech-stack";

import { TechStackView } from "./view";

const HIDDEN_CATEGORIES = new Set(["Dev Tools", "Native Apps"]);

const featuredItems = TECH_STACK.filter((item) =>
  item.categories.every((cat) => !HIDDEN_CATEGORIES.has(cat))
);

const SoftwareSection = () => (
  <Section id="stack" className="delay-200 flex flex-col gap-4">
    <TechStackView items={featuredItems} />
    <ViewAllButton href={ROUTES.USES} eventName="stack" className="mx-auto" />
  </Section>
);

export { SoftwareSection };
