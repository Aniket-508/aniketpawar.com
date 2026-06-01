"use client";

import type { TOCMinimapProps } from "@/components/toc-minimap";
import { TOCMinimap } from "@/components/toc-minimap";
import { useMediaQuery } from "@/hooks/use-media-query";

const ContentTOC = (props: TOCMinimapProps) => {
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  if (!isDesktop) {
    return null;
  }

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-0 z-50">
      <TOCMinimap
        className="transition-opacity duration-200 data-[active-anchor=components]:opacity-30"
        {...props}
      />
    </div>
  );
};

export { ContentTOC };
