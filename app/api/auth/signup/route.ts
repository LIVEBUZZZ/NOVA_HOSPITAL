import { NextResponse } from "next/server";

import { SESSION_COOKIE, SESSION_ROLE_COOKIE } from "@/lib/auth-constants";
import { signupSchema } from "@/lib/schemas/auth";
import { createPatientUser, createSession } from "@/lib/server/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Invalid signup data." }, { status: 400 });
    }

    const created = await createPatientUser(parsed.data);

    if (!created.success) {
      return NextResponse.json({ success: false, message: created.message }, { status: 400 });
    }

    const token = await createSession(created.user);
    const response = NextResponse.json({
      success: true,
      redirectTo: "/dashboard/patient",
      message: "Account created successfully."
    });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });
    response.cookies.set(SESSION_ROLE_COOKIE, "patient", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Signup request failed. Please try again." },
      { status: 500 }
    );
  }
}
