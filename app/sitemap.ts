import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/contact",
    "/faq",
    "/auth/login",
    "/auth/signup",
    "/dashboard/patient",
    "/dashboard/admin",
    "/privacy-policy",
    "/terms",
    "/cookie-policy"
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date()
  }));
}
