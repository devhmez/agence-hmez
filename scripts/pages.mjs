import { mkdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const project = new URL("../cloudflare/pages/", import.meta.url);
// Keep Wrangler from discovering the parent application's Vite deployment config.
mkdirSync(new URL(".wrangler/deploy/", project), { recursive: true });
writeFileSync(
  new URL(".wrangler/deploy/config.json", project),
  JSON.stringify({ configPath: "../../wrangler.jsonc" }),
);
const result = spawnSync(
  process.execPath,
  [
    fileURLToPath(
      new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url),
    ),
    "pages",
    ...process.argv.slice(2),
  ],
  {
    cwd: fileURLToPath(project),
    stdio: "inherit",
    env: {
      ...process.env,
      CLOUDFLARE_ACCOUNT_ID: "107d865a52554f0aec3b0ee82dd061be",
    },
  },
);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
