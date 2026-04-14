import { AppointmentTable } from "@/components/portal/appointment-table";
import { CountdownCard } from "@/components/portal/countdown-card";
import { getCurrentUser } from "@/lib/auth";
import { getPatientAppointments } from "@/lib/server/store";

export default async function PatientAppointmentsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "patient") {
    return null;
  }

  const patientAppointments = await getPatientAppointments(user.id);
  const nextAppointment = [...patientAppointments]
    .filter((appointment) => new Date(appointment.date).getTime() > Date.now())
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-white">Appointments</h1>
      <CountdownCard
        appointmentDate={nextAppointment?.date || null}
        visitType={nextAppointment?.visitType || "Awaiting booking"}
        doctorName={nextAppointment?.doctorName || "Assigned after confirmation"}
      />
      <AppointmentTable items={patientAppointments} title="Manage appointments" />
    </div>
  );
}
