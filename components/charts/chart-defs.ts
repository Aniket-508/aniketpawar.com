import { Children, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

export const getChartChildComponentName = (child: ReactElement): string => {
  const childType = child.type as { displayName?: string; name?: string };
  return typeof child.type === "function"
    ? childType.displayName || childType.name || ""
    : "";
};

const VISX_PATTERN_COMPONENT_NAMES = new Set([
  "Lines",
  "Circles",
  "Waves",
  "Hexagons",
  "Path",
  "Pattern",
]);

/** `visx/pattern` default exports use short names (e.g. `Lines`); also match *Pattern* displayNames. */
export const isPatternDefComponent = (child: ReactElement): boolean => {
  const name = getChartChildComponentName(child);
  return name.includes("Pattern") || VISX_PATTERN_COMPONENT_NAMES.has(name);
};

export const isGradientDefComponent = (child: ReactElement): boolean => {
  const name = getChartChildComponentName(child);
  return (
    name.includes("Gradient") ||
    name === "LinearGradient" ||
    name === "RadialGradient"
  );
};

export const isChartDefsComponent = (child: ReactElement): boolean =>
  isPatternDefComponent(child) || isGradientDefComponent(child);

/** Split hoisted defs: @visx/pattern nodes already wrap `<defs>` and render at the svg root. */
export const partitionChartDefNodes = (
  defNodes: ReactElement[]
): {
  patternDefNodes: ReactElement[];
  gradientDefNodes: ReactElement[];
} => {
  const patternDefNodes: ReactElement[] = [];
  const gradientDefNodes: ReactElement[] = [];

  for (const node of defNodes) {
    if (isPatternDefComponent(node)) {
      patternDefNodes.push(node);
    } else {
      gradientDefNodes.push(node);
    }
  }

  return { gradientDefNodes, patternDefNodes };
};

export const collectChartDefsChildren = (
  children: ReactNode
): ReactElement[] => {
  const defNodes: ReactElement[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && isChartDefsComponent(child)) {
      defNodes.push(child);
    }
  });

  return defNodes;
};
