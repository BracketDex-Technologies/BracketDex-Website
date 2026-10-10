# BracketDex Mobile-First Full-Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing BracketDex marketing UI as the approved mobile-first systems-editorial site, with the requested font pair and purposeful SVG/GSAP interactions, without changing documented claims or business behavior.

**Architecture:** Keep Next.js App Router content and SEO on the server; use small client islands for navigation, FAQ, theme, form, and scoped motion. Compose the homepage from one block per section and static pages from shared blocks, with CSS isolated by component during the transition and old global layers removed at the end. Use inline SVG system diagrams, not Three.js, stock assets, or a new animation framework.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS, `next/font/local`, GSAP + `@gsap/react` + ScrollTrigger, Lucide, Node built-in test runner.

**Spec:** [2026-10-10-bracketdex-mobile-first-full-redesign-design.md](../specs/2026-10-10-bracketdex-mobile-first-full-redesign-design.md)

## Global Constraints

- `src/content/marketing.ts`, `src/content/pages.ts`, `src/content/case-studies.ts`, and `src/lib/site.ts` remain the copy, project, and contact authorities. Keep current documented projects and contact details; invent no metrics, logos, testimonials, case-study images, deployment logs, or URLs.
- Home sequence after hero: trust (five labels), problems (three groups), service chapters (Software/AI/Automation only), Cloud/DevOps, process (seven steps), technologies and nine industries, seven why cards, documented projects, five FAQs, `ctas[2]` blue CTA, Footer. Keep Digital Growth on `/services`.
- Use only the supplied `StintUltraExpanded-Regular.ttf` and `PontanoSans-VariableFont_wght.ttf` as active site fonts, with local SIL OFL notices; use a system monospace stack for metadata. Preserve the existing theme preference control.
- Dark tokens: `#111318`, `#1a1d24`, `#30343e`, `#f6f5f0`, `#b5bac4`, `#5b9dff`. Light tokens: `#f6f5f0`, `#ffffff`, `#15171c`, `#5d626b`, `#dcdedb`, `#1455d9`. Final CTA is solid `#1455d9`.
- Max shell 75rem, reading width 48rem, typical paragraph 34rem, mobile side margin 1.25rem, section padding `clamp(4rem, 7vw, 6rem)`, card radius 8–12px. Body text remains readable; essential content never requires hover or animation.
- Fine-pointer motion is scoped and transform/opacity-only, except FAQ height. Reduced motion is static; coarse pointers get tap/focus states and native scrolling. Use `useGSAP` with a real DOM-root scope and `ctx.revert()` cleanup. No global competing reveal system, WebGL, site-loading gate, autoplay marquee, pinned mobile scene, or fake live UI.
- Preserve existing routes, metadata, JSON-LD, sitemap, robots, consent, privacy, contact API, form validation, and thank-you behavior. Do not alter analytics activation or contact delivery.
- Verify at 320, 390, 768, 1024, and 1440px plus 320×568; no horizontal overflow, visible focus, ≥44px controls, one H1 per route, and the primary CTA visible before first scroll at 390×844.

## Review Focus

1. **Narrow/short phones and long supplied display font:** 320×568 and 390×844 must keep the headline, primary CTA, menu, and theme control visible without clipping or horizontal scroll (Task 10 viewport checks).
2. **Coarse pointer or reduced motion:** no pointer listener, parallax, floating loop, or hidden-by-reveal content; diagrams still communicate their flow (Task 9 motion checks).
3. **Keyboard-only or tap navigation:** menu, SVG node labels, FAQ, theme switch, links, and form must be operable and visibly focused (Tasks 2, 7, 9 interaction checks).
4. **JavaScript absent or animation setup failing:** copy, links, project proof, contact details, process, and FAQ answers must remain readable (Tasks 7 and 9 no-JS checks).
5. **Invalid contact form or consent not granted:** errors remain associated with fields, no email draft opens on invalid submit, and analytics stays off until consent (Task 8 regression checks).

---

## File and test map

- `tests/site-render.test.mjs`: Node `node:test` HTTP assertions against a running `next dev` server. Start `npm.cmd run dev` separately before running render tests; helper `getHtml(path)` checks status 200 and returns HTML. `loadDataModule(file)` transpiles only the standalone `marketing.ts` or `case-studies.ts` with the installed TypeScript package and imports the resulting data URL, so tests compare rendered strings to source data. `homeKeys(html): string[]` reads top-level `data-home-section` attributes; `homeSection(html, key): string` slices from that block to the next. Each top-level home block emits exactly one key in the approved order. Tests use these keys and documented strings, not styling-class snapshots.
- `src/app/layout.tsx`, `src/app/globals.css`, `src/assets/fonts/{stint-ultra-expanded,pontano-sans}/`: local font setup and shared tokens; preserve theme/SEO shell. Final task retires the five overlapping legacy CSS imports and old font assets only after reference audit.
- `src/components/marketing/navbar.tsx`, `src/components/home/home-page.tsx`, new `src/components/home/hero-system-illustration.tsx`: responsive navigation and server-visible SVG hero. Their co-located `*.module.css` files own new styles. Replace the Array-based `logo-font.ts` references in Navbar and Footer with Pontano.
- `src/components/home/post-hero/post-hero-home.tsx`: composition only. `src/components/home/fresh/*` owns one section each; `src/components/home/post-hero/chapter-block.tsx` owns one chapter; `system-visuals.tsx` owns explanatory SVGs only.
- `src/components/marketing/{section-header,industry-card,project-card,faq-section,cta-section,footer}.tsx`: shared block primitives, each restyled locally. `src/components/pages/{static-marketing-page,static-page-hero,static-page-section,contact-page-section}.tsx`: static route composition without a giant renderer.
- `src/components/motion/site-motion-scope.tsx` and `use-pointer-parallax.ts`: scoped one-time reveal/expand/draw, pointer tracking, hover physics, parallax, and visibility-gated float. Hero motion remains inside its own root.
- `scripts/verify-homepage-boundary.mjs`: delete when hero/nav are rebuilt; its frozen SHA checks directly contradict the approved spec. Change `package.json` `typecheck` to `tsc --noEmit`. Preserve unrelated existing type contracts; update only ones whose visual constants/interfaces intentionally change.

## Execution rules

- Start with `git status --short`; preserve any user changes. Use `npm.cmd ci` only if local dependencies are incomplete, and do not treat the current missing `three` package as a product failure. Do not start product-code changes until this plan is approved.
- For each task: add the named failing assertion to `tests/site-render.test.mjs` (or named compile-time contract where stated), run it and observe the expected failure, implement, rerun focused test plus `npm.cmd run typecheck`, inspect the relevant viewport, then commit only that task's files. If a test is not executable because the environment is unavailable, record that explicitly rather than claiming green.
- Keep the dev server running at `http://localhost:3000` for render tests. Run focused cases with `node --test --test-name-pattern "<name>" tests/site-render.test.mjs`; use `node --test tests/site-render.test.mjs` for the full suite.

### Task 1: Establish local font and render baseline

**Files:** Create `tests/site-render.test.mjs`, `src/assets/fonts/stint-ultra-expanded/{StintUltraExpanded-Regular.ttf,OFL.txt}`, `src/assets/fonts/pontano-sans/{PontanoSans-VariableFont_wght.ttf,OFL.txt}`; modify `src/app/layout.tsx`, `src/app/globals.css`.

**Interfaces:** `getHtml(path: string): Promise<string>` in the test file; CSS variables `--font-display` and `--font-body` on `<body>` from `next/font/local`. Later tasks consume these variables.

- [ ] **Step 1: Write failing test.** `test("local fonts and route baseline", ...)`: `assert.match(await getHtml("/"), /AI that works for the business you’ve built\./)`; `assert.match(await getHtml("/contact"), /Contact BracketDex Technologies/)`; `assert.ok(existsSync("src/assets/fonts/stint-ultra-expanded/StintUltraExpanded-Regular.ttf"))` and likewise for Pontano TTF and both OFL notices; `assert.match(layoutSource, /next\/font\/local/)`, `assert.doesNotMatch(layoutSource, /geist\/font|@fontsource/)`.
- [ ] **Step 2: Run red.** Start dev server and run `node --test --test-name-pattern "local fonts and route baseline" tests/site-render.test.mjs`. Expected: font-file/import assertions fail; if local `three` is still absent, restore lockfile dependencies with `npm.cmd ci` and rerun to reach the intentional red assertion.
- [ ] **Step 3: Implement.** Extract only the original variable Pontano and regular Stint files plus their original OFL notices from the user ZIPs; set `display: "swap"`, Pontano weight range, Stint 400 in `layout.tsx`. Apply body/display tokens in `globals.css`; retain old CSS imports until the replacement styles exist. Do not alter copy or the theme/SEO providers.
- [ ] **Step 4: Run green.** Focused test, `npm.cmd run typecheck`, and homepage/contact render at 390px. Expected: pass, font requests local, no visible fallback-only title after load.
- [ ] **Step 5: Commit.** `git add tests/site-render.test.mjs src/assets/fonts src/app/layout.tsx src/app/globals.css && git commit -m "feat: bundle BracketDex display and body fonts"`.

### Task 2: Redesign navbar and hero with a static-first interactive SVG

**Files:** Modify `src/components/marketing/navbar.tsx`, `src/components/home/home-page.tsx`, `src/components/home/home-page.contract.tsx`, `src/components/marketing/navbar.contract.tsx`, `src/app/layout.tsx`, `package.json`; create `src/components/marketing/navbar.module.css`, `src/components/home/home-hero.module.css`, `src/components/home/hero-system-illustration.tsx`, `src/components/home/hero-system-illustration.module.css`; delete `scripts/verify-homepage-boundary.mjs`. Test `tests/site-render.test.mjs`.

**Interfaces:** `HeroSystemIllustration(): React.JSX.Element` renders an inline `<svg>` with software, AI, automation, and cloud nodes, explicit accessible group label, focusable/tappable nodes, and `data-pointer-layer` on decorative layers. `Navbar` keeps its current props; its visible controls meet 44px minimum.

- [ ] **Step 1: Write failing test.** `test("hero and navigation", ...)`: `assert.equal((home.match(/<h1\b/g) ?? []).length, 1)`; `assert.ok(home.indexOf('href="/contact"') < home.indexOf('<svg'))`; `assert.match(home, /Software|AI|Automation|Cloud/)` within the hero SVG; `assert.doesNotMatch(home, /<canvas\b/)`; assert every `siteNavigation` destination appears in either desktop or mobile menu.
- [ ] **Step 2: Run red.** Run the focused Node test. Expected: SVG and mobile-nav assertions fail on the current WebGL hero.
- [ ] **Step 3: Implement.** Rebuild navbar and hero in the approved dark/blue system. Use Stint for the selected opening phrase, Pontano for remaining headline/body/wordmark, without changing the documented headline. Preserve current `siteNavigation` destinations and theme control, make mobile menu full-width with visible focus, render complete SVG before hydration, and use tap/focus node emphasis without requiring pointer movement. Remove `StructureFlow` and old global hero/nav motion mounts from the active homepage. Delete the SHA guard and set `typecheck` to `tsc --noEmit`; update affected type contracts to assert the new stable interface, not the frozen appearance.
- [ ] **Step 4: Run green.** Focused test and typecheck; at 390×844 confirm primary CTA before scroll, then keyboard-test menu and SVG nodes at 320px and desktop.
- [ ] **Step 5: Commit.** Commit only Task 2 source, CSS, contract, package, and test files: `git commit -m "feat: redesign responsive navigation and hero"`.

### Task 3: Restore the first two documented homepage blocks

**Files:** Modify `src/components/home/post-hero/post-hero-home.tsx`, `src/components/home/fresh/trust-strip.tsx`, `src/components/home/fresh/problem-section.tsx`; create `src/components/home/fresh/{trust-strip,problem-section}.module.css`; test `tests/site-render.test.mjs`.

**Interfaces:** `TrustStrip({content}: {content: MarketingContent})` consumes `homepage.trustMetricPlaceholders[].label` only; `ProblemSection({content})` delegates each group to `ProblemCard({group,index})`. `PostHeroHome` exposes `data-home-section="trust"` followed by `"problems"` before chapters.

- [ ] **Step 1: Write failing test.** `test("trust then problems", ...)`: `assert.deepEqual(homeKeys.slice(0, 2), ["trust", "problems"])`; for each `marketingContent.homepage.trustMetricPlaceholders`, `assert.match(trustHtml, escaped(label))`; for each problem group/challenge, assert it appears in `problemsHtml`; `assert.doesNotMatch(trustHtml, /marquee|\b\d+\+\b/)`.
- [ ] **Step 2: Run red.** Focused Node test. Expected: the homepage currently omits both blocks.
- [ ] **Step 3: Implement.** Add text-only trust row and three `ProblemCard` instances; do not reuse current four-icon trust claims, technology marquee, or non-source introductory sentences. Style single-column phone/three-column desktop and retain dark/light surface discipline.
- [ ] **Step 4: Run green.** Focused test and typecheck; inspect 320, 390, and 1024px for wrapping and no overflow.
- [ ] **Step 5: Commit.** `git commit -m "feat: add documented trust and problem blocks"` after staging Task 3 files.

### Task 4: Replace the service list with three explanatory chapters

**Files:** Modify `src/components/home/post-hero/{post-hero-content.ts,post-hero-content.contract.ts,post-hero-home.tsx,system-visuals.tsx,system-visuals.contract.tsx}`; create `src/components/home/post-hero/chapter-block.tsx`, `chapter-block.module.css`, `system-visuals.module.css`; retire active `src/components/home/fresh/services-section.tsx` use. Test `tests/site-render.test.mjs`.

**Interfaces:** `ChapterBlock({chapter,flipped}: {chapter: PostHeroServiceChapter; flipped: boolean})` consumes the existing `buildPostHeroContent(content).serviceChapters`; `SystemVisual({variant}: {variant: PostHeroVisual})` renders software flow, AI branch, or automation pipeline SVG with `data-diagram-node` and no operational data table.

- [ ] **Step 1: Write failing test.** `test("three service chapters", ...)`: `assert.equal((servicesHtml.match(/data-home-chapter=/g) ?? []).length, 3)`; compare visible titles/descriptions to `marketingContent.services.slice(0, 3)` and documented `marketingContent.solutions` indices `[0,1,4]`, `[2,3,4]`, `[3,4,5]`; `assert.doesNotMatch(servicesHtml, /Digital Growth|run_[a-z0-9]+|exec_[a-z0-9]+|Last run|Latency|Tokens|Cost|2m ago/)`.
- [ ] **Step 2: Run red.** Focused Node test. Expected: current five-service list and invented diagram run data fail.
- [ ] **Step 3: Implement.** Use one `ChapterBlock` per chapter with `data-home-chapter`, Stint for each chapter name and Pontano for explanatory text, copy before visual on mobile, alternating visual side on desktop, links after capability lists. Keep diagrams simple, static SVG/div structures with linework and `aria-hidden` only for decorative paths. Replace old dashboard-like visuals; do not invent copy while fitting typography.
- [ ] **Step 4: Run green.** Focused test and typecheck; inspect 320, 768, and 1440px for readable diagrams and balanced chapter spacing.
- [ ] **Step 5: Commit.** `git commit -m "feat: build three service chapters and system diagrams"` after staging Task 4 files.

### Task 5: Build the Cloud bridge and seven-step process rail

**Files:** Modify `src/components/home/fresh/{cloud-panel,process-rail}.tsx`, `src/components/home/post-hero/{post-hero-home,system-visuals}.tsx`; create `src/components/home/fresh/{cloud-panel,process-rail}.module.css`; test `tests/site-render.test.mjs`.

**Interfaces:** `CloudPanel({content})` filters `TechnologyGroup` to `category === "Cloud" || category === "DevOps"`; `ProcessRail({content})` renders `content.process` with no compact substitute.

- [ ] **Step 1: Write failing test.** `test("cloud then seven process steps", ...)`: `assert.deepEqual(homeKeys.slice(3, 5), ["cloud", "process"])`; assert cloud HTML contains `AWS`, `Azure`, `Google Cloud`, `Docker`, `Kubernetes`, `CI/CD`; `assert.deepEqual(processTitles, ["Discovery", "Planning", "Design", "Development", "Testing", "Deployment", "Support"])`; `assert.doesNotMatch(cloudHtml, /Last updated|Success|Run #/)`.
- [ ] **Step 2: Run red.** Focused Node test. Expected: the compact process renders only three steps.
- [ ] **Step 3: Implement.** Compose Cloud after chapters and process after Cloud. Keep topology descriptive, not a fake live terminal; make seven steps horizontal only when readable and vertical without horizontal scroll on phones.
- [ ] **Step 4: Run green.** Focused test and typecheck; inspect 390, 768, 1024px, including process number/description visibility.
- [ ] **Step 5: Commit.** `git commit -m "feat: add infrastructure bridge and full process rail"` after staging Task 5 files.

### Task 6: Add capability index and seven proof cards

**Files:** Modify `src/components/home/fresh/{capability-index,why-section}.tsx`, `src/components/home/post-hero/post-hero-home.tsx`, `src/components/marketing/industry-card.tsx`; create `src/components/home/fresh/{capability-index,why-section}.module.css`; test `tests/site-render.test.mjs`.

**Interfaces:** `CapabilityRow({group}: {group: TechnologyGroup})` prints the documented category/items. `IndustryCard` keeps `title` and `description` props; `ProofCard({item}: {item: FeatureItem})` prints one `whyChooseUs` entry.

- [ ] **Step 1: Write failing test.** `test("capabilities industries and proof", ...)`: `assert.deepEqual(homeKeys.slice(5, 7), ["capabilities", "why"])`; for every `marketingContent.technologyStack`, `industries`, and `whyChooseUs` entry, `assert.ok(respectiveBlock.includes(entry.title ?? entry.category))` and assert its items/description; count `data-industry-card` as 9 and `data-proof-card` as 7.
- [ ] **Step 2: Run red.** Focused Node test. Expected: capability and why blocks are absent from the homepage.
- [ ] **Step 3: Implement.** Two-column technologies/industries introduction, then full-width 3×3 industry card grid; 4+3 proof grid on wide desktop. Add `data-industry-card` and `data-proof-card` to the respective cards for stable render checks. No truncation, images, card CTA, or extra tech logos. Phone cards stack with hover-independent descriptions.
- [ ] **Step 4: Run green.** Focused test and typecheck; inspect 320, 768, 1024, 1440px for text measure and equal-height grid behavior.
- [ ] **Step 5: Commit.** `git commit -m "feat: add capability and proof sections"` after staging Task 6 files.

### Task 7: Finish the homepage proof-to-action path

**Files:** Modify `src/components/home/fresh/{projects-section,cta-section}.tsx`, `src/components/home/post-hero/post-hero-home.tsx`, `src/components/marketing/{project-card,faq-section,cta-section,footer,section-header}.tsx`; create co-located CSS modules for changed shared blocks; test `tests/site-render.test.mjs` and `src/components/marketing/{faq-section,components}.contract.tsx`.

**Interfaces:** `ProjectCard` receives one documented `CaseStudy` (derive `type CaseStudy = (typeof caseStudies)[number]`) and prints category, name, summary, benefit; homepage uses `featuredCaseStudies`, `/projects` uses `caseStudies`. `FaqSection({items,defaultOpenFirst})` retains its existing public signature. Final `FreshCta({content})` uses `content.ctas[2]` and one `/contact` action.

- [ ] **Step 1: Write failing test.** `test("projects FAQ and final action", ...)`: `assert.deepEqual(homeKeys.slice(7), ["projects", "faq", "cta"])`; for each of `featuredCaseStudies`, assert name and benefit in projects block; `assert.equal((faqHtml.match(/data-faq-item=/g) ?? []).length, 5)`; `assert.match(faqHtml, /aria-expanded="true"/)`; `assert.ok(ctaHtml.includes(marketingContent.ctas[2]))`; `assert.doesNotMatch(projectsHtml, /20\+ projects delivered/)`.
- [ ] **Step 2: Run red.** Focused Node test. Expected: homepage FAQ is absent and current project count label remains.
- [ ] **Step 3: Implement.** Restyle project cards as text-first light proof with `data-project-card`, reuse shared `ProjectCard` on both routes, FAQ first open with `data-faq-item` and existing `noscript` fallback, solid-blue closing CTA with selected Stint phrase, then Footer. Replace Footer's Array `logoFont` with Pontano. Keep project descriptions and benefits verbatim, and keep all links/focus states readable.
- [ ] **Step 4: Run green.** Focused test and typecheck; keyboard-test FAQ opening/closing and no-JS FAQ answers; inspect mobile CTA button full-width under 420px.
- [ ] **Step 5: Commit.** `git commit -m "feat: complete homepage proof and CTA"` after staging Task 7 files.

### Task 8: Recompose static pages from the same visual blocks

**Files:** Modify `src/components/pages/static-marketing-page.tsx`, `src/components/marketing/contact-form.tsx`, `src/components/home/fresh/projects-section.tsx`; create `src/components/pages/{static-page-hero,static-page-section,contact-page-section}.tsx` with corresponding CSS modules; test `tests/site-render.test.mjs`.

**Interfaces:** `StaticPageHero({content}: {content: StaticPageContent})`, `StaticPageSection({section,index}: {section: PageSection; index: number})`, `ContactPageSection({content}: {content: StaticPageContent})`. The latter renders `ContactForm` inside `id="contact-form"`; `StaticMarketingPage` stays the route composer.

- [ ] **Step 1: Write failing test.** `test("static route content and contact anchor", ...)`: for each of `/services`, `/solutions`, `/industries`, `/projects`, `/about`, `/faq`, `/contact`, `/privacy`, `assert.equal((html.match(/<h1\b/g) ?? []).length, 1)` and assert its existing `pages.ts` title; `assert.equal((projectsHtml.match(/data-project-card=/g) ?? []).length, 15)` and assert each `caseStudies[].name`; `assert.match(contactHtml, /id="contact-form"/)` and assert current `contactDetails` values.
- [ ] **Step 2: Run red.** Focused Node test. Expected: contact anchor and compact shared hero fail.
- [ ] **Step 3: Implement.** Split the monolithic renderer into named blocks without changing `pages.ts`, route names, form schema, API, consent, or metadata. Services/Solutions use the chapter/card grammar, Industries the same nine industry cards, Projects all documented cards, About its existing values, Contact explanation-left/form-right on desktop and explanation-first on mobile. Keep theme control clear of form and menu.
- [ ] **Step 4: Run green.** Focused test and typecheck; submit invalid values and verify field errors/no mailto navigation, then inspect contact at 320 and 1024px. Check analytics remains consent-gated. `git diff -- src/app/api/contact/route.ts src/lib/seo.ts src/app/robots.ts src/app/sitemap.ts` must show no behavioral changes.
- [ ] **Step 5: Commit.** `git commit -m "feat: apply shared redesign to static routes"` after staging Task 8 files.

### Task 9: Add scoped, optional motion after static layout works

**Files:** Create `src/components/motion/{site-motion-scope,use-pointer-parallax}.tsx`; modify `src/components/home/{home-page,hero-system-illustration}.tsx`, `src/components/home/post-hero/{post-hero-home,chapter-block}.tsx`, `src/components/pages/static-marketing-page.tsx`, affected CSS modules, `src/app/layout.tsx`; retire active `EditorialMotion`, `ScrollChoreography`, `ProgressiveTextReveal`, and old `PostHeroMotion` mounts. Test `tests/site-render.test.mjs` plus browser interaction checklist below.

**Interfaces:** `SiteMotionScope({children}: {children: React.ReactNode})` owns section reveals, 0.08s card stagger, diagram draw/expand, limited desktop decorative parallax, and visibility-gated float. `usePointerParallax(scope: RefObject<HTMLElement | null>, maxOffset?: number): void` registers only for visible `(hover: hover) and (pointer: fine)` roots without reduced motion; it targets `data-pointer-layer` and resets transforms on leave/unmount.

- [ ] **Step 1: Write failing test.** `test("static motion fallback", ...)`: `assert.match(home, /<svg[\s\S]*?<path/)`; for every documented process title and FAQ answer, `assert.ok(home.includes(text))`; `assert.doesNotMatch(layoutSource, /<SiteLoader|<ProgressiveTextReveal|<SmoothScroll/)`. Record browser checks: no pointer layer movement on coarse pointer or reduced motion; visible focus/tap on SVG nodes; one-time 24px/0.6s `expo.out` reveals; no animation after visual leaves viewport or tab is hidden.
- [ ] **Step 2: Run red.** Focused Node test; expected failure is active loader/global mounts. In a browser, observe the existing competing reveal behavior before replacement.
- [ ] **Step 3: Implement.** Use DOM-root `useGSAP` scopes, `gsap.context(..., root)` with `ctx.revert()` cleanup, `ScrollTrigger` once, GSAP quick setters/`quickTo` for ≤12px pointer offsets, transform-only expansion from ~0.94 to 1, path draw once, and tiny hover translate/tilt with keyboard non-motion focus. Mount pointer response in hero, the visible service diagram, and Cloud; limit decorative SVG parallax to two or three layers, and float one small label in hero and one chapter only while visible. Attach pointer, media-query, intersection, and visibility listeners only when needed; remove all on cleanup. Remove the unused `SmoothScroll` wrapper (its only active use is `layout.tsx`) so native touch scroll stays untouched; reduced motion renders final state immediately.
- [ ] **Step 4: Run green.** Focused test and typecheck. In browser verify desktop pointer, touch emulator, keyboard, reduced motion, no-JS, tab-hidden/offscreen cases, and clean console; confirm no layout shift from scroll expansion.
- [ ] **Step 5: Commit.** `git commit -m "feat: add scoped responsive system motion"` after staging Task 9 files.

### Task 10: Consolidate CSS and prove the full site

**Files:** Modify `src/app/{globals.css,layout.tsx}` and affected CSS modules; delete only confirmed-unused `src/app/{editorial,scroll-pages,premium,typography,light-theme}.css`, old font assets and `src/components/marketing/logo-font.ts`, unused site-loader and legacy motion files/contracts, obsolete WebGL hero files/dependencies (`structure-flow.tsx`, `three`, `@types/three`), and unused `lenis` after `rg` confirms no imports. Modify `package.json`/`package-lock.json` only for removed dependencies. Test `tests/site-render.test.mjs`.

**Interfaces:** No new public API. `globals.css` owns resets, tokens, shared typography/spacing/focus/reduced-motion rules; local CSS modules own components. Existing metadata and server routes stay untouched.

- [ ] **Step 1: Write failing test.** `test("final active surface", ...)`: `assert.deepEqual(homeKeys, ["trust", "problems", "services", "cloud", "process", "capabilities", "why", "projects", "faq", "cta"])`; `assert.doesNotMatch(activeSources, /Array-Regular|Alpino-Variable|Alliance-Regular|AvantGarde|geist\/font|@fontsource|structure-flow|site-loader|editorial\.css|premium\.css/)`; all eight static routes return 200. Add a production route/content snapshot checklist for current project/contact strings, metadata/JSON-LD, robots/sitemap, consent, privacy, 404, and thank-you.
- [ ] **Step 2: Run red.** Focused Node test. Expected: old CSS/font/runtime references remain.
- [ ] **Step 3: Implement.** Consolidate CSS without appending another overriding sheet. Remove files/dependencies only after reference checks; preserve license files for new fonts. Fix any discovered responsive, contrast, focus, overflow, or performance regression at the responsible component rather than hiding it with a global override.
- [ ] **Step 4: Run green.** `node --test tests/site-render.test.mjs`, `npm.cmd run typecheck`, `npm.cmd run build`, `git diff --check`. Inspect screenshots at 320×568, 390×844, 768, 1024, 1440; audit fine/coarse pointer, keyboard, reduced motion, both themes, form, and console. Run Lighthouse for performance/accessibility/best-practices/SEO with >90 as target; record measured misses rather than claiming success. Confirm no horizontal overflow and primary CTA before first scroll at 390×844.
- [ ] **Step 5: Commit.** Stage only verified Task 10 cleanup/QA changes and `git commit -m "refactor: consolidate BracketDex visual system"`.

## Completion gate

The work is complete only when all ten task checks are recorded, the production build and route/content regression checks pass, and the browser audit finds no unresolved blocking mobile, accessibility, runtime, or factual-content issue. Do not represent unrun screenshots, Lighthouse, or browser interaction checks as passed.
