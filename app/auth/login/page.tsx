import { AccessHub } from "@/components/forms/access-hub";
import { SiteHeader } from "@/components/layout/site-header";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const role = params.role === "admin" ? "admin" : "patient";

  return (
    <>
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <AccessHub defaultRole={role} />
      </main>
    </>
  );
}
