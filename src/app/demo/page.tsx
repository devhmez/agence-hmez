import Image from "next/image";
import { clinic, clinicalNotice } from "@/config/clinic";
import { ButtonLink, Eyebrow, FAQ } from "@/components/ui";
import { TreatmentGrid } from "@/components/treatments";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Des soins esthétiques à votre rythme",
  clinic.hero.description,
  "/demo",
);
export default function ClinicHome() {
  return (
    <main id="main">
      <section className="clinic-hero">
        <div className="clinic-hero-copy">
          <Eyebrow>Soins esthétiques personnalisés</Eyebrow>
          <h1>
            {clinic.hero.title} <em>{clinic.hero.emphasis}</em>
          </h1>
          <p className="hero-description">{clinic.hero.description}</p>
          <div className="hero-actions">
            <ButtonLink href="/demo/book">Demander une consultation</ButtonLink>
            <ButtonLink href="/demo/treatments" secondary>
              Découvrir les soins
            </ButtonLink>
          </div>
        </div>
        <div className="clinic-hero-art">
          <Image
            src="/images/clinic-room.webp"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
            alt="Photographie illustrative d’une salle de soins, distincte de la clinique fictive Avela"
          />
          <span className="art-caption">
            Photo illustrative · Clinique fictive
          </span>
        </div>
      </section>
      <section className="clinic-intro">
        <Eyebrow>Un moment pour vous</Eyebrow>
        <h2>
          Tout commence
          <br />
          <em>par l’écoute.</em>
        </h2>
        <p>
          Chaque parcours est personnel. Vos questions, vos attentes et le temps
          d’en parler sont au cœur de ce concept de clinique.
        </p>
      </section>
      <section className="section clinic-treatment-section">
        <div className="container">
          <div className="heading-with-link">
            <div>
              <Eyebrow>Découvrir en toute confiance</Eyebrow>
              <h2>
                Votre peau.
                <br />
                <em>Votre point de départ.</em>
              </h2>
            </div>
            <ButtonLink href="/demo/treatments" secondary>
              Tous les soins
            </ButtonLink>
          </div>
          <TreatmentGrid />
          <p className="clinical-notice">{clinicalNotice}</p>
        </div>
      </section>
      <section className="section container clinic-approach">
        <div className="showcase-image">
          <Image
            src="/images/clinic-6899542.webp"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            alt="Photographie illustrative d’une salle de soins"
          />
          <span className="art-caption">
            Photo illustrative · Locaux distincts d’Avela
          </span>
        </div>
        <div>
          <Eyebrow>Votre premier échange</Eyebrow>
          <h2>
            Un premier pas réfléchi.
            <br />
            <em>À votre rythme.</em>
          </h2>
          <div className="consultation-steps">
            {[
              [
                "01",
                "Un temps pour écouter",
                "Parlez de vos attentes et posez vos questions.",
              ],
              [
                "02",
                "Un échange éclairé",
                "Échangez avec un praticien qualifié sur les options adaptées, leurs risques et les alternatives.",
              ],
              [
                "03",
                "Le temps de décider",
                "Prenez le temps de réfléchir. Une consultation ne vous engage pas à réaliser un soin.",
              ],
            ].map(([n, title, text]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>Pour y voir plus clair</Eyebrow>
          <h2>
            Vos questions.
            <br />
            <em>Des réponses claires.</em>
          </h2>
        </div>
        <FAQ
          items={[
            {
              question: "Par où commencer ?",
              answer:
                "Choisissez « Consultation peau » ou « Aidez-moi à choisir » dans la démo. Dans une vraie clinique, un praticien qualifié vous aiderait à définir la suite.",
            },
            {
              question: "La demande confirme-t-elle un rendez-vous ?",
              answer:
                "Non. Cette clinique fictive simule uniquement une demande. Aucune information n’est envoyée et aucun rendez-vous n’est réservé. Dans une vraie clinique, la date doit être confirmée séparément.",
            },
            {
              question: "Ces soins conviennent-ils à tout le monde ?",
              answer: clinicalNotice,
            },
            {
              question: "S’agit-il d’une vraie clinique ?",
              answer:
                "Avela est un concept fictif créé par Agence Hmez pour présenter un exemple de site de clinique. Les photos sont illustratives ; les horaires et la présentation sont des exemples.",
            },
          ]}
        />
      </section>
      <section className="clinic-final">
        <Eyebrow>Commencer par un échange</Eyebrow>
        <h2>
          Accordez-vous
          <br />
          <em>un moment.</em>
        </h2>
        <ButtonLink href="/demo/book">Demander une consultation</ButtonLink>
      </section>
    </main>
  );
}
