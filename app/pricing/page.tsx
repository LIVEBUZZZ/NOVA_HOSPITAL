import { CheckCircle2 } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pricing } from "@/lib/data/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent pricing for consultations and maternity plans"
          description="Fees are shown upfront so patients can confirm appointments confidently and staff can avoid repeated billing questions."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pricing.map((item) => (
            <Card key={item.name} className="h-full">
              <CardContent className="flex h-full flex-col pt-6">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{item.name}</p>
                <p className="mt-4 text-4xl font-semibold text-white">{formatCurrency(item.price)}</p>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{item.description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  Ready for online confirmation
                </div>
                <Button className="mt-6">Choose Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
