"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="container error-page">
      <h1>
        Un instant
        <br />
        <em>pour réessayer.</em>
      </h1>
      <p>Le chargement de cette page a été interrompu. Réessayez.</p>
      <button className="button" type="button" onClick={reset}>
        Réessayer <span aria-hidden="true">→</span>
      </button>
      <Link href="/" className="text-link">
        Retour à Agence Hmez
      </Link>
    </main>
  );
}
