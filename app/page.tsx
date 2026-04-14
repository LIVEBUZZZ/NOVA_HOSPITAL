import Link from "next/link";
import { ArrowRight, BellRing, CalendarCheck2, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";

import { AccessHub } from "@/components/forms/access-hub";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DoctorCard } from "@/components/marketing/doctor-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { StatCard } from "@/components/marketing/stat-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { doctors, services, stats, testimonials } from "@/lib/data/mock-data";
import { medicalOrganizationSchema, physicianSchema } from "@/lib/seo";

const benefits = [
  {
    icon: CalendarCheck2,
    title: "No queue waiting",
    description: "Live slot booking and schedule balancing reduce lobby crowding and missed consultations."
  },
  {
    icon: BellRing,
    title: "AI reminders",
    description: "Follow-up reminders, trimester prompts, and surgery notifications reach patients automatically."
  },
  {
    icon: ShieldCheck,
    title: "Trusted care ops",
    description: "Admin teams coordinate schedules, pricing, and urgent broadcasts from one secure dashboard."
  }
];

const steps = [
  "Choose a specialist and view real-time availability.",
  "Book and pay for your consultation in one flow.",
  "Receive reminders, updates, and visit details in your patient portal."
];

import { getAllSchedules, getAppData } from "@/lib/server/store";

export default async function HomePage() {
  const appData = await getAppData();
  const schedules = await getAllSchedules();
  const doctorsData = appData.users.filter(user => user.role === "doctor");
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="grid-overlay absolute inset-0 opacity-30" />
          <div className="container relative grid gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
            <div className="space-y-8">
              <Badge>No Waiting. Smarter Maternity Care.</Badge>
              <div className="space-y-5">
                <h1 className="max-w-4xl font-display text-5xl font-semibold tracking-tight text-white md:text-7xl">
                  <span className="block text-slate-100">Fast appointments.</span>
                  <span className="gradient-text block">Calmer visits. Smarter maternity support.</span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Nova Maternity Hospital combines protected patient access, real-time doctor scheduling, and AI-guided support
                  so mothers and families can move from login to the right care path with less friction.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/auth/login">
                    Patient Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/auth/login?role=admin">Admin Login</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <Card key={benefit.title}>
                      <CardContent className="pt-6">
                        <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/10 p-3">
                          <Icon className="h-5 w-5 text-cyan-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">{benefit.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div className="space-y-6">
              <AccessHub />
              <div className="glass-card rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                  <p className="font-medium text-white">AI-powered communication</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Only authenticated patients and hospital admins can access secure workflows. AI support, doctor reminders,
                  and personalized appointment timelines activate after login.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <SectionHeading
            eyebrow="Services"
            title="Digitally coordinated maternity care"
            description="From routine checkups to surgery planning, the platform reduces friction for patients and staff while keeping every touchpoint clear."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <SectionHeading
            eyebrow="Doctor Schedules"
            title="Find an available slot with our specialists"
            description="View our doctors' upcoming availability and book your appointment conveniently."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schedules.length === 0 ? (
              <p className="text-muted-foreground col-span-full text-center">No upcoming schedules available.</p>
            ) : (
              schedules.map((schedule) => {
                const doctor = doctorsData.find(d => d.id === schedule.doctorId);
                if (!doctor) return null;
                return (
                  <Card key={schedule.id}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg text-white">{doctor.fullName}</h3>
                      <p className="text-sm text-slate-300">{doctor.specialty}</p>
                      <p className="text-sm text-slate-400 mt-2">Date: {schedule.date}</p>
                      <p className="text-sm text-slate-400">Time: {schedule.startTime} - {schedule.endTime}</p>
                      <Button asChild size="sm" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="/book-appointment">Book Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <SectionHeading
            eyebrow="How It Works"
            title="From booking to visit reminders in three clear steps"
            description="The whole experience is designed to reduce anxiety, improve punctuality, and help hospital teams manage capacity."
            centered
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold text-cyan-300">
                    0{index + 1}
                  </div>
                  <p className="text-base leading-7 text-slate-200">{step}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <SectionHeading
            eyebrow="Testimonials"
            title="Families feel the difference when care stays organized"
            description="Clear communication and on-time visits build trust during every stage of maternity care."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} item={item} />
            ))}
          </div>
        </section>

        <section className="container pb-20">
          <Card className="overflow-hidden">
            <CardContent className="grid gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:px-10">
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Ready to book
                </div>
                <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
                  Start your next checkup with less waiting and better visibility.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-slate-300">
                  Create a patient account, login securely, and move into a personalized portal with reminders, appointments,
                  AI guidance, and hospital updates saved to your profile.
                </p>
              </div>
              <div className="flex items-center">
                <Button asChild size="lg">
                  <Link href="/auth/signup">
                    Create Account
                    <HeartPulse className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}