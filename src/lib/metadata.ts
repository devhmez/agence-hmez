import type { Metadata } from "next";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const isPublicLaunch =
  process.env.PUBLIC_LAUNCH_READY === "true" &&
  process.env.VERCEL_ENV !== "preview";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: "/social-preview.png",
          width: 1200,
          height: 630,
          alt: "Agence Hmez — Sites web pour les commerces de beauté",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/social-preview.png"],
    },
  };
}
