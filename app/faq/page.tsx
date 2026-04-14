import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/lib/data/mock-data";

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers that reduce uncertainty before the visit"
          description="Patients often need quick reassurance about booking, reminders, emergencies, and payments. These answers are written to keep the next step obvious."
        />
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold text-white">{faq.question}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
