import { NextResponse } from "next/server";

import { SESSION_COOKIE, SESSION_ROLE_COOKIE } from "@/lib/auth-constants";
import { destroySession } from "@/lib/server/store";

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${SESSION_COOKIE}=`))
    ?.split("=")[1];

  await destroySession(token);

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 0
  });
  response.cookies.set(SESSION_ROLE_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 0
  });

  return response;
}
