# Launch checklist

Public site: **https://agence-hmez.pages.dev**, published 18 September 2026 through a free Pages gateway to the existing Worker. Direct WhatsApp, phone and email contact is available. This is the initial noindex publication; live form delivery and indexed-launch requirements below remain outstanding.

## Implementation and verification

- [x] Lint, strict types, 24 unit/component tests, Workers production build and 36 cross-browser scenarios verified.
- [ ] Rerun performance checks on the deployed URL.
- [ ] Inspect 375, 768, and 1440 px layouts, form focus, and reduced motion.
- [ ] Run `npm run check:launch` using the intended production environment.

## Remaining inputs for indexed launch and live form delivery

- [ ] Confirm the working brand and domain; no trademark or domain availability is asserted.
- [ ] Provide actual legal operator name, business address, jurisdiction, and privacy contact.
- [ ] Replace and approve draft privacy/terms with actual operator facts, retention policy, provider processing details, contract, payment, and cancellation terms.
- [ ] Confirm offer, pricing, taxes, delivery terms, and capacity to provide Care.
- [x] Workers migration, authenticated owner account and first public hostname configured and tested.
- [ ] Configure Resend API key, verified sender, and approved agency recipient.
- [ ] Configure Upstash Redis REST URL/token and a random rate-limit secret.
- [ ] Approve provider regions, retention, contracts, and any required transfer arrangements.

## Deployment acceptance

- [x] HTTPS and the first canonical Workers hostname work. Recheck canonical URLs and redirects when adding a custom domain.
- [ ] Preview is protected where available and remains noindex.
- [ ] Real, synthetic agency enquiry arrives once in the expected inbox; reply-to works; retry does not duplicate it.
- [ ] Failure and throttling responses are understood by the owner. Do not test abuse limits with real customer content.
- [ ] Production logs contain no form values; inspect provider logging configuration as well as application behavior.
- [ ] Every demo route carries noindex/nofollow, sitemap excludes demo, and no fake business schema is present.
- [ ] Social image loads at the canonical URL.
- [ ] Rollback to the previous successful hosting deployment is available and documented; restore environment changes separately.
- [ ] Set `PUBLIC_LAUNCH_READY=true` only after approval; rebuild and verify indexing metadata.

The repository alone cannot establish business identity, legal approval, authenticated hosting, provider deliverability, or domain ownership.
