import { Section } from "@/components/layout/section";
import { CRAFTS } from "@/constants/crafts";

import { CraftsView } from "./view";

const CraftSection = () => (
  <Section className="delay-400 flex flex-col gap-4" id="crafts">
    <CraftsView crafts={CRAFTS} />
    {/* <ViewAllButton href={ROUTES.CRAFTS} eventName="crafts" className="mx-auto" /> */}
  </Section>
);

export { CraftSection };
