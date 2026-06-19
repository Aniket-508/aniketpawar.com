import { Suspense } from "react";

import { FavoriteCategoryCombobox } from "@/components/favorites/category-combobox";
import { FavoritesListingList } from "@/components/favorites/listing-list";
import { Section } from "@/components/layout/section";
import { SearchInput } from "@/components/search-input";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import { FAVORITES } from "@/constants/favorites";
import { ROUTES } from "@/constants/routes";
import { QUERY_KEYS } from "@/lib/search-params/keys";
import { BreadcrumbJsonLd, favoritesBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION = "Things I keep coming back to.";

export const metadata = createMetadata({
  canonical: ROUTES.FAVORITES,
  description: DESCRIPTION,
  title: "Favorites",
});

const FavoritesPage = async () => {
  const favoriteLinks = FAVORITES.map((f) => f.url);
  const previews = await prefetchGlimpses(favoriteLinks);
  const queryKeys = QUERY_KEYS.favorites.page;

  return (
    <>
      <BreadcrumbJsonLd items={favoritesBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 py-6">
        <Title className="text-xl font-medium italic">{"favorites."}</Title>
        <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
      </header>
      <Section className="delay-100 flex flex-col gap-4 py-2">
        <div className="flex items-center gap-2">
          <Suspense>
            <SearchInput
              queryKey={queryKeys.q}
              id="input-group-search"
              placeholder="Search favorites..."
              className="flex-1"
            />
          </Suspense>
          <Suspense>
            <FavoriteCategoryCombobox queryKey={queryKeys.category} />
          </Suspense>
          <Suspense>
            <ViewToggle queryKey={queryKeys.view} section="favorites" />
          </Suspense>
        </div>
        <Suspense>
          <FavoritesListingList previews={previews} queryKeys={queryKeys} />
        </Suspense>
      </Section>
    </>
  );
};

export default FavoritesPage;
