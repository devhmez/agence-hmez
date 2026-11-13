import Image from "next/image";
import { beautyshopReference as shop } from "@/config/beautyshop-reference";
import { agency } from "@/config/agency";
import { ButtonLink, Eyebrow, FAQ } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Sites web pour boutiques beauté et centres esthétiques en Tunisie",
  agency.description,
  "/",
);
export default function Home() {
  return (
    <main id="main">
      <section className="agency-hero container">
        <div className="hero-copy">
          <Eyebrow>
            Boutiques beauté · Parapharmacies · Centres esthétiques
          </Eyebrow>
          <h1>
            Votre activité.
            <br />
            <em>Une nouvelle dimension.</em>
          </h1>
          <p className="hero-description">{agency.description}</p>
          <div className="hero-actions">
            <ButtonLink href="/contact">Discuter de votre site</ButtonLink>
            <ButtonLink href="/#demo" secondary>
              Voir les exemples
            </ButtonLink>
          </div>
          <p className="hero-note">
            Votre interlocuteur : {agency.owner} ·{" "}
            <a href={agency.phoneHref}>{agency.phone}</a>
          </p>
        </div>
        <div className="future-showcase">
          <div className="future-orbit" aria-hidden="true" />
          <div className="hero-preview">
            <div className="preview-topline">
              <span className="future-browser-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>BEAUTYSHOP TUNISIE</span>
              <span aria-hidden="true">↗</span>
            </div>
            <a href="/beautyshop" className="preview-browser">
              <div className="preview-art">
                <Image
                  src={shop.image}
                  alt="Capture du vrai site Beautyshop Tunisie"
                  fill
                  priority
                  sizes="(max-width:800px) 100vw,50vw"
                />
              </div>
              <div className="preview-bottom">
                <span>Une vraie boutique. Une expérience complète.</span>
                <span aria-hidden="true">↗</span>
              </div>
            </a>
            <p className="preview-caption">Site existant présenté en exemple</p>
          </div>
          <div className="future-floating-tag future-tag-one">
            <span aria-hidden="true">▦</span>
            <div>
              Catalogue en ligne<small>Produits · Marques · Découvertes</small>
            </div>
          </div>
          <div className="future-floating-tag future-tag-two">
            <span aria-hidden="true">↗</span>
            <div>
              Votre prochain site
              <small>À votre image. Prêt pour le mobile.</small>
            </div>
          </div>
        </div>
      </section>
      <div
        className="future-ticker"
        aria-label="Un site pensé pour votre activité"
      >
        <div>
          {[0, 1].map((copy) => (
            <div
              className="future-ticker-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {[
                "Votre marque",
                "Vos produits",
                "Un contact direct",
                "Pensé pour le mobile",
              ].map((word) => (
                <span key={word}>
                  {word}
                  <i aria-hidden="true">✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section className="container section future-benefits">
        <div className="future-benefits-heading">
          <Eyebrow>Du premier regard au premier échange</Eyebrow>
          <h2>
            Une présence
            <br />
            <em>qui se remarque.</em>
          </h2>
        </div>
        <div className="future-benefit-grid">
          {[
            [
              "01",
              "Votre univers, en ligne.",
              "Une identité visuelle qui reflète votre boutique, vos produits et votre façon de travailler.",
            ],
            [
              "02",
              "Simple. Sur tous les écrans.",
              "Un site fluide sur téléphone, pour que vos clients trouvent rapidement ce qu’ils cherchent.",
            ],
            [
              "03",
              "Le contact, en un geste.",
              "Un lien à partager sur vos réseaux, avec vos coordonnées et un parcours de demande adapté.",
            ],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span className="future-feature-icon" aria-hidden="true">
                {number === "01" ? "✳" : number === "02" ? "▣" : "↗"}
              </span>
              <span className="index-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="offer" className="offer-section section">
        <div className="container offer-grid">
          <div>
            <Eyebrow>Votre site, votre activité</Eyebrow>
            <h2>
              Présenter vos produits.
              <br />
              <em>Simplifier le contact.</em>
            </h2>
            <p className="section-description">
              Votre catalogue, vos prestations et vos coordonnées réunis dans un
              site clair. Vos clients trouvent ce qu’ils cherchent et vous
              écrivent directement.
            </p>
          </div>
          <div className="offer-card">
            <h3>Création ou refonte</h3>
            <p className="price">
              Sur devis <span>en TND</span>
            </p>
            <ul className="check-list">
              {agency.offer.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">↗</span>
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact">Demander un échange</ButtonLink>
            <p className="small-text">
              Périmètre, planning, taxes éventuelles et frais d’hébergement
              précisés avant engagement. Maintenance facultative sur devis.
            </p>
          </div>
        </div>
      </section>
      <section id="demo" className="section container">
        <Eyebrow>Deux exemples concrets</Eyebrow>
        <h2>
          Voici ce que votre site
          <br />
          <em>pourrait devenir.</em>
        </h2>
        <p className="section-description">
          Une vraie boutique en ligne et une démonstration de clinique pour
          explorer les possibilités de votre futur site.
        </p>
        <div className="demo-grid">
          <article className="demo-card">
            <div className="demo-card-image">
              <Image
                src={shop.image}
                alt="Capture du vrai site Beautyshop Tunisie en français"
                fill
                sizes="(max-width:800px) 100vw,50vw"
              />
            </div>
            <div className="demo-card-copy">
              <Eyebrow>Boutique beauté & parapharmacie</Eyebrow>
              <h3>Beautyshop Tunisie</h3>
              <p>
                Le vrai site Beautyshop Tunisie : produits, marques et boutique
                en ligne. Découvrez son aperçu interactif ou visitez le site.
              </p>
              <ButtonLink href="/beautyshop">Voir le vrai site</ButtonLink>
              <a
                className="text-link real-beauty-direct"
                href={shop.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visiter Beautyshop Tunisie ↗
              </a>
            </div>
          </article>
          <article className="demo-card">
            <div className="demo-card-image">
              <Image
                src="/images/clinic-room.webp"
                alt="Photographie illustrative d’une salle de soins"
                fill
                sizes="(max-width:800px) 100vw,50vw"
              />
            </div>
            <div className="demo-card-copy">
              <Eyebrow>Centre esthétique & clinique</Eyebrow>
              <h3>Avela Clinique</h3>
              <p>
                Une présentation des soins, des informations pratiques et un
                parcours de demande de consultation en trois étapes.
              </p>
              <ButtonLink href="/demo" secondary>
                Explorer la clinique
              </ButtonLink>
            </div>
          </article>
        </div>
        <p className="small-text">
          Beautyshop Tunisie est un site existant présenté en exemple. Avela est
          une clinique fictive ; aucun rendez-vous réel n’y est créé.
        </p>
      </section>
      <section id="process" className="section process-section">
        <div className="container">
          <Eyebrow>Comment ça se passe</Eyebrow>
          <h2>
            Un projet clair.
            <br />
            <em>Du premier échange à la mise en ligne.</em>
          </h2>
          <div className="process-grid">
            {agency.process.map((p, i) => (
              <article key={p.name}>
                <span className="index-number">0{i + 1}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="faq" className="section container faq-section">
        <div>
          <Eyebrow>Vos questions</Eyebrow>
          <h2>
            Avant de
            <br />
            <em>commencer.</em>
          </h2>
        </div>
        <FAQ items={agency.faqs} />
      </section>
      <section className="final-cta">
        <div className="container">
          <h2>
            Parlons de
            <br />
            <em>votre activité.</em>
          </h2>
          <ButtonLink href="/contact">Discuter de mon projet</ButtonLink>
        </div>
      </section>
    </main>
  );
}
