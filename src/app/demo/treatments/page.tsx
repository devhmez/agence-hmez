import { Eyebrow } from "@/components/ui";
import { TreatmentGrid } from "@/components/treatments";
import { clinicalNotice } from "@/config/clinic";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Découvrir les soins",
  "Découvrez les consultations et soins de la clinique fictive Avela.",
  "/demo/treatments",
);
export default function Treatments() {
  return (
    <main id="main" className="container catalogue">
      <div className="page-intro">
        <Eyebrow>Les soins & consultations</Eyebrow>
        <h1>
          Un premier pas
          <br />
          <em>qui vous ressemble.</em>
        </h1>
        <p>
          Découvrez les possibilités, posez vos questions et prenez le temps de
          réfléchir. Tout soin nécessite une évaluation individuelle.
        </p>
      </div>
      <TreatmentGrid />
      <p className="clinical-notice">{clinicalNotice}</p>
    </main>
  );
}
