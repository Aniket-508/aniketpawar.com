import { cn } from "@/lib/utils"

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Tag: React.FunctionComponent<TagProps> = ({ className, ...attr }) => {
  return (
    <span
      className={cn(
        "flex w-fit cursor-default items-center justify-center gap-1 rounded border border-transparent bg-muted px-2 py-1 text-xs text-muted-foreground hover:bg-primary hover:text-primary-foreground",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </span>
  )
}

export default Tag
