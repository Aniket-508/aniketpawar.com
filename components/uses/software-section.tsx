"use client";

import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import { SOFTWARE_ITEMS } from "@/constants/software";
import type { SoftwareItem } from "@/constants/software";
import type { Variant } from "@/lib/events";
import { cn } from "@/lib/utils";

import { TechStackItem } from "./item";

const groupByCategory = (
  items: SoftwareItem[]
): Record<string, SoftwareItem[]> => {
  const grouped: Record<string, SoftwareItem[]> = {};
  for (const item of items) {
    for (const category of item.categories) {
      (grouped[category] ??= []).push(item);
    }
  }
  return grouped;
};

const SoftwareSection = () => {
  const [variant, setVariant] = useState<Variant>("list");
  const grouped = groupByCategory(SOFTWARE_ITEMS);

  return (
    <Section id="stack" className="delay-200 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="group/stack flex flex-1 items-center gap-1">
          <Title
            className="text-xl font-medium italic"
            render={<h2>{"software."}</h2>}
          />
          <CopyLink
            title={"Software"}
            className="hidden group-hover/stack:inline-flex"
          />
        </div>

        <ViewToggle value={variant} onChange={setVariant} section="stack" />
      </div>

      <div
        className={cn(
          "group relative",
          variant === "list" &&
            "divide-y divide-border [--badge-height:--spacing(6)] [--col-left-width:--spacing(40)]"
        )}
      >
        {Object.entries(grouped).map(([category, catItems], index) => (
          <TechStackItem
            key={category}
            index={index}
            category={category}
            items={catItems}
            variant={variant}
          />
        ))}
      </div>
    </Section>
  );
};

export { SoftwareSection };
