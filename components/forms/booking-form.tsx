"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";

import { doctors } from "@/lib/data/mock-data";
import { appointmentSchema, type AppointmentFormValues } from "@/lib/schemas/appointment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";

const slots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM"];

export function BookingForm() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: "",
      email: "",
      phone: "",
      doctorId: doctors[0]?.id || "",
      appointmentDate: "",
      slot: slots[0],
      visitType: "",
      notes: ""
    }
  });

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => doctor.id === watch("doctorId")),
    [watch]
  );

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const payload = (await response.json()) as { message?: string; success?: boolean };

    if (!response.ok || !payload.success) {
      setToast({ message: payload.message || "Unable to confirm appointment.", type: "error" });
      return;
    }

    setToast({ message: payload.message || "Appointment confirmed.", type: "success" });
    reset();
  });

  return (
    <>
      <Card className="animate-glow" id="booking">
        <CardHeader>
          <CardTitle>Quick appointment booking</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="patientName">Full name</Label>
              <Input id="patientName" {...register("patientName")} />
              {errors.patientName ? <p className="text-xs text-rose-300">{errors.patientName.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email ? <p className="text-xs text-rose-300">{errors.email.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone ? <p className="text-xs text-rose-300">{errors.phone.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctorId">Doctor</Label>
              <Select id="doctorId" {...register("doctorId")}>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Appointment date</Label>
              <Input id="appointmentDate" type="date" {...register("appointmentDate")} />
              {errors.appointmentDate ? (
                <p className="text-xs text-rose-300">{errors.appointmentDate.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slot">Available slot</Label>
              <Select id="slot" {...register("slot")}>
                {slots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="visitType">Visit type</Label>
              <Input id="visitType" placeholder="Routine checkup / scan review / surgery consult" {...register("visitType")} />
              {errors.visitType ? <p className="text-xs text-rose-300">{errors.visitType.message}</p> : null}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes for the doctor</Label>
              <Textarea id="notes" placeholder="Share symptoms, preferences, or upload instructions." {...register("notes")} />
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 md:col-span-2">
              <p className="text-sm font-medium text-white">Selected doctor</p>
              <p className="mt-2 text-sm text-slate-300">
                {selectedDoctor?.name} · {selectedDoctor?.availability} · Consultation fee {selectedDoctor ? `Rs. ${selectedDoctor.fee}` : ""}
              </p>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Confirming..." : "Book Appointment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
    </>
  );
}
