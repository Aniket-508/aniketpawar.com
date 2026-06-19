import { Section } from "@/components/layout/section";
import { CRAFTS } from "@/constants/crafts";
import { QUERY_KEYS } from "@/lib/search-params/keys";

import { CraftsView } from "./view";

const CraftSection = () => (
  <Section className="delay-400 flex flex-col gap-4" id="crafts">
    <CraftsView viewQueryKey={QUERY_KEYS.crafts.section.view} crafts={CRAFTS} />
    {/* <ViewAllButton href={ROUTES.CRAFTS} eventName="crafts" className="mx-auto" /> */}
  </Section>
);

export { CraftSection };
