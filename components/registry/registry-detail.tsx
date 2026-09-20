import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { InstallCommand } from "@/components/install-command";
import { getRegistryDemo } from "@/components/registry/demos";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import {
  getRegistryEntryBySlug,
  REGISTRY_KINDS,
  registryEntryHref,
  registryInstallCommand,
  registryPromptText,
} from "@/lib/registry-items";
import type { RegistryKind } from "@/lib/registry-items";
import { BreadcrumbJsonLd, registryBreadcrumbs } from "@/seo/json-ld";

interface RegistryDetailProps {
  kind: RegistryKind;
  slug: string;
}

const RegistryDetail = ({ kind, slug }: RegistryDetailProps) => {
  const config = REGISTRY_KINDS[kind];
  const entry = getRegistryEntryBySlug(kind, slug);

  if (!entry) {
    notFound();
  }

  const installCommand = registryInstallCommand(entry.slug);
  const DemoComponent = getRegistryDemo(entry.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={registryBreadcrumbs(kind, {
          name: entry.title,
          path: registryEntryHref(entry),
        })}
      />

      <article className="space-y-4 px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href={config.route}
            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeftIcon className="size-3" />
            {config.label}
          </Link>
          <span>/</span>
          <Badge variant="outline" className="text-muted-foreground">
            {entry.category}
          </Badge>
        </div>

        <header className="animate-slide-in space-y-2">
          <Title className="font-sans">{entry.title}</Title>
          <p className="text-muted-foreground text-sm">{entry.description}</p>
        </header>

        <div className="animate-slide-in delay-100 group w-full rounded-md border p-1">
          <div className="relative w-full overflow-hidden rounded-sm border">
            <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={installCommand} variant="command" />
              <CopyButton
                text={registryPromptText(entry.slug)}
                variant="prompt"
              />
            </div>
            {DemoComponent ? <DemoComponent /> : null}
          </div>
        </div>

        <Section className="delay-200 space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Installation</h3>
            <InstallCommand command={installCommand} />
          </div>

          {entry.dependencies.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Dependencies</h3>
              <div className="flex flex-wrap gap-1">
                {entry.dependencies.map((dep) => (
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

export { RegistryDetail };
