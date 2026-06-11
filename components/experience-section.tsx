import { ExperiencesView } from "@/components/experiences-view";
import { Section } from "@/components/layout/section";
import { EXPERIENCES } from "@/constants/experiences";

const ExperienceSection = () => (
  <Section
    className="delay-500 grid grid-cols-1 place-items-center gap-4"
    id="experience"
  >
    <ExperiencesView headerClassName="w-full" experiences={EXPERIENCES} />
    {/* <ViewAllButton href={ROUTES.EXPERIENCES} eventName="experience" /> */}
  </Section>
);

export { ExperienceSection };
