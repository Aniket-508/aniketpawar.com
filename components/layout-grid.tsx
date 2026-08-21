"use client";

import { cn } from "@/lib/utils";
import { useGridMode } from "@/providers/grid-mode-provider";

export const LayoutGrid = () => {
  const { enabled } = useGridMode();

  if (!enabled) {
    return null;
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-40 flex justify-center"
      )}
    >
      <div className="relative h-full w-full max-w-screen-sm">
        <div className="absolute inset-y-0 left-0 w-px border-l border-dashed border-border" />
        <div className="absolute inset-y-0 right-0 w-px border-r border-dashed border-border" />
      </div>
    </div>
  );
};
