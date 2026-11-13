import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["cloudflare/pages/public/_worker.js"],
    languageOptions: { globals: { HTMLRewriter: "readonly" } },
  },
  globalIgnores([
    ".next/**",
    "dist/**",
    ".vinext/**",
    ".wrangler/**",
    "**/.wrangler/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
