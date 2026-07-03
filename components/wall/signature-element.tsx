"use client";

import { memo } from "react";

import {
  ELEMENT_HEIGHT,
  ELEMENT_WIDTH,
} from "@/components/wall/lib/signature-layout";
import type { SignaturePosition } from "@/components/wall/lib/signature-layout";

interface SignatureElementProps {
  onOpenSignature: (signature: SignaturePosition["signature"]) => void;
  position: SignaturePosition;
  revealDelayMs: number;
}

const SignatureElement = memo(
  ({ onOpenSignature, position, revealDelayMs }: SignatureElementProps) => {
    const { signature, x, y } = position;
    const displayName = signature.name ?? signature.username;

    return (
      <div
        className="signature-element absolute top-0 left-0"
        style={{
          animationDelay: `${revealDelayMs}ms`,
          contain: "layout style paint",
          height: `${ELEMENT_HEIGHT}px`,
          transform: `translate3d(${x}px, ${y}px, 0px)`,
          width: `${ELEMENT_WIDTH}px`,
        }}
      >
        <div className="pointer-events-none relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`Signature by ${displayName}`}
            className="absolute inset-0 h-full w-full object-contain opacity-80 dark:invert dark:opacity-90"
            loading="lazy"
            src={signature.signature}
          />
        </div>
        <button
          aria-label={`Open signature by ${displayName}`}
          className="signature-hit"
          data-element="true"
          onClick={() => onOpenSignature(signature)}
          type="button"
        />
      </div>
    );
  }
);

SignatureElement.displayName = "SignatureElement";

export { SignatureElement };
