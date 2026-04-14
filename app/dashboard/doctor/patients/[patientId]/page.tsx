import { getCurrentUser } from "@/lib/auth";
import { getPatientVisitRecords, addPatientVisitRecord, getAppData } from "@/lib/server/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function PatientRecordPage({ params }: { params: Promise<{ patientId: string }> }) {
  const user = await getCurrentUser();
  const { patientId } = await params;

  if (!user || user.role !== "doctor") {
    redirect("/auth/login?role=doctor");
  }

  const appData = await getAppData();
  const patient = appData.users.find(u => u.id === patientId && u.role === "patient");

  if (!patient) {
    return <p className="text-destructive">Patient not found.</p>;
  }

  const visitRecords = await getPatientVisitRecords(patientId);

  async function addRecord(formData: FormData) {
    "use server";
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const medicine = formData.get("medicine") as string;
    const notes = formData.get("notes") as string;

    if (!date || !time || !medicine || !notes) {
      // Handle error: missing fields
      return;
    }

    await addPatientVisitRecord({
      patientId,
      doctorId: user!.id,
      date,
      time,
      medicine,
      notes
    });

    revalidatePath(`/dashboard/doctor/patients/${patientId}`);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-foreground">Patient Records for {patient.fullName}</h1>
      <p className="text-muted-foreground">Email: {patient.email}</p>
      <p className="text-muted-foreground">Phone: {patient.phone}</p>

      <Card>
        <CardHeader>
          <CardTitle>Add New Visit Record</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addRecord} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="medicine">Medicine</Label>
              <Input id="medicine" name="medicine" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" required />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Add Record</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="font-display text-2xl font-semibold text-foreground mt-8">Visit History</h2>
      {visitRecords.length === 0 ? (
        <p className="text-muted-foreground">No visit records found for this patient.</p>
      ) : (
        <div className="grid gap-4">
          {visitRecords.map((record) => (
            <Card key={record.id}>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{record.date} at {record.time}</p>
                <p className="font-semibold text-foreground mt-2">Medicine: {record.medicine}</p>
                <p className="text-muted-foreground mt-1">Notes: {record.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}