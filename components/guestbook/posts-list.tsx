"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { PostCard } from "@/components/guestbook/post-card";
import { Button } from "@/components/ui/button";
import { useGuestbookPosts } from "@/lib/hooks/use-guestbook";
import type { GuestbookPostsResponse } from "@/types/guestbook";

interface PostsListProps {
  initialPosts: GuestbookPostsResponse | null;
}

const PostsList = ({ initialPosts }: PostsListProps) => {
  const guestbookPosts = useGuestbookPosts(initialPosts ?? undefined);
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = guestbookPosts;

  const { ref, inView } = useInView({
    rootMargin: "1000px",
    threshold: 0,
  });

  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  if (guestbookPosts.status === "pending") {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (guestbookPosts.status === "error") {
    return (
      <div className="py-8 text-center text-muted-foreground text-sm">
        Failed to load posts. Please try again later.
      </div>
    );
  }

  const { posts } = guestbookPosts.data;

  if (posts.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground text-sm">
        No posts yet. Be the first to sign!
      </div>
    );
  }

  return (
    <>
      <ul className="mt-10 grid list-none gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <li className="flex" key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className="mt-4 flex justify-center" ref={ref}>
          <Button disabled={isFetchingNextPage} type="button">
            {isFetchingNextPage ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Loading…
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export { PostsList };
