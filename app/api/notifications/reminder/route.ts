import { NextResponse } from "next/server";

import { SESSION_COOKIE } from "@/lib/auth-constants";
import { createPatientReminder, getSessionUser } from "@/lib/server/store";

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${SESSION_COOKIE}=`))
    ?.split("=")[1];

  const user = await getSessionUser(token);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    patientId?: string;
    title?: string;
    message?: string;
    channel?: "email" | "sms" | "dashboard";
    priority?: "high" | "medium" | "low";
  };

  if (!body.patientId || !body.title || !body.message || !body.channel || !body.priority) {
    return NextResponse.json({ success: false, message: "Please complete all reminder fields." }, { status: 400 });
  }

  await createPatientReminder({
    patientId: body.patientId,
    title: body.title,
    message: body.message,
    channel: body.channel,
    priority: body.priority
  });

  return NextResponse.json({ success: true, message: "Reminder sent successfully." });
}
