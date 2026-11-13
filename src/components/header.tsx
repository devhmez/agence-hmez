"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { clinic as config } from "@/config/clinic";
import { useHydrated } from "@/lib/use-hydrated";
export function Header({ clinic = false }: { clinic?: boolean }) {
  const [open, setOpen] = useState(false);
  const ready = useHydrated();
  const pathname = usePathname();
  const links = clinic
    ? [
        ["Les soins", "/demo/treatments"],
        ["Notre approche", "/demo/about"],
        ["Informations pratiques", "/demo/contact"],
      ]
    : [
        ["Offre", "/#offer"],
        ["Étapes", "/#process"],
        ["Exemple boutique", "/beautyshop"],
        ["Démo clinique", "/demo"],
        ["FAQ", "/#faq"],
      ];
  return (
    <header className={`site-header ${clinic ? "clinic-header" : ""}`}>
      <div className="container header-inner">
        <Link
          href={clinic ? "/demo" : "/"}
          className={clinic ? "clinic-logo" : "agency-logo"}
          aria-label={clinic ? "Avela Clinique" : "Agence Hmez"}
          onClick={() => setOpen(false)}
        >
          {clinic ? (
            <>
              {config.shortName} <span>CLINIQUE</span>
            </>
          ) : (
            <>
              <span>AGENCE</span> hmez
              <i aria-hidden="true">✳</i>
            </>
          )}
        </Link>
        <button
          type="button"
          className="menu-toggle"
          disabled={!ready}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fermer" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-navigation"
          aria-label="Navigation principale"
          className={open ? "is-open" : ""}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              document
                .querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }
          }}
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href={clinic ? "/demo/book" : "/contact"}
            className="nav-cta"
            onClick={() => setOpen(false)}
          >
            {clinic ? "Demander une consultation" : "Parlons de votre site"}
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
