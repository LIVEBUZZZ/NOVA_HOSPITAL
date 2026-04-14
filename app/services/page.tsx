import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { services } from "@/lib/data/mock-data";

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <SectionHeading
          eyebrow="Services"
          title="Maternity services coordinated for a digital-first patient journey"
          description="Antenatal care, surgery planning, postpartum recovery, and newborn support are presented clearly with supporting notifications and scheduling visibility."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
