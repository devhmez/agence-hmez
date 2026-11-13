import type { MetadataRoute } from "next";
import { siteUrl, isPublicLaunch } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPublicLaunch
        ? { allow: "/", disallow: ["/api/", "/demo", "/beautyshop"] }
        : { disallow: "/" }),
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
