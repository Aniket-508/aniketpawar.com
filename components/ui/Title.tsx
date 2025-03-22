import { cn } from "@/lib/utils"

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Title: React.FunctionComponent<TitleProps> = ({ className, ...attr }) => {
  return (
    <h2
      className={cn(
        "font-instrument-serif text-xl font-medium italic leading-snug text-primary",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </h2>
  )
}

export default Title
