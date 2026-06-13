"use client";

import { useSound } from "@web-kits/audio/react";
import Link from "next/link";

import { tap } from "@/audio/core";
import { trackEvent } from "@/lib/events";
import type { EventName } from "@/lib/events";

interface AppLinkProps extends React.ComponentProps<typeof Link> {
  eventName?: EventName;
  eventProperties?: Record<string, string | number | boolean | null>;
  sound?: boolean;
}

const AppLink = ({
  eventName,
  eventProperties,
  sound = true,
  onClick,
  ...props
}: AppLinkProps) => {
  const playTap = useSound(tap);

  return (
    <Link
      onClick={(event) => {
        if (sound) {
          playTap();
        }
        if (eventName) {
          trackEvent({ name: eventName, properties: eventProperties });
        }
        onClick?.(event);
      }}
      {...props}
    />
  );
};

export { AppLink };
