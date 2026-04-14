import { MapPin, PhoneCall, Siren, TimerReset } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Reach the maternity care desk fast"
              description="Use the contact form for admissions, package questions, or appointment support. Emergency routes remain available 24/7."
            />
            <div className="mt-8 grid gap-4">
              {[
                { icon: PhoneCall, label: "Main line", value: "+91 98765 43210" },
                { icon: Siren, label: "Emergency helpline", value: "+91 98765 40000" },
                { icon: MapPin, label: "Hospital address", value: "Nova Maternity Campus, Pune" },
                { icon: TimerReset, label: "Operating hours", value: "24/7 labor and emergency support" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label}>
                    <CardContent className="flex items-center gap-4 pt-6">
                      <div className="rounded-2xl bg-cyan-400/10 p-3">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">{item.label}</p>
                        <p className="text-base font-medium text-white">{item.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-5">
                <p className="text-sm leading-7 text-slate-300">
                  Public forms are disabled. Please use your patient or admin account to continue to secure messaging,
                  reminders, and portal communication.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <Link href="/auth/login">Patient Login</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/auth/login?role=admin">Admin Login</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
