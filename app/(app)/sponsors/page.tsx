import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { getSponsors } from "@/lib/github/sponsors";
import { BreadcrumbJsonLd, sponsorsBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION = "Support my work and open-source projects.";

export const metadata = createMetadata({
  canonical: ROUTES.SPONSORS,
  description: DESCRIPTION,
  title: "Sponsors",
});

const SponsorsPage = async () => {
  const sponsors = await getSponsors();

  return (
    <>
      <BreadcrumbJsonLd items={sponsorsBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 py-6">
        <Title className="text-xl font-medium italic">{"sponsors."}</Title>
        <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
      </header>
      <Section className="delay-100 flex flex-col gap-4 py-2">
        {sponsors.length > 0 ? (
          <div className="flex flex-col gap-3">
            {sponsors.map((sponsor) => (
              <Link
                key={sponsor.login}
                href={sponsor.websiteUrl ?? sponsor.url}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <Image
                  src={sponsor.avatarUrl}
                  alt={sponsor.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {sponsor.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    @{sponsor.login}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            No sponsors yet.{" "}
            <Link
              href={LINK.SPONSOR}
              target="_blank"
              rel="noopener"
              className="text-primary underline underline-offset-4"
            >
              Become the first
            </Link>
            .
          </p>
        )}
      </Section>
    </>
  );
};

export default SponsorsPage;
