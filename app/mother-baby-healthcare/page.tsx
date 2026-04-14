import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Baby, Stethoscope } from "lucide-react";

export default function MotherBabyHealthcarePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative py-16 md:py-24 bg-background text-foreground">
          <div className="container relative z-10 text-center">
            <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
              Nurturing <span className="text-primary">New Beginnings</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground">
              Discover comprehensive care and support for every stage of your journey, from pregnancy to early childhood.
              Our dedicated programs ensure the well-being of both mother and baby.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/book-appointment">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
          {/* Placeholder for a background image or pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-4 gap-4 h-full w-full">
              <div className="bg-primary/10"></div>
              <div className="bg-secondary/10"></div>
              <div className="bg-primary/10"></div>
              <div className="bg-secondary/10"></div>
            </div>
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <h2 className="text-center font-display text-4xl font-semibold text-foreground mb-12">
            Our Specialized Care Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-xl text-foreground mb-2">Maternal Health</h3>
              <p className="text-muted-foreground">
                Expert care for expectant mothers, focusing on prenatal, delivery, and postnatal well-being.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <Baby className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-xl text-foreground mb-2">Infant Care</h3>
              <p className="text-muted-foreground">
                Comprehensive support for newborns, including vaccinations, growth monitoring, and early development.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-xl text-foreground mb-2">Family Wellness</h3>
              <p className="text-muted-foreground">
                Resources and guidance for families to thrive, promoting a healthy environment for everyone.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}