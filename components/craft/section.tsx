import { Section } from "@/components/ui/section";
import { CRAFTS } from "@/constants/crafts";

import { CraftsView } from "./view";

const CraftSection = () => (
  <Section className="delay-400 flex flex-col gap-4" id="crafts">
    <CraftsView crafts={CRAFTS} />
    {/* <div className="flex items-center justify-center">
      <ViewAllButton href={ROUTES.CRAFTS} eventName="crafts" />
    </div> */}
  </Section>
);

export { CraftSection };
