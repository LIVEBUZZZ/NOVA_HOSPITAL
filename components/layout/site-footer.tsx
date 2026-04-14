import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <p className="font-display text-xl font-semibold text-white">Nova Maternity</p>
          <p className="text-sm text-slate-400">
            Smarter maternity care with AI-driven appointments, reminders, and schedule clarity.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Platform</p>
          <div className="space-y-2 text-sm text-slate-400">
            <Link href="/services" className="block hover:text-white">
              Services
            </Link>
            <Link href="/pricing" className="block hover:text-white">
              Pricing
            </Link>
            <Link href="/faq" className="block hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Portal</p>
          <div className="space-y-2 text-sm text-slate-400">
            <Link href="/dashboard/patient" className="block hover:text-white">
              Patient dashboard
            </Link>
            <Link href="/dashboard/admin" className="block hover:text-white">
              Admin dashboard
            </Link>
            <Link href="/auth/signup" className="block hover:text-white">
              Create account
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Legal</p>
          <div className="space-y-2 text-sm text-slate-400">
            <Link href="/privacy-policy" className="block hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block hover:text-white">
              Terms
            </Link>
            <Link href="/cookie-policy" className="block hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
