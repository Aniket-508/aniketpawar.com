import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ModeToggle } from "../ui/ModeToggle";
import { Icons } from "../Icons";

type PathType = "internal" | "external";

export type PathItem = {
  pathType?: PathType;
  title?: string;
  link: string;
  isAvailable?: boolean;
};

function NavItem({ item }: Readonly<{ item: PathItem }>) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

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
    );
  } else {
    return (
      <li className="cursor-not-allowed text-base text-muted-foreground">
        {item?.title}
      </li>
    );
  }
}

const Navbar: React.FunctionComponent = () => {
  return (
    <nav className="view-container px-4 py-2 sticky flex items-center justify-between top-0 border-x z-10 bg-background backdrop-filter backdrop-blur-lg bg-opacity-30 border-b">
      <Link href="/">
        <Image src="/icon.svg" width={20} height={20} alt="ap-logo" priority />
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
  );
};

export default Navbar;
