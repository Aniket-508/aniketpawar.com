"use client";

import NumberFlow from "@number-flow/react";

interface AnimatedNumberProps {
  value: number;
  format?: Intl.NumberFormatOptions;
  locales?: string | string[];
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedNumber = ({
  value,
  format,
  locales = "en-US",
  prefix,
  suffix,
  className,
}: AnimatedNumberProps) => (
  <NumberFlow
    value={value}
    format={format}
    locales={locales}
    prefix={prefix}
    suffix={suffix}
    className={className}
  />
);
