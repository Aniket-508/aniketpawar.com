import Link from "next/link";

import { ROUTES } from "@/constants/routes";

const GuestbookCta = () => (
  <Link
    className="fixed top-4 right-4 z-50 rounded-lg border border-border bg-background/90 px-4 py-2 font-medium text-sm shadow-sm backdrop-blur-sm transition-colors hover:bg-accent"
    href={ROUTES.GUESTBOOK}
  >
    Sign the Guestbook
  </Link>
);

export { GuestbookCta };
