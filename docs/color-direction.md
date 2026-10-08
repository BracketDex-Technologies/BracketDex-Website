# BracketDex color recommendation — October 8, 2026

Applied: charcoal, warm white, and cobalt. The palette now controls the homepage and all seven inner pages through premium.css. The 3D braces use silver material and cobalt rim lighting; GSAP animates hero words, independent card reveals, page introductions, titles, code typing and the scroll statement.

## Evidence and interpretation

Linear's March 12, 2026 refresh explicitly moves from cool blue-ish hues toward warmer, less saturated grays, reduces decorative icon treatments and softens separators: https://linear.app/now/behind-the-latest-design-refresh

Vercel's Geist color system recommends a default page background and sparing use of a secondary background, with separate roles for component surfaces, borders and contrast: https://vercel.com/geist/colors

These are current primary-source examples, not proof of a universal startup trend. The practical inference for BracketDex is to use neutral surfaces, clear contrast, one signature accent and restrained motion. The exact hex values below are custom recommendations, not values copied from those brands. A monochrome coding-bracket logo does not constrain the company to cyan.

## Palette candidates

| Direction | Base | Light surface | Accent | Assessment |
| --- | --- | --- | --- | --- |
| Charcoal / warm white / cobalt | #151619 | #FAF9F6 | #315BFF | Recommended: crisp technical identity and approachable business content |
| Ink / porcelain / teal | #142323 | #F7F9F7 | #0D756C | Softer, service-led and calm; less visibly developer-focused |
| Graphite / pearl / violet | #18181D | #FAF9FC | #6850C7 | Expressive AI/product direction; less differentiated from other AI sites |

## Recommended tokens

| Role | Value | Use |
| --- | --- | --- |
| Paper | #FAF9F6 | Main reading surfaces |
| White | #FFFFFF | Cards and form inputs |
| Mist | #F0F0EC | Occasional section separation |
| Ink | #151619 | Main text, hero, manifesto, footer |
| Dark raised | #222328 | Dark cards and diagrams |
| Muted on light | #62656D | Body descriptions |
| Muted on dark | #B1B4BE | Descriptions on charcoal |
| Light border | #DEDFDA | Dividers and controls |
| Dark border | #383A42 | Dividers on charcoal |
| Cobalt | #315BFF | Primary buttons and links on light surfaces |
| Pale cobalt | #B8C7FF | Links and small accent text on dark surfaces |
| Accent wash | #EEF1FF | Selected items, quiet icon backgrounds |

Use cobalt with white button text. Use pale cobalt for text links on charcoal rather than saturated cobalt. Keep paragraphs neutral. Make the 3D braces satin silver with a cobalt edge; keep code primarily off-white and limit syntax accents to pale blue and a muted mint. Avoid a gradient across the entire hero. Typography: retain Alpino for headings/body, monospace only for code.

## Homepage mapping

| Section | Surface | Text and accents |
| --- | --- | --- |
| Navigation + hero | Charcoal | Off-white headline, neutral descriptions, cobalt CTA, silver/cobalt braces |
| Trust benefits + technology strip | Warm white | Ink text, gray dividers, quiet blue icons |
| Problems | Mist | White cards, ink text, blue links |
| Services | Warm white | Ink titles, cobalt active indicator; no separate color per service |
| Manifesto | Charcoal | Off-white word illumination |
| Cloud, process, capabilities | Warm white | Charcoal technical diagrams, blue connectors and step indicators |
| Why BracketDex + projects | Warm white / mist | Neutral cards, cobalt links |
| FAQ | Warm white | Ink questions, subdued separators |
| CTA | Cobalt | White heading and button with charcoal label |
| Contact | Warm white | White inputs, ink labels, cobalt submit action |
| Footer | Charcoal | Off-white wordmark, muted links |

## Page mapping

| Page | Direction |
| --- | --- |
| Home | Above sequence: two dark anchors and predominantly light reading sections |
| Services | Warm white hero/body; cobalt service indicators; charcoal technical diagram |
| Solutions | Warm white body, mist use-case groups, cobalt active states |
| Industries | Warm white, white cards and subtle blue category accents |
| Projects | Warm white, charcoal media frames, cobalt links; retain honest placeholders |
| About | Warm white story, charcoal mission section, neutral values grid |
| FAQ | Entirely light content surface with cobalt focus/expanded indicators |
| Contact | Warm white content and white inputs; cobalt primary action |

Shared charcoal navigation/footer provide continuity. Reuse the same blue across every route. Change the surface according to reading versus storytelling needs, not simply because the URL changed.
