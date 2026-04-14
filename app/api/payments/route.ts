import { NextResponse } from "next/server";

import { getStripeClient } from "@/lib/integrations/stripe";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    amount?: number;
    patientName?: string;
    description?: string;
  };

  const stripe = getStripeClient();

  if (!body.amount || body.amount <= 0) {
    return NextResponse.json({ success: false, message: "Invalid payment amount." }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json({
      success: true,
      mode: "demo",
      message: `Demo payment approved for ${body.patientName || "patient"} - Rs. ${body.amount}.`
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(body.amount * 100),
    currency: "inr",
    automatic_payment_methods: { enabled: true },
    description: body.description || "Nova Maternity appointment fee"
  });

  return NextResponse.json({
    success: true,
    mode: "live",
    clientSecret: paymentIntent.client_secret
  });
}
