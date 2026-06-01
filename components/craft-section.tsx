"use client";

import { Section } from "@/components/layout/section";
import { CRAFTS } from "@/constants/crafts";

import { CraftsView } from "./crafts-view";

const CraftSection = () => (
  <Section
    className="delay-400 grid grid-cols-1 place-items-center gap-8"
    id="crafts"
  >
    <CraftsView
      headerClassName="col-span-2 w-full"
      viewClassName="col-span-2 w-full"
      crafts={CRAFTS}
    />
    {/* <Button variant="secondary" className="group" asChild>
      <Link href={ROUTES.CRAFTS} onClick={() => trackViewAllClick("crafts")}>
        View all
        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      </Link>
    </Button> */}
  </Section>
);

export { CraftSection };
