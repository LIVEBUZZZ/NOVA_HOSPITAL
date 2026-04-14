import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/portal/logout-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DoctorDashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "doctor") {
    return null; // Or redirect to login
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-3xl p-5 shadow-glow">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">Doctor dashboard</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-foreground">Welcome, Dr. {user.fullName}</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Manage your patients, schedules, and profile from here.
        </p>
        <div className="mt-5">
          <LogoutButton />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">View and manage your patients' visit history and medication.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">View your upcoming appointments and availability.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Update your public profile information.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}