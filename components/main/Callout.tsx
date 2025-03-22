import { cn } from "@/lib/utils"

const Callout: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...attr }) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-accent p-4 text-sm font-normal leading-6 text-accent-foreground",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </div>
  )
}

export default Callout
