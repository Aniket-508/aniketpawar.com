import { cn } from "@/lib/utils";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Tag: React.FunctionComponent<TagProps> = ({ className, ...attr }) => {
  return (
    <span
      className={cn(
        "px-2 py-1 rounded bg-muted text-muted-foreground border border-transparent text-xs flex items-center justify-center gap-1 w-fit cursor-default hover:bg-primary hover:text-primary-foreground",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </span>
  );
};

export default Tag;
