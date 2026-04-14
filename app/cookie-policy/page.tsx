import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function CookiePolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16">
        <h1 className="font-display text-4xl font-semibold text-white">Cookie Policy</h1>
        <p className="mt-6 max-w-4xl text-sm leading-8 text-slate-300">
          Essential cookies support secure sessions, analytics events, and patient experience improvements. Optional analytics
          should be clearly disclosed and configured according to hospital policy and applicable regulations.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
