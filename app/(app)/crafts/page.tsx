import type { Metadata } from "next";

import { CraftsView } from "@/components/crafts-view";
import { Section } from "@/components/layout/section";
import { Title } from "@/components/ui/title";
import { SITE } from "@/constants/site";
import { getCrafts } from "@/lib/crafts";

export const metadata: Metadata = {
  description: "Motion and interaction experiments — UI crafts and prototypes.",
  title: `Crafts · ${SITE.AUTHOR.NAME}`,
};

const CraftsPage = () => {
  const crafts = getCrafts();

  return (
    <>
      <div className="space-y-2 px-4 pt-6 pb-2">
        <Title>{"crafts."}</Title>
        <p className="text-muted-foreground text-sm">
          Motion studies and interaction experiments.
        </p>
      </div>
      <Section className="delay-100 flex flex-col gap-8">
        <CraftsView showHeader={false} defaultVariant="grid" crafts={crafts} />
      </Section>
    </>
  );
};

export default CraftsPage;
