"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { type LoginFormValues, loginSchema, signupSchema, type SignupFormValues } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";

type AuthFormProps = {
  mode: "login" | "signup";
  role?: "patient" | "admin";
  compact?: boolean;
  onSuccess?: () => void;
};

export function AuthForm({ mode, role = "patient", compact = false, onSuccess }: AuthFormProps) {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role,
      email: "",
      password: ""
    }
  });
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dueDate: "",
      password: ""
    }
  });

  const activeForm = mode === "login" ? loginForm : signupForm;

  const onSubmit = activeForm.handleSubmit(async (values) => {
    const body = mode === "login" ? { ...values, role } : values;
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const payload = (await response.json()) as { message?: string; redirectTo?: string; success?: boolean };

    if (!response.ok || !payload.success) {
      setToast(payload.message || "Authentication failed.");
      return;
    }

    setToast(payload.message || (mode === "login" ? "Signed in." : "Account created."));
    activeForm.reset();

    if (payload.redirectTo) {
      onSuccess?.();
      router.push(payload.redirectTo);
      router.refresh();
    }
  });

  return (
    <>
      <form className={compact ? "space-y-4" : "space-y-5"} onSubmit={onSubmit}>
        {mode === "signup" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" {...signupForm.register("fullName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" {...signupForm.register("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Expected due date</Label>
              <Input id="dueDate" type="date" {...signupForm.register("dueDate")} />
            </div>
          </>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor={`${mode}-${role}-email`}>Email</Label>
          <Input
            id={`${mode}-${role}-email`}
            type="email"
            {...(mode === "login" ? loginForm.register("email") : signupForm.register("email"))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${mode}-${role}-password`}>Password</Label>
          <Input
            id={`${mode}-${role}-password`}
            type="password"
            {...(mode === "login" ? loginForm.register("password") : signupForm.register("password"))}
          />
        </div>

        <Button type="submit" className="w-full" disabled={activeForm.formState.isSubmitting}>
          {activeForm.formState.isSubmitting
            ? "Please wait..."
            : mode === "login"
              ? `Login as ${role}`
              : "Create Patient Account"}
        </Button>
      </form>
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </>
  );
}
