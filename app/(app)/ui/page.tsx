import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { getUiComponents } from "@/lib/ui-components";
import { ClarityAnalyticsDemo } from "@/registry/examples/clarity-analytics-demo";
import { LinkRevealDemo } from "@/registry/examples/link-reveal-demo";
import { TokenUsageDemo } from "@/registry/examples/token-usage-demo";
import { BreadcrumbJsonLd, uiBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION = "Open-source UI components and registry.";

export const metadata = createMetadata({
  canonical: ROUTES.UI,
  description: DESCRIPTION,
  title: "UI",
});

const demoComponents: Record<string, React.ComponentType> = {
  "clarity-analytics": ClarityAnalyticsDemo,
  "link-reveal": LinkRevealDemo,
  "token-usage": TokenUsageDemo,
};

const UIPage = () => {
  const components = getUiComponents();

  return (
    <>
      <BreadcrumbJsonLd items={uiBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 pt-6 pb-2">
        <Title className="text-xl font-medium italic">{"ui."}</Title>
        <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
      </header>
      <Section className="delay-100 flex flex-col py-2">
        <div className="group grid grid-cols-1">
          {components.map((component) => {
            const DemoComponent = demoComponents[component.slug];
            const installCommand = `npx shadcn@latest add "https://aniketpawar.com/r/${component.slug}.json"`;
            const promptText = `Add the @aniketui/${component.slug} component to my project.`;

            return (
              <div
                className="py-4 w-full transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 flex flex-col items-start gap-1"
                key={component.slug}
              >
                <div className="w-full rounded-md border p-1">
                  <div className="relative w-full overflow-hidden rounded-sm border">
                    <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton text={installCommand} variant="command" />
                      <CopyButton text={promptText} variant="prompt" />
                    </div>
                    {DemoComponent ? <DemoComponent /> : null}
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <Title
                    className="font-sans text-base font-normal flex-1"
                    render={
                      <Link
                        href={`${ROUTES.UI}/${component.slug}`}
                        className="hover:underline underline-offset-4"
                      >
                        {component.title}
                      </Link>
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
};

export default UIPage;
