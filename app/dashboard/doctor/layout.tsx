import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Stethoscope, CalendarDays, User } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface DoctorDashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    href: "/dashboard/doctor",
    title: "Overview",
    icon: LayoutDashboard
  },
  {
    href: "/dashboard/doctor/patients",
    title: "Patient Records",
    icon: User
  },
  {
    href: "/dashboard/doctor/schedule",
    title: "My Schedule",
    icon: CalendarDays
  },
  {
    href: "/dashboard/doctor/profile",
    title: "Edit Profile",
    icon: Stethoscope
  }
];

export default async function DoctorDashboardLayout({ children }: DoctorDashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user || user.role !== "doctor") {
    redirect("/auth/login?role=doctor");
  }

  return (
    <div className="container grid flex-1 gap-12 lg:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col lg:flex">
        <nav className="grid items-start gap-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} href={item.href}>
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    item.href === `/dashboard/doctor`
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
}