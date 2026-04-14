"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/mother-baby-healthcare", label: "Mother & Baby Healthcare" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-umarji-pink text-lg font-bold text-white">
            N
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-foreground">Nova Maternity</p>
            <p className="text-xs text-muted-foreground">Digital-first care platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-foreground hover:text-primary",
                pathname === link.href && "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <PhoneCall className="h-4 w-4 text-primary" />
            Emergency
          </a>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/auth/login">Patient Login</Link>
          </Button>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/auth/login?role=admin">Admin Login</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Open navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 md:hidden">
          <div className="container flex flex-col gap-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <PhoneCall className="h-4 w-4 text-primary" />
              Emergency
            </a>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/auth/login" onClick={() => setOpen(false)}>
                Patient Login
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/auth/login?role=admin" onClick={() => setOpen(false)}>
                Admin Login
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/auth/signup" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}