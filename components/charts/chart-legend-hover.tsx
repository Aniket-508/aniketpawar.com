"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";

interface ChartLegendHoverContextValue {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const ChartLegendHoverContext =
  createContext<ChartLegendHoverContextValue | null>(null);

export const ChartLegendHoverProvider = ({
  hoveredIndex,
  onHoverChange,
  children,
}: {
  hoveredIndex: number | null;
  onHoverChange: (index: number | null) => void;
  children: ReactNode;
}) => {
  const value = useMemo(
    () => ({ hoveredIndex, setHoveredIndex: onHoverChange }),
    [hoveredIndex, onHoverChange]
  );

  return (
    <ChartLegendHoverContext.Provider value={value}>
      {children}
    </ChartLegendHoverContext.Provider>
  );
};

export const useChartLegendHover = (): ChartLegendHoverContextValue => {
  const context = useContext(ChartLegendHoverContext);
  return (
    context ?? {
      hoveredIndex: null,
      setHoveredIndex: () => {
        /* noop outside ChartLegendHoverProvider */
      },
    }
  );
};
