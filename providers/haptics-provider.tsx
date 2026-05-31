"use client";

import { createContext, useContext, useState } from "react";

interface HapticsContextValue {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const HapticsEnabledContext = createContext<HapticsContextValue | null>(null);

export const HapticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <HapticsEnabledContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </HapticsEnabledContext.Provider>
  );
};

const noop = (): undefined => undefined;

export const useHaptics = (): HapticsContextValue => {
  const context = useContext(HapticsEnabledContext);

  if (!context) {
    return {
      enabled: false,
      setEnabled: noop,
    };
  }

  return context;
};
