"use client";
import Image from "next/image";
import { useState } from "react";
import { beautyshopReference as shop } from "@/config/beautyshop-reference";
export function RealBeautyPreview() {
  const [interactive, setInteractive] = useState(false);
  return (
    <div className="real-beauty-preview">
      <div className="real-beauty-toolbar">
        <span>beautyshop-tunisie.com</span>
        <a href={shop.url} target="_blank" rel="noopener noreferrer">
          Ouvrir le site ↗
        </a>
      </div>
      {interactive ? (
        <iframe
          src={shop.url}
          title="Aperçu interactif du site Beautyshop Tunisie"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          className="real-beauty-poster"
          onClick={() => setInteractive(true)}
          aria-label="Afficher l’aperçu interactif de Beautyshop Tunisie"
        >
          <Image
            src={shop.image}
            alt="Capture de l’accueil français du vrai site Beautyshop Tunisie"
            width={1280}
            height={720}
            priority
            sizes="(max-width:800px) 100vw,90vw"
          />
          <span>
            Afficher l’aperçu interactif <span aria-hidden="true">↗</span>
          </span>
        </button>
      )}
      <div className="real-beauty-actions">
        {interactive && (
          <button type="button" onClick={() => setInteractive(false)}>
            Revenir à la capture
          </button>
        )}
        <a href={shop.englishUrl} target="_blank" rel="noopener noreferrer">
          Version anglaise ↗
        </a>
      </div>
    </div>
  );
}
