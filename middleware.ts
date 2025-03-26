import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  const path = req.nextUrl.pathname;

  // Redirect authenticated users from login to dashboard
  if (path === "/api/auth/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users from dashboard to login
  if (path.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/api/auth/login", "/dashboard/:path*"],
};
