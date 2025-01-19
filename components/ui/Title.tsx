import { cn } from "@/utils/helper";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Title: React.FunctionComponent<TitleProps> = ({ className, ...attr }) => {
  return (
    <h2
      className={cn(
        "font-instrument-serif italic leading-snug font-medium text-xl text-primary",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </h2>
  );
};

export default Title;
