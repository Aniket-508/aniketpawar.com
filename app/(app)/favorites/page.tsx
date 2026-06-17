import { Section } from "@/components/layout/section";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { FAVORITES } from "@/constants/favorites";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd, favoritesBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

import FavoritesPageClient from "./page.client";

const DESCRIPTION = "Things I love and use regularly.";

export const metadata = createMetadata({
  canonical: ROUTES.FAVORITES,
  description: DESCRIPTION,
  title: "Favorites",
});

const FavoritesPage = async () => {
  const favoriteLinks = FAVORITES.map((f) => f.url);
  const previews = await prefetchGlimpses(favoriteLinks);

  return (
    <>
      <BreadcrumbJsonLd items={favoritesBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 py-6">
        <Title className="text-xl font-medium italic">{"favorites."}</Title>
        <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
      </header>
      <Section className="delay-100 flex flex-col gap-4 py-2">
        <FavoritesPageClient previews={previews} />
      </Section>
    </>
  );
};

export default FavoritesPage;
