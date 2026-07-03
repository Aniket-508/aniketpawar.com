"use client";

import NumberFlow from "@number-flow/react";

export const AnimatedNumber = ({
  ...props
}: React.ComponentProps<typeof NumberFlow>) => <NumberFlow {...props} />;
