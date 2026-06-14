export type IndicatorFadeEdges = "both" | "none" | "top" | "bottom";

export interface VerticalFadeSides {
  top: boolean;
  bottom: boolean;
  any: boolean;
}

export const resolveVerticalFadeSides = (
  fade: IndicatorFadeEdges | boolean
): VerticalFadeSides => {
  if (fade === false || fade === "none") {
    return { any: false, bottom: false, top: false };
  }
  if (fade === true || fade === "both") {
    return { any: true, bottom: true, top: true };
  }
  if (fade === "top") {
    return { any: true, bottom: false, top: true };
  }
  return { any: true, bottom: true, top: false };
};

export interface IndicatorFadeGradientStop {
  offset: string;
  opacity: number;
}

/** Opacity stops for the crosshair vertical gradient. */
export const indicatorFadeGradientStops = (
  sides: VerticalFadeSides,
  fadeLengthPercent = 10
): IndicatorFadeGradientStop[] => {
  const fade = Math.min(40, Math.max(2, fadeLengthPercent));
  const innerEnd = 100 - fade;

  if (!sides.any) {
    return [{ offset: "0%", opacity: 1 }];
  }

  if (sides.top && sides.bottom) {
    return [
      { offset: "0%", opacity: 0 },
      { offset: `${fade}%`, opacity: 1 },
      { offset: "50%", opacity: 1 },
      { offset: `${innerEnd}%`, opacity: 1 },
      { offset: "100%", opacity: 0 },
    ];
  }

  if (sides.top) {
    return [
      { offset: "0%", opacity: 0 },
      { offset: `${fade}%`, opacity: 1 },
      { offset: "100%", opacity: 1 },
    ];
  }

  return [
    { offset: "0%", opacity: 1 },
    { offset: `${innerEnd}%`, opacity: 1 },
    { offset: "100%", opacity: 0 },
  ];
};
