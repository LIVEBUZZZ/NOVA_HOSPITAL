import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE, SESSION_ROLE_COOKIE } from "@/lib/auth-constants";     

export function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const role = request.cookies.get(SESSION_ROLE_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard/patient") && (!token || role !== "patient")) {
    return NextResponse.redirect(new URL("/auth/login?role=patient", request.url));
  }

  if (pathname.startsWith("/dashboard/admin") && (!token || role !== "admin")) {
    return NextResponse.redirect(new URL("/auth/login?role=admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/patient/:path*", "/dashboard/admin/:path*"]
};