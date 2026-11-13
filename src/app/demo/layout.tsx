import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { clinic } from "@/config/clinic";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  title: {
    default: "Avela Clinique — Concept par Agence Hmez",
    template: "%s | Démo Avela Clinique",
  },
  robots: { index: false, follow: false },
};
export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      lang="fr"
      className="clinic-site"
      style={
        {
          "--paper": clinic.theme.background,
          "--ink": clinic.theme.ink,
          "--accent": clinic.theme.accent,
          "--surface": clinic.theme.surface,
        } as CSSProperties
      }
    >
      <div
        className="demo-notice"
        role="region"
        aria-label="Information sur la démonstration"
      >
        {clinic.notice}
        <Link href="/">Retour à Agence Hmez ↗</Link>
      </div>
      <Header clinic />
      {children}
      <Footer clinic />
    </div>
  );
}
