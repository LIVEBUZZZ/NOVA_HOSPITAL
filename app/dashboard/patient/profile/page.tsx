import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";

export default async function PatientProfilePage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "patient") {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile and notification preferences</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm text-slate-200 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-slate-400">Primary patient</p>
          <p className="mt-2 text-base text-white">{user.fullName}</p>
          <p className="mt-2">Due date: {user.dueDate || "Not set"}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-slate-400">Preferences</p>
          <p className="mt-2">Email reminders: Enabled</p>
          <p>SMS alerts: Enabled</p>
          <p>Urgent surgery updates: Enabled</p>
        </div>
      </CardContent>
    </Card>
  );
}
