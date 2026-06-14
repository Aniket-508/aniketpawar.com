import { Section } from "@/components/layout/section";
import { TechStackView } from "@/components/tech-stack/view";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { TECH_STACK } from "@/constants/tech-stack";
import { BreadcrumbJsonLd, stackBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  canonical: ROUTES.STACK,
  description:
    "Technologies, frameworks, and tools I use to build digital products.",
  title: "Stack",
});

const StackPage = () => (
  <>
    <BreadcrumbJsonLd items={stackBreadcrumbs()} />
    <header className="animate-slide-in space-y-2 px-4 pt-6 pb-2">
      <Title className="text-xl font-medium italic">{"stack."}</Title>
      <p className="text-muted-foreground text-sm">
        Technologies, frameworks, and tools I use to build digital products.
      </p>
    </header>
    <Section className="delay-100 flex flex-col py-2">
      <TechStackView
        showHeader={false}
        defaultVariant="grid"
        items={TECH_STACK}
      />
    </Section>
  </>
);

export default StackPage;
