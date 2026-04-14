import { NextResponse } from "next/server";

import { doctors } from "@/lib/data/mock-data";

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string };
  const message = (body.message || "").toLowerCase();

  let answer =
    "I can help connect you to the right doctor. Please tell me whether you need routine pregnancy care, surgery planning, or newborn support.";

  if (message.includes("high risk") || message.includes("complication")) {
    answer = `For high-risk pregnancy support, connect with ${doctors[0].name}. She is available ${doctors[0].availability}.`;
  } else if (message.includes("scan") || message.includes("routine") || message.includes("appointment")) {
    answer = `For routine obstetric review and scan follow-up, ${doctors[1].name} is the right match.`;
  } else if (message.includes("baby") || message.includes("lactation") || message.includes("newborn")) {
    answer = `For newborn care and lactation support, ${doctors[2].name} can guide you next.`;
  } else if (message.includes("doctor")) {
    answer = `I recommend starting with ${doctors[1].name} for general maternity care, then escalating to ${doctors[0].name} for high-risk monitoring if needed.`;
  }

  return NextResponse.json({ answer });
}
