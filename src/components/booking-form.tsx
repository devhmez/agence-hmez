"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useHydrated } from "@/lib/use-hydrated";
import { clinic } from "@/config/clinic";
import {
  bookingContactSchema,
  localDate,
  validPreferredDate,
} from "@/lib/validation";
import {
  demoBookingAdapter,
  type ConsultationRequest,
} from "@/lib/booking-adapter";
import { FieldError } from "./ui";
const emptyRequest = (treatment = "choose"): ConsultationRequest => ({
  treatment,
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
});
export function BookingForm({
  initialTreatment = "choose",
}: {
  initialTreatment?: string;
}) {
  const [data, setData] = useState(() => emptyRequest(initialTreatment));
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const ready = useHydrated();
  const [done, setDone] = useState(false);
  const lock = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    const clear = () => {
      setData(emptyRequest());
      setErrors({});
      setStep(1);
      setDone(false);
    };
    window.addEventListener("pagehide", clear);
    return () => window.removeEventListener("pagehide", clear);
  }, []);
  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    mounted.current = true;
  }, [step, done]);
  function update<K extends keyof ConsultationRequest>(
    key: K,
    value: ConsultationRequest[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }
  function preferenceErrors() {
    const e: Record<string, string> = {};
    if (
      data.treatment !== "choose" &&
      !clinic.treatments.some((t) => t.slug === data.treatment)
    )
      e.treatment = "Choisissez un soin.";
    if (!validPreferredDate(data.date))
      e.date = "Choisissez une date valide, aujourd’hui ou dans le futur.";
    if (!clinic.booking.timeWindows.includes(data.time))
      e.time = "Choisissez un créneau souhaité.";
    return e;
  }
  function contactErrors() {
    const parsed = bookingContactSchema.safeParse(data);
    const e: Record<string, string> = {};
    if (!parsed.success)
      for (const issue of parsed.error.issues)
        e[String(issue.path[0])] ??= issue.message;
    return e;
  }
  function next() {
    const e = step === 1 ? preferenceErrors() : contactErrors();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`booking-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setStep((s) => s + 1);
  }
  async function submit() {
    if (lock.current) return;
    const e = { ...preferenceErrors(), ...contactErrors() };
    if (Object.keys(e).length) {
      setErrors(e);
      setStep(Object.keys(preferenceErrors()).length ? 1 : 2);
      return;
    }
    lock.current = true;
    setBusy(true);
    await demoBookingAdapter.submit(data);
    setData(emptyRequest());
    setErrors({});
    setDone(true);
    setBusy(false);
  }
  const attrs = (key: string) => ({
    id: `booking-${key}`,
    disabled: !ready,
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `error-${key}` : undefined,
  });
  if (done)
    return (
      <div className="form-card success-state">
        <span className="success-mark" aria-hidden="true">
          ✓
        </span>
        <h2 ref={heading} tabIndex={-1}>
          Un premier pas réfléchi.
        </h2>
        <p role="status">
          Votre simulation est terminée. Aucun rendez-vous n’a été réservé et
          aucune information n’a été envoyée à une clinique.
        </p>
        <p>Vos informations ont été effacées de cette démo.</p>
        <Link href="/demo" className="button">
          Retour à Avela <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  return (
    <>
      <ol
        className="booking-progress"
        aria-label="Étapes de la demande de consultation"
      >
        {["Préférences", "Coordonnées", "Vérification"].map((label, i) => (
          <li
            key={label}
            className={step >= i + 1 ? "active" : ""}
            aria-current={step === i + 1 ? "step" : undefined}
          >
            <span>0{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      {/* No native form action: even before hydration there is no browser submission path. */}
      <div className="form-card booking-card" aria-busy={busy}>
        <h2 ref={heading} tabIndex={-1}>
          {step === 1
            ? "Vos préférences"
            : step === 2
              ? "Vos coordonnées"
              : "Vérifier votre demande"}
        </h2>
        {step === 1 && (
          <>
            <p className="step-hint">
              Ces préférences ne correspondent pas à des disponibilités réelles.
              Cette démonstration ne réserve aucun rendez-vous.
            </p>
            <div className="form-field">
              <label htmlFor="booking-treatment">Soin</label>
              <select
                {...attrs("treatment")}
                value={data.treatment}
                onChange={(e) => update("treatment", e.target.value)}
              >
                <option value="choose">{clinic.booking.chooseLabel}</option>
                {clinic.treatments.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
              <FieldError id="error-treatment" message={errors.treatment} />
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="booking-date">Date souhaitée</label>
                <input
                  {...attrs("date")}
                  type="date"
                  min={localDate()}
                  value={data.date}
                  onChange={(e) => update("date", e.target.value)}
                />
                <FieldError id="error-date" message={errors.date} />
              </div>
              <div className="form-field">
                <label htmlFor="booking-time">Créneau souhaité</label>
                <select
                  {...attrs("time")}
                  value={data.time}
                  onChange={(e) => update("time", e.target.value)}
                >
                  <option value="">Choisir un créneau</option>
                  {clinic.booking.timeWindows.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <FieldError id="error-time" message={errors.time} />
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p className="step-hint">
              Utilisez des coordonnées fictives dans cette démo. Vos
              informations ne sont ni envoyées ni enregistrées. N’indiquez
              aucune information médicale.
            </p>
            <div className="form-field">
              <label htmlFor="booking-name">Nom complet</label>
              <input
                {...attrs("name")}
                autoComplete="off"
                maxLength={100}
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
              />
              <FieldError id="error-name" message={errors.name} />
            </div>
            <div className="form-field">
              <label htmlFor="booking-email">E-mail</label>
              <input
                {...attrs("email")}
                type="email"
                autoComplete="off"
                maxLength={254}
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
              />
              <FieldError id="error-email" message={errors.email} />
            </div>
            <div className="form-field">
              <label htmlFor="booking-phone">
                Téléphone <span className="optional">(facultatif)</span>
              </label>
              <input
                {...attrs("phone")}
                type="tel"
                autoComplete="off"
                maxLength={40}
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
              <FieldError id="error-phone" message={errors.phone} />
            </div>
            <label className="checkbox-field">
              <input
                {...attrs("consent")}
                type="checkbox"
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />
              <span>
                J’ai pris connaissance de la{" "}
                <Link href="/privacy" target="_blank" rel="noopener">
                  notice de confidentialité (nouvel onglet)
                </Link>{" "}
                et j’autorise un contact concernant cette demande. Dans cette
                démo, aucun contact n’aura lieu.
              </span>
            </label>
            <FieldError id="error-consent" message={errors.consent} />
          </>
        )}
        {step === 3 && (
          <>
            <p className="step-hint">
              Vérifiez vos préférences. L’envoi termine uniquement la
              simulation.
            </p>
            <dl className="review-list">
              {[
                [
                  "Soin",
                  clinic.treatments.find((t) => t.slug === data.treatment)
                    ?.name || clinic.booking.chooseLabel,
                ],
                ["Date souhaitée", data.date],
                ["Créneau", data.time],
                ["Nom complet", data.name],
                ["E-mail", data.email],
                ["Téléphone", data.phone || "Non renseigné"],
                [
                  "Confidentialité",
                  "Acceptée · Contact pour cette demande uniquement",
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="edit-actions">
              <button type="button" onClick={() => setStep(1)}>
                Modifier les préférences
              </button>
              <button type="button" onClick={() => setStep(2)}>
                Modifier les coordonnées
              </button>
            </div>
          </>
        )}
        <div className="form-actions">
          {step > 1 && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setStep((s) => s - 1)}
              disabled={busy}
            >
              Retour
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              className="button"
              onClick={next}
              disabled={!ready}
            >
              Continuer <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={submit}
              disabled={busy}
            >
              {busy
                ? "Simulation en cours…"
                : "Terminer la demande de démonstration"}
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
