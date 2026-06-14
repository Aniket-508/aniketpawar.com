import { isValidElement } from "react";
import type { ReactElement } from "react";

/** Marker on wrapper components whose single child should inherit clip classification. */
export const CHART_CLIP_PASSTHROUGH = "__chartClipPassthrough" as const;

export const isChartClipPassthrough = (type: unknown): boolean =>
  typeof type === "function" &&
  (type as { [CHART_CLIP_PASSTHROUGH]?: boolean })[CHART_CLIP_PASSTHROUGH] ===
    true;

/** Unwrap visibility wrappers so `Grid` / axes stay outside the series clip. */
export const resolveChartChildElement = (child: ReactElement): ReactElement => {
  if (isChartClipPassthrough(child.type)) {
    const inner = (child.props as { children?: unknown }).children;
    if (isValidElement(inner)) {
      return resolveChartChildElement(inner);
    }
  }
  return child;
};
