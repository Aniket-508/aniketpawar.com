import type { Metadata } from "next";

import { ExperiencesView } from "@/components/experiences-view";
import { Section } from "@/components/layout/section";
import { Title } from "@/components/ui/title";
import { SITE } from "@/constants/site";
import { getExperiences } from "@/lib/experiences";

export const metadata: Metadata = {
  description: "Work history — roles, highlights, and technologies used.",
  title: `Experience · ${SITE.AUTHOR.NAME}`,
};

const ExperiencesPage = () => {
  const experiences = getExperiences();

  return (
    <>
      <div className="space-y-2 px-4 pt-6 pb-2">
        <Title>{"experience."}</Title>
        <p className="text-muted-foreground text-sm">
          Where I have worked and what I shipped.
        </p>
      </div>
      <Section className="delay-100 flex flex-col gap-8">
        <ExperiencesView showHeader={false} experiences={experiences} />
      </Section>
    </>
  );
};

export default ExperiencesPage;
