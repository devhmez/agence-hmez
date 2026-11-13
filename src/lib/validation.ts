import { z } from "zod";
const singleLine = (min: number, max: number, message: string) =>
  z
    .string()
    .trim()
    .min(min, message)
    .max(max, `Limitez ce champ à ${max} caractères.`)
    .refine(
      (s) => !/[\r\n\u0000]/.test(s),
      "Utilisez une seule ligne de texte.",
    );
export const enquirySchema = z
  .object({
    name: singleLine(2, 100, "Indiquez votre nom."),
    email: z
      .email("Indiquez une adresse e-mail valide.")
      .max(254, "Limitez l’adresse e-mail à 254 caractères."),
    clinic: singleLine(2, 150, "Indiquez le nom de l’établissement."),
    website: z
      .string()
      .trim()
      .max(500, "Limitez l’adresse à 500 caractères.")
      .refine(
        (s) => !s || (/^https?:\/\//i.test(s) && URL.canParse(s)),
        "Indiquez une adresse complète commençant par https://.",
      ),
    summary: z
      .string()
      .trim()
      .min(10, "Décrivez votre projet en au moins 10 caractères.")
      .max(2000, "Limitez votre message à 2 000 caractères.")
      .refine(
        (s) => !s.includes("\u0000"),
        "Retirez les caractères non autorisés.",
      ),
    companyFax: z.string().max(200).default(""),
  })
  .strict();
export type Enquiry = z.infer<typeof enquirySchema>;
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function validPreferredDate(value: string, today = localDate()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value &&
    value >= today
  );
}
export const bookingContactSchema = z.object({
  name: singleLine(2, 100, "Indiquez votre nom complet."),
  email: z
    .email("Indiquez une adresse e-mail valide.")
    .max(254, "Limitez l’adresse e-mail à 254 caractères."),
  phone: z
    .string()
    .trim()
    .max(40, "Limitez ce champ à 40 caractères.")
    .refine(
      (v) => !v || /^[+()\d\s.-]{6,40}$/.test(v),
      "Indiquez un numéro de téléphone valide ou laissez ce champ vide.",
    ),
  consent: z
    .boolean()
    .refine(
      Boolean,
      "Acceptez la notice de confidentialité et le contact concernant votre demande.",
    ),
});
