/* eslint-disable eslint/complexity */
"use client";

import { GridColumns, GridRows } from "@visx/grid";
import { useId } from "react";

import { chartCssVars, useChart } from "./chart-context";

export interface GridProps {
  /** Show horizontal grid lines. Default: true */
  horizontal?: boolean;
  /** Show vertical grid lines. Default: false */
  vertical?: boolean;
  /** Number of horizontal grid lines. Default: 5 */
  numTicksRows?: number;
  /** Number of vertical grid lines. Default: 10 */
  numTicksColumns?: number;
  /** Explicit tick values for horizontal grid lines. Overrides numTicksRows. */
  rowTickValues?: number[];
  /** Grid line stroke color. Default: var(--chart-grid) */
  stroke?: string;
  /** Grid line stroke opacity. Default: 1 */
  strokeOpacity?: number;
  /** Grid line stroke width. Default: 1 */
  strokeWidth?: number;
  /** Grid line dash array. Default: "4,4" for dashed lines */
  strokeDasharray?: string;
  /** Enable horizontal fade effect on grid rows (fades at left/right). Default: true */
  fadeHorizontal?: boolean;
  /** Enable vertical fade effect on grid columns (fades at top/bottom). Default: false */
  fadeVertical?: boolean;
}

const HorizontalFadeMask = ({
  maskId,
  gradientId,
  innerWidth,
  innerHeight,
}: {
  maskId: string;
  gradientId: string;
  innerWidth: number;
  innerHeight: number;
}) => (
  <defs>
    <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
      <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
      <stop offset="10%" style={{ stopColor: "white", stopOpacity: 1 }} />
      <stop offset="90%" style={{ stopColor: "white", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
    </linearGradient>
    <mask id={maskId}>
      <rect
        fill={`url(#${gradientId})`}
        height={innerHeight}
        width={innerWidth}
        x="0"
        y="0"
      />
    </mask>
  </defs>
);

const VerticalFadeMask = ({
  maskId,
  gradientId,
  innerWidth,
  innerHeight,
}: {
  maskId: string;
  gradientId: string;
  innerWidth: number;
  innerHeight: number;
}) => (
  <defs>
    <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
      <stop offset="10%" style={{ stopColor: "white", stopOpacity: 1 }} />
      <stop offset="90%" style={{ stopColor: "white", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
    </linearGradient>
    <mask id={maskId}>
      <rect
        fill={`url(#${gradientId})`}
        height={innerHeight}
        width={innerWidth}
        x="0"
        y="0"
      />
    </mask>
  </defs>
);

export const Grid = ({
  horizontal = true,
  vertical = false,
  numTicksRows = 5,
  numTicksColumns = 10,
  rowTickValues,
  stroke = chartCssVars.grid,
  strokeOpacity = 1,
  strokeWidth = 1,
  strokeDasharray = "4,4",
  fadeHorizontal = true,
  fadeVertical = false,
}: GridProps) => {
  const { xScale, yScale, innerWidth, innerHeight, orientation, barScale } =
    useChart();

  const isHorizontalBarChart = orientation === "horizontal" && barScale;
  const columnScale = isHorizontalBarChart ? yScale : xScale;
  const uniqueId = useId();

  const hMaskId = `grid-rows-fade-${uniqueId}`;
  const hGradientId = `${hMaskId}-gradient`;
  const vMaskId = `grid-cols-fade-${uniqueId}`;
  const vGradientId = `${vMaskId}-gradient`;

  const horizontalMask = fadeHorizontal ? `url(#${hMaskId})` : undefined;
  const verticalMask = fadeVertical ? `url(#${vMaskId})` : undefined;
  const canShowColumns =
    vertical && columnScale && typeof columnScale === "function";

  return (
    <g className="chart-grid">
      {horizontal && fadeHorizontal && (
        <HorizontalFadeMask
          gradientId={hGradientId}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          maskId={hMaskId}
        />
      )}

      {vertical && fadeVertical && (
        <VerticalFadeMask
          gradientId={vGradientId}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          maskId={vMaskId}
        />
      )}

      {horizontal && (
        <g mask={horizontalMask}>
          <GridRows
            numTicks={rowTickValues ? undefined : numTicksRows}
            scale={yScale}
            stroke={stroke}
            strokeDasharray={strokeDasharray}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeWidth}
            tickValues={rowTickValues}
            width={innerWidth}
          />
        </g>
      )}

      {canShowColumns && (
        <g mask={verticalMask}>
          <GridColumns
            height={innerHeight}
            numTicks={numTicksColumns}
            scale={columnScale}
            stroke={stroke}
            strokeDasharray={strokeDasharray}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeWidth}
          />
        </g>
      )}
    </g>
  );
};

Grid.displayName = "Grid";

export default Grid;
