import Image from "next/image";
import { CalendarDays, Languages, Stethoscope } from "lucide-react";

import type { Doctor } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-72">
        <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
      </div>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{doctor.name}</h3>
            <p className="text-sm text-cyan-200">{doctor.specialty}</p>
          </div>
          <Badge>{formatCurrency(doctor.fee)}</Badge>
        </div>
        <p className="text-sm leading-6 text-slate-300">{doctor.bio}</p>
        <div className="grid gap-2 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-cyan-300" />
            {doctor.experience} experience
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-cyan-300" />
            {doctor.availability}
          </div>
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-cyan-300" />
            {doctor.languages.join(", ")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
