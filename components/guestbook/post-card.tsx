import { format } from "date-fns";

import { Callout } from "@/components/ui/callout";
import type { GuestbookPost } from "@/types/guestbook";

interface PostCardProps {
  post: GuestbookPost;
}

const PostCard = ({ post }: PostCardProps) => {
  const authorName = post.name ?? `@${post.username}`;
  const signedAt = format(new Date(post.created_at), "MMM d, yyyy, h:mm a");

  return (
    <Callout className="flex h-full flex-col justify-between gap-y-3 bg-background p-4">
      <p className="leading-6">{post.message}</p>

      <div className="mt-auto flex items-center justify-between gap-4">
        <div className="flex flex-col justify-end text-sm">
          <p className="font-medium">{authorName}</p>
          <p className="text-muted-foreground">{signedAt}</p>
        </div>

        {post.signature && (
          <div className="-mr-2 -mb-2 dark:invert">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="signature"
              height={120}
              loading="lazy"
              src={post.signature}
              width={120}
            />
          </div>
        )}
      </div>
    </Callout>
  );
};

export { PostCard };
