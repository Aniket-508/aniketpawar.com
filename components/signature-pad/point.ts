import type { PointerEvent as ReactPointerEvent } from "react";

export interface PointLike {
  x: number;
  y: number;
}

export class Point implements PointLike {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceTo(point: PointLike): number {
    return Math.hypot(point.x - this.x, point.y - this.y);
  }

  static fromPointerEvent(
    event: ReactPointerEvent<HTMLElement>,
    dpi = 1
  ): Point {
    const { bottom, left, right, top } =
      event.currentTarget.getBoundingClientRect();

    const x = (Math.min(Math.max(left, event.clientX), right) - left) * dpi;
    const y = (Math.min(Math.max(top, event.clientY), bottom) - top) * dpi;

    return new Point(x, y);
  }
}
