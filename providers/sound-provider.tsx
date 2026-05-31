"use client";

import { SoundProvider as WebKitsSoundProvider } from "@web-kits/audio/react";
import { createContext, useContext, useState } from "react";

const SoundEnabledContext = createContext<{
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const SoundProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof WebKitsSoundProvider>) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <SoundEnabledContext.Provider value={{ enabled, setEnabled }}>
      <WebKitsSoundProvider
        enabled={enabled}
        onEnabledChange={setEnabled}
        {...props}
      >
        {children}
      </WebKitsSoundProvider>
    </SoundEnabledContext.Provider>
  );
};

export const useSoundEnabled = () => {
  const context = useContext(SoundEnabledContext);

  if (!context) {
    throw new Error("useSoundEnabled must be used within a SoundProvider");
  }

  return context;
};
