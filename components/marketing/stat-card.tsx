import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-3xl font-semibold text-white">{value}</p>
        <p className="mt-2 text-sm text-slate-400">{label}</p>
      </CardContent>
    </Card>
  );
}
