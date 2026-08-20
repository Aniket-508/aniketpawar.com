"use client";

import { createContext, useCallback, useContext, useState } from "react";

const GridModeContext = createContext<{
  enabled: boolean;
  toggleGridMode: () => void;
} | null>(null);

export const GridModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [enabled, setEnabled] = useState(false);

  const toggleGridMode = useCallback(() => setEnabled((prev) => !prev), []);

  return (
    <GridModeContext.Provider value={{ enabled, toggleGridMode }}>
      {children}
    </GridModeContext.Provider>
  );
};

export const useGridMode = () => {
  const context = useContext(GridModeContext);

  if (!context) {
    throw new Error("useGridMode must be used within a GridModeProvider");
  }

  return context;
};
