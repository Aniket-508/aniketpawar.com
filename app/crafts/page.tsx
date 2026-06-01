import type { Metadata } from "next";
import Link from "next/link";

import { CraftsView } from "@/components/crafts-view";
import { Container } from "@/components/layout/container";
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
      <div className="mb-10 space-y-4">
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
      <CraftsView
        showHeader={false}
        headerClassName="mb-8 justify-end"
        crafts={crafts}
      />
    </Container>
  );
};

export default CraftsPage;
