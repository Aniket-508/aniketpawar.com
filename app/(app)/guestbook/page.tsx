import { GuestbookContent } from "@/components/guestbook/content";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION =
  "Sign the guestbook and leave your mark. Share a message and your signature.";

export const metadata = createMetadata({
  canonical: ROUTES.GUESTBOOK,
  description: DESCRIPTION,
  title: "Guestbook",
});

const GuestbookPage = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Guestbook", path: ROUTES.GUESTBOOK }]} />
    <header className="animate-slide-in space-y-2 px-4 pt-6 pb-2">
      <Title className="text-xl font-medium italic">{"guestbook."}</Title>
      <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
    </header>

    <GuestbookContent />
  </>
);

export default GuestbookPage;
