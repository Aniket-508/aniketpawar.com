"use client";

import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { AppLink } from "@/components/ui/app-link";
import { Badge } from "@/components/ui/badge";
import { Title } from "@/components/ui/title";
import type { Variant } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { TechStackItem } from "@/types/tech-stack";

interface TechStackViewProps {
  items: TechStackItem[];
  showHeader?: boolean;
  headerClassName?: string;
  defaultVariant?: Variant;
  viewClassName?: string;
}

const groupByCategory = (
  items: TechStackItem[]
): Record<string, TechStackItem[]> => {
  const grouped: Record<string, TechStackItem[]> = {};
  for (const item of items) {
    for (const category of item.categories) {
      (grouped[category] ??= []).push(item);
    }
  }
  return grouped;
};

const TechStackView = ({
  items,
  showHeader = true,
  headerClassName,
  viewClassName,
  defaultVariant = "list",
}: TechStackViewProps) => {
  const [variant, setVariant] = useState(defaultVariant);
  const grouped = groupByCategory(items);

  return (
    <>
      {showHeader && (
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            headerClassName
          )}
        >
          <div className="group/stack flex flex-1 items-center gap-1">
            <Title
              className="text-xl font-medium italic"
              render={<h2>{"stack."}</h2>}
            />
            <CopyLink
              title={"Stack"}
              className="hidden group-hover/stack:inline-flex"
            />
          </div>
        </div>
      )}

      {variant === "list" && (
        <div
          className={cn(
            "group relative divide-y divide-border [--badge-height:--spacing(6)] [--col-left-width:--spacing(40)]",
            viewClassName
          )}
        >
          {Object.entries(grouped).map(([category, catItems], index) => {
            const categoryId = `stack-${category
              .toLowerCase()
              .replaceAll(/[^a-z0-9]+/gu, "-")
              .replaceAll(/(^-|-$)/gu, "")}`;

            return (
              <div
                key={category}
                className="transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 grid items-start gap-y-2 py-4 sm:grid-cols-[var(--col-left-width)_1fr]"
              >
                <div
                  id={categoryId}
                  className="text-sm/(--badge-height) text-muted-foreground"
                >
                  <span
                    className="mr-1.5 font-mono text-muted-foreground/50 select-none"
                    aria-hidden
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  {category}
                </div>

                <ul
                  aria-labelledby={categoryId}
                  className="flex flex-wrap gap-1.5 sm:pl-4"
                >
                  {catItems.map((item) => (
                    <li key={item.key} className="flex">
                      <AppLink
                        href={item.href}
                        target="_blank"
                        external={false}
                      >
                        <Badge
                          variant="secondary"
                          className="gap-1.5 font-mono"
                        >
                          {item.icon}
                          {item.title}
                        </Badge>
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export { TechStackView };
