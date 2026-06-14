import { CraftsView } from "@/components/craft/view";
import { Section } from "@/components/layout/section";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { getCrafts } from "@/lib/crafts";
import { BreadcrumbJsonLd, craftsBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  canonical: ROUTES.CRAFTS,
  description: "Motion and interaction experiments — UI crafts and prototypes.",
  title: "Crafts",
});

const CraftsPage = () => {
  const crafts = getCrafts();

  return (
    <>
      <BreadcrumbJsonLd items={craftsBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 pt-6 pb-2">
        <Title className="text-xl font-medium italic">{"crafts."}</Title>
        <p className="text-muted-foreground text-sm">
          Motion studies and interaction experiments.
        </p>
      </header>
      <Section className="delay-100 flex flex-col py-2">
        <CraftsView showHeader={false} defaultVariant="grid" crafts={crafts} />
      </Section>
    </>
  );
};

export default CraftsPage;
