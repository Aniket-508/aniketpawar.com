export const COMPACT_NUMBER_FORMAT = {
  maximumFractionDigits: 1,
  notation: "compact",
} as const;

export const USD_FORMAT = {
  currency: "USD",
  maximumFractionDigits: 2,
  style: "currency",
} as const;

const compactNumberFormatter = new Intl.NumberFormat(
  "en-US",
  COMPACT_NUMBER_FORMAT
);

const usdFormatter = new Intl.NumberFormat("en-US", USD_FORMAT);

export const formatCompactNumber = (value: number) =>
  compactNumberFormatter.format(value);

export const formatUsd = (value: number) => usdFormatter.format(value);
