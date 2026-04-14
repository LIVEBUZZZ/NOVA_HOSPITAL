import { NextResponse } from "next/server";

import { SESSION_COOKIE, SESSION_ROLE_COOKIE } from "@/lib/auth-constants";
import { findUserByEmail, createSession } from "@/lib/server/store";
import { loginSchema } from "@/lib/schemas/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Invalid login data." }, { status: 400 });
  }

  const user = await findUserByEmail(parsed.data.email);

  if (!user || user.role !== parsed.data.role) {
    return NextResponse.json({
      success: false,
      message: "No existing account was found for these credentials."
    }, { status: 401 });
  }

  if (user.password !== parsed.data.password) {
    return NextResponse.json({ success: false, message: "Incorrect password." }, { status: 401 });
  }

  const token = await createSession(user);
  const redirectTo = user.role === "admin" ? "/dashboard/admin" : "/dashboard/patient";
  const response = NextResponse.json({ success: true, redirectTo, message: "Login successful." });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/"
  });
  response.cookies.set(SESSION_ROLE_COOKIE, user.role, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/"
  });

  return response;
}
