import { NextResponse } from "next/server";

import { doctors } from "@/lib/data/mock-data";

const allowedTopicKeywords = [
  "hospital",
  "doctor",
  "appointment",
  "reservation",
  "booking",
  "pregnancy",
  "maternity",
  "baby",
  "newborn",
  "lactation",
  "delivery",
  "scan",
  "checkup",
  "clinic"
];

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string };
  const message = (body.message || "").toLowerCase().trim();

  if (!message) {
    return NextResponse.json({
      answer: "Please ask about the hospital, doctor, reservation, or booking. I will be happy to assist you."
    });
  }

  const isAllowedTopic = allowedTopicKeywords.some((keyword) => message.includes(keyword));

  if (!isAllowedTopic) {
    return NextResponse.json({
      answer: "Please ask about the hospital, doctor, reservation, or booking. I will be happy to assist you."
    });
  }

  let answer =
    "I can help with hospital services, doctor guidance, reservations, and bookings. Tell me what you need help with.";

  if (message.includes("high risk") || message.includes("complication")) {
    answer = `For high-risk pregnancy support, connect with ${doctors[0].name}. She is available ${doctors[0].availability}.`;
  } else if (message.includes("scan") || message.includes("routine") || message.includes("appointment")) {
    answer = `For routine obstetric review and scan follow-up, ${doctors[1].name} is the right match.`;
  } else if (message.includes("baby") || message.includes("lactation") || message.includes("newborn")) {
    answer = `For newborn care and lactation support, ${doctors[2].name} can guide you next.`;
  } else if (message.includes("book") || message.includes("booking") || message.includes("reservation")) {
    answer =
      "To complete a reservation or booking, go to the appointment booking section, choose a doctor and slot, then submit your details for confirmation.";
  } else if (message.includes("hospital")) {
    answer =
      "Our hospital support can guide you on departments, doctors, appointment booking, and follow-up care. Tell me exactly what you want to do.";
  } else if (message.includes("doctor")) {
    answer = `I recommend starting with ${doctors[1].name} for general maternity care, then escalating to ${doctors[0].name} for high-risk monitoring if needed.`;
  }

  return NextResponse.json({ answer });
}
