import { cn } from "@/utils/helper";

const Callout: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...attr }) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-slate-200 text-zinc-700 text-sm font-normal p-4 leading-6",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </div>
  );
};

export default Callout;
