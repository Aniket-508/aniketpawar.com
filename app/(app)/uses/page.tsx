import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { HardwareSection } from "@/components/uses/hardware-section";
import { SoftwareSection } from "@/components/uses/software-section";
import { HARDWARE_ITEMS } from "@/constants/hardware";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd, usesBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION =
  "Technologies, frameworks, tools, and hardware I use daily.";

export const metadata = createMetadata({
  canonical: ROUTES.USES,
  description: DESCRIPTION,
  title: "Uses",
});

const UsesPage = async () => {
  const hardwareLinks = HARDWARE_ITEMS.map((item) => item.href);
  const previews = await prefetchGlimpses(hardwareLinks);

  return (
    <>
      <BreadcrumbJsonLd items={usesBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 pt-6 pb-4">
        <Title className="text-xl font-medium italic">{"uses."}</Title>
        <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
      </header>

      <SoftwareSection />
      <HardwareSection previews={previews} />
    </>
  );
};

export default UsesPage;
