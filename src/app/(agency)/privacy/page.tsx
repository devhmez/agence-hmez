import { agency } from "@/config/agency";
import { Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Confidentialité — projet",
  "Vos données, les demandes de contact et les démonstrations d’Agence Hmez.",
  "/privacy",
);
export default function Privacy() {
  return (
    <main id="main" className="container legal">
      <Eyebrow>Confidentialité</Eyebrow>
      <h1>
        Vos informations.
        <br />
        <em>En toute clarté.</em>
      </h1>
      <p className="draft-notice">
        Projet à compléter avant la publication. Les informations de
        l’exploitant légal, son adresse postale, la juridiction applicable et la
        politique de conservation doivent encore être confirmées. Cette page ne
        constitue pas une notice juridique finalisée.
      </p>
      <h2>Demandes à l’agence</h2>
      <p>
        Le formulaire recueille votre nom, votre e-mail, le nom de votre
        établissement, votre site éventuel et votre projet pour vous répondre.
        N’indiquez aucune donnée de patient. Aucun abonnement marketing n’est
        créé.
      </p>
      <p>
        Lorsque l’envoi réel est configuré, la demande passe par le serveur et
        Resend vers la boîte de réception de l’agence. L’application ne conserve
        pas de base séparée des demandes. Les e-mails suivent les règles de
        conservation du fournisseur et de la boîte destinataire. La durée de
        conservation et la base légale doivent être approuvées avant
        publication.
      </p>
      <h2>Protection contre les abus</h2>
      <p>
        Lorsqu’Upstash Redis est configuré, il conserve des empreintes et
        identifiants pour limiter les demandes et éviter les doublons, sans
        enregistrer le texte du formulaire ni l’adresse IP brute. Les
        identifiants de déduplication expirent après 24 heures.
      </p>
      <h2>Démonstration Avela</h2>
      <p>
        La clinique est fictive. Les informations de la simulation restent
        uniquement en mémoire temporaire du navigateur. Elles ne sont ni
        envoyées, ni ajoutées à l’URL, ni écrites dans des cookies ou le
        stockage du navigateur. Elles sont effacées à la fin de la simulation ou
        en quittant la page. Utilisez des coordonnées fictives.
      </p>
      <h2>Concept Beauté et WhatsApp</h2>
      <p>
        Le catalogue présente des produits, des prix et des photos à titre
        d’exemple. Il ne permet aucun achat. Le bouton WhatsApp ouvre un message
        préparé vers Hamza Dellai, sans l’envoyer automatiquement. Si vous
        choisissez de poursuivre, WhatsApp traite vos informations selon ses
        propres règles de confidentialité.
      </p>
      <h2>Aperçu de Beautyshop Tunisie</h2>
      <p>
        Beautyshop Tunisie est un site externe présenté en exemple. La capture
        de son accueil est hébergée avec notre site. L’aperçu interactif est
        chargé uniquement lorsque vous cliquez pour l’afficher. Le site externe
        peut alors traiter vos données de connexion et utiliser ses propres
        cookies. Ses produits, prix et commandes sont gérés directement par
        Beautyshop Tunisie.
      </p>
      <h2>Hébergement et cookies</h2>
      <p>
        Le site est hébergé sur Cloudflare Workers. L’hébergeur peut traiter des
        données techniques de connexion. Le site n’utilise pas de cookies
        publicitaires ni de mesure d’audience. Les polices sont hébergées avec
        le site.
      </p>
      <h2>Nous contacter</h2>
      <p>
        Pour une question sur vos informations, écrivez à {agency.owner} :{" "}
        <a href={`mailto:${agency.email}`}>{agency.email}</a>.
      </p>
    </main>
  );
}
