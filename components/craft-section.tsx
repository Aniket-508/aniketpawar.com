import { CraftsView } from "@/components/crafts-view";
import { Section } from "@/components/layout/section";
import { CRAFTS } from "@/constants/crafts";

const CraftSection = () => (
  <Section
    className="delay-400 grid grid-cols-1 place-items-center gap-4"
    id="crafts"
  >
    <CraftsView
      headerClassName="col-span-2 w-full"
      viewClassName="col-span-2 w-full"
      crafts={CRAFTS}
    />
    {/* <ViewAllButton href={ROUTES.CRAFTS} eventName="crafts" /> */}
  </Section>
);

export { CraftSection };
