import { LinkIcon } from "lucide-react";
import Link from "next/link";

const parseTitle = (title: string) => title.toLowerCase().split(" ").join("-");

export const CopyLink = ({
  title,
  ...props
}: { title: string } & Omit<React.ComponentProps<typeof Link>, "href">) => {
  const titleFormatted = parseTitle(title);

  return (
    <Link
      id={`section-link-${titleFormatted}`}
      href={`#${titleFormatted}`}
      aria-label={title}
      {...props}
    >
      <LinkIcon className="size-4" />
    </Link>
  );
};
