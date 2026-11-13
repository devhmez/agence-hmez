import Link from "next/link";
import { agency } from "@/config/agency";
import { clinic as config } from "@/config/clinic";
export function Footer({ clinic = false }: { clinic?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <Link
            className={clinic ? "clinic-logo" : "agency-logo"}
            aria-label={clinic ? "Avela Clinique" : "Agence Hmez"}
            href={clinic ? "/demo" : "/"}
          >
            {clinic ? (
              <>
                {config.shortName} <span>CLINIQUE</span>
              </>
            ) : (
              <>
                <span>AGENCE</span> hmez
              </>
            )}
          </Link>
          <p>
            {clinic
              ? config.tagline
              : "Sites web pour boutiques beauté et centres esthétiques en Tunisie."}
          </p>
        </div>
        <div className="footer-links">
          <Link href={clinic ? "/demo/treatments" : "/#offer"}>
            {clinic ? "Les soins" : "Notre offre"}
          </Link>
          <Link href={clinic ? "/demo/book" : "/contact"}>
            {clinic ? "Demander une consultation" : "Parlons de votre activité"}
          </Link>
          <Link href={clinic ? "/" : "/demo"}>
            {clinic ? "Créé par Agence Hmez ↗" : "Voir la démo clinique ↗"}
          </Link>
          {!clinic && (
            <>
              <Link href="/beautyshop">Voir Beautyshop Tunisie ↗</Link>
              <span>{agency.owner}</span>
              <a href={agency.phoneHref}>{agency.phone}</a>
              <a href={agency.whatsappUrl}>Écrire sur WhatsApp ↗</a>
            </>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          {clinic
            ? "Clinique fictive · Démonstration uniquement"
            : "Agence Hmez · Sites web sur mesure"}
        </span>
        <div>
          <Link href="/privacy">Confidentialité</Link>
          <Link href="/terms">Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
