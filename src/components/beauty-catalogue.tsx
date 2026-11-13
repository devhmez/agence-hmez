"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { agency } from "@/config/agency";
import {
  beautyProducts,
  beautyCategories,
  beautyPrice,
  type BeautyProduct,
} from "@/config/beautyshop";
export function BeautyCatalogue() {
  const [category, setCategory] = useState("Tout");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<BeautyProduct | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const visible = beautyProducts.filter(
    (p) =>
      (category === "Tout" || p.category === category) &&
      normalize(`${p.name} ${p.category}`).includes(normalize(search.trim())),
  );
  function open(product: BeautyProduct, button: HTMLButtonElement) {
    trigger.current = button;
    setSelected(product);
    dialog.current?.showModal();
  }
  function close() {
    dialog.current?.close();
  }
  const message = selected
    ? `Bonjour Hamza, j’ai consulté la démo Concept Beauté d’Agence Hmez (exemple : ${selected.name}). Je souhaite discuter d’un catalogue similaire pour ma boutique. Il ne s’agit pas d’une commande.`
    : "";
  return (
    <section className="container beauty-catalogue section" id="catalogue">
      <div className="beauty-catalogue-heading">
        <div>
          <p className="eyebrow">À découvrir</p>
          <h2>
            Votre prochain
            <br />
            <em>petit rituel.</em>
          </h2>
        </div>
        <div className="beauty-search">
          <label htmlFor="product-search">Rechercher un produit</label>
          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sérum, coffret, maquillage…"
          />
        </div>
      </div>
      <div className="beauty-filters" aria-label="Catégories de produits">
        {beautyCategories.map((c) => (
          <button
            type="button"
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="beauty-results" role="status">
        {visible.length}{" "}
        {visible.length === 1 ? "produit présenté" : "produits présentés"} ·
        Prix d’exemple en TND
      </p>
      <div className="beauty-product-grid">
        {visible.map((p) => (
          <article className="beauty-product" key={p.id}>
            <button
              className="beauty-product-photo"
              type="button"
              aria-label={`Découvrir ${p.name}`}
              onClick={(e) => open(p, e.currentTarget)}
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width:600px) 100vw,(max-width:1000px) 50vw,33vw"
              />
              <span aria-hidden="true">Découvrir ↗</span>
            </button>
            <div className="beauty-product-info">
              <p className="eyebrow">{p.category}</p>
              <div>
                <h3>{p.name}</h3>
                <span>{beautyPrice(p.price)}</span>
              </div>
              <p>{p.format} · Exemple</p>
              <button
                type="button"
                className="text-link"
                onClick={(e) => open(p, e.currentTarget)}
              >
                Voir la fiche <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="beauty-empty">
          <h3>Aucun produit trouvé</h3>
          <p>Essayez un autre mot ou découvrez l’ensemble du catalogue.</p>
          <button
            className="button"
            type="button"
            onClick={() => {
              setCategory("Tout");
              setSearch("");
            }}
          >
            Afficher tous les produits
          </button>
        </div>
      )}
      <dialog
        ref={dialog}
        className="beauty-dialog"
        aria-labelledby="product-title"
        onClose={() => trigger.current?.focus()}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        {selected && (
          <>
            <button
              autoFocus
              type="button"
              className="beauty-dialog-close"
              onClick={close}
              aria-label="Fermer la fiche produit"
            >
              Fermer ×
            </button>
            <div className="beauty-dialog-grid">
              <div className="beauty-dialog-image">
                <Image
                  src={selected.image}
                  alt={selected.alt}
                  fill
                  sizes="(max-width:700px) 90vw,40vw"
                />
              </div>
              <div className="beauty-dialog-copy">
                <p className="eyebrow">{selected.category}</p>
                <h2 id="product-title">{selected.name}</h2>
                <p className="beauty-dialog-price">
                  {beautyPrice(selected.price)} <span>· Prix d’exemple</span>
                </p>
                <p>{selected.format}</p>
                <p>{selected.description}</p>
                <p className="small-text">
                  Produit fictif et photo illustrative : la référence présentée
                  n’est pas un article en vente. Aucun stock ni commande réelle.
                </p>
                <a
                  className="button"
                  href={`${agency.whatsappUrl}?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuter de ma boutique sur WhatsApp ↗
                </a>
                <p className="small-text">
                  Le message est préparé pour Hamza Dellai. Vous choisissez de
                  l’envoyer dans WhatsApp.
                </p>
              </div>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
