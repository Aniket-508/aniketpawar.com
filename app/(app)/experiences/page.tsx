import { ExperiencesView } from "@/components/experiences-view";
import { Section } from "@/components/layout/section";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { getExperiences } from "@/lib/experiences";
import { BreadcrumbJsonLd, experiencesBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  canonical: ROUTES.EXPERIENCES,
  description: "Work history — roles, highlights, and technologies used.",
  title: "Experience",
});

const ExperiencesPage = () => {
  const experiences = getExperiences();

  return (
    <>
      <BreadcrumbJsonLd items={experiencesBreadcrumbs()} />
      <div className="space-y-2 px-4 pt-6 pb-2">
        <Title asChild>
          <h1>{"experience."}</h1>
        </Title>

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
