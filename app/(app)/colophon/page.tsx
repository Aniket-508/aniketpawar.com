import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd, colophonBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION =
  "Technologies, tools, and design choices that power this site.";

export const metadata = createMetadata({
  canonical: ROUTES.COLOPHON,
  description: DESCRIPTION,
  title: "Colophon",
});

const COLOPHON_ITEMS = [
  {
    category: "Framework",
    items: ["Next.js", "React", "TypeScript"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "shadcn/ui", "Framer Motion"],
  },
  {
    category: "Content",
    items: ["fuma-content", "MDX", "Shiki"],
  },
  {
    category: "Infrastructure",
    items: ["Vercel", "GitHub", "pnpm"],
  },
  {
    category: "Typography",
    items: ["Geist", "Geist Mono", "Instrument Serif"],
  },
] as const;

const ColophonPage = () => (
  <>
    <BreadcrumbJsonLd items={colophonBreadcrumbs()} />
    <header className="animate-slide-in space-y-2 px-4 py-6">
      <Title className="text-xl font-medium italic">{"colophon."}</Title>
      <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
    </header>
    <Section className="delay-100 flex flex-col gap-6 py-2">
      {COLOPHON_ITEMS.map((group) => (
        <div key={group.category} className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-primary">
            {group.category}
          </h2>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded-md border px-2.5 py-1 text-xs text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </Section>
  </>
);

export default ColophonPage;
