import Link from "next/link";
import { notFound } from "next/navigation";
import { clinic, clinicalNotice } from "@/config/clinic";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return clinic.treatments.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = clinic.treatments.find((t) => t.slug === slug);
  return t ? pageMetadata(t.name, t.summary, `/demo/treatments/${slug}`) : {};
}
export default async function Treatment({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = clinic.treatments.find((t) => t.slug === slug);
  if (!treatment) notFound();
  return (
    <main id="main" className="container">
      <div className="page-intro">
        <Link className="breadcrumb" href="/demo/treatments">
          ← Tous les soins
        </Link>
        <Eyebrow>{treatment.category}</Eyebrow>
        <h1>{treatment.name}</h1>
        <p>{treatment.summary}</p>
      </div>
      <div className="detail-grid">
        <div className="detail-copy">
          <h2>
            Commencer par
            <br />
            <em>un échange.</em>
          </h2>
          <p>{treatment.description}</p>
          <p>{clinicalNotice}</p>
          <p>
            Ce contenu illustre une clinique fictive. Il ne constitue ni un
            conseil médical individuel ni une offre de soin.
          </p>
        </div>
        <aside className="detail-panel">
          <h2>Les sujets à aborder</h2>
          <ul>
            {treatment.discussion.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="small-text">
            Vos préférences are a starting point. A practitioner would assess
            suitability before any treatment is agreed.
          </p>
          <ButtonLink href={`/demo/book?treatment=${treatment.slug}`}>
            Demander une consultation
          </ButtonLink>
        </aside>
      </div>
    </main>
  );
}
