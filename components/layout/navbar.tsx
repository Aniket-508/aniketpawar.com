import Link from "next/link";

import { GitHubLink } from "@/components/github-link";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

export type { PathItem } from "@/types/navigation";

const Navbar = () => (
  <nav className="sticky top-0 z-10 mx-auto flex w-full max-w-screen-sm items-center justify-between border-x border-b px-4 py-2 backdrop-blur-lg">
    <Link href="/">
      <Icons.logo className="h-5 w-5" />
    </Link>

    {/* <ul className="flex flex-row items-center justify-end gap-3">
        {PATH_MAP.map((pathMapItem: PathItem, pathMapIndex) => (
          <NavItem key={pathMapIndex} item={pathMapItem} />
        ))}
      </ul> */}

    <div className="flex items-center gap-2">
      <GitHubLink />
      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-4"
      />
      <ModeToggle />
    </div>
  </nav>
);

export { Navbar };
