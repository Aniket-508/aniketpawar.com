import {
  LLM_MARKDOWN_CONTENT_TYPE,
  LLM_PLAIN_CONTENT_TYPE,
  llmMarkdownHeaders,
  llmPlainHeaders,
} from "./response";

export const markdownResponse = (
  body: string,
  includeBody: boolean
): Response => {
  const tokens = Math.ceil(body.length / 4);

  return new Response(includeBody ? body : null, {
    headers: {
      ...llmMarkdownHeaders(),
      "x-markdown-tokens": String(tokens),
    },
  });
};

export const llmPlainResponse = (body: string, status = 200): Response =>
  new Response(body, {
    headers: llmPlainHeaders(),
    status,
  });

export const llmMarkdownResponse = (body: string, status = 200): Response =>
  new Response(body, {
    headers: llmMarkdownHeaders(),
    status,
  });

export { LLM_MARKDOWN_CONTENT_TYPE, LLM_PLAIN_CONTENT_TYPE };
