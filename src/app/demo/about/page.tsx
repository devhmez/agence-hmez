import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Notre approche",
  "Découvrez l’approche de la clinique fictive Avela.",
  "/demo/about",
);
export default function About() {
  return (
    <main id="main">
      <div className="container page-intro">
        <Eyebrow>L’approche Avela</Eyebrow>
        <h1>
          L’écoute avant tout.
          <br />
          <em>Une approche personnelle.</em>
        </h1>
        <p>
          Avela imagine une clinique où l’écoute vient en premier : un cadre
          calme, des informations claires et le temps de faire un choix éclairé.
        </p>
      </div>
      <section className="container clinic-approach section">
        <div className="showcase-image">
          <Image
            src="/images/clinic-6899542.webp"
            alt="Photographie illustrative d’une salle de soins"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <span className="art-caption">
            Photo illustrative · Locaux distincts d’Avela
          </span>
        </div>
        <div>
          <Eyebrow>Tout commence with listening</Eyebrow>
          <h2>
            Un espace
            <br />
            <em>pour être entendu.</em>
          </h2>
          <p className="section-description">
            Ce concept place l’échange avant le soin. Une vraie consultation
            permettrait à un praticien qualifié de comprendre vos priorités,
            d’expliquer les options et leurs risques, puis de vous accompagner
            dans votre décision.
          </p>
          <p className="section-description">
            Avela est fictive. Cette démonstration ne représente aucun
            praticien, aucune qualification médicale ni aucun résultat de
            patient.
          </p>
          <ButtonLink href="/demo/book">
            Essayer la demande de consultation
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
