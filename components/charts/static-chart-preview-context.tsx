"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

const StaticChartPreviewContext = createContext(false);

/** Disables cartesian reveal clip-path for static docs previews. */
export const StaticChartPreviewProvider = ({
  children,
}: {
  children: ReactNode;
}) => (
  <StaticChartPreviewContext.Provider value={true}>
    {children}
  </StaticChartPreviewContext.Provider>
);

export const useStaticChartPreview = () =>
  useContext(StaticChartPreviewContext);
