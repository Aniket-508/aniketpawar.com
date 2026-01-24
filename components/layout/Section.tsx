import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const Section: React.FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...attr
}) => {
  return (
    <section
      className={cn(
        "animate-in fade-in fill-mode-both px-4 py-6 duration-1000",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </section>
  )
}

export default Section
