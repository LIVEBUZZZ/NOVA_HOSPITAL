"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthForm } from "@/components/forms/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AccessHubProps = {
  defaultRole?: "patient" | "admin";
};

export function AccessHub({ defaultRole = "patient" }: AccessHubProps) {
  const router = useRouter();
  const [role, setRole] = useState<"patient" | "admin">(defaultRole);

  const title = useMemo(
    () => (role === "patient" ? "Patient access" : "Admin access"),
    [role]
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Button variant={role === "patient" ? "default" : "outline"} onClick={() => setRole("patient")}>
          Patient Login
        </Button>
        <Button variant={role === "admin" ? "default" : "outline"} onClick={() => setRole("admin")}>
          Admin Login
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" role={role} compact />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>New patient signup</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm mode="signup" role="patient" compact onSuccess={() => router.push("/dashboard/patient")} />
        </CardContent>
      </Card>
    </div>
  );
}
