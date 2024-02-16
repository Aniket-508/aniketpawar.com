import { cn } from "@/utils/helper";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Tag: React.FunctionComponent<TagProps> = ({ className, ...attr }) => {
  return (
    <span
      className={cn(
        "tag px-2 py-1 rounded bg-blue-100 text-zinc-700 border border-transparent text-sm flex flex-row items-center justify-center gap-1 w-fit h-auto hover:bg-blue-200 cursor-default",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </span>
  );
};

export default Tag;
