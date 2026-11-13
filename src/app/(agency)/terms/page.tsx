import { Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Conditions — projet",
  "Le fonctionnement des offres et des démonstrations d’Agence Hmez.",
  "/terms",
);
export default function Terms() {
  return (
    <main id="main" className="container legal">
      <Eyebrow>Conditions</Eyebrow>
      <h1>
        Un cadre clair.
        <br />
        <em>Avant de commencer.</em>
      </h1>
      <p className="draft-notice">
        Projet à compléter avant publication. L’identité de l’exploitant légal
        et les conditions contractuelles doivent être confirmées. Cette
        présentation ne remplace pas un contrat de prestation approuvé.
      </p>
      <h2>Création de votre site</h2>
      <p>
        Agence Hmez crée des sites pour les boutiques beauté, parapharmacies et
        centres esthétiques. Le devis précise les pages, le catalogue, les
        parcours de contact, les intégrations et les retours inclus. Toute
        fonctionnalité supplémentaire fait l’objet d’un accord.
      </p>
      <h2>Budget et calendrier</h2>
      <p>
        Le prix est établi sur devis en dinars tunisiens. Les taxes éventuelles,
        modalités de paiement, frais d’hébergement et prestations de maintenance
        sont précisés avant engagement. Le calendrier est convenu après
        réception des contenus et accès nécessaires.
      </p>
      <h2>Vos contenus</h2>
      <p>
        Vous fournissez des informations exactes et des photos que vous avez le
        droit d’utiliser. Vous validez les prix, les produits et les
        prestations. Toute information médicale nécessite la validation d’un
        praticien qualifié.
      </p>
      <h2>Démonstrations</h2>
      <p>
        Avela et Concept Beauté sont fictifs. Les photographies sont
        illustratives et ne représentent aucun établissement réel. Les produits
        et prix du catalogue sont des exemples, sans stock réel. Aucun paiement,
        achat ou rendez-vous n’est effectué. La demande Avela reste dans le
        navigateur. Le bouton WhatsApp prépare un message à Hamza Dellai ; vous
        décidez de l’envoyer.
      </p>
      <h2>Site Beautyshop Tunisie</h2>
      <p>
        Beautyshop Tunisie est un site existant présenté en exemple, accessible
        via un lien externe ou un aperçu interactif. Les produits, prix,
        paiements et commandes relèvent de ce site externe et de ses propres
        conditions.
      </p>
      <h2>Après la mise en ligne</h2>
      <p>
        Le site facilite la présentation de votre activité et les demandes des
        clients. Aucun volume de trafic, vente ou rendez-vous n’est garanti. Les
        conditions de maintenance, propriété, licences, réception, annulation et
        responsabilité seront définies dans le contrat de prestation.
      </p>
    </main>
  );
}
