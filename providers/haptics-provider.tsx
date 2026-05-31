"use client";

import { createContext, useContext, useState } from "react";
import type { HapticInput } from "web-haptics";
import { useWebHaptics } from "web-haptics/react";

interface HapticsContextValue {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: (input?: HapticInput) => Promise<void>;
}

const HapticsEnabledContext = createContext<HapticsContextValue | null>(null);

export const HapticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [enabled, setEnabled] = useState(true);
  const haptics = useWebHaptics();

  const trigger = async (input?: HapticInput) => {
    if (!enabled) {
      return;
    }
    await haptics.trigger(input);
  };

  return (
    <HapticsEnabledContext.Provider value={{ enabled, setEnabled, trigger }}>
      {children}
    </HapticsEnabledContext.Provider>
  );
};

const noop = (): undefined => undefined;
const noopTrigger = async (): Promise<void> => await Promise.resolve();

export const useHaptics = (): HapticsContextValue => {
  const context = useContext(HapticsEnabledContext);

  if (!context) {
    return {
      enabled: false,
      setEnabled: noop,
      trigger: noopTrigger,
    };
  }

  return context;
};
