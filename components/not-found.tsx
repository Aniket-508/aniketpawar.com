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

const NotFound = () => (
  <Empty className="gap-6">
    <EmptyHeader className="gap-3">
      <Title className="not-italic text-8xl font-black" asChild>
        <h1>404</h1>
      </Title>
      <EmptyTitle className="text-2xl font-sans">Page Not Found</EmptyTitle>
      <EmptyDescription className="text-base">
        Oops! The page you&apos;re looking for might have been moved or
        doesn&apos;t exist.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button asChild size="lg">
        <Link href={ROUTES.HOME}>Back to home</Link>
      </Button>
    </EmptyContent>
  </Empty>
);

export { NotFound };
