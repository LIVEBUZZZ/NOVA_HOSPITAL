"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10)
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [toast, setToast] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Values>({
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact_request", ...values })
    });

    if (!response.ok) {
      setToast("Unable to send your message right now.");
      return;
    }

    reset();
    setToast("Your message has been sent to the hospital care desk.");
  });

  return (
    <>
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name ? <p className="text-xs text-rose-300">Please enter your name.</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email ? <p className="text-xs text-rose-300">Please enter a valid email.</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
          {errors.phone ? <p className="text-xs text-rose-300">Please enter a valid phone.</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" {...register("message")} />
          {errors.message ? <p className="text-xs text-rose-300">Please tell us how we can help.</p> : null}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </>
  );
}
