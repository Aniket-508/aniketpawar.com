import { ExperiencesView } from "@/components/experiences-view";
import { Section } from "@/components/layout/section";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { EXPERIENCES } from "@/constants/experiences";

const ExperienceSection = async () => {
  const orgLinks = EXPERIENCES.map((exp) => exp.experienceOrg.link).filter(
    Boolean
  );
  const previews = await prefetchGlimpses(orgLinks);

  return (
    <Section
      className="delay-400 grid grid-cols-1 place-items-center gap-4"
      id="experience"
    >
      <ExperiencesView
        headerClassName="w-full"
        experiences={EXPERIENCES}
        previews={previews}
      />
    </Section>
  );
};

export { ExperienceSection };
