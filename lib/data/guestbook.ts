import { desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { getDrizzleDb } from "@/lib/drizzle";
import { post, user } from "@/lib/schema";
import type { GuestbookPost, GuestbookPostsResponse } from "@/types/guestbook";

const PAGE_SIZE = 30;

const serializeGuestbookPost = (row: {
  created_at: Date;
  id: string;
  message: string;
  name: string | null;
  signature: string | null;
  username: string;
}): GuestbookPost => ({
  created_at: row.created_at.toISOString(),
  id: row.id,
  message: row.message,
  name: row.name,
  signature: row.signature,
  username: row.username,
});

export const getGuestbookPosts = async (
  cursor = 0
): Promise<GuestbookPostsResponse> => {
  const drizzleDb = getDrizzleDb();

  if (!drizzleDb) {
    throw new Error("Guestbook is not configured");
  }

  if (cursor < 0 || !Number.isFinite(cursor)) {
    throw new Error("Invalid cursor parameter");
  }

  const posts = await drizzleDb
    .select({
      created_at: post.created_at,
      id: post.id,
      message: post.message,
      name: user.name,
      signature: post.signature,
      username: user.username,
    })
    .from(post)
    .innerJoin(user, eq(post.user_id, user.id))
    .orderBy(desc(post.created_at))
    .limit(PAGE_SIZE + 1)
    .offset(cursor);

  const hasMore = posts.length > PAGE_SIZE;
  const paginatedPosts = hasMore ? posts.slice(0, PAGE_SIZE) : posts;

  return {
    hasMore,
    nextCursor: hasMore ? cursor + PAGE_SIZE : null,
    posts: paginatedPosts.map(serializeGuestbookPost),
  };
};

export const checkUserHasPost = async (userId: string): Promise<boolean> => {
  const drizzleDb = getDrizzleDb();

  if (!drizzleDb) {
    throw new Error("Guestbook is not configured");
  }

  const result = await drizzleDb
    .select({ id: post.id })
    .from(post)
    .where(eq(post.user_id, userId))
    .limit(1);

  return result.length > 0;
};

export const createPost = async (data: {
  message: string;
  signature: string | null;
  userId: string;
}): Promise<string> => {
  const drizzleDb = getDrizzleDb();

  if (!drizzleDb) {
    throw new Error("Guestbook is not configured");
  }

  const postId = nanoid();

  await drizzleDb.insert(post).values({
    created_at: new Date(),
    id: postId,
    message: data.message,
    signature: data.signature,
    user_id: data.userId,
  });

  return postId;
};

export const getPostWithUser = async (
  postId: string
): Promise<GuestbookPost> => {
  const drizzleDb = getDrizzleDb();

  if (!drizzleDb) {
    throw new Error("Guestbook is not configured");
  }

  const rows = await drizzleDb
    .select({
      created_at: post.created_at,
      id: post.id,
      message: post.message,
      name: user.name,
      signature: post.signature,
      username: user.username,
    })
    .from(post)
    .innerJoin(user, eq(post.user_id, user.id))
    .where(eq(post.id, postId))
    .limit(1);

  const [row] = rows;

  if (!row) {
    throw new Error("Post not found");
  }

  return serializeGuestbookPost(row);
};
