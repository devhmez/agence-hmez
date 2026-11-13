import { getDeliveryDependencies } from "@/lib/enquiry-dependencies";
import { processEnquiry } from "@/lib/enquiry-service";
export const runtime = "nodejs";
export const maxDuration = 30;
const MAX_BYTES = 12_000;
function response(
  body: object,
  status: number,
  extra: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next.js may normalize Request.url to an internal hostname. The browser's
  // Origin must match the public Host header, which browser scripts cannot set.
  const requestUrl = new URL(request.url);
  const host = request.headers.get("host") || requestUrl.host;
  const localHost = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);
  const protocol = localHost ? requestUrl.protocol : "https:";
  if (!origin || origin !== `${protocol}//${host}`)
    return response({ error: "Cette demande n’a pas pu être vérifiée." }, 403);
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json")
    return response({ error: "Utilisez une demande au format JSON." }, 415);
  if (Number(request.headers.get("content-length") || 0) > MAX_BYTES)
    return response({ error: "Votre demande est trop volumineuse." }, 413);
  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return response({ error: "Votre demande est vide." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return response({ error: "Votre demande est trop volumineuse." }, 413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return response({ error: "Votre demande n’a pas pu être lue." }, 400);
  }
  const dependencies = getDeliveryDependencies();
  if (!dependencies)
    return response(
      {
        error:
          "Le formulaire n’est pas encore disponible. Contactez Hamza directement par téléphone, e-mail ou WhatsApp.",
      },
      503,
    );
  // Only trust the deployment platform's forwarded address. Other hosts share a conservative bucket.
  const client = process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown"
    : "local-or-untrusted-host";
  const result = await processEnquiry(
    input,
    request.headers.get("idempotency-key") || "",
    client,
    dependencies,
  );
  return response(
    result.body,
    result.status,
    result.retryAfter ? { "Retry-After": String(result.retryAfter) } : {},
  );
}
