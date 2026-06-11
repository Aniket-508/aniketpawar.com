"use client";

import { ExperiencesView } from "@/components/experiences-view";
import { Section } from "@/components/layout/section";
import { EXPERIENCES } from "@/constants/experiences";

const ExperienceSection = () => (
  <Section
    className="delay-500 grid grid-cols-1 place-items-center gap-8"
    id="experience"
  >
    <ExperiencesView headerClassName="w-full" experiences={EXPERIENCES} />
    {/* <Button variant="secondary" className="group w-fit" asChild>
      <Link
        href={ROUTES.EXPERIENCES}
        onClick={() => trackViewAllClick("experience")}
      >
        View all
        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      </Link>
    </Button> */}
  </Section>
);

export { ExperienceSection };
