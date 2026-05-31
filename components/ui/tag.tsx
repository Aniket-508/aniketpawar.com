import { cn } from "@/lib/utils";

type TagProps = React.HTMLAttributes<HTMLSpanElement>;

const Tag: React.FunctionComponent<TagProps> = ({ className, ...attr }) => (
  <span
    className={cn(
      "text-secondary-foreground flex w-fit cursor-default items-center justify-center text-xs opacity-70 hover:underline hover:opacity-100",
      className
    )}
    {...attr}
  >
    {attr?.children}
  </span>
);

export default Tag;
