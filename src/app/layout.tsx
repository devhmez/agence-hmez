import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./future.css";
import { FutureEffects } from "@/components/future-effects";
import { isPublicLaunch, siteUrl } from "@/lib/metadata";
const editorial = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-editorial",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const bodyFont = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Agence Hmez — Sites web pour boutiques et centres esthétiques",
    template: "%s | Agence Hmez",
  },
  description:
    "Sites web pour boutiques beauté et centres esthétiques en Tunisie.",
  robots: { index: isPublicLaunch, follow: isPublicLaunch },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${editorial.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <FutureEffects>{children}</FutureEffects>
      </body>
    </html>
  );
}
