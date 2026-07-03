"use client";

import { useCallback, useMemo, useState } from "react";

import { CanvasControls } from "@/components/wall/canvas-controls";
import { GuestbookCta } from "@/components/wall/guestbook-cta";
import { useCanvasViewport } from "@/components/wall/hooks/use-canvas-viewport";
import { useViewportCulling } from "@/components/wall/hooks/use-viewport-culling";
import type { SignaturePosition } from "@/components/wall/lib/signature-layout";
import { SignatureDialog } from "@/components/wall/signature-dialog";
import { SignatureElement } from "@/components/wall/signature-element";

interface WallCanvasProps {
  positions: SignaturePosition[];
  revealOrder: string[];
}

const BASE_DELAY_MS = 0;
const STAGGER_MS = 30;
const RING_SIZE = 5;

const getRevealDelay = (revealIndexById: Map<string, number>, id: string) => {
  const revealIndex = revealIndexById.get(id);

  if (revealIndex === undefined) {
    throw new Error(`Missing reveal order for signature ${id}`);
  }

  const ringIndex = Math.floor(revealIndex / RING_SIZE) % 10;
  return BASE_DELAY_MS + ringIndex * STAGGER_MS;
};

const WallCanvas = ({ positions, revealOrder }: WallCanvasProps) => {
  const [selectedSignature, setSelectedSignature] = useState<
    SignaturePosition["signature"] | null
  >(null);

  const {
    canvasRef,
    isViewportReady,
    onPointerDown,
    onPointerMove,
    onWheel,
    pan,
    scale,
    wasDragging,
    zoomIn,
    zoomOut,
    zoomPercent,
    zoomToFit,
  } = useCanvasViewport();

  const visiblePositions = useViewportCulling({
    pan,
    positions,
    scale,
    viewportReady: isViewportReady,
  });

  const revealIndexById = useMemo(() => {
    const map = new Map<string, number>();

    for (const [index, id] of revealOrder.entries()) {
      map.set(id, index);
    }

    return map;
  }, [revealOrder]);

  const handleOpenSignature = useCallback(
    (signature: SignaturePosition["signature"]) => {
      if (wasDragging()) {
        return;
      }

      setSelectedSignature(signature);
    },
    [wasDragging]
  );

  const closeSignature = useCallback(() => {
    setSelectedSignature(null);
  }, []);

  return (
    <>
      <GuestbookCta />

      <div
        className="absolute inset-0 touch-none select-none will-change-transform"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onWheel={onWheel}
        ref={canvasRef}
        style={{ transformOrigin: "0 0" }}
      >
        <div
          className="relative h-screen w-screen will-change-transform"
          style={{
            contain: "layout style",
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          {visiblePositions.map((position) => (
            <SignatureElement
              key={position.id}
              onOpenSignature={handleOpenSignature}
              position={position}
              revealDelayMs={getRevealDelay(revealIndexById, position.id)}
            />
          ))}
        </div>
      </div>

      <CanvasControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onZoomToFit={zoomToFit}
        zoomPercent={zoomPercent}
      />

      {selectedSignature ? (
        <SignatureDialog
          onClose={closeSignature}
          signature={selectedSignature}
        />
      ) : null}
    </>
  );
};

export { WallCanvas };
