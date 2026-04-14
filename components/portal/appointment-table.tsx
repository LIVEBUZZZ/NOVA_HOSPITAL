import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Appointment } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

function statusVariant(status: Appointment["status"]) {
  if (status === "confirmed" || status === "completed") return "success" as const;
  if (status === "pending" || status === "rescheduled") return "warning" as const;
  return "danger" as const;
}

export function AppointmentTable({ items, title }: { items: Appointment[]; title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr className="border-b border-white/10">
              <th className="pb-3 font-medium">Patient</th>
              <th className="pb-3 font-medium">Doctor</th>
              <th className="pb-3 font-medium">Visit</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Fee</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((appointment) => (
              <tr key={appointment.id} className="border-b border-white/5 text-slate-200">
                <td className="py-4">{appointment.patientName}</td>
                <td className="py-4">{appointment.doctorName}</td>
                <td className="py-4">{appointment.visitType}</td>
                <td className="py-4">{formatDate(appointment.date)}</td>
                <td className="py-4">{formatCurrency(appointment.fee)}</td>
                <td className="py-4">
                  <Badge variant={statusVariant(appointment.status)}>{appointment.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
