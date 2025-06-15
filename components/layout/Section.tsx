import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const Section: React.FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...attr
}) => {
  return (
    <section
      className={cn(
        "px-4 py-6 duration-1000 animate-in fade-in fill-mode-both",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </section>
  )
}

export default Section
