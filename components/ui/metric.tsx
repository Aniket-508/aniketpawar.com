import { cn } from "@/lib/utils";

export const Metric = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-col gap-1 rounded-md bg-background p-3",
      className
    )}
    {...props}
  />
);

export const MetricLabel = ({
  className,
  ...props
}: React.ComponentProps<"dt">) => (
  <dt className={cn("text-xs text-muted-foreground", className)} {...props} />
);

export const MetricValue = ({
  className,
  ...props
}: React.ComponentProps<"dd">) => (
  <dd
    className={cn("text-lg font-semibold tabular-nums", className)}
    {...props}
  />
);
