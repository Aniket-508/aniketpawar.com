import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { getRegistryDemo } from "@/components/registry/demos";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import {
  getRegistryEntries,
  REGISTRY_KINDS,
  registryEntryHref,
  registryInstallCommand,
  registryPromptText,
} from "@/lib/registry-items";
import type { RegistryKind } from "@/lib/registry-items";
import { BreadcrumbJsonLd, registryBreadcrumbs } from "@/seo/json-ld";

const RegistryIndex = ({ kind }: { kind: RegistryKind }) => {
  const config = REGISTRY_KINDS[kind];
  const entries = getRegistryEntries(kind);

  return (
    <>
      <BreadcrumbJsonLd items={registryBreadcrumbs(kind)} />
      <header className="animate-slide-in space-y-2 px-4 pt-6 pb-2">
        <Title className="text-xl font-medium italic">{config.heading}</Title>
        <p className="text-muted-foreground text-sm">{config.description}</p>
      </header>
      <Section className="delay-100 flex flex-col py-2">
        {entries.length === 0 ? (
          <p className="text-muted-foreground py-4 text-sm">
            {config.emptyState}
          </p>
        ) : (
          <div className="group grid grid-cols-1">
            {entries.map((entry) => {
              const DemoComponent = getRegistryDemo(entry.slug);

              return (
                <div
                  className="py-4 w-full transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 flex flex-col items-start gap-1"
                  key={entry.slug}
                >
                  <div className="w-full rounded-md border p-1">
                    <div className="relative w-full overflow-hidden rounded-sm border">
                      <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CopyButton
                          text={registryInstallCommand(entry.slug)}
                          variant="command"
                        />
                        <CopyButton
                          text={registryPromptText(entry.slug)}
                          variant="prompt"
                        />
                      </div>
                      {DemoComponent ? <DemoComponent /> : null}
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <Title
                      className="font-sans text-base font-normal flex-1"
                      render={
                        <Link
                          href={registryEntryHref(entry)}
                          className="hover:underline underline-offset-4"
                        >
                          {entry.title}
                        </Link>
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
};

export { RegistryIndex };
