# BracketDex Mobile-First Full-Site Redesign

**Date:** 2026-10-10

**Status:** Proposed specification for user review

**Direction approved:** Mobile-first systems editorial, with the current documented projects and contact details retained.

## 1. Outcome and authority

Redesign the visual interface of the BracketDex marketing site across the homepage and existing static pages. The site should feel like a credible software and AI partner: clear enough to scan on a phone, distinctive enough to remember, and interactive where motion explains a system or rewards an action.

The user's latest request brings the hero and navbar into scope, replaces the previous font pair with **Stint Ultra Expanded** and **Pontano Sans**, and requests interactive SVG and GSAP motion. These decisions supersede the earlier frozen-hero/navbar and no-parallax rules. The earlier problem-to-solution-to-proof-to-action sequence, documented-content rule, and avoidance of fabricated proof remain in force. The user confirmed that the current documented project cards and contact details should be kept rather than reverting to empty placeholders or older details.

Project-specific files named by the `bracketdex-site` skill (`AGENT_RULES.md`, `BRAND.md`, `CONTENT.md`, `# DESIGN.md`, `COMPONENTS.md`, `TECHSTACK.md`, `ASSETS.md`, `PROJECTS.md`, and `SEO.md`) are not present in this checkout. This specification therefore uses the current repository's `AGENTS.md`, `src/content/marketing.ts`, `src/content/pages.ts`, `src/content/case-studies.ts`, `src/lib/site.ts`, `docs/case-study-sources.md`, and the user's requests as the available source of truth. The font archives' README and OFL files provide font and license information, not instructions for the project.

The older visual records in `docs/editorial-design.md`, `docs/color-direction.md`, and the July post-hero specification describe earlier states. Preserve their factual content constraints where still applicable, but use this approved direction for new visual decisions. Preserve the launch behavior listed in `docs/launch-readiness.md`.

## 2. Reference study and adaptation

The three references supply design patterns, not BracketDex content, fonts, code, images, logos, or claims.

| Reference | Observed pattern | BracketDex adaptation | Boundary |
| --- | --- | --- | --- |
| [Athreix](https://www.athreix.com/) | Spacious editorial canvas; technical registration lines around oversized type; compact numbered principle rows; decisive light-to-dark transition; sticky copy beside changing diagram cards; compact portfolio taxonomy. | Give the hero a constructed inline-SVG system illustration. Use numbered service chapters, hairline separators, and a sticky desktop diagram only where it clarifies the service story. Use text-first category and capability rows. | Do not copy Athreix's lettering, client/affiliate logos, photos, wording, or exact interactions. |
| [Callstack](https://www.callstack.com/) | Dark high-contrast hero with two clear actions; large side-by-side service panels; light reset for case studies; spacious cards with category, headline, and a bottom evidence row; concentrated closing CTA. | Use a dark hero and dark service chapters, then a warm-light projects reset. Project cards show documented category, summary, and benefit in place of unsupported metrics. Keep final CTA as one BracketDex-blue block. | No borrowed metrics, testimonials, client logos, images, glow asset, or case-study claims. |
| [Navbar Digital](https://navbardigital.com/) | Indexed page content shows a scroll invitation, oversized headline, numbered service list, process section, work section, and direct CTA. A [third-party homepage screenshot](https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2026/06/6a39d13511eb1100458214.png) shows compact navigation and strong headline contrast. The live site returned HTTP 403 during visual inspection. | Use clear scroll pacing, compact mobile navigation, numbered service labels, and a single visible primary action. Scroll expansion appears in system visuals, not in essential text. | Do not adopt its lime palette, repeated marquee, claims, or unverified animation details. The screenshot is secondary evidence, not a live mobile audit. |

The selected blend is neither a light copy of Athreix nor a full-screen motion copy of Callstack or Navbar Digital. BracketDex retains its own cobalt identity and documented business story.

### Section-level reference map

| BracketDex block | Reference cue | Original BracketDex treatment |
| --- | --- | --- |
| Navbar | Athreix's hairline header and Navbar Digital's compact primary action | Small persistent wordmark, fewer visible desktop links, a clear Contact action, and a full-width mobile menu with real touch targets. |
| Hero | Athreix's constructed typography, Callstack's dark contrast, and Navbar Digital's oversized headline pacing | One documented statement with a responsive SVG system map. Blue provides the only accent. |
| Trust and problem groups | Athreix's airy affiliation spacing and numbered principle row | Text-only trust labels and three numbered challenge cards, without borrowed logos or counts. |
| Service chapters | Callstack's large service panels and Athreix's sticky copy/visual pairing | Three alternating story-and-diagram chapters; sticky visual only on wide desktop, never on mobile. |
| Cloud strip | Athreix's fine technical geometry and Callstack's engineering tone | A short infrastructure diagram using only documented Cloud and DevOps items. |
| Process | Navbar Digital's numbered approach and Athreix's ordered rail | Seven documented steps, horizontal only where each step remains legible. |
| Capabilities and industries | Athreix's portfolio taxonomy | Category rows plus nine text-first industry cards; no images or extra technology logos. |
| Why BracketDex | Athreix's compact principles and Callstack's restrained dark panels | Seven readable evidence cards using existing `whyChooseUs` text. |
| Projects | Callstack's light case-study reset and Athreix's numbered cards | Current documented projects with category, name, summary, and benefit; no invented metrics or media. |
| FAQ and CTA | Athreix's simple answer hierarchy and Callstack/Navbar Digital's focused contact moment | Five accessible answers, then one solid-blue action block. |

## 3. Visual system

### Color and surfaces

- Dark hero and systems chapters: charcoal `#111318`, raised surface `#1a1d24`, border `#30343e`, primary text `#f6f5f0`, muted text `#b5bac4`, signal blue `#5b9dff`.
- Light reading sections: warm canvas `#f6f5f0`, card `#ffffff`, ink `#15171c`, muted text `#5d626b`, border `#dcdedb`, action blue `#1455d9`.
- CTA: solid `#1455d9` with accessible white text. Do not use a site-wide gradient, neon lime, stock-photo wash, frosted-glass card, or multiple accent colors.
- Preserve the current theme preference control, but restyle it within the same token system. Neither theme may hide content or depend on a particular starting preference.

### Typography and geometry

- Bundle the original `StintUltraExpanded-Regular.ttf` and `PontanoSans-VariableFont_wght.ttf` from the user-provided ZIP archives with their respective SIL OFL notices. Load them locally; do not call Google Fonts at runtime.
- Use Stint Ultra Expanded for selected display phrases: the opening hero phrase, three service chapter names, and final CTA. Use Pontano Sans for the remainder of the hero headline, long H2 text, body copy, cards, navigation, form fields, and wordmark. Keep a system monospace stack for small technical labels and code-like diagrams. No other current font family remains active in site UI.
- Do not change marketing wording solely to make the display font fit. Split existing strings into styled spans where useful. At 320px and 390px, shrink and reflow the Stint phrases before reducing body readability.
- Content shell max-width: 75rem. Reading text max-width: 48rem; body paragraphs generally max-width: 34rem. Mobile side margin: 1.25rem. Section vertical padding: `clamp(4rem, 7vw, 6rem)` with smaller mobile exceptions only where required.
- Headings stay left aligned outside the centered hero statement and final CTA. Eyebrows sit above H2 in uppercase monospace at 0.68–0.74rem. Cards use 8–12px radii and 0.75–1rem gaps. Dark cards remain on dark sections; light cards remain on light sections.

## 4. Homepage structure

The homepage follows one path: problem, solution, proof, action. Existing routes and navigation destinations remain intact.

1. **Navbar and hero.** Redesign both. Hero keeps the documented headline, subheadline, and two actions from `marketingContent.homepage.hero`. An inline-SVG system illustration represents the relationship between software, AI, automation, and cloud without pretending to be a client product. Desktop layout is copy left, illustration right. Mobile stacks copy, actions, and a smaller illustration in that order. At 390×844, the primary action must appear before the first scroll; shorter viewports may scroll naturally without overlap.
2. **Trust strip.** Five labels from `homepage.trustMetricPlaceholders` appear as a static text row or wrapped mobile list, with no fabricated numbers. Do not copy partner-logo treatment from the references. Remove the current moving technology marquee from this location.
3. **Problem groups.** Three cards for startup, business, and enterprise challenges from `homepage.problemGroups`. Three columns desktop; one column at phone widths. Cards contain only the documented challenges and a small system cue, not decorative stock imagery.
4. **Service chapters.** Exactly three numbered chapters: Software Development, AI Solutions, and Business Automation. Reuse `buildPostHeroContent` and documented service/solution strings. Alternate copy and diagram on desktop; keep copy before diagram on mobile. Each chapter has one explanatory SVG system diagram and links below its capability list. Digital Growth remains available on the Services page rather than becoming a fourth homepage chapter.
5. **Cloud and DevOps strip.** A compact infrastructure bridge using only the Cloud and DevOps groups from `technologyStack`. An inline SVG combines topology and terminal-like structural cues. No fake deployment log, health data, uptime figure, URL, or live status.
6. **Process rail.** Show all seven documented steps from `marketingContent.process`, not the current three-step compact substitute. Desktop rail is horizontal. Mobile rail is vertical with a visible sequence and no horizontal scrolling.
7. **Capability index.** A two-column introduction puts Technologies left and Industries right. The documented technology rows follow on the left; all nine industry cards receive a full-width 3-by-3 desktop grid below so their descriptions can remain legible. The industry grid collapses to two then one column as space requires. Never shrink description text or truncate it solely to force one line. Every description remains visible without hover.
8. **Why BracketDex.** Seven compact cards from `whyChooseUs`, arranged 4+3 on wide desktop and stacked responsively. No CTA inside the cards.
9. **Projects.** Keep the current documented featured project cards on the homepage and all documented project cards on `/projects`. Use a light-section reset inspired by Callstack's project pacing, but use text, category, and documented benefit instead of borrowed images or unsupported metrics. Do not invent screenshots. If real screenshots arrive later, allow one 16:9 lazy-loaded image per project with a client/outcome alt description.
10. **FAQ.** Five items from `marketingContent.faqs`, first open by default. Use accessible buttons and readable static content if JavaScript fails.
11. **Final CTA and footer.** Use `marketingContent.ctas[2]` in one solid blue block, then the shared Footer. One clear route to `/contact`; no extra urgency or unsupported claim.

## 5. Static page system

Keep `/services`, `/solutions`, `/industries`, `/projects`, `/about`, `/faq`, `/contact`, `/privacy`, and existing utility routes. `src/content/pages.ts` remains the source for static-page copy, and `src/content/case-studies.ts` remains the source for project cards. Reuse the same section heading, card, capability, FAQ, CTA, and diagram primitives rather than building separate page-specific visual languages.

- Static page heroes use a compact variation of the homepage typography and linework, not a second large 3D or WebGL scene.
- Services and Solutions reuse the chapter and outcome-card grammar. Industries uses the nine-card system. Projects uses the documented text-first cards. About uses mission/values content already present in `pages.ts` without adding proof claims.
- Contact retains the current verified details from `src/lib/site.ts`. Place explanation on the left and form on the right at desktop widths; place explanation before form on mobile. Provide a working `#contact-form` anchor. Preserve current form behavior, validation, and route.
- FAQ remains a dedicated page as well as a homepage block. Shared FAQ behavior must remain keyboard and screen-reader operable.
- The current theme control remains reachable and does not cover a mobile CTA, form field, or menu trigger.
- Preserve existing metadata, canonical URLs, JSON-LD, sitemap, robots rules, 404/thank-you behavior, analytics consent, and the privacy route. Visual redesign must not turn on analytics without consent or change contact-form delivery behavior.

## 6. Motion allocation

Each motion effect has a defined location and a static fallback. Animation never supplies information absent from the HTML or SVG.

| Requested effect | Location and behavior | Mobile and reduced-motion behavior |
| --- | --- | --- |
| Interactive hero illustration | Inline SVG flow nodes and connecting paths. A node responds to pointer proximity; focus and tap show the same label or emphasis. | Touch uses tap/focus states. Reduced motion shows the complete SVG. |
| Cursor-reactive SVG | Hero, one service diagram at a time, and Cloud topology. Limit pointer displacement to 8–12px and keep text stationary. | No simulated cursor on touch. Nodes remain visible and tappable. |
| SVG parallax | Two or three decorative SVG layers within the hero and selected service/Cloud visuals. Use transform-only movement; no content text parallax. | Disable scroll parallax on coarse pointers and under reduced motion. |
| Scroll expand | A reserved-aspect-ratio diagram frame scales from approximately 0.94 to 1 when its chapter enters. No width/height animation or layout shift. | Smaller one-time scale or immediate full-size presentation. |
| Mouse tracking and GSAP mouse parallax | One scoped pointer handler per active visual uses normalized coordinates and GSAP quick setters. Only fine-pointer devices register listeners. | No pointer listeners. Native touch scrolling remains untouched. |
| Floating UI | A small illustrative system label within the hero and one chapter gently floats only while visible. It does not cover copy or act as a fake dashboard. | Static position on touch or reduced motion; stop when offscreen or tab hidden. |
| Motion hover physics | Service links, project cards, and CTA controls receive small translate/tilt or spring-back cues. Keyboard focus receives an equally clear non-motion state. | Tap feedback uses color/border; no hover-only information. |

GSAP ScrollTrigger handles one-time section reveals (`y: 24px`, opacity, approximately 0.6s, `expo.out`) and 0.08s grid stagger. A small desktop-only scrub is permitted for decorative SVG parallax, never essential text. Diagrams draw once on enter. Use `useGSAP` with a component root scope; revert the GSAP context and remove pointer, visibility, and media-query listeners on unmount. Do not run competing global reveal systems on the same elements. FAQ height transition remains the only layout-height animation.

The current four-second blocking `SiteLoader` should be removed. The hero provides the brand introduction without delaying mobile access. Keep smooth scrolling only where it does not override native touch behavior; no scroll hijack, pinned mobile section, autoplay marquee, or full-page transition gate.

## 7. Component and code boundaries

Retain server rendering for content and hydrate only interactive visual, menu, theme, form, and FAQ boundaries. No new framework or runtime art dependency is required. The current `three` hero renderer is replaced by inline SVG; no 3D runtime is needed for the new direction.

Suggested responsibilities:

```text
RootLayout: font variables, shared theme, global accessibility shell
Navbar: responsive route navigation and primary action
HomePage: section composition only
HeroSystemIllustration: pointer/touch-reactive SVG
TrustStrip / ProblemCard: documented labels and challenges
ChapterBlock + SystemVisual: one service chapter and its explanatory diagram
CloudPanel: Cloud and DevOps-only infrastructure strip
ProcessRail: seven documented steps
CapabilityRow + IndustryCard: stack and industry index
ProofCard: one why-choose-us statement
ProjectCard: one documented case study, no invented media
FaqSection / CtaSection / Footer: shared closing blocks
StaticMarketingPage: page composition from pages.ts, not a giant markup component
```

Consolidate overlapping declarations in `globals.css`, `editorial.css`, `premium.css`, `typography.css`, `light-theme.css`, and `scroll-pages.css` as part of the redesign. Do not layer another broad override sheet on top. Remove unused old font imports and CSS declarations after checking references. Keep license notices with the new bundled fonts; do not reuse reference-site commercial font files.

## 8. Responsive and accessibility contract

- Design and test at 320px, 390px, 768px, 1024px, and 1440px, plus a short-height mobile viewport. No document-level horizontal overflow.
- At phone widths, content order remains meaningful without animation: copy before visual, process vertical, cards one column where needed, CTA buttons full width under 420px.
- Navigation menu, theme control, FAQ, cards, and form controls have at least 44px touch targets and visible focus. Hover is never required to read content.
- Maintain one H1 per page, logical H2/H3 order, real links and buttons, SVG summaries where diagrams explain a system, and `aria-hidden` on purely decorative SVG layers.
- Maintain WCAG AA text/control contrast in both themes. `prefers-reduced-motion: reduce` removes parallax, looped float, and reveal transforms; all sections remain visible.
- Fonts use `display: swap`. Hero illustration has a static server-visible SVG structure before client motion starts. Offscreen animation pauses. No PNG photos, stock images, or external SVG files are introduced for the redesign.

## 9. Failure behavior and verification

If JavaScript fails, all copy, links, process steps, project summaries, contact details, and FAQ answers remain available. If SVG animation setup fails, diagrams retain their final static state. If WebGL is unavailable, no fallback is needed because the redesigned hero does not require WebGL.

Implementation is complete only after:

1. `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` pass, with any pre-existing environment issue documented separately.
2. All existing routes render with the new font pair and without current Geist/Manrope/Fraunces/Array/Alpino/Alliance/AvantGarde styling in active site UI.
3. Screenshots at the listed widths show no clipped Stint headline, offscreen CTA, overlapping theme control, tiny diagram label, or horizontal overflow.
4. Desktop fine-pointer, mobile coarse-pointer, keyboard-only, and reduced-motion passes cover hero, chapter diagrams, cards, navigation, FAQ, and contact form.
5. Browser console has no hydration, missing-asset, animation-cleanup, or runtime errors.
6. A content and route diff confirms no fabricated proof and no accidental loss of the currently documented projects, contact details, routes, metadata, consent behavior, or form behavior.
7. Lighthouse checks target scores above 90 for performance, accessibility, best practices, and SEO. Any miss is measured and reported rather than silently accepted.

At the time of this specification, the local development server could not render the existing homepage because `three` is declared in `package.json` but absent from local `node_modules`. This is an environment/dependency state, not evidence that the redesign is complete or broken. Restore dependencies or remove the old runtime import during implementation, then run the visual checks.

## 10. Acceptance decisions captured

- Mobile-first systems editorial direction: approved.
- All three named sites are inspiration sources, not implementation assets: approved direction.
- Hero and navbar are no longer frozen: covered by the user's complete-redesign request and approval of the proposed direction.
- Current documented projects and contact details remain: explicitly confirmed by the user.
- This written specification and its detailed implementation plan still require separate review before product-code changes under the active design workflow.
