import { NextResponse } from "next/server";

import { doctors } from "@/lib/data/mock-data";
import { appointmentSchema } from "@/lib/schemas/appointment";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = appointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please complete all required appointment fields." },
      { status: 400 }
    );
  }

  const doctor = doctors.find((entry) => entry.id === parsed.data.doctorId);

  if (!doctor) {
    return NextResponse.json({ success: false, message: "Doctor not found." }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: `Appointment confirmed with ${doctor.name} on ${parsed.data.appointmentDate} at ${parsed.data.slot}.`
  });
}
