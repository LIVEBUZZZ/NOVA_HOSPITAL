import { CheckCircle2 } from "lucide-react";

import type { Service } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-6 text-slate-300">{service.description}</p>
        <div className="space-y-3">
          {service.points.map((point) => (
            <div key={point} className="flex items-center gap-3 text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" />
              {point}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
