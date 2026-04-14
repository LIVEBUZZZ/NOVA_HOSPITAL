import { getCurrentUser } from "@/lib/auth";
import { getAppData, addSchedule, deleteSchedule } from "@/lib/server/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AdminSchedulesPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/auth/login?role=admin");
  }

  const appData = await getAppData();
  const doctors = appData.users.filter(u => u.role === "doctor");

  async function handleAddSchedule(formData: FormData) {
    "use server";
    const doctorId = formData.get("doctorId") as string;
    const date = formData.get("date") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    if (!doctorId || !date || !startTime || !endTime) {
      // Handle error: missing fields
      return;
    }

    await addSchedule({
      doctorId,
      date,
      startTime,
      endTime,
      isBooked: false
    });

    revalidatePath("/dashboard/admin/schedules");
  }

  async function handleDeleteSchedule(scheduleId: string) {
    "use server";
    await deleteSchedule(scheduleId);
    revalidatePath("/dashboard/admin/schedules");
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-foreground">Manage Doctor Schedules</h1>
      <p className="text-muted-foreground">Add, view, and remove doctor availability for appointments.</p>

      <Card>
        <CardHeader>
          <CardTitle>Add New Schedule Slot</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleAddSchedule} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="doctorId">Doctor</Label>
              <Select name="doctorId" required>
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.fullName} ({doctor.specialty})
                  </option>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" name="startTime" type="time" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" name="endTime" type="time" required />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Add Schedule</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="font-display text-2xl font-semibold text-foreground mt-8">Current Schedules</h2>
      {appData.schedules.length === 0 ? (
        <p className="text-muted-foreground">No schedules found.</p>
      ) : (
        <div className="grid gap-4">
          {appData.schedules.map((schedule) => {
            const doctor = doctors.find(d => d.id === schedule.doctorId);
            return (
              <Card key={schedule.id}>
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">{doctor?.fullName} ({doctor?.specialty})</p>
                    <p className="text-muted-foreground">{schedule.date} from {schedule.startTime} to {schedule.endTime}</p>
                    <p className="text-muted-foreground">Status: {schedule.isBooked ? "Booked" : "Available"}</p>
                  </div>
                  <form action={async () => { "use server"; await handleDeleteSchedule(schedule.id); }}>
                    <Button variant="outline" size="sm" className="border-red-500/40 text-red-300 hover:bg-red-500/10">
                      Delete
                    </Button>
                  </form>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}