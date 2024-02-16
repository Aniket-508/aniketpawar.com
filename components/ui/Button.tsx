import { cn } from "@/utils/helper";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  ...attr
}) => {
  return (
    <button
      className={cn(
        "px-3 py-1.5 bg-zinc-800 text-zinc-50 border-2 border-transparent truncate rounded hover:brightness-150 active:brightness-125 disabled:cursor-default disabled:bg-zinc-200 disabled:text-zinc-900",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </button>
  );
};

export default Button;
