import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { Resend } from "resend";
import { keyedHash, type DeliveryDependencies } from "./enquiry-service";
const localRecords = new Map<
  string,
  { fingerprint: string; sent: boolean; expires: number }
>();
const localLimits = new Map<string, { count: number; reset: number }>();
export function isLocalMail() {
  return (
    process.env.MAIL_MODE === "local" &&
    process.env.NODE_ENV !== "production" &&
    !process.env.VERCEL
  );
}
export function getDeliveryDependencies(): DeliveryDependencies | null {
  if (isLocalMail()) {
    const now = Date.now();
    for (const [key, value] of localRecords)
      if (value.expires < now) localRecords.delete(key);
    for (const [key, value] of localLimits)
      if (value.reset < now) localLimits.delete(key);
    return {
      local: true,
      hash: (value) => keyedHash("local-development-only", value),
      async rateLimit(key) {
        const record = localLimits.get(key) || {
          count: 0,
          reset: Date.now() + 600000,
        };
        record.count++;
        localLimits.set(key, record);
        return { success: record.count <= 5, reset: record.reset };
      },
      async claim(key, fingerprint) {
        const existing = localRecords.get(key);
        if (existing)
          return existing.fingerprint !== fingerprint
            ? "conflict"
            : existing.sent
              ? "sent"
              : "same";
        localRecords.set(key, {
          fingerprint,
          sent: false,
          expires: Date.now() + 86400000,
        });
        return "new";
      },
      async markSent(key, fingerprint) {
        localRecords.set(key, {
          fingerprint,
          sent: true,
          expires: Date.now() + 86400000,
        });
      },
      async send() {
        /* Explicit local simulation; never logs or retains enquiry content. */
      },
    };
  }
  if (process.env.MAIL_MODE !== "resend") return null;
  const {
    RESEND_API_KEY,
    RESEND_FROM_EMAIL,
    ENQUIRY_TO_EMAIL,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
    RATE_LIMIT_SECRET,
  } = process.env;
  if (
    !RESEND_API_KEY ||
    !RESEND_FROM_EMAIL ||
    !ENQUIRY_TO_EMAIL ||
    !UPSTASH_REDIS_REST_URL ||
    !UPSTASH_REDIS_REST_TOKEN ||
    !RATE_LIMIT_SECRET ||
    RATE_LIMIT_SECRET.length < 32
  )
    return null;
  const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
  });
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: false,
    prefix: "forma:rate",
    timeout: 5000,
  });
  const resend = new Resend(RESEND_API_KEY);
  return {
    local: false,
    hash: (value) => keyedHash(RATE_LIMIT_SECRET, value),
    async rateLimit(key) {
      const result = await limiter.limit(key);
      if (result.reason === "timeout")
        throw new Error("Rate limiter unavailable");
      return result;
    },
    async claim(key, fingerprint) {
      const redisKey = `forma:enquiry:${key}`;
      const acquired = await redis.set(
        redisKey,
        { fingerprint, sent: false },
        { nx: true, ex: 86400 },
      );
      if (acquired) return "new";
      const existing = await redis.get<{ fingerprint: string; sent: boolean }>(
        redisKey,
      );
      if (!existing) throw new Error("Claim unavailable");
      return existing.fingerprint !== fingerprint
        ? "conflict"
        : existing.sent
          ? "sent"
          : "same";
    },
    async markSent(key, fingerprint) {
      await redis.set(
        `forma:enquiry:${key}`,
        { fingerprint, sent: true },
        { ex: 86400 },
      );
    },
    async send(data, key) {
      const result = await resend.emails.send(
        {
          from: RESEND_FROM_EMAIL,
          to: ENQUIRY_TO_EMAIL,
          replyTo: data.email,
          subject: "Nouvelle demande — Agence Hmez",
          text: `Nom : ${data.name}\nE-mail : ${data.email}\nÉtablissement : ${data.clinic}\nSite : ${data.website || "Non renseigné"}\n\nProjet :\n${data.summary}`,
        },
        { idempotencyKey: key },
      );
      if (result.error || !result.data?.id)
        throw new Error("Delivery not confirmed");
    },
  };
}
