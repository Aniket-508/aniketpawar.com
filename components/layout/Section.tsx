import { HTMLAttributes } from "react";

const Section: React.FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  ...attr
}) => {
  return (
    <section className="my-6 py-2" {...attr}>
      {attr?.children}
    </section>
  );
};

export default Section;
