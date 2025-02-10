import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth(); // get user session from server
  const { pathname } = request.nextUrl;
  if (
    (pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/register")) &&
    session?.user.id
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Protect the /organizer page - only allow users with "ORGANIZER" role
  if (pathname.startsWith("/organizer") && session?.user.role !== "ORGANIZER") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/organizer/:path*"],
};
