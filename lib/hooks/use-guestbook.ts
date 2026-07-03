"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { guestbookApi } from "@/lib/api/guestbook";
import { guestbookKeys } from "@/lib/query/query-keys";
import type {
  GuestbookPost,
  GuestbookPostsResponse,
  SignGuestbookInput,
} from "@/types/guestbook";

type GuestbookPostsQuery = InfiniteData<GuestbookPostsResponse, number>;

interface GuestbookPostsResult {
  pages: GuestbookPostsResponse[];
  pageParams: number[];
  posts: GuestbookPost[];
}

export const useGuestbookPosts = (
  initialPosts?: GuestbookPostsResponse
): UseInfiniteQueryResult<GuestbookPostsResult, Error> => {
  const initialData: GuestbookPostsQuery | undefined = initialPosts
    ? { pageParams: [0], pages: [initialPosts] }
    : undefined;

  return useInfiniteQuery({
    getNextPageParam: (lastPage: GuestbookPostsResponse) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    initialData,
    initialDataUpdatedAt: initialPosts ? Date.now() : undefined,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => guestbookApi.getPosts(pageParam),
    queryKey: guestbookKeys.posts,
    select: (data) => ({
      pageParams: data.pageParams,
      pages: data.pages,
      posts: data.pages.flatMap((page) => page.posts),
    }),
  });
};

export const useSignGuestbook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ author: _author, ...input }: SignGuestbookInput) =>
      guestbookApi.sign(input),
    onError: (error, _variables, context) => {
      const mutationContext = context as
        | { previousPosts?: GuestbookPostsQuery }
        | undefined;

      if (mutationContext?.previousPosts) {
        queryClient.setQueryData(
          guestbookKeys.posts,
          mutationContext.previousPosts
        );
      }

      const message =
        error instanceof Error ? error.message : "Failed to sign guestbook";
      toast.error(message);
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: guestbookKeys.all });

      const previousPosts = queryClient.getQueryData<GuestbookPostsQuery>(
        guestbookKeys.posts
      );

      queryClient.setQueryData<GuestbookPostsQuery>(
        guestbookKeys.posts,
        (old) => {
          if (!old) {
            return old;
          }

          const optimisticPost: GuestbookPost = {
            created_at: new Date().toISOString(),
            id: `temp-${Date.now()}`,
            message: variables.message,
            name: variables.author.name,
            signature: variables.signature,
            username: variables.author.username,
          };

          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0
                ? { ...page, posts: [optimisticPost, ...page.posts] }
                : page
            ),
          };
        }
      );

      return { previousPosts };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: guestbookKeys.all });
    },
    onSuccess: () => {
      toast.success("Successfully signed the guestbook!");
    },
  });
};
