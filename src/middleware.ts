import { NextRequest, NextResponse } from "next/server";

const privatePaths = ["/me"];
const publicPaths = ["/login", "/register"];

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("sessionToken")?.value;

  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (publicPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/categories") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/me", "/login", "/register", "/categories"],
};
