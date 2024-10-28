import { type NextRequest, NextResponse } from "next/server";

import { ROLES } from "@/constants/enum";

const publicPaths = ["/login", "/register"];

const mentorPaths = ["/mentor/courses", "/course/create"];

const adminPaths = [
  "/admin/dashboard",
  "/admin/mentors",
  "/admin/meetings",
  "/admin/categories",
];

const privatePaths = [
  "/change-password",
  "/categories",
  "/meeting",
  "/recordings",
  "/user-info",
  ...mentorPaths,
  ...adminPaths,
];

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const role = request.cookies.get("role")?.value;

  const roleRedirect = (role: string) => {
    switch (role) {
      case ROLES.ADMIN:
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      case ROLES.MENTOR:
        return NextResponse.redirect(new URL("/mentor/courses", request.url));
      case ROLES.STUDENT:
        return NextResponse.redirect(new URL("/", request.url));
      default:
        break;
    }
  };

  if (
    role &&
    sessionToken &&
    publicPaths.some((path) => pathname.startsWith(path))
  ) {
    return roleRedirect(role);
  }

  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  switch (role) {
    case ROLES.STUDENT:
      if (
        mentorPaths.some((path) => pathname.startsWith(path)) ||
        adminPaths.some((path) => pathname.startsWith(path))
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    case ROLES.MENTOR:
      if (adminPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL("/mentor/courses", request.url));
      }
    default:
      break;
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
    "/user-info",

    "/mentor/courses",
    "/course/create",

    "/admin/dashboard",
    "/admin/mentors",
    "/admin/meetings",
    "/admin/categories",
  ],
};
