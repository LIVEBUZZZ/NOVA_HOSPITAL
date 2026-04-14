import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({
  label,
  value,
  subtext
}: {
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        <p className="mt-2 text-sm text-slate-300">{subtext}</p>
      </CardContent>
    </Card>
  );
}
