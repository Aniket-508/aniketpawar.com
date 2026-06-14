"use client";

import { motion, useSpring } from "motion/react";
import { memo, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  resolveTooltipBoxMotion,
  useChartConfig,
} from "../chart-config-context";
import type { SpringConfig } from "../chart-config-context";
import { chartCssVars, useChart, useChartStable } from "../chart-context";
import type { LineConfig } from "../chart-context";
import { weekdayDateFmt } from "../chart-formatters";
import type { IndicatorFadeEdges } from "../indicator-fade";
import { DateTicker } from "./date-ticker";
import { TooltipBox } from "./tooltip-box";
import { TooltipContent } from "./tooltip-content";
import type { TooltipRow } from "./tooltip-content";
import { TooltipDot } from "./tooltip-dot";
import { TooltipIndicator } from "./tooltip-indicator";

export interface ChartTooltipProps {
  /** Whether to show the date pill at bottom. Default: true */
  showDatePill?: boolean;
  /** Whether to show the vertical crosshair line. Default: true */
  showCrosshair?: boolean;
  /** Whether to show dots on the lines. Default: true */
  showDots?: boolean;
  /**
   * Color for the crosshair/indicator line. When a function, receives the hovered point
   * (e.g. for candlestick: match candle color from close vs open). Default: --chart-crosshair.
   */
  indicatorColor?: string | ((point: Record<string, unknown>) => string);
  /** Custom content renderer for the tooltip box */
  content?: (props: {
    point: Record<string, unknown>;
    index: number;
  }) => React.ReactNode;
  /** Custom row renderer - return array of TooltipRow */
  rows?: (point: Record<string, unknown>) => TooltipRow[];
  /**
   * Override tooltip dot fill. When omitted and `rows` is set, dot colors match row colors.
   * When a function, receives the hovered point and line config.
   */
  dotColor?:
    | string
    | ((point: Record<string, unknown>, line: LineConfig) => string);
  /** Additional content to show below rows (e.g., markers) */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Per-chart override for the crosshair / dot / date-pill spring. */
  springConfig?: SpringConfig;
  /**
   * When `true`, the floating panel uses the crosshair spring and stays in sync.
   * Default `false` — panel follow uses `damping` (`20`).
   */
  matchCrosshair?: boolean;
  /**
   * Spring damping for the floating tooltip panel when `matchCrosshair` is `false`.
   * `0` disables spring motion (instant). Default: `20`.
   */
  damping?: number;
  /** SVG stroke dash pattern for the crosshair. Omit for solid. */
  indicatorDasharray?: string;
  /** Vertical crosshair fade: `both`, `top`, `bottom`, or `none` (solid). Default: `both`. */
  indicatorFadeEdges?: IndicatorFadeEdges;
  /** Crosshair fade zone size (% of height). Default: `10`. */
  indicatorFadeLength?: number;
  /** Per-chart override for the floating-panel spring. */
  boxSpringConfig?: SpringConfig;
  /** Inline styles for the tooltip panel (background, blur, etc.). */
  panelStyle?: React.CSSProperties;
}

interface ChartTooltipInnerProps extends ChartTooltipProps {
  container: HTMLElement;
}

interface DatePillTrackerProps {
  enabled: boolean;
  visible: boolean;
  labels: string[];
  currentIndex: number;
  xWithMargin: number;
  discreteInteraction: boolean;
  springConfig?: SpringConfig;
}

const DatePillTrackerInner = ({
  labels,
  currentIndex,
  xWithMargin,
  discreteInteraction,
  springConfig,
  visible,
}: DatePillTrackerProps) => {
  const { tooltipSpring } = useChartConfig();
  const effectiveSpring = springConfig ?? tooltipSpring;
  const animatedX = useSpring(xWithMargin, effectiveSpring);

  if (!discreteInteraction) {
    animatedX.set(xWithMargin);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to jump the animatedX when the visible prop changes
  useEffect(() => {
    animatedX.set(xWithMargin);
  }, [animatedX, visible]);

  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      style={{
        bottom: 4,
        left: discreteInteraction ? xWithMargin : animatedX,
        transform: "translateX(-50%)",
      }}
    >
      <DateTicker
        currentIndex={currentIndex}
        labels={labels}
        visible={visible}
      />
    </motion.div>
  );
};

const DatePillTracker = (props: DatePillTrackerProps) => {
  if (!(props.enabled && props.visible && props.labels.length > 0)) {
    return null;
  }
  return <DatePillTrackerInner {...props} />;
};

const ChartTooltipInner = memo(
  ({
    showDatePill = true,
    showCrosshair = true,
    showDots = true,
    indicatorColor: indicatorColorProp,
    content,
    rows: rowsRenderer,
    dotColor: dotColorProp,
    children,
    className = "",
    container,
    springConfig,
    matchCrosshair = false,
    damping,
    indicatorDasharray,
    indicatorFadeEdges,
    indicatorFadeLength,
    boxSpringConfig,
    panelStyle,
  }: ChartTooltipInnerProps) => {
    const {
      tooltipData,
      width,
      height,
      innerHeight,
      margin,
      columnWidth,
      lines,
      xAccessor,
      dateLabels,
      containerRef,
      orientation,
      barXAccessor,
    } = useChart();
    const { tooltipSpring } = useChartConfig();

    const isHorizontal = orientation === "horizontal";
    const discreteInteraction = dateLabels.length > 60;
    const boxMotion = useMemo(() => {
      if (boxSpringConfig) {
        return {
          animate: !discreteInteraction,
          springConfig: boxSpringConfig,
        };
      }
      if (matchCrosshair) {
        return {
          animate: !discreteInteraction,
          springConfig: springConfig ?? tooltipSpring,
        };
      }
      return resolveTooltipBoxMotion(damping);
    }, [
      boxSpringConfig,
      damping,
      discreteInteraction,
      matchCrosshair,
      springConfig,
      tooltipSpring,
    ]);

    const visible = tooltipData !== null;
    const x = tooltipData?.x ?? 0;
    const xWithMargin = x + margin.left;

    const firstLineDataKey = lines[0]?.dataKey;
    const firstLineY = firstLineDataKey
      ? (tooltipData?.yPositions[firstLineDataKey] ?? 0)
      : 0;
    const yWithMargin = firstLineY + margin.top;

    const tooltipRows = useMemo(() => {
      if (!tooltipData) {
        return [];
      }

      if (rowsRenderer) {
        return rowsRenderer(tooltipData.point);
      }

      return lines.map((line) => ({
        color: line.stroke,
        label: line.dataKey,
        value: (tooltipData.point[line.dataKey] as number) ?? 0,
      }));
    }, [tooltipData, lines, rowsRenderer]);

    const resolveDotColor = useMemo(
      () =>
        (line: LineConfig, index: number): string => {
          if (rowsRenderer && tooltipRows[index]?.color) {
            return tooltipRows[index].color;
          }
          if (dotColorProp !== null && dotColorProp !== undefined) {
            if (typeof dotColorProp === "function" && tooltipData) {
              return dotColorProp(tooltipData.point, line);
            }
            if (typeof dotColorProp === "string") {
              return dotColorProp;
            }
          }
          return line.stroke;
        },
      [dotColorProp, rowsRenderer, tooltipData, tooltipRows]
    );

    const indicatorColor = useMemo(() => {
      if (indicatorColorProp === null || indicatorColorProp === undefined) {
        return chartCssVars.crosshair;
      }
      if (typeof indicatorColorProp === "function") {
        return tooltipData
          ? indicatorColorProp(tooltipData.point)
          : chartCssVars.crosshair;
      }
      return indicatorColorProp;
    }, [indicatorColorProp, tooltipData]);

    const title = useMemo(() => {
      if (!tooltipData) {
        return;
      }
      if (barXAccessor) {
        return barXAccessor(tooltipData.point);
      }
      return weekdayDateFmt.format(xAccessor(tooltipData.point));
    }, [tooltipData, barXAccessor, xAccessor]);

    const tooltipContent = (
      <>
        {showCrosshair && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            height="100%"
            width="100%"
          >
            <g transform={`translate(${margin.left},${margin.top})`}>
              <TooltipIndicator
                animate={!discreteInteraction}
                colorEdge={indicatorColor}
                colorMid={indicatorColor}
                columnWidth={columnWidth}
                fadeEdges={
                  indicatorDasharray ? "none" : (indicatorFadeEdges ?? "both")
                }
                fadeLength={indicatorFadeLength}
                height={innerHeight}
                springConfig={springConfig}
                strokeDasharray={indicatorDasharray}
                visible={visible}
                width="line"
                x={x}
              />
            </g>
          </svg>
        )}

        {showDots && visible && !isHorizontal && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            height="100%"
            width="100%"
          >
            <g transform={`translate(${margin.left},${margin.top})`}>
              {lines.map((line, index) => (
                <TooltipDot
                  color={resolveDotColor(line, index)}
                  key={line.dataKey}
                  springConfig={springConfig}
                  strokeColor={chartCssVars.background}
                  visible={visible}
                  x={tooltipData?.xPositions?.[line.dataKey] ?? x}
                  y={tooltipData?.yPositions[line.dataKey] ?? 0}
                />
              ))}
            </g>
          </svg>
        )}

        <TooltipBox
          animate={boxMotion.animate}
          className={className}
          containerHeight={height}
          containerRef={containerRef}
          containerWidth={width}
          panelStyle={panelStyle}
          springConfig={boxMotion.springConfig}
          top={isHorizontal ? undefined : margin.top}
          visible={visible}
          x={xWithMargin}
          y={isHorizontal ? yWithMargin : margin.top}
        >
          {content && tooltipData
            ? content({
                index: tooltipData.index,
                point: tooltipData.point,
              })
            : !content && (
                <TooltipContent rows={tooltipRows} title={title}>
                  {children}
                </TooltipContent>
              )}
        </TooltipBox>

        <DatePillTracker
          currentIndex={tooltipData?.index ?? 0}
          discreteInteraction={discreteInteraction}
          enabled={showDatePill && !isHorizontal}
          labels={dateLabels}
          springConfig={springConfig}
          visible={visible}
          xWithMargin={xWithMargin}
        />
      </>
    );

    return createPortal(tooltipContent, container);
  }
);

export const ChartTooltip = (props: ChartTooltipProps) => {
  const { containerRef } = useChartStable();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = containerRef.current;
  if (!(mounted && container)) {
    return null;
  }

  return <ChartTooltipInner {...props} container={container} />;
};

ChartTooltip.displayName = "ChartTooltip";

export default ChartTooltip;
