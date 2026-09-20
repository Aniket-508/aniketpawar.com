import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { InstallCommand } from "@/components/install-command";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import {
  getUiComponentBySlug,
  getUiComponentSlugs,
  uiComponentBreadcrumbs,
} from "@/lib/ui-components";
import { ClarityAnalyticsDemo } from "@/registry/examples/clarity-analytics-demo";
import { LinkRevealDemo } from "@/registry/examples/link-reveal-demo";
import { TokenUsageDemo } from "@/registry/examples/token-usage-demo";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

interface UiComponentPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  getUiComponentSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: UiComponentPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const component = getUiComponentBySlug(slug);

  if (!component) {
    return { title: "Component not found" };
  }

  return createMetadata({
    canonical: `${ROUTES.UI}/${component.slug}`,
    category: "UI Component",
    description: component.description,
    title: component.title,
  });
};

const demoComponents: Record<string, React.ComponentType> = {
  "clarity-analytics": ClarityAnalyticsDemo,
  "link-reveal": LinkRevealDemo,
  "token-usage": TokenUsageDemo,
};

const UiComponentPage = async ({ params }: UiComponentPageProps) => {
  const { slug } = await params;
  const component = getUiComponentBySlug(slug);

  if (!component) {
    notFound();
  }

  const installCommand = `npx shadcn@latest add "https://aniketpawar.com/r/${component.slug}.json"`;
  const promptText = `Add the @aniketui/${component.slug} component to my project.`;
  const DemoComponent = demoComponents[slug];

  return (
    <>
      <BreadcrumbJsonLd
        items={uiComponentBreadcrumbs({
          name: component.title,
          slug: component.slug,
        })}
      />

      <article className="space-y-4 px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href={ROUTES.UI}
            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeftIcon className="size-3" />
            UI
          </Link>
          <span>/</span>
          <Badge variant="outline" className="text-muted-foreground">
            {component.category}
          </Badge>
        </div>

        <header className="animate-slide-in space-y-2">
          <Title className="font-sans">{component.title}</Title>
          <p className="text-muted-foreground text-sm">
            {component.description}
          </p>
        </header>

        <div className="animate-slide-in delay-100 group w-full rounded-md border p-1">
          <div className="relative w-full overflow-hidden rounded-sm border">
            <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={installCommand} variant="command" />
              <CopyButton text={promptText} variant="prompt" />
            </div>
            {DemoComponent ? <DemoComponent /> : null}
          </div>
        </div>

        <Section className="delay-200 space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Installation</h3>
            <InstallCommand command={installCommand} />
          </div>

          {component.dependencies.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Dependencies</h3>
              <div className="flex flex-wrap gap-1">
                {component.dependencies.map((dep) => (
                  <Badge key={dep} variant="secondary" className="text-xs">
                    {dep}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Section>
      </article>
    </>
  );
};

export default UiComponentPage;
