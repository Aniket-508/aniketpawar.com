"use client";

import { AppLink } from "@/components/ui/app-link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Variant } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { TechStackItem } from "@/types/tech-stack";

interface TechStackItemProps extends Omit<
  React.ComponentProps<"div">,
  "title"
> {
  index: number;
  category: string;
  items: TechStackItem[];
  variant?: Variant;
}

const TechStackItem = ({
  index,
  category,
  items,
  variant = "list",
  className,
  ...attr
}: TechStackItemProps) => {
  const isGrid = variant === "grid";
  const categoryId = `stack-${category
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/(^-|-$)/gu, "")}`;

  return (
    <div
      className={cn(
        "transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 grid items-start gap-y-2 py-4 sm:grid-cols-[var(--col-left-width)_1fr]",
        className
      )}
      {...attr}
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
        {items.map((item) => (
          <li key={item.key} className="flex">
            <AppLink href={item.href} target="_blank">
              {isGrid ? (
                <div className="rounded-md border p-1">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <div className="rounded-sm border select-none size-10 [&_svg:not([class*='size-'])]:size-6 flex items-center justify-center">
                          {item.icon}
                        </div>
                      }
                    />
                    <TooltipContent>{item.title}</TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <Badge variant="secondary" className="gap-1.5 font-mono">
                  {item.icon}
                  {item.title}
                </Badge>
              )}
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TechStackItem, type TechStackItemProps };
