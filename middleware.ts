import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Serve llms.txt as plain text when requested directly
  if (pathname === "/llms.txt" || pathname === "/llms-full.txt") {
    const response = NextResponse.next();
    response.headers.set("Content-Type", "text/plain; charset=utf-8");
    response.headers.set("Vary", "Accept, Accept-Encoding");
    return response;
  }

  // For all other routes, pass through with vary header hint
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|favicon-16x16.png|favicon-32x32.png|android-chrome-192x192.png|android-chrome-512x512.png|profile.jpg|resume.pdf|fonts/).*)",
  ],
};
