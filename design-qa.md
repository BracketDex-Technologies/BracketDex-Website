# BracketDex Post-Hero Design QA

- Source visual truth: `docs/superpowers/specs/assets/2026-07-17-bracketdex-post-hero-dark-reference.png`
- Implementation screenshot: not captured — the required browser-client runtime reported `No browser is available`
- Viewport: target captures were `1440 × 1000`, `834 × 1112`, `390 × 844`, and a `320px` overflow check; none could be captured
- State: target state was homepage post-hero with the first FAQ open; browser state could not be reached

## Full-view comparison evidence

Blocked. The source reference opened successfully, but there is no browser-rendered desktop implementation screenshot. The required combined comparison input therefore could not be created, so hierarchy, section order, typography, spacing rhythm, dark/light balance, border density, diagrams, FAQ reset, CTA, and visible copy cannot receive a passing visual judgment.

## Focused-region comparison evidence

Blocked. Service visuals, the process rail, FAQ, CTA, and mobile stacking could not be captured from the rendered implementation. Focused comparison crops were not created because no browser-rendered source capture was available.

## Required fidelity surfaces

- Fonts and typography: not visually verified. Family, fallback, weight, size, line height, letter spacing, wrapping, hierarchy, and optical balance require a browser-rendered capture.
- Spacing and layout rhythm: not visually verified. Margins, padding, grid tracks, gaps, radii, borders, section proportions, and vertical rhythm require desktop, tablet, and mobile captures.
- Colors and visual tokens: not visually verified. Palette, contrast, opacity, dark/light balance, and token-to-reference fidelity require a combined comparison input.
- Image quality and asset fidelity: the source reference opened, but rendered system visuals and their sharpness, crop, scale, and integration could not be inspected.
- Copy and content: source audits confirm the legacy placeholder is not imported by `home-page.tsx`, but rendered wrapping, completeness, and visual hierarchy were not verified.

## Findings

- **QA evidence blocker — browser runtime unavailable**
  - Location: browser-rendered homepage at `http://localhost:3017/`.
  - Evidence: browser-client initialization succeeded, but `await agent.browsers.getDefault()` returned the exact error `No browser is available`; `await agent.browsers.list()` returned `[]`.
  - Troubleshooting: read the browser bootstrap troubleshooting guidance, inspected the browser list once, read Chrome troubleshooting, attempted the permitted Chrome extension fallback, waited two seconds, and retried once. Both Chrome attempts returned `Error: Browser is not available: extension`.
  - Impact: required screenshots, combined reference/implementation comparison, responsive inspection, interaction checks, reduced-motion validation, overflow validation, and console inspection are missing. Design QA cannot pass without that evidence.
  - Fix: make the in-app browser or ChatGPT Chrome Extension browser surface available, then repeat the complete capture, interaction, console, and comparison loop.

No product P0/P1/P2 finding was classified because the rendered implementation could not be inspected. This is not a visual pass.

## Comparison history

No comparison history. A first combined comparison could not be created, so no visual fixes were applied and no production files were modified.

## Static and frozen-scope evidence

- `npm run typecheck`: passed with exit code `0`; TypeScript emitted no diagnostics.
- `npm run build`: passed with exit code `0`; Next.js 15.5.19 compiled successfully and generated `13/13` static pages.
- Placeholder/theme audit: the only match was `UI image will be here` in legacy `src/components/home/landing-visuals.tsx`; `home-page.tsx` imports `PostHeroHome` and does not import that legacy file. No theme toggle, trust metric placeholder, or project placeholder was found in the rendered homepage composition.
- Frozen files: `git diff ac90eae -- src/components/marketing/navbar.tsx src/components/marketing/hero-section.tsx public/media/hero-bg-01.webp` produced no output.
- Frozen CSS selectors: filtering `git diff ac90eae -U0 -- src/app/globals.css` for changed `.bd-nav*` or `.bd-hero*` selectors produced no output.

## Interaction and console checks

- Primary post-hero links: not browser-tested.
- FAQ keyboard navigation: not browser-tested.
- First FAQ open state and each `details` toggle: not browser-tested.
- `prefers-reduced-motion: reduce`: not browser-tested.
- `320px` horizontal overflow: not browser-tested.
- `390px` primary CTA clipping: not browser-tested.
- Hydration, key, GSAP, and runtime console errors: not browser-tested.

final result: blocked
