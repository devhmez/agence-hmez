import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  const result = await lighthouse("http://127.0.0.1:3000/", {
    port: chrome.port,
    output: ["json", "html"],
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    logLevel: "error",
  });
  await mkdir("docs/audits", { recursive: true });
  await writeFile("docs/audits/lighthouse-mobile.json", result.report[0]);
  await writeFile("docs/audits/lighthouse-mobile.html", result.report[1]);
  console.log(
    JSON.stringify(
      {
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        ),
        metrics: Object.fromEntries(
          [
            "first-contentful-paint",
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
          ].map((key) => [key, result.lhr.audits[key].displayValue]),
        ),
        issues: Object.entries(result.lhr.audits)
          .filter(([, value]) => value.score !== null && value.score < 1)
          .map(([key, value]) => ({
            key,
            title: value.title,
            detail: value.displayValue,
          })),
      },
      null,
      2,
    ),
  );
} finally {
  await chrome.kill();
}
