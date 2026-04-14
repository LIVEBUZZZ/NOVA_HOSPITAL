import { NextResponse } from "next/server";

import { getResendClient } from "@/lib/integrations/resend";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    type?: string;
    email?: string;
    name?: string;
    message?: string;
  };

  const resend = getResendClient();

  if (resend && body.email) {
    await resend.sendEmail({
      from: "Nova Maternity <onboarding@resend.dev>",
      to: body.email,
      subject: body.type === "contact_request" ? "We received your message" : "Nova Maternity update",
      html: `<p>Hello ${body.name || "Patient"},</p><p>${body.message || "Your notification has been received."}</p>`
    });
  }

  return NextResponse.json({
    success: true,
    mode: resend ? "live" : "demo",
    message: "Notification request processed."
  });
}
