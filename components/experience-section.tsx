import { CopyLink } from "@/components/copy-link";
import { ExperienceItem } from "@/components/experience-item";
import { Section } from "@/components/layout/section";
import { Title } from "@/components/ui/title";
import { EXPERIENCES } from "@/constants/experiences";

const ExperienceSection = () => (
  <Section
    className="animation-delay-[900ms] grid grid-cols-1 justify-start gap-6"
    id="experience"
  >
    <span className="group/experience flex items-center space-x-2">
      <Title>{"experience."}</Title>
      <CopyLink
        title={"Experience"}
        className="hidden size-4 group-hover/experience:inline"
      />
    </span>
    {EXPERIENCES.map((experience, experienceIndex) => (
      <ExperienceItem {...experience} key={experienceIndex} />
    ))}
  </Section>
);

export { ExperienceSection };
