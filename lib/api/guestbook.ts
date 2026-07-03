import type {
  ApiError,
  GuestbookPost,
  GuestbookPostsResponse,
  SignGuestbookRequest,
  SignGuestbookResponse,
} from "@/types/guestbook";

class GuestbookApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "GuestbookApiError";
    this.status = status;
  }
}

const expectRecord = (
  value: unknown,
  label: string
): Record<string, unknown> => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Invalid ${label}`);
  }

  return value as Record<string, unknown>;
};

const expectString = (value: unknown, label: string): string => {
  if (typeof value !== "string") {
    throw new TypeError(`Invalid ${label}`);
  }

  return value;
};

const expectNullableString = (value: unknown, label: string): string | null => {
  if (value === null) {
    return null;
  }

  return expectString(value, label);
};

const expectBoolean = (value: unknown, label: string): boolean => {
  if (typeof value !== "boolean") {
    throw new TypeError(`Invalid ${label}`);
  }

  return value;
};

const expectNullableNonNegativeInteger = (
  value: unknown,
  label: string
): number | null => {
  if (value === null) {
    return null;
  }

  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    throw new Error(`Invalid ${label}`);
  }

  return value;
};

const expectArray = (value: unknown, label: string): unknown[] => {
  if (!Array.isArray(value)) {
    throw new TypeError(`Invalid ${label}`);
  }

  return value;
};

const parseGuestbookPost = (value: unknown): GuestbookPost => {
  const post = expectRecord(value, "guestbook post");

  return {
    created_at: expectString(post.created_at, "guestbook post created_at"),
    id: expectString(post.id, "guestbook post id"),
    message: expectString(post.message, "guestbook post message"),
    name: expectNullableString(post.name, "guestbook post name"),
    signature: expectNullableString(post.signature, "guestbook post signature"),
    username: expectString(post.username, "guestbook post username"),
  };
};

const parseGuestbookPostsResponse = (
  value: unknown
): GuestbookPostsResponse => {
  const response = expectRecord(value, "guestbook posts response");

  return {
    hasMore: expectBoolean(response.hasMore, "guestbook hasMore"),
    nextCursor: expectNullableNonNegativeInteger(
      response.nextCursor,
      "guestbook nextCursor"
    ),
    posts: expectArray(response.posts, "guestbook posts").map(
      parseGuestbookPost
    ),
  };
};

const parseSignGuestbookResponse = (value: unknown): SignGuestbookResponse => {
  const response = expectRecord(value, "sign guestbook response");

  return {
    message: expectString(response.message, "sign guestbook message"),
    post: parseGuestbookPost(response.post),
  };
};

const getApiErrorMessage = (data: unknown): string => {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return "An error occurred";
  }

  const { message } = data as ApiError;
  return typeof message === "string" ? message : "An error occurred";
};

const fetchApi = async <T>(
  endpoint: string,
  parser: (data: unknown) => T,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`/api/guestbook${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new GuestbookApiError(response.status, getApiErrorMessage(data));
  }

  return parser(data);
};

export const guestbookApi = {
  getPosts: (cursor = 0): Promise<GuestbookPostsResponse> =>
    fetchApi(`?cursor=${cursor}`, parseGuestbookPostsResponse),

  sign: (input: SignGuestbookRequest): Promise<SignGuestbookResponse> =>
    fetchApi("/sign", parseSignGuestbookResponse, {
      body: JSON.stringify(input),
      method: "POST",
    }),
};

export { GuestbookApiError };
