import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const Section: React.FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...attr
}) => {
  return (
    <section className={cn("p-4 animate-in fade-in duration-1000 fill-mode-both", className)} {...attr}>
      {attr?.children}
    </section>
  )
}

export default Section
