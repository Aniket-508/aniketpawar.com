import { llmPlainResponse } from "@/lib/llms/api";
import { buildLlmsFullTxt } from "@/lib/llms/generate";

export const dynamic = "force-static";
export const revalidate = false;

export const GET = async () => llmPlainResponse(await buildLlmsFullTxt());
