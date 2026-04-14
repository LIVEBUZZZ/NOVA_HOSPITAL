import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container py-10">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <DashboardSidebar role="patient" />
        <div>{children}</div>
      </div>
    </main>
  );
}
