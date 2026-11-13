import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RealBeautyPreview } from "@/components/real-beauty-preview";
import { beautyshopReference as shop } from "@/config/beautyshop-reference";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Beautyshop Tunisie — Aperçu du vrai site",
    "Découvrez le vrai site Beautyshop Tunisie : aperçu interactif en français et lien direct vers sa boutique en ligne.",
    "/beautyshop",
  ),
  robots: { index: false, follow: false },
};
export default function BeautyshopReference() {
  return (
    <>
      <Header />
      <main id="main" className="container real-beauty-page">
        <div className="page-intro">
          <p className="eyebrow">Un exemple de boutique en ligne</p>
          <h1>
            Beautyshop
            <br />
            <em>Tunisie.</em>
          </h1>
          <p>
            Découvrez le vrai site : ses produits, ses marques et son parcours
            d’achat. Parcourez l’aperçu ou ouvrez la boutique dans un nouvel
            onglet.
          </p>
          <a
            className="button"
            href={shop.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visiter Beautyshop Tunisie <span aria-hidden="true">↗</span>
          </a>
        </div>
        <RealBeautyPreview />
        <p className="small-text real-beauty-caption">
          Site existant présenté en exemple. Les produits, prix et commandes
          sont gérés sur beautyshop-tunisie.com.
        </p>
        <section className="real-beauty-cta">
          <h2>
            Un site pour
            <br />
            <em>votre propre boutique.</em>
          </h2>
          <p>
            Votre identité, vos produits et un parcours de contact adapté à
            votre activité.
          </p>
          <Link className="button" href="/contact">
            Parlons de mon projet <span aria-hidden="true">→</span>
          </Link>
          <Link className="text-link" href="/beautyshop/concept">
            Voir aussi le concept de catalogue fictif →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
