import { put } from "@vercel/blob";

import { auth } from "@/lib/auth";
import { isGuestbookConfigured } from "@/lib/guestbook-config";

const pngDataUrlPrefix = "data:image/png;base64,";
const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/u;

export const POST = async (request: Request) => {
  if (!isGuestbookConfigured() || !auth) {
    return Response.json(
      { error: "NOT_CONFIGURED", message: "Guestbook is not configured" },
      { status: 503 }
    );
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return Response.json(
      { error: "UNAUTHORIZED", message: "You must be signed in" },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => null);

  if (typeof body !== "object" || body === null) {
    return Response.json(
      { error: "INVALID_INPUT", message: "Request body must be a JSON object" },
      { status: 400 }
    );
  }

  const { signature } = body as { signature?: unknown };

  if (
    typeof signature !== "string" ||
    !signature.startsWith(pngDataUrlPrefix)
  ) {
    return Response.json(
      { error: "INVALID_INPUT", message: "Signature must be a PNG data URL" },
      { status: 400 }
    );
  }

  const base64Data = signature.slice(pngDataUrlPrefix.length);

  if (
    base64Data.length === 0 ||
    base64Data.length % 4 !== 0 ||
    !base64Pattern.test(base64Data)
  ) {
    return Response.json(
      { error: "INVALID_INPUT", message: "Signature must be valid PNG data" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(base64Data, "base64");
    const blob = await put(
      `signatures/${session.user.id}-${Date.now()}.png`,
      buffer,
      {
        access: "public",
        contentType: "image/png",
      }
    );

    return Response.json({ url: blob.url });
  } catch {
    return Response.json(
      { error: "UPLOAD_FAILED", message: "Failed to upload signature" },
      { status: 500 }
    );
  }
};
