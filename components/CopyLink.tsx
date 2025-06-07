import Link, { type LinkProps } from "next/link"
import { LinkIcon } from "lucide-react"

const parseTitle = (title: string) => {
  return title.toLowerCase().split(" ").join("-")
}

export function CopyLink({
  title,
  ...props
}: { title: string } & Omit<React.ComponentProps<typeof Link>, "href">) {
  const titleFormatted = parseTitle(title)

  return (
    <Link
      id={`section-link-${titleFormatted}`}
      href={`#${titleFormatted}`}
      aria-label={title}
      {...props}
    >
      <LinkIcon className="size-4" />
    </Link>
  )
}
