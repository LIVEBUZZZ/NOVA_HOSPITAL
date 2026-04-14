import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getPatientVisitRecords } from "@/lib/server/store";

export default async function PatientHistoryPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "patient") {
    return null;
  }

  const records = await getPatientVisitRecords(user.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical history and visit notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200">
            <p>
              <strong>Date:</strong> {record.date} at {record.time}
            </p>
            <p>
              <strong>Medicine:</strong> {record.medicine}
            </p>
            <p>
              <strong>Notes:</strong> {record.notes}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
