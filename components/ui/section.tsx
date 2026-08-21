"use client";

import { cn } from "@/lib/utils";
import { useGridMode } from "@/providers/grid-mode-provider";

const Section = ({ className, ...attr }: React.ComponentProps<"section">) => {
  const { enabled } = useGridMode();

  return (
    <section
      className={cn(
        "animate-slide-in px-4 py-6",
        enabled && "border-b border-border",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </section>
  );
};

export { Section };
