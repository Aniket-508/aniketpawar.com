export const LLM_MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";
export const LLM_PLAIN_CONTENT_TYPE = "text/plain; charset=utf-8";

export const llmMarkdownHeaders = (): HeadersInit => ({
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Content-Type": LLM_MARKDOWN_CONTENT_TYPE,
  "X-Robots-Tag": "noindex",
});

export const llmPlainHeaders = (): HeadersInit => ({
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Content-Type": LLM_PLAIN_CONTENT_TYPE,
  "X-Robots-Tag": "noindex",
});

export const llmMarkdownResponse = (body: string, status = 200): Response =>
  new Response(body, { headers: llmMarkdownHeaders(), status });

export const llmPlainResponse = (body: string, status = 200): Response =>
  new Response(body, { headers: llmPlainHeaders(), status });
