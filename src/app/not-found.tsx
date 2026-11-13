import { ButtonLink, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <main id="main" className="container error-page">
      <Eyebrow>404 / Page introuvable</Eyebrow>
      <h1>
        Cette page
        <br />
        <em>est introuvable.</em>
      </h1>
      <p>La page demandée n’existe pas ou a été déplacée.</p>
      <ButtonLink href="/">Retour à Agence Hmez</ButtonLink>
    </main>
  );
}
