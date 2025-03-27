import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Allow public access to the home page
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Handle auth pages (signin/signup)
  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    // If user has a valid token, redirect to dashboard
    if (token) {
      try {
        const verifiedToken = await verifyJWT(token);
        if (verifiedToken) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } catch (error) {
        // Invalid token, continue to signin/signup page
        console.error("Auth page redirect error:", error);
      }
    }
    // No token or invalid token, allow access to signin/signup
    return NextResponse.next();
  }

  // Handle protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const verifiedToken = await verifyJWT(token);
    if (!verifiedToken) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/rooms/:path*",
    "/signin",
    "/signup",
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
