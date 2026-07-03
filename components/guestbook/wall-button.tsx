import { PenLine } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const WallButton = () => (
  <Link
    className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
    href={ROUTES.WALL}
  >
    <PenLine />
    See the Wall
  </Link>
);

export { WallButton };
