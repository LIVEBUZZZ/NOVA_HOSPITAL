"use server";

import { appointmentSchema } from "@/lib/schemas/appointment";
import { doctors } from "@/lib/data/mock-data";
import { getStripeClient } from "@/lib/integrations/stripe";

export async function createAppointment(input: FormData) {
  const parsed = appointmentSchema.safeParse(Object.fromEntries(input.entries()));

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors
    };
  }

  const doctor = doctors.find((entry) => entry.id === parsed.data.doctorId);

  if (!doctor) {
    return {
      success: false,
      message: "Selected doctor is unavailable."
    };
  }

  const stripe = getStripeClient();

  if (stripe) {
    // Real implementations should create a Checkout Session or Payment Intent here.
  }

  return {
    success: true,
    message: `Appointment reserved with ${doctor.name} for ${parsed.data.appointmentDate} at ${parsed.data.slot}.`,
    data: parsed.data
  };
}
