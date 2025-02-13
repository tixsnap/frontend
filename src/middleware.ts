import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Redirect logged-in users from login/register to home
  if (
    (pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/register")) &&
    session?.user
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow root route without login
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Allow login and register routes
  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/forgot-password") ||
    pathname.startsWith("/auth/reset-password")
  ) {
    return NextResponse.next();
  }

  // Redirect to login for unauthenticated users
  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Protect organizer route for specific role
  if (pathname.startsWith("/organizer") && session?.user.role !== "ORGANIZER") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
