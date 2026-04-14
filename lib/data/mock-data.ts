import type { Appointment, Doctor, NotificationItem, Service } from "@/lib/types";

export const doctors: Doctor[] = [
  {
    id: "dr-amara-shah",
    name: "Dr. Amara Shah",
    specialty: "Maternal Fetal Medicine",
    experience: "14 years",
    availability: "Mon, Wed, Fri",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
    bio: "High-risk pregnancy specialist focused on safer antenatal journeys and precision monitoring.",
    languages: ["English", "Hindi", "Gujarati"],
    fee: 1200
  },
  {
    id: "dr-neha-arora",
    name: "Dr. Neha Arora",
    specialty: "Obstetrics & Gynecology",
    experience: "11 years",
    availability: "Tue, Thu, Sat",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80",
    bio: "Supports normal deliveries, postpartum recovery, and fertility-informed maternity planning.",
    languages: ["English", "Hindi", "Punjabi"],
    fee: 1000
  },
  {
    id: "dr-isha-menon",
    name: "Dr. Isha Menon",
    specialty: "Neonatal & Lactation Care",
    experience: "9 years",
    availability: "Daily",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
    bio: "Bridges newborn wellness, feeding support, and post-surgery care for mothers and babies.",
    languages: ["English", "Hindi", "Malayalam"],
    fee: 900
  }
];

export const services: Service[] = [
  {
    title: "Smart Antenatal Care",
    description: "Routine and high-risk pregnancy visits with AI-backed reminders and milestone tracking.",
    points: ["Trimester plans", "Lab coordination", "Complication alerts"]
  },
  {
    title: "Delivery & Surgery Planning",
    description: "Transparent C-section and labor planning with live updates for schedule changes.",
    points: ["OT visibility", "Family notifications", "Pre-op checklists"]
  },
  {
    title: "Postpartum Recovery",
    description: "Recovery plans that cover wound care, lactation, newborn guidance, and follow-up visits.",
    points: ["Care pathways", "Lactation support", "Mother-baby reviews"]
  }
];

export const testimonials = [
  {
    name: "Ritika & Arjun",
    quote:
      "Appointments started on time, reminders came exactly when needed, and we never felt lost during surgery scheduling.",
    tag: "First pregnancy"
  },
  {
    name: "Sana Khan",
    quote:
      "The dashboard showed my next visit, reports, and doctor notes in one place. It felt calm instead of chaotic.",
    tag: "High-risk care"
  },
  {
    name: "Maya Joseph",
    quote:
      "Emergency updates reached us instantly when my doctor timing changed, which saved us a long wait at the hospital.",
    tag: "Repeat patient"
  }
];

export const appointments: Appointment[] = [
  {
    id: "APT-1001",
    patientName: "Aarohi Mehta",
    doctorId: "dr-amara-shah",
    doctorName: "Dr. Amara Shah",
    date: "2026-04-18T09:00:00.000Z",
    status: "confirmed",
    visitType: "28-week checkup",
    fee: 1200
  },
  {
    id: "APT-1002",
    patientName: "Aarohi Mehta",
    doctorId: "dr-neha-arora",
    doctorName: "Dr. Neha Arora",
    date: "2026-05-02T11:30:00.000Z",
    status: "pending",
    visitType: "Ultrasound review",
    fee: 1000
  },
  {
    id: "APT-1003",
    patientName: "Sana Khan",
    doctorId: "dr-amara-shah",
    doctorName: "Dr. Amara Shah",
    date: "2026-04-16T14:00:00.000Z",
    status: "rescheduled",
    visitType: "Surgery consult",
    fee: 1200
  }
];

export const notifications: NotificationItem[] = [
  {
    id: "NTF-1",
    title: "Checkup reminder",
    message: "Your 28-week checkup with Dr. Amara Shah is scheduled for 18 Apr at 2:30 PM.",
    channel: "email",
    createdAt: "2026-04-12T05:30:00.000Z",
    priority: "medium"
  },
  {
    id: "NTF-2",
    title: "Schedule update",
    message: "OT schedule moved by 30 minutes. Please arrive at 9:15 AM for pre-op preparation.",
    channel: "sms",
    createdAt: "2026-04-11T11:20:00.000Z",
    priority: "high"
  },
  {
    id: "NTF-3",
    title: "Doctor note ready",
    message: "Your fetal growth review summary is now available in the portal.",
    channel: "dashboard",
    createdAt: "2026-04-10T08:00:00.000Z",
    priority: "low"
  }
];

export const stats = [
  { label: "Average waiting time", value: "8 min" },
  { label: "Reminder delivery rate", value: "100%" },
  { label: "Monthly safe deliveries", value: "120+" },
  { label: "On-time consultations", value: "91%" }
];

export const pricing = [
  {
    name: "Consultation",
    price: 1000,
    description: "Routine antenatal or gynecology consultation with digital follow-up notes."
  },
  {
    name: "Premium Maternity Plan",
    price: 24000,
    description: "Includes trimester monitoring, priority reminders, and 24/7 support routing."
  },
  {
    name: "Surgery Care Coordination",
    price: 15000,
    description: "Scheduling visibility, family updates, and post-operative review workflow."
  }
];

export const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Choose your doctor, pick an available slot, complete the patient details form, and pay the consultation fee to confirm instantly."
  },
  {
    question: "Will I get reminders?",
    answer:
      "Yes. The system sends automated reminders by email, dashboard notification, and optional SMS or WhatsApp before your visit."
  },
  {
    question: "How are emergency schedule changes handled?",
    answer:
      "Staff can trigger an emergency update that instantly alerts affected patients and offers alternate slot suggestions."
  }
];
