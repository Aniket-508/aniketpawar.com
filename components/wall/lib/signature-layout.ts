import type { GuestbookSignature } from "@/types/guestbook";

export const ELEMENT_WIDTH = 220;
export const ELEMENT_HEIGHT = 140;

export interface SignaturePosition {
  id: string;
  signature: GuestbookSignature;
  x: number;
  y: number;
}

export interface SignatureLayout {
  positions: SignaturePosition[];
  revealOrder: string[];
}

const MIN_GAP = 12;
const GRID_STEP_X = ELEMENT_WIDTH + MIN_GAP;
const GRID_STEP_Y = ELEMENT_HEIGHT + MIN_GAP;
const POSITION_JITTER = MIN_GAP / 4;

const seededRandom = (seed: string): (() => number) => {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    const char = seed.codePointAt(i) ?? 0;
    hash = Math.trunc((hash * 31 + char) % 2_147_483_647);
  }

  return () => {
    hash = Math.trunc((hash * 1_103_515_245 + 12_345) % 2_147_483_647);
    return hash / 2_147_483_647;
  };
};

const getGridPosition = (column: number, row: number) => ({
  x: column * GRID_STEP_X - ELEMENT_WIDTH / 2,
  y: row * GRID_STEP_Y - ELEMENT_HEIGHT / 2,
});

const getSpiralCoordinates = (index: number) => {
  if (index === 0) {
    return { column: 0, row: 0 };
  }

  const layer = Math.ceil((Math.sqrt(index + 1) - 1) / 2);
  const sideLength = layer * 2;
  const maxIndex = (layer * 2 + 1) ** 2 - 1;
  const offset = maxIndex - index;

  if (offset < sideLength) {
    return { column: layer - offset, row: layer };
  }

  if (offset < sideLength * 2) {
    return { column: -layer, row: layer - (offset - sideLength) };
  }

  if (offset < sideLength * 3) {
    return { column: -layer + (offset - sideLength * 2), row: -layer };
  }

  return { column: layer, row: -layer + (offset - sideLength * 3) };
};

const getSignaturePosition = (index: number, id: string) => {
  const { column, row } = getSpiralCoordinates(index);
  const base = getGridPosition(column, row);
  const random = seededRandom(id);

  return {
    x: base.x + (random() - 0.5) * POSITION_JITTER * 2,
    y: base.y + (random() - 0.5) * POSITION_JITTER * 2,
  };
};

export const computeSignatureLayout = (
  signatures: GuestbookSignature[]
): SignatureLayout => {
  const positions = signatures.map((signature, index) => {
    const { x, y } = getSignaturePosition(index, signature.id);

    return {
      id: signature.id,
      signature,
      x,
      y,
    };
  });

  const revealOrder = positions
    .toSorted((a, b) => {
      const distA = a.x * a.x + a.y * a.y;
      const distB = b.x * b.x + b.y * b.y;
      return distA - distB;
    })
    .map((position) => position.id);

  return { positions, revealOrder };
};
