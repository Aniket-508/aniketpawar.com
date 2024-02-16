import { cn } from "@/utils/helper";
import Link, { LinkProps } from "next/link";
import { ArrowUpRight } from "lucide-react";

interface LinkTextProps extends LinkProps {
  children?: React.ReactNode;
  className?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
}

const LinkText: React.FunctionComponent<LinkTextProps> = ({
  className,
  target,
  ...attr
}) => {
  return (
    <Link
      className={cn(
        "flex flex-row items-center justify-start gap-0.5 text-base font-medium transition-all text-zinc-900 hover:text-zinc-700 relative after:bg-black after:absolute after:h-[1.5px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 hover:gap-1 active:text-black",
        className
      )}
      {...attr}
      target={target}
    >
      <span>{attr?.children}</span>
      <ArrowUpRight className="w-4" />
    </Link>
  );
};

export default LinkText;
