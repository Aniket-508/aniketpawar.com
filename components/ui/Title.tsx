import { cn } from "@/lib/utils"

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Title: React.FunctionComponent<TitleProps> = ({ className, ...attr }) => {
  return (
    <h2
      className={cn(
        "font-instrument-serif text-primary text-xl leading-snug font-medium italic",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </h2>
  )
}

export default Title
