import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

type StoredUser = {
  id: string;
  role: "patient" | "admin" | "doctor";
  fullName: string;
  email: string;
  phone: string;
  password: string;
  dueDate?: string;
  specialty?: string; // For doctors
  bio?: string; // For doctors
  profileImageUrl?: string; // For doctors
  availability?: string; // For doctors
};

type StoredSession = {
  token: string;
  userId: string;
  role: "patient" | "admin" | "doctor";
  createdAt: string;
};

type StoredAppointment = {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  status: "confirmed" | "pending" | "rescheduled" | "completed" | "cancelled";
  visitType: string;
  fee: number;
};

type StoredNotification = {
  id: string;
  patientId: string;
  title: string;
  message: string;
  channel: "email" | "sms" | "dashboard";
  createdAt: string;
  priority: "high" | "medium" | "low";
};

type StoredVisitRecord = {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  medicine: string;
  notes: string;
};

type StoredSchedule = {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export type AppData = {
  users: StoredUser[];
  sessions: StoredSession[];
  appointments: StoredAppointment[];
  notifications: StoredNotification[];
  visitRecords: StoredVisitRecord[];
  schedules: StoredSchedule[];
};

const storagePath = path.join(process.cwd(), "data", "app-data.json");
const backupStoragePath = path.join(process.cwd(), "data", "app-data.backup.json");
const tempStoragePath = path.join(process.cwd(), "data", "app-data.tmp.json");
let writeQueue: Promise<void> = Promise.resolve();

function getDefaultAppData(): AppData {
  return {
    users: [],
    sessions: [],
    appointments: [],
    notifications: [],
    visitRecords: [],
    schedules: []
  };
}

function isValidAppData(input: unknown): input is AppData {
  if (!input || typeof input !== "object") {
    return false;
  }

  const value = input as Partial<AppData>;
  return (
    Array.isArray(value.users) &&
    Array.isArray(value.sessions) &&
    Array.isArray(value.appointments) &&
    Array.isArray(value.notifications) &&
    Array.isArray(value.visitRecords) &&
    Array.isArray(value.schedules)
  );
}

async function readRawData() {
  try {
    const file = await fs.readFile(storagePath, "utf8");
    const parsed = JSON.parse(file) as unknown;

    if (isValidAppData(parsed)) {
      return parsed;
    }
  } catch {
    // Falls back to backup/default below.
  }

  try {
    const backupFile = await fs.readFile(backupStoragePath, "utf8");
    const parsedBackup = JSON.parse(backupFile) as unknown;

    if (isValidAppData(parsedBackup)) {
      await writeRawData(parsedBackup);
      return parsedBackup;
    }
  } catch {
    // Falls back to default seed below.
  }

  const defaultData = getDefaultAppData();
  await writeRawData(defaultData);
  return defaultData;
}

async function writeRawData(data: AppData) {
  const serialized = JSON.stringify(data, null, 2);

  writeQueue = writeQueue.catch(() => undefined).then(async () => {
    await fs.mkdir(path.dirname(storagePath), { recursive: true });
    try {
      await fs.copyFile(storagePath, backupStoragePath);
    } catch {
      // First write has no prior file to back up.
    }
    await fs.writeFile(tempStoragePath, serialized, "utf8");
    await fs.rename(tempStoragePath, storagePath);
  });

  await writeQueue;
}

export async function getAppData() {
  return readRawData();
}

export async function findUserByEmail(email: string) {
  const data = await readRawData();
  return data.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function createPatientUser(input: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) {
  const data = await readRawData();
  const existing = data.users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());

  if (existing) {
    return { success: false as const, message: "An account with this email already exists." };
  }

  const user: StoredUser = {
    id: `patient-${randomUUID()}`,
    role: "patient",
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    password: input.password
  };

  data.users.push(user);
  await writeRawData(data);
  return { success: true as const, user };
}

export async function createDoctorUser(input: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  specialty: string;
  bio: string;
  profileImageUrl: string;
  availability: string;
}) {
  const data = await readRawData();
  const existing = data.users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());

  if (existing) {
    return { success: false as const, message: "An account with this email already exists." };
  }

  const user: StoredUser = {
    id: `doctor-${randomUUID()}`,
    role: "doctor",
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    password: input.password,
    specialty: input.specialty,
    bio: input.bio,
    profileImageUrl: input.profileImageUrl,
    availability: input.availability
  };

  data.users.push(user);
  await writeRawData(data);
  return { success: true as const, user };
}

export async function createSession(user: StoredUser) {
  const data = await readRawData();
  const token = randomUUID();

  data.sessions = data.sessions.filter((session) => session.userId !== user.id);
  data.sessions.push({
    token,
    userId: user.id,
    role: user.role, // Ensure role is stored
    createdAt: new Date().toISOString()
  });

  await writeRawData(data);
  return token;
}

export async function getSessionUser(token: string | undefined) {
  if (!token) {
    return null;
  }

  const data = await readRawData();
  const session = data.sessions.find((entry) => entry.token === token);

  if (!session) {
    return null;
  }

  return data.users.find((user) => user.id === session.userId) || null;
}

export async function destroySession(token: string | undefined) {
  if (!token) {
    return;
  }

  const data = await readRawData();
  data.sessions = data.sessions.filter((entry) => entry.token !== token);
  await writeRawData(data);
}

export async function addSchedule(input: {
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}) {
  const data = await readRawData();

  data.schedules.push({
    id: `SCH-${randomUUID()}`,
    doctorId: input.doctorId,
    date: input.date,
    startTime: input.startTime,
    endTime: input.endTime,
    isBooked: input.isBooked
  });

  await writeRawData(data);
}

export async function deleteSchedule(scheduleId: string) {
  const data = await readRawData();
  data.schedules = data.schedules.filter(schedule => schedule.id !== scheduleId);
  await writeRawData(data);
}

export async function getPatientAppointments(patientId: string) {
  const data = await readRawData();
  return data.appointments.filter((appointment) => appointment.patientId === patientId);
}

export async function getPatientNotifications(patientId: string) {
  const data = await readRawData();
  return data.notifications
    .filter((notification) => notification.patientId === patientId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPatientVisitRecords(patientId: string) {
  const data = await readRawData();
  return data.visitRecords.filter((entry) => entry.patientId === patientId);
}

export async function addPatientVisitRecord(input: {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  medicine: string;
  notes: string;
}) {
  const data = await readRawData();

  data.visitRecords.push({
    id: `VR-${randomUUID()}`,
    patientId: input.patientId,
    doctorId: input.doctorId,
    date: input.date,
    time: input.time,
    medicine: input.medicine,
    notes: input.notes
  });

  await writeRawData(data);
}

export async function createPatientReminder(input: {
  patientId: string;
  title: string;
  message: string;
  channel: "email" | "sms" | "dashboard";
  priority: "high" | "medium" | "low";
}) {
  const data = await readRawData();

  data.notifications.unshift({
    id: `NTF-${randomUUID()}`,
    patientId: input.patientId,
    title: input.title,
    message: input.message,
    channel: input.channel,
    priority: input.priority,
    createdAt: new Date().toISOString()
  });

  await writeRawData(data);
}

export async function getPatientsByDoctorId(doctorId: string) {
  const data = await readRawData();
  const patientIds = new Set<string>();
  data.appointments.forEach(appointment => {
    if (appointment.doctorId === doctorId) {
      patientIds.add(appointment.patientId);
    }
  });
  return data.users.filter(user => patientIds.has(user.id) && user.role === "patient");
}

export async function updateDoctorProfile(doctorId: string, updates: Partial<StoredUser>) {
  const data = await readRawData();
  const doctorIndex = data.users.findIndex(user => user.id === doctorId && user.role === "doctor");

  if (doctorIndex === -1) {
    return { success: false as const, message: "Doctor not found." };
  }

  data.users[doctorIndex] = {
    ...data.users[doctorIndex],
    ...updates
  };

  await writeRawData(data);
  return { success: true as const, doctor: data.users[doctorIndex] };
}

export async function getAllSchedules() {
  const data = await readRawData();
  return data.schedules;
}

export async function getDoctorById(doctorId: string) {
  const data = await readRawData();
  return data.users.find(user => user.id === doctorId && user.role === "doctor");
}
