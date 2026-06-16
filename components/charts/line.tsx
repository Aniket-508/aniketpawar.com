/* eslint-disable eslint/complexity */
"use client";

import { curveNatural } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { motion, useMotionTemplate, useSpring } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { chartCssVars, useChart } from "./chart-context";
import { ChartRevealClip } from "./chart-reveal-clip";

// CurveFactory type - simplified version compatible with visx
// biome-ignore lint/suspicious/noExplicitAny: d3 curve factory type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CurveFactory = any;

export interface LineProps {
  /** Key in data to use for y values */
  dataKey: string;
  /** Stroke color. Default: var(--chart-line-primary) */
  stroke?: string;
  /** Stroke width. Default: 2.5 */
  strokeWidth?: number;
  /** Curve function. Default: curveNatural */
  curve?: CurveFactory;
  /** Whether to animate the line. Default: true */
  animate?: boolean;
  /** Whether to fade edges with gradient. Default: true */
  fadeEdges?: boolean;
  /** Whether to show highlight segment on hover. Default: true */
  showHighlight?: boolean;
}

interface SegmentBounds {
  isActive: boolean;
  segmentLength: number;
  startLength: number;
}

const calculateSegmentBounds = (
  pathRef: React.RefObject<SVGPathElement | null>,
  pathLength: number,
  selection:
    | { active: boolean; startX: number; endX: number }
    | null
    | undefined,
  tooltipData: { index: number } | null | undefined,
  data: Record<string, unknown>[],
  xScale: (d: Date) => number | undefined,
  xAccessor: (d: Record<string, unknown>) => Date,
  findLengthAtX: (targetX: number) => number
): SegmentBounds => {
  if (!pathRef.current || pathLength === 0) {
    return { isActive: false, segmentLength: 0, startLength: 0 };
  }

  if (selection?.active) {
    const startLength = findLengthAtX(selection.startX);
    const endLength = findLengthAtX(selection.endX);
    return {
      isActive: true,
      segmentLength: endLength - startLength,
      startLength,
    };
  }

  if (!tooltipData) {
    return { isActive: false, segmentLength: 0, startLength: 0 };
  }

  const idx = tooltipData.index;
  const startIdx = Math.max(0, idx - 1);
  const endIdx = Math.min(data.length - 1, idx + 1);

  const startPoint = data[startIdx];
  const endPoint = data[endIdx];
  if (!(startPoint && endPoint)) {
    return { isActive: false, segmentLength: 0, startLength: 0 };
  }

  const startX = xScale(xAccessor(startPoint)) ?? 0;
  const endX = xScale(xAccessor(endPoint)) ?? 0;

  const startLength = findLengthAtX(startX);
  const endLength = findLengthAtX(endX);

  return {
    isActive: true,
    segmentLength: endLength - startLength,
    startLength,
  };
};

export const Line = ({
  dataKey,
  stroke = chartCssVars.linePrimary,
  strokeWidth = 2.5,
  curve = curveNatural,
  animate = true,
  fadeEdges = true,
  showHighlight = true,
}: LineProps) => {
  const {
    data,
    xScale,
    yScale,
    innerHeight,
    innerWidth,
    tooltipData,
    selection,
    isLoaded,
    enterTransition,
    revealEpoch,
    xAccessor,
  } = useChart();

  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const gradientId = useMemo(
    () => `line-gradient-${dataKey}-${Math.random().toString(36).slice(2, 9)}`,
    [dataKey]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: data, innerWidth
  useEffect(() => {
    if (pathRef.current && animate) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) {
        setPathLength(len);
      }
    }
  }, [animate, data, innerWidth]);

  const findLengthAtX = useCallback(
    (targetX: number): number => {
      const path = pathRef.current;
      if (!path || pathLength === 0) {
        return 0;
      }
      let low = 0;
      let high = pathLength;
      const tolerance = 0.5;

      while (high - low > tolerance) {
        const mid = (low + high) / 2;
        const point = path.getPointAtLength(mid);
        if (point.x < targetX) {
          low = mid;
        } else {
          high = mid;
        }
      }
      return (low + high) / 2;
    },
    [pathLength]
  );

  const segmentBounds = useMemo(
    () =>
      calculateSegmentBounds(
        pathRef,
        pathLength,
        selection,
        tooltipData,
        data,
        xScale,
        xAccessor,
        findLengthAtX
      ),
    [tooltipData, selection, data, xScale, pathLength, xAccessor, findLengthAtX]
  );

  const springConfig = { damping: 28, stiffness: 180 };
  const offsetSpring = useSpring(0, springConfig);
  const segmentLengthSpring = useSpring(0, springConfig);

  useEffect(() => {
    offsetSpring.set(-segmentBounds.startLength);
    segmentLengthSpring.set(segmentBounds.segmentLength);
  }, [
    segmentBounds.startLength,
    segmentBounds.segmentLength,
    offsetSpring,
    segmentLengthSpring,
  ]);

  const animatedDasharray = useMotionTemplate`${segmentLengthSpring} ${pathLength}`;

  const getY = useCallback(
    (d: Record<string, unknown>) => {
      const value = d[dataKey];
      return typeof value === "number" ? (yScale(value) ?? 0) : 0;
    },
    [dataKey, yScale]
  );

  const isHovering = tooltipData !== null || selection?.active === true;
  const showClipPath = animate && data.length > 1;

  return (
    <>
      {fadeEdges && (
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: stroke, stopOpacity: 0 }} />
            <stop offset="15%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="85%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: stroke, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      )}

      {showClipPath && (
        <defs>
          <ChartRevealClip
            clipPathId={`grow-clip-${dataKey}`}
            enterTransition={enterTransition}
            height={innerHeight + 20}
            revealEpoch={revealEpoch ?? 0}
            targetWidth={innerWidth}
          />
        </defs>
      )}

      <g clipPath={showClipPath ? `url(#grow-clip-${dataKey})` : undefined}>
        <motion.g
          animate={{ opacity: isHovering && showHighlight ? 0.3 : 1 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <LinePath
            curve={curve}
            data={data}
            innerRef={pathRef}
            stroke={fadeEdges ? `url(#${gradientId})` : stroke}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x={(d) => xScale(xAccessor(d)) ?? 0}
            y={getY}
          />
        </motion.g>
      </g>

      {showHighlight && isHovering && isLoaded && pathRef.current && (
        <motion.path
          animate={{ opacity: 1 }}
          d={pathRef.current.getAttribute("d") || ""}
          exit={{ opacity: 0 }}
          fill="none"
          initial={{ opacity: 0 }}
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{
            strokeDasharray: animatedDasharray,
            strokeDashoffset: offsetSpring,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}
    </>
  );
};

Line.displayName = "Line";

export default Line;
