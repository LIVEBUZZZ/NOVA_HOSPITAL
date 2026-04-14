export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  image: string;
  bio: string;
  languages: string[];
  fee: number;
};

export type Appointment = {
  id: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  status: "confirmed" | "pending" | "rescheduled" | "completed" | "cancelled";
  visitType: string;
  fee: number;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  channel: "email" | "sms" | "dashboard";
  createdAt: string;
  priority: "high" | "medium" | "low";
};

export type Service = {
  title: string;
  description: string;
  points: string[];
};
