import { Building2, HeartHandshake, ShieldPlus, Sparkles } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  {
    icon: HeartHandshake,
    title: "Compassion-first care",
    description: "Every digital workflow is built to lower stress for mothers, families, and care coordinators."
  },
  {
    icon: Sparkles,
    title: "AI-assisted communication",
    description: "Automated reminders, proactive updates, and personalized follow-up guidance support continuity of care."
  },
  {
    icon: Building2,
    title: "Infrastructure clarity",
    description: "Schedule visibility across outpatient visits and surgery workflows helps prevent avoidable delays."
  },
  {
    icon: ShieldPlus,
    title: "Clinical trust",
    description: "Secure systems, accessible experiences, and doctor-led operations create confidence at every step."
  }
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <SectionHeading
          eyebrow="About Nova"
          title="A maternity hospital designed around time, clarity, and trust"
          description="Nova Maternity Hospital blends specialist care with digital operations so every patient sees where they stand, what happens next, and how to reach the right team quickly."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title}>
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/10 p-3">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{pillar.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
