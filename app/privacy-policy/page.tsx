import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16">
        <h1 className="font-display text-4xl font-semibold text-white">Privacy Policy</h1>
        <p className="mt-6 max-w-4xl text-sm leading-8 text-slate-300">
          Nova Maternity Hospital collects patient identity, appointment, payment, and communication preference data only as
          needed to deliver care coordination, reminders, secure access, and hospital operations. Data access should be
          permissioned by role and secured using Supabase authentication, database policies, and encrypted transit.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
