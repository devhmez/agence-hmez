import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/config/clinic";
import { Arrow } from "./ui";
export function TreatmentGrid() {
  return (
    <div className="treatment-grid">
      {clinic.treatments.map((t) => (
        <Link
          href={`/demo/treatments/${t.slug}`}
          className="treatment-card"
          key={t.slug}
        >
          <div className="treatment-art">
            <Image
              src={t.image.src}
              alt={t.image.alt}
              fill
              sizes="(max-width: 800px) 100vw, (max-width: 1100px) 50vw, 25vw"
              className="treatment-photo"
            />
          </div>
          <div className="treatment-copy">
            <p className="eyebrow">{t.category}</p>
            <h3>{t.name}</h3>
            <p>{t.summary}</p>
            <span className="text-link">
              Découvrir ce soin <Arrow />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
