export type ChartStatus = "loading" | "ready";

/**
 * Internal visual lifecycle phase. Forward and reverse transitions add
 * intermediate phases in later stack branches.
 */
export type ChartPhase =
  | "loading"
  | "exiting"
  | "gridTweenReady"
  | "revealing"
  | "ready"
  | "exitingReady"
  | "gridTweenLoading"
  | "revealingLoading";

export const DEFAULT_CHART_STATUS: ChartStatus = "ready";

/** Default Y-domain tween when transitioning loading ↔ ready (ms). */
export const DEFAULT_Y_DOMAIN_TWEEN_MS = 500;

/** Relative domain delta below which Y tween may be skipped (see plan). */
export const Y_DOMAIN_TWEEN_SKIP_THRESHOLD = 0.02;

/** Resting phase for a given status before transition orchestration runs. */
export const resolveRestingChartPhase = (status: ChartStatus): ChartPhase =>
  status === "loading" ? "loading" : "ready";

export const isChartInteractionPhase = (phase: ChartPhase): boolean =>
  phase === "ready";

export const DEFAULT_CHART_LIFECYCLE = {
  chartPhase: "ready",
  chartStatus: "ready",
  loadingLabel: undefined,
  yDomainSkeletonByAxis: { left: [0, 100] as [number, number] },
  yDomainTargetByAxis: { left: [0, 100] as [number, number] },
  yDomainTweenDuration: DEFAULT_Y_DOMAIN_TWEEN_MS,
} as const satisfies {
  chartPhase: ChartPhase;
  chartStatus: ChartStatus;
  loadingLabel: undefined;
  yDomainTweenDuration: number;
  yDomainSkeletonByAxis: Record<string, [number, number]>;
  yDomainTargetByAxis: Record<string, [number, number]>;
};
