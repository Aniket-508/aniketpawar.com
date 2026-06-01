import type { MDXContent } from "mdx/types";

import { cn } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";

interface MdxBodyProps {
  Content: MDXContent;
  className?: string;
}

const MdxBody = ({ Content, className }: MdxBodyProps) => (
  <div
    className={cn(
      "animate-slide-in prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-normal prose-h2:text-base prose-h2:text-primary prose-h3:text-sm text-sm prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground",
      className
    )}
  >
    <Content components={mdxComponents} />
  </div>
);

export { MdxBody };
