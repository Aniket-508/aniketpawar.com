import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";

const NAV_LINKS = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.PROJECTS, label: "Projects" },
  { href: ROUTES.CRAFTS, label: "Crafts" },
  { href: ROUTES.EXPERIENCES, label: "Experience" },
  { href: ROUTES.CONTACT, label: "Contact" },
] as const;

const NotFound = () => (
  <Empty className="gap-6">
    <EmptyHeader className="gap-3">
      <Title className="text-8xl font-black" render={<h1>404</h1>} />
      <EmptyTitle className="text-2xl font-sans">Page Not Found</EmptyTitle>
      <EmptyDescription className="text-base">
        Oops! The page you&apos;re looking for might have been moved or
        doesn&apos;t exist.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent className="flex flex-col gap-4">
      <Button
        size="lg"
        nativeButton={false}
        render={<Link href={ROUTES.HOME} />}
      >
        <ArrowLeftIcon /> Back to home
      </Button>
      <nav className="text-muted-foreground text-sm text-center space-y-1">
        <p>Try one of these pages instead:</p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground underline underline-offset-2 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="pt-2">
          Or check the{" "}
          <Link
            href="/sitemap.xml"
            className="text-foreground underline underline-offset-2 hover:text-primary"
          >
            sitemap
          </Link>{" "}
          or{" "}
          <Link
            href="/llms.txt"
            className="text-foreground underline underline-offset-2 hover:text-primary"
          >
            llms.txt
          </Link>
          .
        </p>
      </nav>
    </EmptyContent>
  </Empty>
);

export { NotFound };
