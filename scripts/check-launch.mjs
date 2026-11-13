import { readFileSync } from "node:fs";
const failures = [];
for (const key of [
  "NEXT_PUBLIC_SITE_URL",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "ENQUIRY_TO_EMAIL",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "RATE_LIMIT_SECRET",
]) {
  if (!process.env[key]) failures.push(`Missing ${key}`);
}
try {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "");
  if (
    url.protocol !== "https:" ||
    /localhost|127\.0\.0\.1|\.example$/.test(url.hostname)
  )
    failures.push("Canonical URL must be the verified public HTTPS hostname");
} catch {
  failures.push("Invalid canonical URL");
}
if ((process.env.RATE_LIMIT_SECRET || "").length < 32)
  failures.push("RATE_LIMIT_SECRET needs at least 32 characters");
if (process.env.MAIL_MODE !== "resend")
  failures.push("MAIL_MODE must be resend");
if (process.env.PUBLIC_LAUNCH_READY !== "true")
  failures.push("PUBLIC_LAUNCH_READY has not been approved");
for (const file of [
  "src/app/(agency)/privacy/page.tsx",
  "src/app/(agency)/terms/page.tsx",
]) {
  if (readFileSync(file, "utf8").includes("draft-notice"))
    failures.push(
      `${file}: legal draft still requires operator details and review`,
    );
}
if (failures.length) {
  console.error(
    "Public launch is blocked:\n" + failures.map((f) => `- ${f}`).join("\n"),
  );
  process.exitCode = 1;
} else {
  console.log(
    "Configuration checks passed. Complete the delivery, domain, legal, and production checks in docs/LAUNCH_CHECKLIST.md before launch.",
  );
}
