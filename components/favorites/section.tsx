import { Section } from "@/components/layout/section";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { ViewAllButton } from "@/components/view-all-button";
import { FAVORITES } from "@/constants/favorites";
import { ROUTES } from "@/constants/routes";

import { FavoritesView } from "./view";

const FAVORITES_LIMIT = 5;

const FavoritesSection = async () => {
  const favoriteLinks = FAVORITES.slice(0, FAVORITES_LIMIT).map((f) => f.url);
  const previews = await prefetchGlimpses(favoriteLinks);

  return (
    <Section className="delay-300 flex flex-col gap-4" id="favorites">
      <FavoritesView
        favorites={FAVORITES.slice(0, FAVORITES_LIMIT)}
        defaultVariant="grid"
        previews={previews}
      />
      <ViewAllButton
        href={ROUTES.FAVORITES}
        eventName="favorites"
        className="mx-auto"
      />
    </Section>
  );
};

export { FavoritesSection };
