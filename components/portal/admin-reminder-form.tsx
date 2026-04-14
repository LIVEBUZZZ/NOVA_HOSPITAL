"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";

type PatientOption = {
  id: string;
  label: string;
};

export function AdminReminderForm({ patients }: { patients: PatientOption[] }) {
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientId: patients[0]?.id || "",
    title: "",
    message: "",
    channel: "dashboard",
    priority: "medium"
  });

  async function submit() {
    setLoading(true);
    const response = await fetch("/api/notifications/reminder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const payload = (await response.json()) as { message?: string };
    setLoading(false);
    setToast(payload.message || "Reminder queued.");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor/admin AI reminder sender</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="patientId">Patient</Label>
          <Select id="patientId" value={form.patientId} onChange={(event) => setForm({ ...form, patientId: event.target.value })}>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Reminder title</Label>
          <Input id="title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Reminder message</Label>
          <Textarea id="message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="channel">Channel</Label>
            <Select id="channel" value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value })}>
              <option value="dashboard">Dashboard</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select id="priority" value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>
        </div>
        <Button onClick={submit} disabled={loading}>
          {loading ? "Sending..." : "Send Reminder"}
        </Button>
      </CardContent>
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </Card>
  );
}
