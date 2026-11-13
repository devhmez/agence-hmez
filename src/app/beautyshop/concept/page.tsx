import Image from "next/image";
import Link from "next/link";
import { agency } from "@/config/agency";
import { BeautyCatalogue } from "@/components/beauty-catalogue";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Concept Beauté — Démo boutique beauté",
    "Un exemple de catalogue beauté en français : produits, filtres, fiches et contact WhatsApp. Créé par Agence Hmez.",
    "/beautyshop/concept",
  ),
  robots: { index: false, follow: false },
};
export default function BeautyShop() {
  return (
    <div className="beauty-site" lang="fr">
      <div
        className="demo-notice"
        role="region"
        aria-label="Information sur la démonstration"
      >
        Boutique fictive · Produits et prix d’exemple
        <Link href="/">Retour à Agence Hmez ↗</Link>
      </div>
      <header className="beauty-header container">
        <Link className="beauty-logo" href="/beautyshop/concept">
          concept<span>BEAUTÉ</span>
        </Link>
        <nav aria-label="Navigation de la boutique">
          <a href="#catalogue">Le catalogue</a>
          <a href="#boutique">La boutique</a>
          <a
            className="beauty-header-contact"
            href={agency.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Écrire à Hamza ↗
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="beauty-hero">
          <div className="beauty-hero-copy">
            <p className="eyebrow">Les petits gestes qui font du bien</p>
            <h1>
              La beauté,
              <br />
              <em>au quotidien.</em>
            </h1>
            <p>
              Des soins, du maquillage et de jolies découvertes. Prenez le temps
              de trouver votre prochain rituel.
            </p>
            <a className="button" href="#catalogue">
              Découvrir le catalogue <span aria-hidden="true">→</span>
            </a>
            <p className="beauty-hero-note">
              Un exemple de boutique beauté, imaginé par Agence Hmez.
            </p>
          </div>
          <div className="beauty-hero-image">
            <Image
              src="/images/beauty-24602077.webp"
              alt="Produits cosmétiques roses entourés de gouttes d’eau"
              fill
              priority
              sizes="(max-width:800px) 100vw,55vw"
            />
            <span className="beauty-image-note">Photographie illustrative</span>
          </div>
        </section>
        <div className="beauty-ribbon">
          <span>Soins visage</span>
          <span aria-hidden="true">✳</span>
          <span>Corps</span>
          <span aria-hidden="true">✳</span>
          <span>Maquillage</span>
          <span aria-hidden="true">✳</span>
          <span>Coffrets</span>
        </div>
        <BeautyCatalogue />
        <section id="boutique" className="container section beauty-story">
          <div className="beauty-story-image">
            <Image
              src="/images/beauty-14311551.webp"
              alt="Flacons de cosmétiques roses dans une composition lumineuse"
              fill
              sizes="(max-width:800px) 100vw,50vw"
            />
          </div>
          <div>
            <p className="eyebrow">Votre boutique, en ligne</p>
            <h2>
              Tout commence par
              <br />
              <em>une belle découverte.</em>
            </h2>
            <p>
              Un catalogue clair pour parcourir les produits à son rythme,
              comparer les formats et préparer ses questions avant de contacter
              la boutique.
            </p>
            <p>
              Dans un site personnalisé, chaque fiche peut préparer un message
              WhatsApp avec le produit choisi. Votre équipe confirme ensuite la
              disponibilité et les modalités directement avec le client.
            </p>
            <p className="small-text">
              Cette boutique est une démonstration. Les noms, formats et prix
              sont fictifs ; les photos sont illustratives. Aucun produit n’est
              vendu sur ce site.
            </p>
          </div>
        </section>
        <section className="beauty-final">
          <p className="eyebrow">
            Vous avez une boutique beauté ou une parapharmacie ?
          </p>
          <h2>
            Votre catalogue.
            <br />
            <em>Votre prochaine vitrine.</em>
          </h2>
          <p>
            Présentez vos produits dans un lien à partager sur Instagram,
            Facebook et votre fiche Google.
          </p>
          <Link className="button" href="/contact">
            Créer le site de ma boutique <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
      <footer className="container beauty-footer">
        <div>
          <Link className="beauty-logo" href="/beautyshop/concept">
            concept<span>BEAUTÉ</span>
          </Link>
          <p>Une démonstration d’Agence Hmez · {agency.owner}</p>
          <a href={agency.phoneHref}>{agency.phone}</a>
        </div>
        <div>
          <Link href="/">Agence Hmez ↗</Link>
          <Link href="/demo">Démo clinique ↗</Link>
          <Link href="/privacy">Confidentialité</Link>
          <Link href="/terms">Conditions</Link>
        </div>
      </footer>
    </div>
  );
}
