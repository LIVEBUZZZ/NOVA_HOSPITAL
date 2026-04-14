import type { Doctor } from "@/lib/types";
import { siteConfig } from "@/lib/site";

export function medicalOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    medicalSpecialty: ["Obstetric", "Gynecologic", "Neonatal"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-98765-43210",
        contactType: "customer service"
      }
    ]
  };
}

export function physicianSchema(doctors: Doctor[]) {
  return doctors.map((doctor) => ({
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    description: doctor.bio,
    medicalSpecialty: doctor.specialty,
    knowsLanguage: doctor.languages
  }));
}
