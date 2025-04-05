import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import {
  authApi,
  authRoutes,
  dashboardRoute,
  privateRoutes,
} from "./data/routes";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();
  const isLoggedIn = !!session?.user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(authApi);

  const isPrivateRoute = privateRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(dashboardRoute, nextUrl));
  }

  if (!isLoggedIn && isPrivateRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
