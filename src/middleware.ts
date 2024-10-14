import { type NextRequest, NextResponse } from "next/server";

import { ROLES } from "@/constants/enum";

const privatePaths = [
  "/change-password",
  "/categories",
  "/meeting",
  "/recordings",
  "/users",
];
const publicPaths = ["/login", "/register"];

const adminPaths = [
  "/admin/dashboard",
  "/admin/mentors",
  "/admin/meetings",
  "/admin/categories",
];

const invalidPaths = ["/admin", "/users"];

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("sessionToken")?.value;

  const role = request.cookies.get("role")?.value;

  const roleRedirect = (role: string) => {
    if (role === ROLES.ADMIN) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  };

  if (invalidPaths.some((path) => pathname === path)) {
    if (role && sessionToken) {
      return roleRedirect(role);
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (
    role &&
    sessionToken &&
    publicPaths.some((path) => pathname.startsWith(path))
  ) {
    return roleRedirect(role);
  }

  if (
    role === ROLES.STUDENT &&
    adminPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (privatePaths.some((path) => pathname.startsWith(path)) ||
      adminPaths.some((path) => pathname.startsWith(path))) &&
    !sessionToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/login",
    "/register",

    "/change-password",
    "/categories",
    "/meeting",
    "/recordings",
    "/users/:path*",

    "/users",
    "/admin",

    "/admin/dashboard",
    "/admin/mentors",
    "/admin/meetings",
    "/admin/categories",
  ],
};
