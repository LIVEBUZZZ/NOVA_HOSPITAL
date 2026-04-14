import { AppointmentTable } from "@/components/portal/appointment-table";
import { ChatbotCard } from "@/components/portal/chatbot-card";
import { CountdownCard } from "@/components/portal/countdown-card";
import { LogoutButton } from "@/components/portal/logout-button";
import { MetricCard } from "@/components/portal/metric-card";
import { NotificationList } from "@/components/portal/notification-list";
import { getCurrentUser } from "@/lib/auth";
import { getPatientAppointments, getPatientNotifications } from "@/lib/server/store";

export default async function PatientDashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "patient") {
    return null;
  }

  const patientAppointments = await getPatientAppointments(user.id);
  const patientNotifications = await getPatientNotifications(user.id);
  const nextAppointment = [...patientAppointments]
    .filter((appointment) => new Date(appointment.date).getTime() > Date.now())
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Patient overview</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-white">{user.fullName}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          Track upcoming appointments, reminders, and care updates without waiting on reception calls.
        </p>
      </div>
        <LogoutButton />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard
          label="Next visit"
          value={nextAppointment ? new Date(nextAppointment.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "None"}
          subtext={nextAppointment ? `${nextAppointment.visitType} with ${nextAppointment.doctorName}` : "No upcoming appointment"}
        />
        <MetricCard label="Unread alerts" value={String(patientNotifications.length).padStart(2, "0")} subtext="Doctor and hospital updates saved for you" />
        <MetricCard label="Payments cleared" value="100%" subtext="No pending consultation dues" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <CountdownCard
          appointmentDate={nextAppointment?.date || null}
          visitType={nextAppointment?.visitType || "Awaiting booking"}
          doctorName={nextAppointment?.doctorName || "Assigned after confirmation"}
        />
        <ChatbotCard />
      </div>
      <AppointmentTable items={patientAppointments} title="Upcoming and recent visits" />
      <NotificationList items={patientNotifications} />
    </div>
  );
}
