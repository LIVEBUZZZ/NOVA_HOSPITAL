import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
        The page you were looking for is unavailable. You can return home or jump straight to the booking flow.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/#booking">Book Appointment</Link>
        </Button>
      </div>
    </main>
  );
}
