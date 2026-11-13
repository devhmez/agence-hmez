# Reusing the clinic

1. Edit `src/config/clinic.ts`. Types cover name, short wordmark, palette, location copy, opening-hour rows, treatment content, and booking time windows. Treatment slugs create catalogue cards, detail pages, static paths, and booking options automatically. Use unique lowercase hyphenated slugs.
2. Update the homepage's editorial section copy in `src/app/demo/page.tsx`, and the philosophy page in `src/app/demo/about/page.tsx` when the new clinic's approved voice differs. Core brand and service replacements do not require changing components.
3. Replace the photographs in `/public/images/` with approved imagery and update its captions, alt text, dimensions, and provenance. Never pass stock or concept illustrations off as real premises or patient results.
4. Keep draft and fictional labels until this becomes a real clinic with verified operator details, qualified practitioner review, and approved legal information. Review `clinicalNotice` and every treatment description with the clinic.
5. Re-run `npm run check` and `npm run test:e2e` after changes. Check contrast if changing palette colors, and mobile wrapping for longer names.

## Live booking is a separate integration

`BookingAdapter` describes the request boundary. `demoBookingAdapter` never performs network calls or writes to storage. There is deliberately no live adapter; `ClinicConfig.booking.mode` only accepts `demo` in Mission #1. The demo route always uses that adapter and simulation copy.

To ship a real clinic, implement and test a server-backed live adapter on that clinic's own deployment, explicitly extend the config type, add appropriate validation and abuse controls, replace simulation-only text and consent, and review its privacy treatment. Only claim a confirmed appointment if the provider returns a confirmed slot. Do not switch the public Agence Hmez concept demo to collecting patient details. An external booking-provider link is also an option after review.

## Agency content

Agency copy and offer inclusions are in `src/config/agency.ts`; long editorial blocks and pricing are in `src/app/(agency)/page.tsx`. Update prices consistently in the contact page, terms draft, and FAQ. Commercial figures are proposed terms, not an existing client contract. Verified structured data should be added only once actual operator facts are supplied.

## Futuristic appearance and motion

`src/app/future.css` is the shared visual layer, imported after the base stylesheet. Its root variables define the agency palette; the clinic palette comes from `src/config/clinic.ts`, and boutique overrides use `.beauty-site`. The homepage browser frame, scrolling strip and benefit cards are in the agency homepage. `src/components/future-effects.tsx` owns decorative lighting, scroll progress, section entrances and the pause/resume control. All content is visible before JavaScript runs. Preserve reduced-motion overrides, keyboard focus styles and pause controls when changing animations. The external Beautyshop iframe uses the external site's design.

## Canonical and social details

Set `NEXT_PUBLIC_SITE_URL` before building. Metadata helpers live in `src/lib/metadata.ts`. The social image is `/public/social-preview.png`; its editable vector source is `/public/images/social-preview.svg`.

## Cloudflare hosting

The public site is https://agence-hmez.pages.dev. Its free Pages gateway forwards to the existing Worker at https://agence-hmez.hamza-dellai.workers.dev; `npm run deploy:pages` publishes only the gateway. The public contact page shows direct links while `CONTACT_DIRECT_ONLY=true` in `wrangler.jsonc`; local Next.js retains the form for development. Keep the build URL and Worker URL variable consistent when changing domains. Public indexing is still disabled pending the remaining launch details.

## Beauty Shop

The fully French fictitious boutique demo is now available at `/beautyshop/concept`, separately from the real reference. Products, example prices in TND, formats, photos and categories live in `src/config/beautyshop.ts`. Search and category filters are combined; accent-insensitive search also matches categories. Product cards open an accessible native dialog. WhatsApp links use `agency.whatsappUrl` and explicitly identify this as a demo enquiry to Hamza, never an order or payment. When creating a separate real shop for a client, replace the catalogue with verified products, prices and photography, and use that client’s WhatsApp number and approved enquiry wording. Availability and order fulfilment remain outside this demonstration.

Public brand: Agence Hmez. Agency, clinic and boutique interfaces, metadata, errors and legal drafts are French. Historical outreach ledgers remain historical records.

## Real Beautyshop reference

`/beautyshop` now presents the actual site Beautyshop Tunisie. The homepage card shows a real screenshot and a direct external link. `src/config/beautyshop-reference.ts` holds the explicit French `/fr` URL (redirects to the root while selecting French), original English URL and screenshot. `RealBeautyPreview` initially displays the locally hosted screenshot and opens a sandboxed iframe only after an explicit click. The always-available external link remains usable if the third-party site later restricts framing. The CSP permits frames only from https://beautyshop-tunisie.com. No agency authorship or client relationship is asserted.
