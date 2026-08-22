import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Section } from "@/components/ui/section";
import { EXPERIENCES } from "@/constants/experiences";

import { ExperiencesView } from "./view";

const ExperienceSection = async () => {
  const orgLinks = EXPERIENCES.map((exp) => exp.experienceOrg.link).filter(
    Boolean
  );
  const previews = await prefetchGlimpses(orgLinks);

  return (
    <Section className="delay-500 flex flex-col gap-4" id="experience">
      <ExperiencesView experiences={EXPERIENCES} previews={previews} />
    </Section>
  );
};

export { ExperienceSection };
