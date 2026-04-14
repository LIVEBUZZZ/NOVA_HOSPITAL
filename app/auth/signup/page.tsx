import { AccessHub } from "@/components/forms/access-hub";
import { SiteHeader } from "@/components/layout/site-header";

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <AccessHub defaultRole="patient" />
      </main>
    </>
  );
}
