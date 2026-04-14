import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16">
        <h1 className="font-display text-4xl font-semibold text-white">Terms of Service</h1>
        <p className="mt-6 max-w-4xl text-sm leading-8 text-slate-300">
          By using this platform, patients can book appointments, receive reminders, and manage their hospital profile. Final
          clinical decisions, emergency pathways, and treatment approvals always remain under the supervising medical team.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
