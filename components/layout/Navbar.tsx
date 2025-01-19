"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPathMap } from "@/lib/pathmap";
import { cn } from "@/utils/helper";
import Container from "./Container";

type PathType = "internal" | "external";

interface PathMapProps {
  pathType?: PathType;
  title?: string;
  link?: string;
  isAvailable?: boolean;
}

const Navbar: React.FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav className="font-sans py-4 sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
      <Container>
        <ul className="flex flex-row items-center justify-end gap-3">
          {getPathMap()?.map(
            (pathMapItem: PathMapProps, pathMapIndex: number) => {
              if (pathMapItem?.isAvailable) {
                return (
                  <li
                    key={pathMapIndex}
                    className={cn(
                      "text-base text-muted-foreground hover:text-primary",
                      pathname === pathMapItem?.link &&
                        "underline underline-offset-1"
                    )}
                  >
                    {pathMapItem?.link && (
                      <Link
                        href={pathMapItem?.link}
                        target={
                          pathMapItem?.pathType === "external"
                            ? "_blank"
                            : "_self"
                        }
                        className=""
                      >
                        {pathMapItem?.title}
                      </Link>
                    )}
                  </li>
                );
              } else {
                return (
                  <li
                    className="cursor-not-allowed text-base text-muted-foreground"
                    key={pathMapIndex}
                  >
                    {pathMapItem?.title}
                  </li>
                );
              }
            }
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;

export type { PathMapProps };
