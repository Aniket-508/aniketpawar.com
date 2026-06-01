import type { Metadata } from "next";
import Link from "next/link";

import { CraftsView } from "@/components/crafts-view";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getCrafts } from "@/lib/crafts";

export const metadata: Metadata = {
  description: "Motion and interaction experiments — UI crafts and prototypes.",
  title: `Crafts · ${SITE.AUTHOR.NAME}`,
};

const CraftsPage = () => {
  const crafts = getCrafts();

  return (
    <Container className="pt-20 pb-14">
      <div className="space-y-4 px-4">
        <Link
          href={ROUTES.HOME}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Home
        </Link>
        <Title>{"crafts."}</Title>
        <p className="text-sm text-muted-foreground">
          {crafts.length} crafts — motion studies and interaction experiments.
        </p>
      </div>
      <Section className="animation-delay-100 flex flex-col gap-8">
        <CraftsView showHeader={false} defaultVariant="grid" crafts={crafts} />
      </Section>
    </Container>
  );
};

export default CraftsPage;
