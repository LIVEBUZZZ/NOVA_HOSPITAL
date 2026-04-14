import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    doctorId?: string;
    availability?: string;
    changeReason?: string;
  };

  if (!body.doctorId || !body.availability) {
    return NextResponse.json({ success: false, message: "Missing schedule details." }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: `Schedule for ${body.doctorId} updated to ${body.availability}.`,
    changeReason: body.changeReason || "Routine update"
  });
}
