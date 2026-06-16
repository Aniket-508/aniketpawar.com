/* eslint-disable react-hooks/refs */
"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { useChart } from "./chart-context";

export interface XAxisProps {
  /** Number of ticks to show (including first and last). Default: 5. Used when `tickMode` is `"domain"`. */
  numTicks?: number;
  /** Width of the date ticker box for fade calculation. Default: 50 */
  tickerHalfWidth?: number;
  /**
   * `"domain"` — evenly spaced ticks across the time domain (default).
   * `"data"` — one label per data row at its x value (better with sparse or monthly bars).
   */
  tickMode?: "domain" | "data";
}

interface XAxisLabelProps {
  label: string;
  x: number;
  crosshairX: number | null;
  isHovering: boolean;
  tickerHalfWidth: number;
}

const XAxisLabel = ({
  label,
  x,
  crosshairX,
  isHovering,
  tickerHalfWidth,
}: XAxisLabelProps) => {
  const fadeBuffer = 20;
  const fadeRadius = tickerHalfWidth + fadeBuffer;

  let opacity = 1;
  if (isHovering && crosshairX !== null) {
    const distance = Math.abs(x - crosshairX);
    if (distance < tickerHalfWidth) {
      opacity = 0;
    } else if (distance < fadeRadius) {
      opacity = (distance - tickerHalfWidth) / fadeBuffer;
    }
  }

  return (
    <div
      className="absolute"
      style={{
        bottom: 12,
        display: "flex",
        justifyContent: "center",
        left: x,
        width: 0,
      }}
    >
      <span
        className={cn("text-xs whitespace-nowrap text-chart-label")}
        style={{
          opacity,
          transition: "opacity 0.4s ease-in-out",
        }}
      >
        {label}
      </span>
    </div>
  );
};

const generateDomainTicks = (
  xScale: ReturnType<typeof useChart>["xScale"],
  margin: { left: number },
  numTicks: number
) => {
  const [, startDate] = xScale.domain();
  const [endDate] = xScale.domain().toReversed();

  if (!(startDate && endDate)) {
    return [];
  }

  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  const timeRange = endTime - startTime;

  const tickCount = Math.max(2, numTicks);
  const dates: Date[] = [];

  for (let i = 0; i < tickCount; i += 1) {
    const t = i / (tickCount - 1);
    const time = startTime + t * timeRange;
    dates.push(new Date(time));
  }

  return dates.map((date) => ({
    date,
    label: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    }),
    x: (xScale(date) ?? 0) + margin.left,
  }));
};

const generateDataTicks = (
  data: Record<string, unknown>[],
  xAccessor: (d: Record<string, unknown>) => Date,
  xScale: ReturnType<typeof useChart>["xScale"],
  margin: { left: number },
  dateLabels: string[]
) =>
  data.map((d, i) => ({
    date: xAccessor(d),
    label:
      dateLabels[i] ??
      xAccessor(d).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
    x: (xScale(xAccessor(d)) ?? 0) + margin.left,
  }));

export const XAxis = ({
  numTicks = 5,
  tickerHalfWidth = 50,
  tickMode = "domain",
}: XAxisProps) => {
  const {
    xScale,
    margin,
    tooltipData,
    containerRef,
    data,
    xAccessor,
    dateLabels,
  } = useChart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const labelsToShow = useMemo(() => {
    if (tickMode === "data") {
      return generateDataTicks(data, xAccessor, xScale, margin, dateLabels);
    }
    return generateDomainTicks(xScale, margin, numTicks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickMode, data, xAccessor, xScale, margin.left, dateLabels, numTicks]);

  const isHovering = tooltipData !== null;
  const crosshairX = tooltipData ? tooltipData.x + margin.left : null;

  const container = containerRef.current;
  if (!(mounted && container)) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/consistent-type-imports, unicorn/prefer-module, node/global-require
  const { createPortal } = require("react-dom") as typeof import("react-dom");

  return createPortal(
    <div className="pointer-events-none absolute inset-0">
      {labelsToShow.map((item) => (
        <XAxisLabel
          crosshairX={crosshairX}
          isHovering={isHovering}
          key={`${item.date.getTime()}-${item.x}`}
          label={item.label}
          tickerHalfWidth={tickerHalfWidth}
          x={item.x}
        />
      ))}
    </div>,
    container
  );
};

XAxis.displayName = "XAxis";

export default XAxis;
