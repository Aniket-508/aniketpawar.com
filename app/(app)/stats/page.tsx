import { AnalyticsSection } from "@/components/stats/analytics-section";
import { TokensSection } from "@/components/stats/tokens-section";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION =
  "Metrics across my code, projects, socials, and this website.";

export const metadata = createMetadata({
  canonical: ROUTES.STATS,
  description: DESCRIPTION,
  title: "Stats",
});

const StatsPage = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Stats", path: ROUTES.STATS }]} />
    <header className="animate-slide-in space-y-2 px-4 pt-6 pb-4">
      <Title className="text-xl font-medium italic">{"stats."}</Title>
      <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
    </header>

    <AnalyticsSection />
    <TokensSection />
  </>
);

export default StatsPage;
