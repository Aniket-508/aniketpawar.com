import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { EXPERIENCES } from "@/constants/experiences";
import { ROUTES } from "@/constants/routes";

import { ExperiencesView } from "./experiences-view";

const ExperienceSection = () => (
  <Section
    className="animation-delay-[900ms] grid grid-cols-1 place-items-center gap-8"
    id="experience"
  >
    <ExperiencesView headerClassName="w-full" experiences={EXPERIENCES} />
    <Button variant="secondary" className="group w-fit" asChild>
      <Link href={ROUTES.EXPERIENCES}>
        View all
        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      </Link>
    </Button>
  </Section>
);

export { ExperienceSection };
