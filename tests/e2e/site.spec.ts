import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/contact",
  "/privacy",
  "/terms",
  "/beautyshop",
  "/beautyshop/concept",
  "/demo",
  "/demo/treatments",
  "/demo/about",
  "/demo/contact",
  "/demo/book",
  "/demo/treatments/skin-consultation",
  "/demo/treatments/hydration-facial",
  "/demo/treatments/chemical-peel-consultation",
  "/demo/treatments/microneedling-consultation",
];
test("every route renders, images load, links resolve, and demo stays noindex", async ({
  page,
  request,
}) => {
  const hrefs = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["content-security-policy"]).toContain(
      "frame-ancestors 'none'",
    );
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.locator("main").count()).toBe(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    if (route.startsWith("/demo")) {
      await expect(
        page.getByText(
          "Avela est une clinique fictive. Les demandes de rendez-vous sont simulées.",
          { exact: false },
        ),
      ).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
      expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    }
    if (route === "/beautyshop/concept") {
      await expect(
        page.getByText("Boutique fictive · Produits et prix d’exemple", {
          exact: false,
        }),
      ).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
      expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    }
    for (const img of await page.locator("img").all()) {
      // Decorative floating previews never become geometrically stable.
      // Scroll directly so image loading is tested with animations enabled.
      await img.evaluate((element) =>
        element.scrollIntoView({ block: "center", behavior: "instant" }),
      );
      await expect
        .poll(() =>
          img.evaluate((element) => {
            const image = element as HTMLImageElement;
            return image.complete && image.naturalWidth > 0;
          }),
        )
        .toBe(true);
    }
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")!)))
      hrefs.add(href.split("#")[0]);
  }
  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
  expect((await request.get("/missing-page")).status()).toBe(404);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "/demo",
  );
});
test("clinic request supports keyboard input, preserves edits, and never transmits personal data", async ({
  page,
}) => {
  const requests: string[] = [];
  const logs: string[] = [];
  page.on("request", (req) =>
    requests.push(req.url() + " " + (req.postData() || "")),
  );
  page.on("console", (msg) => logs.push(msg.text()));
  await page.goto("/demo/book?treatment=skin-consultation");
  await page.getByLabel("Date souhaitée").fill("2099-10-12");
  await page.getByLabel("Créneau souhaité").selectOption("Matin");
  await page.getByRole("button", { name: /Continuer/ }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Vos coordonnées" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.type("Private Demo Person");
  await page.keyboard.press("Tab");
  await page.keyboard.type("private-demo-sentinel@example.com");
  await page.keyboard.press("Tab");
  await page.keyboard.type("+15551234567");
  await page.keyboard.press("Tab");
  // Safari's default keyboard policy can skip checkboxes. Explicit focus still
  // verifies native keyboard activation without using a pointer.
  await page.getByRole("checkbox").focus();
  await page.keyboard.press("Space");
  await expect(page.getByRole("checkbox")).toBeChecked();
  await page.getByRole("button", { name: "Retour", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Date souhaitée")).toHaveValue("2099-10-12");
  await page.getByRole("button", { name: /Continuer/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Nom complet")).toHaveValue(
    "Private Demo Person",
  );
  await page.getByRole("button", { name: /Continuer/ }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText("private-demo-sentinel@example.com", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: /Terminer la demande de démonstration/ })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toContainText(
    "Aucun rendez-vous n’a été réservé",
  );
  await expect(
    page.getByText("private-demo-sentinel@example.com", { exact: true }),
  ).toHaveCount(0);
  for (const sentinel of [
    "Private Demo Person",
    "private-demo-sentinel",
    "15551234567",
  ]) {
    expect(requests.join("\n")).not.toContain(sentinel);
    expect(logs.join("\n")).not.toContain(sentinel);
    expect(page.url()).not.toContain(sentinel);
  }
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
      cookies: document.cookie,
    })),
  ).toEqual({ local: 0, session: 0, cookies: "" });
});
test("booking rejects past dates and missing fields", async ({ page }) => {
  await page.goto("/demo/book");
  await page.getByLabel("Date souhaitée").fill("2020-01-01");
  await page.getByRole("button", { name: /Continuer/ }).click();
  await expect(
    page.getByText("Choisissez une date valide, aujourd’hui ou dans le futur."),
  ).toBeVisible();
  await expect(page.getByLabel("Date souhaitée")).toBeFocused();
});
test("agency form handles provider errors, throttling, and successful submission", async ({
  page,
}) => {
  await page.goto("/contact");
  if (
    await page
      .getByRole("heading", { name: "Parlez-moi de votre projet." })
      .count()
  ) {
    await expect(
      page.locator('a.button[href^="https://wa.me/"]'),
    ).toBeVisible();
    await expect(
      page.locator('.form-card a[href="mailto:hamzadellai007@gmail.com"]'),
    ).toBeVisible();
    await expect(page.locator("form")).toHaveCount(0);
    return;
  }
  await page.getByRole("button", { name: "Demander un échange" }).click();
  await expect(page.getByText("Indiquez votre nom.")).toBeVisible();
  await page.getByLabel("Nom", { exact: true }).fill("Example Owner");
  await page.getByLabel("E-mail professionnel").fill("owner@example.com");
  await page.getByLabel("Nom de l’établissement").fill("Example Clinic");
  await page
    .getByLabel("Votre projet")
    .fill("We need a considered new clinic website.");
  const keys: string[] = [];
  let count = 0;
  await page.route("**/api/enquiry", async (route) => {
    keys.push(route.request().headers()["idempotency-key"]);
    count++;
    await route.fulfill({
      status: count === 1 ? 503 : count === 2 ? 429 : 200,
      contentType: "application/json",
      body: JSON.stringify(
        count === 1
          ? { error: "L’envoi n’a pas pu être confirmé." }
          : count === 2
            ? { error: "Trop de demandes. Patientez." }
            : { ok: true, simulated: false },
      ),
    });
  });
  await page.getByRole("button", { name: "Demander un échange" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "n’a pas pu être confirmé",
  );
  await expect(page.getByLabel("E-mail professionnel")).toHaveValue(
    "owner@example.com",
  );
  await page.getByRole("button", { name: "Demander un échange" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "Trop de demandes",
  );
  await page.getByRole("button", { name: "Demander un échange" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Merci, votre demande a été reçue.",
    }),
  ).toBeVisible();
  expect(new Set(keys).size).toBe(1);
});
test("production endpoint cannot silently simulate mail", async ({
  request,
  baseURL,
}) => {
  const response = await request.post("/api/enquiry", {
    headers: {
      origin: new URL(baseURL!).origin,
      "idempotency-key": "12345678-1234-4234-8234-123456789012",
    },
    data: {
      name: "Test Owner",
      email: "test@example.com",
      clinic: "Test Clinic",
      website: "",
      summary: "This is a test enquiry.",
      companyFax: "",
    },
  });
  expect(response.status()).toBe(503);
  expect(await response.json()).not.toHaveProperty("ok", true);
});
for (const width of [375, 768, 1440])
  test(`responsive layouts at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/contact",
      "/demo",
      "/demo/treatments",
      "/beautyshop",
      "/demo/book",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
    }
    if (width <= 768) {
      await page.getByRole("button", { name: "Menu" }).click();
      await expect(
        page.getByRole("navigation", { name: "Navigation principale" }),
      ).toBeVisible();
      await page
        .getByRole("link", { name: "Notre approche", exact: true })
        .click();
      await expect(page).toHaveURL(/\/demo\/about$/);
      await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });
test("key pages have no serious accessibility violations", async ({ page }) => {
  for (const route of [
    "/",
    "/contact",
    "/demo",
    "/demo/treatments",
    "/beautyshop",
    "/demo/book",
  ]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .options({ rules: { "label-content-name-mismatch": { enabled: true } } })
      .analyze();
    expect(
      result.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      ),
      `${route}: ${JSON.stringify(result.violations)}`,
    ).toEqual([]);
  }
});
test("reduced motion disables smooth scrolling and transitions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  expect(
    await page
      .locator(".hero-preview")
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("future-float");
  expect(
    await page
      .locator(".future-ticker > div")
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("future-ticker");
  await page
    .getByRole("button", { name: "Mettre les animations en pause" })
    .click();
  await expect(
    page.getByRole("button", { name: "Reprendre les animations" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    await page
      .locator(".hero-preview")
      .evaluate((node) => getComputedStyle(node).animationPlayState),
  ).toBe("paused");
  await page.getByRole("button", { name: "Reprendre les animations" }).click();
  expect(
    await page
      .locator(".hero-preview")
      .evaluate((node) => getComputedStyle(node).animationPlayState),
  ).toBe("running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".hero-preview")
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".future-ticker > div")
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  await expect(page.locator("h1")).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  expect(
    await page
      .locator(".button")
      .first()
      .evaluate((e) => getComputedStyle(e).transitionDuration),
  ).toBe("0s");
});

test("beauty catalogue filters, searches and prepares an honest WhatsApp enquiry", async ({
  page,
}) => {
  await page.goto("/beautyshop/concept");
  await expect(page.locator(".beauty-product")).toHaveCount(6);
  await page.getByRole("button", { name: "Coffrets", exact: true }).click();
  await expect(page.locator(".beauty-product")).toHaveCount(2);
  await page.getByLabel("Rechercher un produit").fill("introuvable");
  await expect(
    page.getByRole("heading", { name: "Aucun produit trouvé" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Afficher tous les produits" })
    .click();
  await page.getByLabel("Rechercher un produit").fill("serum");
  await expect(page.locator(".beauty-product")).toHaveCount(1);
  const opener = page.getByRole("button", {
    name: "Découvrir Sérum essentiel",
  });
  await opener.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Sérum essentiel" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("59 TND", { exact: false })).toBeVisible();
  const href = await dialog
    .getByRole("link", { name: /WhatsApp/ })
    .getAttribute("href");
  const url = new URL(href!);
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/21625875529");
  expect(url.searchParams.get("text")).toContain("Sérum essentiel");
  expect(url.searchParams.get("text")).toContain(
    "Il ne s’agit pas d’une commande",
  );
  expect(
    (await new AxeBuilder({ page }).analyze()).violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    ),
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("real Beautyshop preview opens on request and keeps a direct shop link", async ({
  page,
}) => {
  await page.route("https://beautyshop-tunisie.com/fr", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="fr"><head><title>Beautyshop</title></head><body><h1>Catalogue Beautyshop</h1></body></html>',
    }),
  );
  await page.goto("/beautyshop");
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.getByRole("link", {
      name: "Visiter Beautyshop Tunisie",
      exact: false,
    }),
  ).toHaveAttribute("href", "https://beautyshop-tunisie.com/fr");
  await page
    .getByRole("button", {
      name: "Afficher l’aperçu interactif de Beautyshop Tunisie",
    })
    .click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "https://beautyshop-tunisie.com/fr",
  );
  await expect(
    page
      .frameLocator("iframe")
      .getByRole("heading", { name: "Catalogue Beautyshop" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Revenir à la capture" }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "Afficher l’aperçu interactif de Beautyshop Tunisie",
    }),
  ).toBeVisible();
});
