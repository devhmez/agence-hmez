import { clinic } from "@/config/clinic";
import { BookingForm } from "@/components/booking-form";
import { Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Demander une consultation",
  "Essayez la demande de consultation simulée d’Avela. Aucune information n’est envoyée à une clinique.",
  "/demo/book",
);
export default async function Book({
  searchParams,
}: {
  searchParams: Promise<{ treatment?: string }>;
}) {
  const { treatment } = await searchParams;
  const initial = clinic.treatments.some((t) => t.slug === treatment)
    ? treatment
    : "choose";
  return (
    <main id="main" className="booking-shell">
      <Eyebrow>Un premier pas réfléchi</Eyebrow>
      <h1>
        Commençons
        <br />
        <em>par un échange.</em>
      </h1>
      <p className="small-text">
        Cette clinique est fictive. Votre demande reste en mémoire dans ce
        navigateur et est effacée à la fin de la simulation.
      </p>
      <BookingForm initialTreatment={initial} />
    </main>
  );
}
