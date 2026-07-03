import { GuestbookActions } from "@/components/guestbook/guestbook-actions";
import { PostsList } from "@/components/guestbook/posts-list";
import { Section } from "@/components/layout/section";
import { Callout } from "@/components/ui/callout";
import { getSession } from "@/lib/auth-server";
import { getGuestbookPosts } from "@/lib/data/guestbook";
import { isGuestbookConfigured } from "@/lib/guestbook-config";
import type { AuthUser } from "@/types/auth";
import type { GuestbookPostsResponse } from "@/types/guestbook";

const GuestbookContent = async () => {
  if (!isGuestbookConfigured()) {
    return (
      <Section className="delay-100">
        <Callout>
          Guestbook is not configured yet. Set up Turso, GitHub OAuth, and
          Better Auth environment variables to enable signing.
        </Callout>
      </Section>
    );
  }

  const [session, initialPosts] = await Promise.all([
    getSession(),
    getGuestbookPosts(0).catch(() => null),
  ]);

  const user = (session?.user ?? null) as AuthUser | null;

  return (
    <>
      <Section className="delay-100 space-y-4 py-2">
        {user ? (
          <div className="space-y-4">
            <h2 className="font-medium text-lg text-balance">
              Hello, {user.name}!
            </h2>
            <GuestbookActions user={user} />
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="font-medium text-lg text-balance">
              Sign my guestbook
            </h2>
            <GuestbookActions user={null} />
          </div>
        )}
      </Section>

      <Section className="delay-200 py-2">
        <PostsList
          initialPosts={initialPosts as GuestbookPostsResponse | null}
        />
      </Section>
    </>
  );
};

export { GuestbookContent };
