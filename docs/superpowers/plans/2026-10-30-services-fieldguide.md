# Services Fieldguide Implementation Plan

**Goal:** Recreate the selected Service Fieldguide image on `/services`, with working navigation and consultation links.

**Architecture:** Route Services to a dedicated server-rendered component and scoped CSS. A small client navigation component handles the mobile menu. Reuse the current Footer unchanged. Keep all other routes and homepage components intact.

**Tech Stack:** Existing Next.js App Router, TypeScript, CSS Modules, Next Image, Next Font and Lucide icons. No new dependency or framework.

**Spec:** `C:/Users/pawan/.codex/visualizations/2026/10/29/01a18877-8b29-76f3-adf5-d195d0d3ea8a/fresh-directions/services-2.png` and its approved Service Fieldguide brief.

## Constraints

- Implement Services first. Solutions 2, Projects 2 and the minimal About/FAQ revisions are approved but remain queued.
- Preserve the homepage, its navbar, shared footer, project cards and Solutions problem cards.
- Follow-up: use the homepage Navbar and Footer components as the default on every marketing page. Services now uses Navbar in its standard inner-page state instead of a separate Fieldguide header; keep chapter navigation within the page body.
- Match the reference copy, ivory surface, Newsreader/DM Sans typography, section proportions, fine rules, illustrations and link treatments.
- Keep the footer component and real contact details authoritative where the generated mock differs.
- Use generated individual illustration assets; render headings, controls and explanatory captions as accessible HTML.
- No staging, commits or pushes.

## Tasks

- [x] Add a focused route test for five reachable service chapters, real consultation destinations, illustration loading and removal of the legacy duplicate blocks. Confirm it fails before the route changes.
- [x] Prepare five isolated illustration assets matching the approved image. Asset agents may write only their assigned PNG files.
- [x] Implement the scoped Fieldguide page, its mobile navigation, approved copy and route dispatch. No shared visual stylesheet changes.
- [x] Run the route test, TypeScript and build checks. Compare browser screenshots at the source width and at mobile widths. Test anchor links, consultation links, mobile menu and focus behavior.
- [x] Write the comparison evidence and result to `design-qa.md`; retain the earlier QA note in the design history. Update the selection record with completed Services status.

## Validation result

Services is implemented and visually verified. The production build, TypeScript, three Services tests and six selected existing regression checks pass. Browser checks cover 320px, 390px, the reference content width and 1440px, with working chapter navigation, consultation routing and mobile menu focus behavior. `design-qa.md` records the combined reference comparisons, intentional home Footer reuse and remaining minor illustration/text-wrapping differences.

The local production preview remains available at `http://127.0.0.1:3101/services`. No work is staged, committed or pushed. Solutions is next in the approved sequence; other page implementations remain queued.

The shared-navbar follow-up passes production, route, desktop and mobile checks. Seven marketing routes were checked for the shared Navbar and identical home Footer markup. Production verification now supports `NEXT_BUILD_DIR=.next-verify` so it can run alongside the user's normal development server.

## Review focus

- At 935px, the title must fit the reference line and illustrations must occupy the same major regions.
- At 320px and 390px, text and assets must stack without horizontal overflow or hidden navigation.
- Every consultation action must reach the existing contact route, and every service-index anchor must resolve.
- Scoped fonts and CSS must not restyle the homepage, other routes or Footer.
- Global text reveal must not leave page content invisible; reduced-motion rendering must remain readable.

The user explicitly requested implementation from the selected image. This plan is an execution record, not a new approval gate.
