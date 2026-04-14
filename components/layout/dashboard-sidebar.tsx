"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bell, Calendar, LayoutDashboard, Settings, ShieldCheck, Users } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarProps = {
  role: "patient" | "admin";
};

const patientLinks = [
  { href: "/dashboard/patient", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/patient/appointments", label: "Appointments", icon: Calendar },
  { href: "/dashboard/patient/history", label: "History", icon: Activity },
  { href: "/dashboard/patient/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/patient/profile", label: "Profile", icon: Settings }
];

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin#appointments", label: "Appointments", icon: Calendar },
  { href: "/dashboard/admin#doctors", label: "Doctors", icon: Users },
  { href: "/dashboard/admin#alerts", label: "Alerts", icon: Bell },
  { href: "/dashboard/admin#security", label: "Operations", icon: ShieldCheck }
];

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = role === "patient" ? patientLinks : adminLinks;

  return (
    <aside className="glass-card rounded-3xl p-5 shadow-glow">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
          {role === "patient" ? "Patient Portal" : "Hospital Ops"}
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-white">Control center</h2>
      </div>
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white",
                active && "bg-white/10 text-white"
              )}
            >
              <Icon className="h-4 w-4 text-cyan-300" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
