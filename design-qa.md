# Hero Design QA

## Comparison target

- Source visual truth:
  - `C:\Users\pawan\Downloads\Hero poster_ widescreen 16x9.webp` (1920 × 1080)
  - `C:\Users\pawan\Downloads\Hero poster_ vertical 9x16.webp` (1080 × 1920)
  - `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-12 203456.png`
  - `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-12 221748.png`
  - `C:\Users\pawan\Downloads\download (4).jpg`
- Implementation: `http://localhost:3001/` for the current local QA preview.
- Implementation screenshots: inline Codex in-app browser captures from this task. The browser API did not expose filesystem paths for the captures.
- Desktop viewport: 1440 × 900 CSS px at device pixel ratio 1.
- Mobile viewport: 390 × 844 CSS px at device pixel ratio 1.
- Narrow mobile viewport: 320 × 700 CSS px at device pixel ratio 1.
- State: initial Hero viewport with background video playing; poster verified as the pre-video fallback.

## Full-view comparison evidence

The implementation follows the selected reference composition: a full-bleed orange media field, centered minimal copy, oversized headline, compact capability rail, and one primary action. Desktop uses the supplied 16:9 media. Mobile uses the supplied 9:16 media. Both retain the poster underneath the video.

No horizontal overflow remained at 1440, 390, or 320 CSS pixels. The desktop headline stayed within the 48-pixel content inset. The 390-pixel headline stayed within 20-pixel insets. The 320-pixel headline stayed within 16-pixel insets.

## Focused region evidence

- Typography: computed desktop headline style was Syne at weight 800. Instrument Sans rendered supporting copy and controls.
- Headline fit: measured each headline fragment at desktop, 390 pixels, and 320 pixels after fixes. No fragment exceeded its content frame.
- Media: desktop selected `Hero scroll preview_ widescreen 16x9.webm`; mobile selected `Hero background loop_ 5s 9x16.webm`. Both reached ready state 4 and played.
- Video lifecycle: scrolling the Hero offscreen paused video playback; returning to the top resumed playback.
- Conversion path: `Discuss Your Project` navigated to `/contact`, where the contact-page heading rendered.
- Console: no runtime errors. One pre-existing Next.js smooth-scroll migration warning remained outside the approved Hero scope.

## Required fidelity surfaces

- Fonts and typography: passed. Syne 800 provides the bold display treatment; Instrument Sans keeps secondary content calm and readable. Responsive line grouping changes from two desktop lines to four mobile lines without changing copy.
- Spacing and layout rhythm: passed. Capability rail, headline, supporting sentence, and CTA form one centered stack. Desktop and mobile spacing remain proportional to viewport height.
- Colors and visual tokens: passed. Hero uses `#f25623`, `#171717`, and warm cream `#f4efe6`. No purple or blue gradient appears in the Hero.
- Image quality and asset fidelity: passed. Supplied WebM, MP4, and WebP files are used directly. No CSS-drawn replacement or generated placeholder was introduced.
- Copy and content: passed. Public copy is minimal and contains no invented metrics, logos, clients, certifications, or testimonials.

## Comparison history

1. Desktop pass found a P1 typography mismatch: global styles overrode Syne with Pontano at weight 500. Increased module selector specificity restored Syne 800.
2. Desktop pass found P1 headline clipping after the bold font loaded. Reduced the fluid desktop type scale and rechecked the 1440-pixel frame.
3. Mobile pass found P1 horizontal overflow caused by max-content headline sizing. Constrained the grid and copy width, then split the approved headline into responsive fragments.
4. Narrow-mobile pass found P2 overflow from the 350-pixel override. Removed that override and rechecked at 320 × 700.
5. Final desktop and mobile captures showed no actionable P0, P1, or P2 differences.
6. October 16 refinement addressed the headline occupying too much horizontal space. Desktop type changed from `6.45vw` to `5.75vw` with an `82rem` cap; mobile changed from `9.4vw` to `8.6vw` with an `18rem` cap; short landscape changed from `8vw` to `7vw`.

## October 16 headline-width refinement

- Rechecked in the in-app browser at effective CSS viewports of 1600 × 1000, 781 × 668, 434 × 938, and 355 × 778.
- Desktop headline rendered at 92 pixels inside a 1312-pixel frame, leaving clear side breathing without changing Syne, weight, copy, or line grouping.
- The fluid desktop minimum was reduced from `3.75rem` to `3rem`; at the 781-pixel transition width the headline rendered at 48 pixels and remained fully visible.
- Mobile headline stayed inside its 288-pixel frame at both checked widths and retained the approved four-line grouping.
- No horizontal overflow appeared at any checked viewport. The Hero animation, CTA, navbar, and loader were not changed.

## Findings

No actionable P0, P1, or P2 findings remain.

## Navbar Design QA — October 16

### Comparison target

- Source visual truth: `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-16 230107.png` (1893 × 130 pixels).
- User-approved adaptation: preserve the source's left wordmark, centered navigation, and right contact action, but use a fully transparent state over the Hero and a translucent cream glass state after scrolling.
- Implementation: `http://localhost:3001/`.
- Implementation screenshots: inline Codex in-app browser captures; the browser API did not expose filesystem paths.
- Desktop viewport: 1440 × 900 CSS pixels. Mobile viewport: 390 × 844 CSS pixels.

### Full-view comparison evidence

- Desktop composition matches the reference structure: large wordmark aligned left, six existing routes centered independently, and `Contact us ↗` aligned right.
- At the top of the page the computed navbar background was fully transparent, its position was fixed, and its text used warm cream over the Hero.
- After scrolling 720 pixels, the computed background was `rgb(244 239 230 / 76%)`, backdrop blur was 18 pixels, text changed to `#171717`, and the sticky glass surface remained readable.
- No horizontal overflow appeared: document scroll width equaled client width at desktop and mobile viewports.

### Focused region evidence

- Typography: Instrument Sans carries navigation and CTA copy; the larger BracketDex wordmark uses the same family with tighter tracking and orange brackets.
- Interaction: route underline and contact-arrow motion use the approved orange accent. Keyboard focus is clearly outlined in orange, and reduced-motion preferences remove transitions.
- Mobile: the top state remained transparent at 390 pixels, the menu expanded into a cream glass panel with all six routes and contact action visible, and Escape returned focus to the collapsed Menu control.
- Scroll trigger: an Intersection Observer switches the navbar state; a passive scroll fallback covers browsers without observer support.
- Console: no runtime errors or warnings appeared during navbar state checks.

### Required fidelity surfaces

- Fonts and typography: passed. Weight, scale, line height, and tracking preserve the reference's restrained navigation hierarchy.
- Spacing and layout rhythm: passed. Desktop uses three balanced grid tracks; mobile maintains 44-pixel minimum controls and consistent separators.
- Colors and visual tokens: passed. Only `#f25623`, `#171717`, and `#f4efe6` are used for the navbar system.
- Image quality and asset fidelity: passed. The reference contains no required raster asset; the existing BracketDex text wordmark is preserved rather than copying the reference brand.
- Copy and content: passed. Existing routes remain reachable and the contact label uses the approved wording.

### Navbar comparison history

1. The source supplied the composition and spacing target.
2. The approved brief intentionally replaced the source's always-solid surface with transparent-over-Hero and glass-on-scroll states.
3. Desktop, mobile, open-menu, Escape-dismissal, and scrolled states showed no actionable P0, P1, or P2 differences.

## Problem/Solution and capability-strip Design QA — October 17

### Comparison target

- Source visual truth: `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-16 234431.png` (1309 × 577 pixels).
- User-approved adaptation: retain the reference's dark canvas, compact card typography, right-side circular controls, horizontal card progression, and one large focal element per card while using BracketDex's documented problems and solutions.
- Implementation: `http://localhost:3001/#problems`.
- Desktop screenshot: `C:\Users\pawan\.codex\visualizations\2026\10\11\01a12bbf-c6f3-7393-8711-846b43e8b55a\problem-solution-desktop.png`.
- Mobile screenshots: `C:\Users\pawan\.codex\visualizations\2026\10\11\01a12bbf-c6f3-7393-8711-846b43e8b55a\problem-solution-mobile.png` and `problem-solution-mobile-section.png` in the same folder.
- Checked viewports: 1440 × 900 and 390 × 844 CSS pixels.

### Full-view comparison evidence

- The section follows the reference hierarchy: restrained eyebrow, section heading, circular previous/next controls, and a horizontal rail of large rounded cards on `#171717`.
- Card copy is tightly spaced at the top. Each card uses an oversized documented solution title as the focal element instead of copying the reference's third-party brand illustrations.
- The approved capability strip directly precedes the section and uses four documented capabilities rather than placeholder trust metrics.
- Desktop now renders four cards in the horizontal rail. A basic interaction check moved the rail 415 pixels and surfaced the new Cloud & DevOps card without page-level overflow.
- Mobile measured 335 × 384 pixel cards in a 335-pixel viewport rail. The first card is complete and readable, while the next card is reached by swipe or the arrow control.
- Document scroll width equaled client width at both viewports, so the carousel creates no page-level horizontal overflow.

### Focused interaction and accessibility evidence

- Desktop Next moved the rail from 0 to 32 pixels, disabled Next at the end, and enabled Previous. Mobile Next moved from 0 to 351 pixels; Previous returned it to 0.
- On a fresh mobile load, only the first card was revealed. Advancing the rail revealed the second card through the section's Intersection Observer.
- Controls have explicit accessible labels, disabled states, orange keyboard focus, and reduced-motion fallbacks. Native horizontal scrolling remains available for touch input.
- The browser console reported no warnings or errors during desktop, mobile, and interaction checks.
- Public content comes from the existing marketing content model. No client names, logos, statistics, certifications, testimonials, or case-study claims were invented.

### Required fidelity surfaces

- Typography and hierarchy: passed. Compact problem copy supports the oversized solution title without competing with it.
- Spacing and rhythm: passed. Card insets and list gaps remain narrow, and the section breathes around the horizontal rail.
- Colors: passed. The implementation uses `#f25623`, `#171717`, warm cream, and a restrained neutral card; no purple or blue gradient appears.
- Responsive behavior: passed. The rail is mouse-, keyboard-, and touch-compatible with no page overflow at the checked viewports.
- Reference fidelity: passed. Layout and interaction language follow the supplied reference while BracketDex content and visual identity remain original.

### Findings

No actionable P0, P1, or P2 findings remain for this section.

## Project showcase Design QA — October 18

### Comparison target

- Source visual truth: `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-17 235420.png` (890 × 707 pixels).
- User-approved adaptation: left-aligned minimal heading, 3 × 2 desktop grid, three compact content rows per card, category labels, orange hover feedback, and two closing actions.
- Implementation: `http://localhost:3001/#projects`.
- Checked viewports: current desktop browser viewport and 390 × 844 CSS pixels.

### Basic verification evidence

- Desktop renders six documented projects in three columns and two rows. Tablet and mobile rules reduce the layout to two and one columns respectively.
- Mobile shows one complete card per row with readable category, system, and value content; links retain 44-pixel touch targets.
- Heading alignment, square card geometry, narrow row spacing, cream surface, charcoal borders, and orange hover treatment follow the approved adaptation.
- The first desktop check exposed an older global two-column override. The local component rule now wins at desktop while retaining the approved tablet and mobile breakpoints.
- The browser console reported no errors. The focused showcase contract test and TypeScript check passed.
- Hero, navbar, and loader files were not changed.

### Findings

No actionable P0, P1, or P2 findings remain for the project showcase.

## Follow-up polish

- P3: add Next.js `data-scroll-behavior="smooth"` migration metadata when global layout work is approved. This warning predates and sits outside the Hero slice.

## Conversion section Design QA — October 20

### Comparison target

- Source visual truth: `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-20 222458.png` (882 × 665 pixels).
- Approved adaptation: preserve the reference's centered conversion hierarchy, solid dark surface, restrained orange action, and compact supporting copy while retaining the existing BracketDex enquiry form.
- Intended preview: `http://localhost:3001/#contact`.

### Implementation evidence

- The section uses a solid charcoal surface. No image, gradient, decorative blob, or copied brand asset appears in the background.
- Existing form validation and submission behavior remain unchanged. The form now accepts a presentation class for the conversion layout.
- Desktop and mobile use one centered content column. Form fields remain left-aligned for scanability and retain 44-pixel controls.
- Orange is reserved for the eyebrow, focus states, direct-email underline, and primary form action.
- Focused conversion contract test and TypeScript check passed after this refinement.

### Blocker

- The local Next.js server started successfully on port 3001, but the in-app browser returned connection timeouts for both `localhost` and `127.0.0.1`.
- No same-viewport prototype screenshot could be captured. Visual comparison and interaction checks remain blocked.

### Findings

No code-level blocker found. Visual QA remains blocked until the local preview is reachable in the browser.

## Footer Design QA — October 20

### Comparison target

- Source visual truth: `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-03 215529.png` (1125 × 458 pixels).
- Approved adaptation: dark rounded panel, essential links at top left, verified contact details at top right, oversized BracketDex watermark, and restrained orange illumination.
- Intended preview: `http://localhost:3001/#contact`.

### Implementation evidence

- Footer exposes only Home, Projects, Solutions, Contact us, and Privacy policy.
- Contact content uses the documented email, phone number, and Pune location. No social profiles were invented.
- Oversized BracketDex watermark uses text, color, shadow, and the existing logo font. No background image or gradient was added.
- Desktop uses the reference's two-sided top layout. Mobile stacks navigation and contact details with 44-pixel link targets.
- Orange underline, contact-arrow movement, visible keyboard focus, and reduced-motion handling are included.
- Focused footer contract test and TypeScript check passed.
- Follow-up correction replaced content-width `right`/transform positioning with a full-panel flex anchor, keeping the watermark centered along the card bottom at every breakpoint.

### Blocker

- Browser visual comparison was not repeated because the approved QA scope requested basic verification unless an inconsistency appeared.
- Same-viewport visual fidelity remains unverified.

### Findings

No code-level blocker found. Visual QA remains blocked pending browser comparison.

## Final result

final result: blocked

## Footer spacing refinement — October 22

- Removed the desktop and mobile panel minimum heights. The panel now follows its content, with the centered watermark in normal flow as the final grid row.
- Reduced top padding, link spacing, and copyright-strip spacing. Mobile navigation uses two columns while preserving 44-pixel link targets.
- Retained the existing watermark size, orange illumination, contact content, focus states, and reduced-motion handling.
- Basic verification: the existing focused footer test passed (1/1), and `git diff --check` passed. Browser appearance was not verified for this refinement.

## Services bento — October 22

- Source: `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-22 104247.png` (1001 × 701). The supplied image defines the five-card arrangement, rounded dark surfaces, compact copy, and large visual areas.
- Implemented one small and one double-width card in the desktop first row, with three equal cards below. Tablet uses two columns; mobile uses one.
- Content uses all five documented services. Cloud & DevOps and Digital Growth are the two additions to this section; no new service offerings or technology claims were invented.
- Typography reuses the current body font. Colors adapt the reference to charcoal, cream text, and orange accents. Custom SVGs follow the user's explicit request for animated vector artwork rather than raster assets.
- GSAP controls layered cursor response, scroll parallax, and ambient SVG animation. IntersectionObserver and document visibility pause ambient animation when it is not visible. A section control and reduced-motion preference disable motion. Motion supplies button feedback; the existing Lenis provider remains in use.
- Basic checks: TypeScript passed; `git diff --check` passed. The existing services render test was updated for five cards and documented content, but execution was blocked by localhost access (`EACCES`, then `ETIMEDOUT` after escalation).
- Browser capture: unavailable. The in-app browser timed out connecting to `http://127.0.0.1:3001/#services`; its resulting error page was blocked by browser URL policy. No alternate browser or policy workaround was attempted.
- Visual comparison, mobile screenshots, cursor behavior, pause/resume, and runtime console checks remain unverified. No pixel-fidelity claim is made.

### Follow-up annotation

- Removed the motion toggle and the caption below the cards as requested. Removed their unused styles, toggle state, and reserved heading space.
- Cursor response, scroll parallax, ambient animation, offscreen pausing, and reduced-motion support remain in place.

final result: blocked
