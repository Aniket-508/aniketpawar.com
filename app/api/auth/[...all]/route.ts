import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";

const handler = auth ? toNextJsHandler(auth) : null;

const notConfigured = () => new Response("Not configured", { status: 503 });

export const GET = handler?.GET ?? notConfigured;
export const POST = handler?.POST ?? notConfigured;
