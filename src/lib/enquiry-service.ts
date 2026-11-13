import { createHmac } from "node:crypto";
import { enquirySchema, type Enquiry } from "./validation";
export type DeliveryDependencies = {
  hash: (value: string) => string;
  rateLimit: (key: string) => Promise<{ success: boolean; reset: number }>;
  claim: (
    key: string,
    fingerprint: string,
  ) => Promise<"new" | "same" | "conflict" | "sent">;
  markSent: (key: string, fingerprint: string) => Promise<void>;
  send: (data: Enquiry, key: string) => Promise<void>;
  local: boolean;
};
export function keyedHash(secret: string, value: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}
export async function processEnquiry(
  input: unknown,
  key: string,
  client: string,
  deps: DeliveryDependencies,
) {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success)
    return {
      status: 400,
      body: {
        error: "Vérifiez les champs signalés.",
        fields: parsed.error.flatten().fieldErrors,
      },
    };
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      key,
    )
  )
    return {
      status: 400,
      body: { error: "Actualisez cette page et réessayez." },
    };
  if (parsed.data.companyFax)
    return {
      status: 400,
      body: { error: "Cette demande ne peut pas être acceptée." },
    };
  const fingerprint = deps.hash(JSON.stringify(parsed.data));
  try {
    const limit = await deps.rateLimit(deps.hash(client));
    if (!limit.success)
      return {
        status: 429,
        retryAfter: Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000)),
        body: {
          error:
            "Trop de demandes. Patientez quelques minutes avant de réessayer.",
        },
      };
    const claim = await deps.claim(key, fingerprint);
    if (claim === "conflict")
      return {
        status: 409,
        body: {
          error:
            "Cette demande a changé. Actualisez la page avant de réessayer.",
        },
      };
    if (claim !== "sent") {
      await deps.send(parsed.data, `enquiry/${key}`);
      await deps.markSent(key, fingerprint);
    }
    return { status: 200, body: { ok: true, simulated: deps.local } };
  } catch {
    // Provider errors may include personal information. Never log or return them.
    return {
      status: 503,
      body: {
        error:
          "L’envoi n’a pas pu être confirmé. Vos informations sont conservées dans le formulaire ; réessayez dans quelques instants.",
      },
    };
  }
}
