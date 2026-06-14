import { llmPlainResponse } from "@/lib/llms/api";
import { buildLlmsTxt } from "@/lib/llms/generate";

export const dynamic = "force-static";
export const revalidate = false;

export const GET = () => llmPlainResponse(buildLlmsTxt());
