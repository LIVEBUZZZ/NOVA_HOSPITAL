import { AdminReminderForm } from "@/components/portal/admin-reminder-form";
import { LogoutButton } from "@/components/portal/logout-button";
import { AppointmentTable } from "@/components/portal/appointment-table";
import { MetricCard } from "@/components/portal/metric-card";
import { NotificationList } from "@/components/portal/notification-list";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { doctors } from "@/lib/data/mock-data";
import { getAppData } from "@/lib/server/store";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  const appData = await getAppData();
  const patientOptions = appData.users
    .filter((entry) => entry.role === "patient")
    .map((entry) => ({ id: entry.id, label: `${entry.fullName} (${entry.email})` }));

  return (
    <main className="container py-10">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <div className="glass-card rounded-3xl p-5 shadow-glow">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Admin dashboard</p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-white">Hospital operations</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Coordinate appointments, schedules, patient communication, and billing visibility from one place.
            </p>
            <div className="mt-5">
              <LogoutButton />
            </div>
            <div className="mt-5">
              <Link href="/dashboard/admin/schedules" className="text-sm text-primary hover:underline">
                Manage Doctor Schedules
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <MetricCard label="Today appointments" value="42" subtext="7 high-priority maternity reviews" />
            <MetricCard label="Average waiting time" value="8 min" subtext="Improved after slot balancing" />
            <MetricCard label="Broadcast reach" value="98%" subtext="Emergency notifications delivered quickly" />
          </div>

          <section id="appointments">
            <AppointmentTable items={appData.appointments} title="Appointment operations" />
          </section>

          <section id="alerts">
            <NotificationList items={appData.notifications} />
          </section>

          <AdminReminderForm patients={patientOptions} />

          <section id="security">
            <Card>
              <CardHeader>
                <CardTitle>Operations checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Appointment confirmation automation active for email and dashboard delivery.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Reminder jobs prepared for scheduled execution via Vercel cron or Supabase edge functions.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Payment endpoint supports Stripe integration with environment-based activation.
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
