import { auth } from "@/lib/auth";
import {
  checkUserHasPost,
  createPost,
  getPostWithUser,
} from "@/lib/data/guestbook";
import { isGuestbookConfigured } from "@/lib/guestbook-config";

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

  const { message, signature } = body as {
    message?: unknown;
    signature?: unknown;
  };

  if (typeof message !== "string") {
    return Response.json(
      { error: "INVALID_INPUT", message: "Message is required" },
      { status: 400 }
    );
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return Response.json(
      { error: "INVALID_INPUT", message: "Message is required" },
      { status: 400 }
    );
  }

  if (trimmedMessage.length > 500) {
    return Response.json(
      {
        error: "INVALID_INPUT",
        message: "Message must be 500 characters or less",
      },
      { status: 400 }
    );
  }

  if (
    signature !== null &&
    signature !== undefined &&
    (typeof signature !== "string" || signature.length === 0)
  ) {
    return Response.json(
      {
        error: "INVALID_INPUT",
        message: "Signature must be a non-empty string or null",
      },
      { status: 400 }
    );
  }

  try {
    const hasPost = await checkUserHasPost(session.user.id);

    if (hasPost) {
      return Response.json(
        {
          error: "ALREADY_SIGNED",
          message: "You have already signed the guestbook",
        },
        { status: 409 }
      );
    }

    const postId = await createPost({
      message: trimmedMessage,
      signature: typeof signature === "string" ? signature : null,
      userId: session.user.id,
    });

    const post = await getPostWithUser(postId);

    return Response.json(
      { message: "Successfully signed the guestbook", post },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "INTERNAL_ERROR", message: "Failed to sign the guestbook" },
      { status: 500 }
    );
  }
};
