import { CraftsView } from "@/components/crafts-view";
import { Section } from "@/components/layout/section";
import { CRAFTS } from "@/constants/crafts";

const CraftSection = () => (
  <Section className="delay-400 flex flex-col gap-4" id="crafts">
    <CraftsView crafts={CRAFTS} />
    {/* <ViewAllButton href={ROUTES.CRAFTS} eventName="crafts" className="mx-auto" /> */}
  </Section>
);

export { CraftSection };
