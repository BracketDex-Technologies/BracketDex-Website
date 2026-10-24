# Design QA — Service Bento Shadows

Date: 2026-10-24

Reference: `Screenshot 2026-10-24 110431.png`

## Checks

- Desktop visual: passed. Cards use the reference's opposing dark and light shadow direction while retaining the BracketDex charcoal and orange palette.
- Existing bento layout: passed. Five cards, wide-card span, copy, SVG artwork, and spacing remain unchanged.
- Hover and keyboard focus: passed. The orange border remains visible and the shadow depth increases without obscuring card content.
- Mobile behavior: passed at 390 × 844. Five cards remain present and document overflow is `0px`.
- Reduced motion: passed by source inspection. Existing reduced-motion behavior remains unchanged.

Final result: passed.

---

# Design QA — Navbar and Hero Typography

Date: 2026-10-24

Reference: `Screenshot 2026-10-24 112739.png`

## Checks

- Desktop navbar: passed. The logo, centered routes, and contact action now sit inside a centered `68rem` container. Existing navbar height is unchanged.
- Desktop hero hierarchy: passed. Headline width, scale, line-height, word spacing, contrast, and vertical position were tightened to match the reference proportions.
- Supporting copy: passed. Two explicit copy lines render beneath the headline.
- Mobile: passed at 390 × 844. Navigation remains unchanged in height, headline remains readable, both supporting lines remain present, and document overflow is `0px`.
- Existing behavior: passed. Hero media, CTA, navigation destinations, sticky/glass scroll behavior, and reduced-motion handling remain intact.

Final result: passed.
