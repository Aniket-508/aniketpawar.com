import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Section } from "@/components/ui/section";
import { ViewAllButton } from "@/components/view-all-button";
import { ROUTES } from "@/constants/routes";
import { getHomepageExperiences } from "@/lib/experiences";

import { ExperiencesView } from "./view";

const ExperienceSection = async () => {
  const displayed = getHomepageExperiences();
  const orgLinks = displayed
    .map((exp) => exp.experienceOrg.link)
    .filter(Boolean);
  const previews = await prefetchGlimpses(orgLinks);

  return (
    <Section className="delay-500 flex flex-col gap-4" id="experience">
      <ExperiencesView experiences={displayed} previews={previews} />
      <div className="flex items-center justify-center">
        <ViewAllButton href={ROUTES.EXPERIENCES} eventName="experience" />
      </div>
    </Section>
  );
};

export { ExperienceSection };
