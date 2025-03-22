import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { Icons } from "../Icons"
import { ModeToggle } from "../ui/ModeToggle"

type PathType = "internal" | "external"

export type PathItem = {
  pathType?: PathType
  title?: string
  link: string
  isAvailable?: boolean
}

function NavItem({ item }: Readonly<{ item: PathItem }>) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  if (item?.isAvailable) {
    return (
      <li
        className={cn(
          "text-base text-muted-foreground hover:text-primary",
          isActive(item.link) && "underline underline-offset-1"
        )}
      >
        <Link
          href={item?.link}
          target={item?.pathType === "external" ? "_blank" : "_self"}
          className=""
        >
          {item?.title}
        </Link>
      </li>
    )
  } else {
    return (
      <li className="cursor-not-allowed text-base text-muted-foreground">
        {item?.title}
      </li>
    )
  }
}

const Navbar: React.FunctionComponent = () => {
  return (
    <nav className="view-container sticky top-0 z-10 flex items-center justify-between border-x border-b px-4 py-2 backdrop-blur-lg">
      <Link href="/">
        <Icons.logo className="h-5 w-5" />
      </Link>
      {/* <ul className="flex flex-row items-center justify-end gap-3">
        {getPathMap()?.map((pathMapItem: PathItem, pathMapIndex: number) => (
          <NavItem key={pathMapIndex} item={pathMapItem} />
        ))}
      </ul> */}
      <div className="flex items-center gap-4">
        <Link
          href={"https://github.com/Aniket-508/aniketpawar.com"}
          target="_blank"
        >
          <Icons.github className="h-4 w-4" />
        </Link>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
