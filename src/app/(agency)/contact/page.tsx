import { EnquiryForm } from "@/components/enquiry-form";
import { Eyebrow } from "@/components/ui";
import { isLocalMail } from "@/lib/enquiry-dependencies";
import { pageMetadata } from "@/lib/metadata";
import { agency } from "@/config/agency";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Parlons de votre activité",
  "Création et refonte de sites web en Tunisie. Devis en TND.",
  "/contact",
);
export default function Contact() {
  return (
    <main id="main" className="container contact-grid">
      <div className="contact-aside">
        <Eyebrow>Un premier échange</Eyebrow>
        <h1>
          Parlons de
          <br />
          <em>votre activité.</em>
        </h1>
        <p>
          Présentez votre activité, votre site actuel et ce que vous souhaitez
          améliorer.
        </p>
        <div className="contact-note">
          <h2>{agency.owner}</h2>
          <p>
            <a href={agency.phoneHref}>{agency.phone}</a>
          </p>
          <p>
            <a href={agency.whatsappUrl}>Écrire sur WhatsApp ↗</a>
          </p>
          <p>
            <a href={`mailto:${agency.email}`}>{agency.email}</a>
          </p>
        </div>
        <div className="contact-note">
          <h2>Un devis adapté, en TND.</h2>
          <p>
            Le périmètre, le planning, l’hébergement et les taxes éventuelles
            sont précisés avant engagement. Aucun abonnement obligatoire.
          </p>
        </div>
      </div>
      {process.env.CONTACT_DIRECT_ONLY === "true" ? (
        <div className="form-card">
          <Eyebrow>Contact direct</Eyebrow>
          <h2>Parlez-moi de votre projet.</h2>
          <p>
            Envoyez-moi le nom de votre activité et ce que vous souhaitez pour
            votre site. Je vous répondrai directement.
          </p>
          <a className="button" href={agency.whatsappUrl}>
            Écrire sur WhatsApp ↗
          </a>
          <p>
            <a href={`mailto:${agency.email}`}>Envoyer un e-mail ↗</a>
          </p>
        </div>
      ) : (
        <EnquiryForm localMode={isLocalMail()} />
      )}
    </main>
  );
}
