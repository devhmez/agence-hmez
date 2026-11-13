# Asset provenance

- `public/images/avela-architecture.svg`: original vector illustration authored for this project. A fictional sunlit arch, vessel, and branch; no photograph of real premises and no identifiable person. Retained as an unused original asset.
- `public/images/social-preview.svg`: original graphic authored for this project; updated on 18 September 2026 to the dark Agence Hmez identity with cyan/lavender accents and the new headline, then rasterized with Sharp to `public/social-preview.png` for Open Graph compatibility.
- `src/app/icon.svg`: original geometric Forma mark.
- Treatment cards now use licensed photographs; the former CSS geometry has been removed.
- Cormorant Garamond: self-hosted via `@fontsource/cormorant-garamond`, SIL Open Font License 1.1. Package license retained in dependency distribution.
- DM Sans: self-hosted via `@fontsource/dm-sans`, SIL Open Font License 1.1. Package license retained in dependency distribution.

Font license copies are included in `public/licenses/` and ship with the website. Fonts are preloaded with `next/font/local` to avoid late layout changes.

No stock clinician photos, patient images, testimonials, before-and-after imagery, third-party maps, or tracking assets are used. No runtime third-party font request is necessary.

## Photography update — 18 September 2026

`public/images/clinic-room.webp`: Max Vakhtbovych, Pexels photo 6899549. Source: https://www.pexels.com/photo/modern-cosmetology-office-with-couch-under-light-lamp-6899549/ . License checked: https://www.pexels.com/license/ . Downloaded and resized to WebP; no endorsement or real Avela premises implied. Used in agency preview and demo. The previous original SVG remains available but is no longer the main interior image.

Additional real photographs, downloaded and optimized locally as WebP under the [Pexels license](https://www.pexels.com/license/):

- `clinic-6899542.webp`: Max Vakhtbovych, [salon interior](https://www.pexels.com/photo/stylish-interior-of-modern-beauty-salon-6899542/). Consultation card, approach and about sections.
- `clinic-7691112.webp`: ROMAN ODINTSOV, [skincare products](https://www.pexels.com/photo/close-up-shot-of-skincare-products-7691112/). Hydration card.
- `clinic-7691105.webp`: ROMAN ODINTSOV, [products on towels](https://www.pexels.com/photo/beauty-products-on-white-towels-7691105/). Peel consultation card.
- `clinic-3736279.webp`: Polina Tankilevitch, [salon equipment](https://www.pexels.com/photo/equipment-in-beauty-salon-3736279/). Microneedling consultation card; illustrative equipment, not a claim about the depicted procedure.

All images are served locally through Next Image, with descriptive alternative text. No stock photograph represents actual Avela premises, staff, patients, or treatment results.

## Beauty Shop — 18 September 2026

Real product photographs under the [Pexels license](https://www.pexels.com/license/), downloaded and converted to local WebP at quality 82. Used as illustrative photography in a fictitious catalogue; depicted brands do not endorse Agence Hmez, and sample names/prices do not identify products for sale.

- `beauty-13608711.webp`: [pink cosmetic bottle](https://www.pexels.com/photo/a-pink-bottle-of-cosmetic-product-on-white-surface-13608711/).
- `beauty-6690885.webp`: [dropper bottle](https://www.pexels.com/photo/a-cosmetic-product-in-a-pink-dropper-bottle-6690885/).
- `beauty-13573722.webp`: [beauty products on pink](https://www.pexels.com/photo/close-up-shot-of-beauty-products-on-pink-surface-13573722/).
- `beauty-14311551.webp`: [pink bottles](https://www.pexels.com/photo/pink-bottles-on-white-table-14311551/).
- `beauty-5582621.webp`: [cosmetic products overhead](https://www.pexels.com/photo/overhead-photo-of-cosmetic-products-5582621/).
- `beauty-9846610.webp`: [makeup products](https://www.pexels.com/photo/makeup-products-9846610/).
- `beauty-24602077.webp`: [pink cosmetics](https://www.pexels.com/photo/cosmetics-in-pink-bottle-24602077/).

Social preview regenerated for Agence Hmez. The original geometric site icon remains unchanged.

## Actual Beautyshop reference — 18 September 2026

`public/images/beautyshop-tunisie-preview.webp` is a browser screenshot of the public French homepage at https://beautyshop-tunisie.com/, captured for the user-requested reference preview. This is an existing external website, not a claim of agency authorship or a fictitious shop. The screenshot is hosted locally; the interactive iframe loads the external site only after an explicit click. The original `/en` URL is also linked.
