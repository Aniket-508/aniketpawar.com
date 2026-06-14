"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";

export interface SpringConfig {
  stiffness: number;
  damping: number;
}

export interface ChartConfigValue {
  /** Crosshair indicator, tooltip dot, date pill. */
  tooltipSpring: SpringConfig;
  /** Floating tooltip panel. */
  tooltipBoxSpring: SpringConfig;
  /** Line/area hover-highlight band (x + width). */
  highlightSpring: SpringConfig;
}

export const DEFAULT_CHART_CONFIG: ChartConfigValue = {
  highlightSpring: { damping: 28, stiffness: 180 },
  tooltipBoxSpring: { damping: 20, stiffness: 100 },
  tooltipSpring: { damping: 30, stiffness: 300 },
};

const ChartConfigContext = createContext<ChartConfigValue | null>(null);

export interface ChartConfigProviderProps {
  value?: Partial<ChartConfigValue>;
  children: ReactNode;
}

export const ChartConfigProvider = ({
  value,
  children,
}: ChartConfigProviderProps) => {
  const merged = useMemo<ChartConfigValue>(
    () => ({
      ...DEFAULT_CHART_CONFIG,
      ...value,
    }),
    [value]
  );

  return (
    <ChartConfigContext.Provider value={merged}>
      {children}
    </ChartConfigContext.Provider>
  );
};

export const useChartConfig = (): ChartConfigValue =>
  useContext(ChartConfigContext) ?? DEFAULT_CHART_CONFIG;

const DEFAULT_TOOLTIP_BOX_DAMPING =
  DEFAULT_CHART_CONFIG.tooltipBoxSpring.damping;

/** Maps a damping slider to the floating tooltip panel follow spring. `0` = instant. */
export const resolveTooltipBoxMotion = (
  damping?: number
): {
  animate: boolean;
  springConfig: SpringConfig;
} => {
  if (damping === 0) {
    return {
      animate: false,
      springConfig: DEFAULT_CHART_CONFIG.tooltipBoxSpring,
    };
  }

  const effectiveDamping = damping ?? DEFAULT_TOOLTIP_BOX_DAMPING;
  let { stiffness } = DEFAULT_CHART_CONFIG.tooltipBoxSpring;

  if (effectiveDamping < DEFAULT_TOOLTIP_BOX_DAMPING) {
    const t =
      (DEFAULT_TOOLTIP_BOX_DAMPING - effectiveDamping) /
      DEFAULT_TOOLTIP_BOX_DAMPING;
    stiffness += t * 400;
  } else if (effectiveDamping > DEFAULT_TOOLTIP_BOX_DAMPING) {
    const t =
      (effectiveDamping - DEFAULT_TOOLTIP_BOX_DAMPING) /
      (100 - DEFAULT_TOOLTIP_BOX_DAMPING);
    stiffness -= t * 85;
  }

  return {
    animate: true,
    springConfig: {
      damping: effectiveDamping,
      stiffness: Math.max(12, Math.round(stiffness)),
    },
  };
};
