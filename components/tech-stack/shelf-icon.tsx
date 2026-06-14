import { cn } from "@/lib/utils";
import type { TechStackItem } from "@/types/tech-stack";

import { TechStackItemComponent } from "./item";

interface ShelfRowProps {
  category: string;
  items: TechStackItem[];
  index: number;
}

const ShelfRow = ({ category, items, index }: ShelfRowProps) => {
  const categoryId = `stack-shelf-${category
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/(^-|-$)/gu, "")}`;

  return (
    <div
      className={cn(
        "transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30",
        "border-border pb-6 pt-2",
        index > 0 && "border-t"
      )}
    >
      <div id={categoryId} className="mb-4 text-sm text-muted-foreground">
        <span
          className="mr-1.5 font-mono text-muted-foreground/50 select-none"
          aria-hidden
        >
          {(index + 1).toString().padStart(2, "0")}
        </span>
        {category}
      </div>
      <div className="grid grid-cols-3 justify-items-center gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-8 md:grid-cols-5 lg:grid-cols-6">
        {items.map(({ key, ...item }) => (
          <TechStackItemComponent key={key} {...item} variant="grid" />
        ))}
      </div>
    </div>
  );
};

export { ShelfRow };
