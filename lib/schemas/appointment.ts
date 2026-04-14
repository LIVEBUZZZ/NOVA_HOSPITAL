import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(10, "Enter a valid phone number."),
  doctorId: z.string().min(1, "Select a doctor."),
  appointmentDate: z.string().min(1, "Choose a date."),
  slot: z.string().min(1, "Choose a time slot."),
  visitType: z.string().min(2, "Add the visit reason."),
  notes: z.string().max(500).optional()
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
