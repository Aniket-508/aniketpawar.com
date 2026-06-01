import type { Metadata } from "next";
import Link from "next/link";

import { ExperiencesView } from "@/components/experiences-view";
import { Container } from "@/components/layout/container";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getExperiences } from "@/lib/experiences";

export const metadata: Metadata = {
  description: "Work history — roles, highlights, and technologies used.",
  title: `Experience · ${SITE.AUTHOR.NAME}`,
};

const ExperiencesPage = () => {
  const experiences = getExperiences();

  return (
    <Container className="pt-20 pb-14">
      <div className="mb-10 space-y-4">
        <Link
          href={ROUTES.HOME}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Home
        </Link>
        <Title>{"experience."}</Title>
        <p className="text-sm text-muted-foreground">
          {experiences.length} roles — where I have worked and what I shipped.
        </p>
      </div>
      <ExperiencesView showHeader={false} experiences={experiences} />
    </Container>
  );
};

export default ExperiencesPage;
