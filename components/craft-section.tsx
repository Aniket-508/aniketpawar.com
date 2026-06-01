"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { CRAFTS } from "@/constants/crafts";
import { ROUTES } from "@/constants/routes";

import { CraftsView } from "./crafts-view";

const CraftSection = () => (
  <Section
    className="animation-delay-700 grid grid-cols-1 place-items-center gap-8"
    id="crafts"
  >
    <CraftsView
      headerClassName="col-span-2 w-full"
      viewClassName="col-span-2 w-full"
      crafts={CRAFTS}
    />
    <Button variant="secondary" className="group" asChild>
      <Link href={ROUTES.CRAFTS}>
        View all
        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      </Link>
    </Button>
  </Section>
);

export { CraftSection };
