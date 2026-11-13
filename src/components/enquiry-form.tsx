"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { enquirySchema, type Enquiry } from "@/lib/validation";
import { FieldError } from "./ui";
export function EnquiryForm({ localMode }: { localMode: boolean }) {
  const [data, setData] = useState<Enquiry>({
    name: "",
    email: "",
    clinic: "",
    website: "",
    summary: "",
    companyFax: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [done, setDone] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const requestIdentity = useRef<{ body: string; key: string } | null>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  function update(key: keyof Enquiry, value: string) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (lock.current) return;
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        fields[String(issue.path[0])] ??= issue.message;
      setErrors(fields);
      document.getElementById(`enquiry-${Object.keys(fields)[0]}`)?.focus();
      return;
    }
    lock.current = true;
    setBusy(true);
    setStatus("");
    setErrors({});
    const body = JSON.stringify(parsed.data);
    if (requestIdentity.current?.body !== body)
      requestIdentity.current = { body, key: crypto.randomUUID() };
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestIdentity.current.key,
        },
        body,
        signal: AbortSignal.timeout(25000),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        setStatus(
          result.error || "L’envoi n’a pas pu être confirmé. Réessayez.",
        );
        if (result.fields)
          setErrors(
            Object.fromEntries(
              Object.entries(result.fields).map(([key, value]) => [
                key,
                (value as string[])[0],
              ]),
            ),
          );
        return;
      }
      setSimulated(Boolean(result.simulated));
      setDone(true);
      setData({
        name: "",
        email: "",
        clinic: "",
        website: "",
        summary: "",
        companyFax: "",
      });
      requestIdentity.current = null;
      requestAnimationFrame(() => successHeading.current?.focus());
    } catch {
      setStatus(
        "L’envoi n’a pas pu être confirmé. Vos informations sont conservées dans le formulaire ; réessayez dans quelques instants.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  const attrs = (key: keyof Enquiry) => ({
    id: `enquiry-${key}`,
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `error-${key}` : undefined,
    value: data[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(key, e.target.value),
  });
  if (done)
    return (
      <div className="form-card success-state">
        <span className="success-mark" aria-hidden="true">
          ✓
        </span>
        <h2 tabIndex={-1} ref={successHeading}>
          {simulated
            ? "Test local terminé."
            : "Merci, votre demande a été reçue."}
        </h2>
        <p role="status">
          {simulated
            ? "Simulation locale : aucun e-mail envoyé."
            : "Nous utiliserons vos coordonnées pour répondre à votre demande."}
        </p>
        <Link href="/#demo" className="button">
          Voir les exemples <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  return (
    <form
      className="form-card"
      onSubmit={submit}
      noValidate
      method="post"
      action="/api/enquiry"
      aria-busy={busy}
    >
      {localMode && (
        <p className="form-status">
          Mode local : demandes simulées, aucun e-mail envoyé.
        </p>
      )}
      {status && (
        <p role="alert" className="form-status error">
          {status}
        </p>
      )}
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="enquiry-name">Nom</label>
          <input
            {...attrs("name")}
            autoComplete="name"
            maxLength={100}
            required
          />
          <FieldError id="error-name" message={errors.name} />
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-email">E-mail professionnel</label>
          <input
            {...attrs("email")}
            type="email"
            autoComplete="email"
            maxLength={254}
            required
          />
          <FieldError id="error-email" message={errors.email} />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="enquiry-clinic">Nom de l’établissement</label>
        <input
          {...attrs("clinic")}
          autoComplete="organization"
          maxLength={150}
          required
        />
        <FieldError id="error-clinic" message={errors.clinic} />
      </div>
      <div className="form-field">
        <label htmlFor="enquiry-website">
          Site actuel <span className="optional">(facultatif)</span>
        </label>
        <input
          {...attrs("website")}
          type="url"
          placeholder="https://"
          autoComplete="url"
          maxLength={500}
        />
        <FieldError id="error-website" message={errors.website} />
      </div>
      <div className="form-field">
        <label htmlFor="enquiry-summary">Votre projet</label>
        <textarea
          {...attrs("summary")}
          rows={5}
          maxLength={2000}
          required
          aria-describedby={
            errors.summary ? "error-summary summary-hint" : "summary-hint"
          }
        />
        <FieldError id="error-summary" message={errors.summary} />
        <span className="small-text" id="summary-hint">
          {data.summary.length.toLocaleString("fr-TN")} / 2 000 caractères. Ne
          transmettez aucune donnée de patient.
        </span>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="enquiry-companyFax">Laissez ce champ vide</label>
        <input {...attrs("companyFax")} tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="button" disabled={busy}>
        {busy ? "Envoi en cours…" : "Demander un échange"}
        <span aria-hidden="true">→</span>
      </button>
      <p className="small-text">
        Ces informations servent à répondre à votre demande. Ne transmettez
        aucune donnée de patient. Consultez notre{" "}
        <Link href="/privacy">notice de confidentialité</Link>.
      </p>
      <noscript>
        <p className="small-text">
          Activez JavaScript pour envoyer ce formulaire.
        </p>
      </noscript>
    </form>
  );
}
