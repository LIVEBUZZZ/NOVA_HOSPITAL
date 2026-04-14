"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

function getTimeParts(target: string) {
  const diff = new Date(target).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
}

export function CountdownCard({
  appointmentDate,
  visitType,
  doctorName
}: {
  appointmentDate: string | null;
  visitType: string;
  doctorName: string;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const time = useMemo(
    () => (appointmentDate ? getTimeParts(appointmentDate) : { days: 0, hours: 0, minutes: 0 }),
    [appointmentDate, tick]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next appointment countdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Days", value: time.days },
            { label: "Hours", value: time.hours },
            { label: "Minutes", value: time.minutes }
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-center">
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-cyan-300">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200">
          <p className="font-medium text-white">{visitType}</p>
          <p>{doctorName}</p>
          <p>{appointmentDate ? formatDate(appointmentDate) : "No appointment scheduled yet."}</p>
        </div>
      </CardContent>
    </Card>
  );
}
