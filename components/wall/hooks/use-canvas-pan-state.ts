import { useCallback, useRef, useState } from "react";
import type { SetStateAction } from "react";

export interface Point {
  x: number;
  y: number;
}

const ORIGIN: Point = { x: 0, y: 0 };

export const useCanvasPanState = () => {
  const [pan, setPanState] = useState<Point>(ORIGIN);
  const panRef = useRef(pan);

  const setPan = useCallback((value: SetStateAction<Point>) => {
    setPanState((previousPan) => {
      const nextPan = typeof value === "function" ? value(previousPan) : value;

      panRef.current = nextPan;
      return nextPan;
    });
  }, []);

  return {
    pan,
    panRef,
    setPan,
  } as const;
};
