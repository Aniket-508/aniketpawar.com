import { and, asc, eq, isNotNull, ne } from "drizzle-orm";

import { getDrizzleDb } from "@/lib/drizzle";
import { post, user } from "@/lib/schema";
import type { GuestbookSignature } from "@/types/guestbook";

const expectSignature = (signature: string | null, postId: string) => {
  if (signature !== null && signature !== "") {
    return signature;
  }

  throw new Error(`Missing signature image for wall post ${postId}`);
};

export const getAllSignatures = async (): Promise<GuestbookSignature[]> => {
  const drizzleDb = getDrizzleDb();

  if (!drizzleDb) {
    throw new Error("Guestbook is not configured");
  }

  const rows = await drizzleDb
    .select({
      created_at: post.created_at,
      id: post.id,
      name: user.name,
      signature: post.signature,
      username: user.username,
    })
    .from(post)
    .innerJoin(user, eq(post.user_id, user.id))
    .where(and(isNotNull(post.signature), ne(post.signature, "")))
    .orderBy(asc(post.created_at));

  return rows.map((row) => ({
    created_at: row.created_at.toISOString(),
    id: row.id,
    name: row.name,
    signature: expectSignature(row.signature, row.id),
    username: row.username,
  }));
};
