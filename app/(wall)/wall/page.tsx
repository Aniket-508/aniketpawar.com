import "@/components/wall/wall.css";
import { computeSignatureLayout } from "@/components/wall/lib/signature-layout";
import { WallCanvas } from "@/components/wall/wall-canvas";
import { ROUTES } from "@/constants/routes";
import { getAllSignatures } from "@/lib/data/wall";
import { isGuestbookConfigured } from "@/lib/guestbook-config";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  canonical: ROUTES.WALL,
  description: "A canvas of all guestbook signatures.",
  title: "Signature Wall",
});

const WallPage = async () => {
  if (!isGuestbookConfigured()) {
    return (
      <div className="wall-root flex items-center justify-center p-4 text-muted-foreground text-sm">
        Signature wall is not configured yet.
      </div>
    );
  }

  const signatures = await getAllSignatures().catch(() => []);
  const layout = computeSignatureLayout(signatures);

  return (
    <div className="wall-root">
      <WallCanvas
        positions={layout.positions}
        revealOrder={layout.revealOrder}
      />
    </div>
  );
};

export default WallPage;
