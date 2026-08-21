"use client";

import { cn } from "@/lib/utils";
import { useGridMode } from "@/providers/grid-mode-provider";

const PageContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { enabled } = useGridMode();

  return (
    <div
      className={cn(enabled && "border-t border-b border-border", className)}
    >
      {children}
    </div>
  );
};

export { PageContent };
