export const shortDateFmt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
});

export const weekdayDateFmt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  weekday: "short",
});

export const hmsTimeFmt = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  second: "2-digit",
});

// `Intl.NumberFormat.prototype.format` is a bound getter — safe to extract.
export const intFmt = new Intl.NumberFormat("en-US").format;
