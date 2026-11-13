import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/contact", "/privacy", "/terms"].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
