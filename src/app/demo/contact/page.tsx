import { clinic } from "@/config/clinic";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Informations pratiques — exemple",
  "Présentation et horaires d’exemple de la clinique fictive Avela.",
  "/demo/contact",
);
export default function ClinicContact() {
  return (
    <main id="main" className="container">
      <div className="page-intro">
        <Eyebrow>Le concept de clinique</Eyebrow>
        <h1>
          Un lieu apaisant.
          <br />
          <em>Un accueil personnel.</em>
        </h1>
        <p>
          Voici un exemple de présentation des informations pratiques d’une
          clinique. La présentation et les horaires ci-dessous sont fictifs.
        </p>
      </div>
      <div className="detail-grid">
        <div className="detail-copy">
          <h2>{clinic.location.label}</h2>
          <p>{clinic.location.description}</p>
          {clinic.contact.address && <p>{clinic.contact.address}</p>}
          {clinic.contact.email && (
            <p>
              <a href={`mailto:${clinic.contact.email}`}>
                {clinic.contact.email}
              </a>
            </p>
          )}
          {clinic.contact.phone && (
            <p>
              <a href={`tel:${clinic.contact.phone}`}>{clinic.contact.phone}</a>
            </p>
          )}
          {!Object.values(clinic.contact).some(Boolean) && (
            <p>
              Avela étant une démonstration fictive, aucune adresse ni
              coordonnée de clinique réelle n’est indiquée.
            </p>
          )}
          <ButtonLink href="/demo/book">
            Essayer la demande de consultation
          </ButtonLink>
        </div>
        <aside className="detail-panel">
          <Eyebrow>Horaires d’exemple</Eyebrow>
          <h2>Un moment pour vous.</h2>
          <dl className="hours-list">
            {clinic.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
          </dl>
          <p className="small-text">
            Horaires illustratifs uniquement. La démo ne vérifie aucune
            disponibilité réelle.
          </p>
        </aside>
      </div>
    </main>
  );
}
