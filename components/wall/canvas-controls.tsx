"use client";

import { Maximize, Minimize, Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface CanvasControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomToFit: () => void;
  zoomPercent: number;
}

interface ControlButtonProps {
  children: ReactNode;
  label: string;
  onClick: () => void | Promise<void>;
  title: string;
}

const ControlButton = ({
  children,
  label,
  onClick,
  title,
}: ControlButtonProps) => (
  <button
    aria-label={label}
    className="rounded-xl bg-accent p-1.5 text-foreground transition-colors hover:bg-muted active:scale-95"
    onClick={onClick}
    title={title}
    type="button"
  >
    {children}
  </button>
);

const toggleFullscreen = async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
    return;
  }

  await document.documentElement.requestFullscreen();
};

const CanvasControls = ({
  onZoomIn,
  onZoomOut,
  onZoomToFit,
  zoomPercent,
}: CanvasControlsProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const fullscreenLabel = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

  return (
    <div
      aria-label="Canvas controls"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-border bg-background p-1 shadow-lg"
      role="group"
    >
      <ControlButton
        label={fullscreenLabel}
        onClick={toggleFullscreen}
        title={`${fullscreenLabel} (F)`}
      >
        {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
      </ControlButton>
      <ControlButton
        label="Zoom to fit"
        onClick={onZoomToFit}
        title="Zoom to fit"
      >
        <RotateCcw size={15} />
      </ControlButton>
      <ControlButton label="Zoom in" onClick={onZoomIn} title="Zoom in">
        <Plus size={15} />
      </ControlButton>
      <span aria-live="polite" className="sr-only">
        {zoomPercent}%
      </span>
      <ControlButton label="Zoom out" onClick={onZoomOut} title="Zoom out">
        <Minus size={15} />
      </ControlButton>
    </div>
  );
};

export { CanvasControls };
