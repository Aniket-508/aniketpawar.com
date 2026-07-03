import { useMemo } from "react";

import {
  ELEMENT_HEIGHT,
  ELEMENT_WIDTH,
} from "@/components/wall/lib/signature-layout";
import type { SignaturePosition } from "@/components/wall/lib/signature-layout";

const VIEWPORT_BUFFER = 500;

interface UseViewportCullingOptions {
  pan: { x: number; y: number };
  positions: SignaturePosition[];
  scale: number;
  viewportReady: boolean;
}

export const useViewportCulling = ({
  pan,
  positions,
  scale,
  viewportReady,
}: UseViewportCullingOptions): SignaturePosition[] =>
  useMemo(() => {
    if (
      !viewportReady ||
      typeof window === "undefined" ||
      positions.length === 0
    ) {
      return [];
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const worldLeft = -pan.x / scale - VIEWPORT_BUFFER;
    const worldRight = (viewportWidth - pan.x) / scale + VIEWPORT_BUFFER;
    const worldTop = -pan.y / scale - VIEWPORT_BUFFER;
    const worldBottom = (viewportHeight - pan.y) / scale + VIEWPORT_BUFFER;

    return positions.filter((pos) => {
      const right = pos.x + ELEMENT_WIDTH;
      const bottom = pos.y + ELEMENT_HEIGHT;

      return (
        right >= worldLeft &&
        pos.x <= worldRight &&
        bottom >= worldTop &&
        pos.y <= worldBottom
      );
    });
  }, [pan.x, pan.y, positions, scale, viewportReady]);
