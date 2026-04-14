import { getCurrentUser } from "@/lib/auth";
import { getPatientsByDoctorId } from "@/lib/server/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function DoctorPatientsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "doctor") {
    return null; // Or redirect to login
  }

  const patients = await getPatientsByDoctorId(user.id);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-foreground">My Patients</h1>
      <p className="text-muted-foreground">View and manage records for your assigned patients.</p>

      {patients.length === 0 ? (
        <p className="text-muted-foreground">No patients assigned yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <Card key={patient.id}>
              <CardHeader>
                <CardTitle>{patient.fullName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Email: {patient.email}</p>
                <p className="text-muted-foreground">Phone: {patient.phone}</p>
                <Button asChild variant="ghost" className="mt-4 px-0 text-primary hover:bg-transparent hover:text-primary/90">
                  <Link href={`/dashboard/doctor/patients/${patient.id}`}>
                    View Records <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}