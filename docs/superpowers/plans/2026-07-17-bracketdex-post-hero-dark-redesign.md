# BracketDex Post-Hero Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace only the homepage content after the existing hero with the approved warm-to-dark SaaS narrative, responsive system visuals, restrained motion, light FAQ reset, and blue closing CTA.

**Architecture:** Keep `HomePage` responsible for the frozen navbar, frozen hero, JSON-LD, post-hero boundary, and footer. Put the new server-rendered post-hero feature in focused files under `src/components/home/post-hero/`; keep browser animation in one small client component and keep all visual rules under the `.bd-post-hero` namespace in `globals.css`.

**Tech Stack:** Next.js 15 App Router, React 19, strict TypeScript, CSS/Tailwind utilities already configured, Lucide React, GSAP + `@gsap/react`, Motion, compile-time contract files, `npm run typecheck`, and `npm run build`.

## Global Constraints

- Do not edit the navbar, the hero markup, `marketingContent.homepage.hero`, `HOMEPAGE_HERO_PLACEMENT`, `public/media/hero-bg-01.webp`, `.bd-nav*`, or `.bd-hero*` rules.
- Start the redesign immediately after the existing hero and end before the existing shared footer.
- Do not add a theme-toggle button, site-wide theme switcher, or light/dark preference state.
- Use `#f5f5f2`, `#fbfbf8`, `#171717`, `#666762`, `#dcdcd2`, `#08090a`, `#0f1011`, `#161718`, `#23252a`, `#d0d6e0`, `#8a8f98`, and `#1455d9` for the approved post-hero system.
- Use Array for display headings, Alpino for body copy, and the existing mono stack for technical labels.
- Source service, solution, process, technology, industry, FAQ, company, and CTA claims from `src/content/marketing.ts` only.
- Do not publish `trustMetricPlaceholders` or `projectPlaceholders`; do not invent clients, stats, testimonials, certifications, compliance claims, or case-study results.
- Render all core content in the server output; JavaScript only enhances motion and interaction.
- Respect `prefers-reduced-motion`, clean up GSAP contexts, and avoid interfering with the global progressive-text reveal.
- Do not add dependencies, routes, raster content assets, custom SVGs, 3D libraries, gradients, glass effects, or perpetual ambient animation.
- Preserve responsive readability at 320px and prevent horizontal page overflow.
- Follow test-first red/green order for every production change.

---

## File Map

- Create `src/components/home/post-hero/post-hero-content.ts`: maps approved marketing data into the three service chapters and four proof blocks.
- Create `src/components/home/post-hero/post-hero-content.contract.ts`: compile-time content-shape contract.
- Create `src/components/home/post-hero/system-visuals.tsx`: semantic software, AI, automation, and cloud interface representations.
- Create `src/components/home/post-hero/system-visuals.contract.tsx`: compile-time component API contract.
- Create `src/components/home/post-hero/post-hero-motion.tsx`: one client-only GSAP enhancement boundary.
- Create `src/components/home/post-hero/post-hero-motion.contract.tsx`: compile-time motion API and selector contract.
- Create `src/components/home/post-hero/post-hero-home.tsx`: composes every approved post-hero section.
- Create `src/components/home/post-hero/post-hero-home.contract.tsx`: compile-time orchestration contract.
- Modify `src/components/home/home-page.tsx`: replace only the markup after `.bd-hero` and before `Footer` with `PostHeroHome`.
- Modify `src/components/home/home-page.contract.tsx`: lock the post-hero integration flags alongside the existing hero-placement contract.
- Modify `src/app/globals.css`: append `.bd-post-hero*` styles and responsive/reduced-motion rules without changing `.bd-nav*` or `.bd-hero*`.
- Create `design-qa.md`: evidence-based reference-versus-rendered QA report after implementation.

---

### Task 1: Approved Post-Hero Content Model

**Files:**
- Create: `src/components/home/post-hero/post-hero-content.contract.ts`
- Create: `src/components/home/post-hero/post-hero-content.ts`

**Interfaces:**
- Consumes: `MarketingContent` from `src/content/marketing.ts`.
- Produces: `buildPostHeroContent(content: MarketingContent): PostHeroContent`, `PostHeroServiceChapter`, `ProofOfCraftItem`, and `POST_HERO_THEME_TOGGLE = false`.

- [ ] **Step 1: Write the failing contract**

Create `post-hero-content.contract.ts`:

```ts
import { marketingContent } from "@/content/marketing";
import {
  buildPostHeroContent,
  POST_HERO_THEME_TOGGLE,
  type PostHeroContent,
} from "./post-hero-content";

type Expect<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

const content: PostHeroContent = buildPostHeroContent(marketingContent);

export type PostHeroContentContract = [
  Expect<Equal<typeof POST_HERO_THEME_TOGGLE, false>>,
  Expect<Equal<(typeof content.serviceChapters)[number]["visual"], "software" | "ai" | "automation">>,
];

export const postHeroContentContract = content;
```

- [ ] **Step 2: Run the contract to verify RED**

Run: `npm run typecheck`

Expected: FAIL with `TS2307` because `./post-hero-content` does not exist.

- [ ] **Step 3: Implement the minimal content mapper**

Create `post-hero-content.ts` with these exact public types and values:

```ts
import type { MarketingContent } from "@/content/marketing";

export const POST_HERO_THEME_TOGGLE = false as const;

export type PostHeroVisual = "software" | "ai" | "automation";

export type PostHeroServiceChapter = {
  index: "01" | "02" | "03";
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  capabilities: readonly { title: string; outcome: string }[];
  visual: PostHeroVisual;
};

export type ProofOfCraftItem = {
  title: "Methodology" | "Engineering Standards" | "Deliverables" | "Quality & Security";
  description: string;
  href: string;
  linkLabel: string;
};

export type PostHeroContent = {
  serviceChapters: readonly PostHeroServiceChapter[];
  proofOfCraft: readonly ProofOfCraftItem[];
  closingCta: string;
};

export function buildPostHeroContent(content: MarketingContent): PostHeroContent {
  return {
    serviceChapters: [
      {
        index: "01",
        eyebrow: content.services[0].title,
        title: "Build reliable software that ships",
        description: content.services[0].description,
        href: "/services",
        linkLabel: "Explore development services",
        capabilities: [content.solutions[0], content.solutions[1], content.solutions[4]],
        visual: "software",
      },
      {
        index: "02",
        eyebrow: content.services[1].title,
        title: "Build intelligent experiences",
        description: content.services[1].description,
        href: "/solutions",
        linkLabel: "Explore AI solutions",
        capabilities: [content.solutions[2], content.solutions[3], content.solutions[4]],
        visual: "ai",
      },
      {
        index: "03",
        eyebrow: content.services[2].title,
        title: "Automate workflows that move your business",
        description: content.services[2].description,
        href: "/solutions",
        linkLabel: "Explore automation services",
        capabilities: [content.solutions[3], content.solutions[4], content.solutions[5]],
        visual: "automation",
      },
    ],
    proofOfCraft: [
      { title: "Methodology", description: content.whyChooseUs[6].description, href: "/services", linkLabel: "See our process" },
      { title: "Engineering Standards", description: content.whyChooseUs[4].description, href: "/services", linkLabel: "Engineering approach" },
      { title: "Deliverables", description: content.whyChooseUs[1].description, href: "/services", linkLabel: "What you receive" },
      { title: "Quality & Security", description: content.process[4].description, href: "/services", linkLabel: "Quality approach" },
    ],
    closingCta: content.ctas[2],
  };
}
```

- [ ] **Step 4: Verify GREEN**

Run: `npm run typecheck`

Expected: PASS with exit code 0.

- [ ] **Step 5: Commit**

```powershell
git add -- src/components/home/post-hero/post-hero-content.ts src/components/home/post-hero/post-hero-content.contract.ts
git commit -m "feat: define approved post-hero content"
```

---

### Task 2: Semantic System Visuals

**Files:**
- Create: `src/components/home/post-hero/system-visuals.contract.tsx`
- Create: `src/components/home/post-hero/system-visuals.tsx`

**Interfaces:**
- Consumes: `PostHeroVisual` from `post-hero-content.ts` and Lucide icons.
- Produces: `SystemVisual({ variant }: { variant: PostHeroVisual })` and `CloudDevOpsVisual()`.

- [ ] **Step 1: Write the failing component contract**

```tsx
import { CloudDevOpsVisual, SystemVisual } from "./system-visuals";

export const systemVisualsContract = (
  <>
    <SystemVisual variant="software" />
    <SystemVisual variant="ai" />
    <SystemVisual variant="automation" />
    <CloudDevOpsVisual />
  </>
);
```

- [ ] **Step 2: Verify RED**

Run: `npm run typecheck`

Expected: FAIL with `TS2307` because `./system-visuals` does not exist.

- [ ] **Step 3: Implement accessible visual primitives**

Create `system-visuals.tsx` as a server-compatible component. Use Lucide icons, ordered lists, and labelled groups; no custom SVG and no fake statistics. Use this exact selector/API contract:

```tsx
import {
  BotIcon,
  BoxIcon,
  CheckCircle2Icon,
  CloudIcon,
  Code2Icon,
  ContainerIcon,
  DatabaseIcon,
  GitBranchIcon,
  NetworkIcon,
  RouteIcon,
  ServerIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from "lucide-react";
import type { PostHeroVisual } from "./post-hero-content";

type VisualStep = { label: string; meta: string };

const flows: Record<PostHeroVisual, readonly VisualStep[]> = {
  software: [
    { label: "Business requirements", meta: "Discovery" },
    { label: "Application architecture", meta: "System" },
    { label: "Product interface", meta: "Experience" },
    { label: "Release pipeline", meta: "Delivery" },
  ],
  ai: [
    { label: "User request", meta: "Input" },
    { label: "Context retrieval", meta: "Knowledge" },
    { label: "Model reasoning", meta: "Intelligence" },
    { label: "Verified response", meta: "Output" },
  ],
  automation: [
    { label: "Business trigger", meta: "Event" },
    { label: "Validation rules", meta: "Control" },
    { label: "System action", meta: "Execution" },
    { label: "Audit record", meta: "Trace" },
  ],
};

export function SystemVisual({ variant }: { variant: PostHeroVisual }) {
  const labels = { software: "Software delivery system", ai: "AI solution pipeline", automation: "Business automation workflow" } as const;
  return (
    <div aria-label={labels[variant]} className="bd-system-visual" data-visual={variant}>
      <div className="bd-system-visual__bar"><span>{labels[variant]}</span><span>Configured workflow</span></div>
      <ol className="bd-system-flow">
        {flows[variant].map((step, index) => (
          <li className="bd-system-node" data-flow-step key={step.label}>
            <span className="bd-system-node__icon" aria-hidden="true">
              {index === 0 ? <RouteIcon /> : index === 1 ? <DatabaseIcon /> : index === 2 ? <WorkflowIcon /> : <CheckCircle2Icon />}
            </span>
            <strong>{step.label}</strong><small>{step.meta}</small>
          </li>
        ))}
      </ol>
      <div className="bd-system-visual__status" aria-label="Workflow qualities">
        <span><ShieldCheckIcon aria-hidden="true" /> Controlled</span>
        <span><GitBranchIcon aria-hidden="true" /> Traceable</span>
        <span><Code2Icon aria-hidden="true" /> Maintainable</span>
      </div>
    </div>
  );
}

export function CloudDevOpsVisual() {
  const nodes = [
    { label: "Users", Icon: NetworkIcon },
    { label: "Application", Icon: BoxIcon },
    { label: "Services", Icon: ServerIcon },
    { label: "Data", Icon: DatabaseIcon },
    { label: "Delivery", Icon: ContainerIcon },
    { label: "Cloud", Icon: CloudIcon },
  ] as const;
  return (
    <div aria-label="Cloud and DevOps capability architecture" className="bd-cloud-visual">
      {nodes.map(({ label, Icon }) => <span className="bd-cloud-node" key={label}><Icon aria-hidden="true" />{label}</span>)}
    </div>
  );
}
```

Remove unused imported icons before the green run.

- [ ] **Step 4: Verify GREEN**

Run: `npm run typecheck`

Expected: PASS with exit code 0 and no unused-import error.

- [ ] **Step 5: Commit**

```powershell
git add -- src/components/home/post-hero/system-visuals.tsx src/components/home/post-hero/system-visuals.contract.tsx
git commit -m "feat: add post-hero system visuals"
```

---

### Task 3: Post-Hero Page Composition and Frozen-Boundary Integration

**Files:**
- Create: `src/components/home/post-hero/post-hero-home.contract.tsx`
- Create: `src/components/home/post-hero/post-hero-home.tsx`
- Modify: `src/components/home/home-page.contract.tsx`
- Modify: `src/components/home/home-page.tsx`

**Interfaces:**
- Consumes: `MarketingContent`, `buildPostHeroContent`, `SystemVisual`, `CloudDevOpsVisual`, and the existing `FaqSection`.
- Produces: `PostHeroHome({ content }: { content: MarketingContent })`, `POST_HERO_DESIGN = "dark-systems-lab"`, and `POST_HERO_STARTS_AFTER_HERO = true`.

- [ ] **Step 1: Write the failing orchestration contract**

```tsx
import { marketingContent } from "@/content/marketing";
import {
  PostHeroHome,
  POST_HERO_DESIGN,
  POST_HERO_STARTS_AFTER_HERO,
} from "./post-hero-home";

type Expect<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

export type PostHeroHomeContract = [
  Expect<Equal<typeof POST_HERO_DESIGN, "dark-systems-lab">>,
  Expect<Equal<typeof POST_HERO_STARTS_AFTER_HERO, true>>,
];

export const postHeroHomeContract = <PostHeroHome content={marketingContent} />;
```

- [ ] **Step 2: Verify RED**

Run: `npm run typecheck`

Expected: FAIL with `TS2307` because `./post-hero-home` does not exist.

- [ ] **Step 3: Implement all approved server-rendered sections**

Create `post-hero-home.tsx` with this section order and semantic contract:

```tsx
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  Code2Icon,
  PackageCheckIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from "lucide-react";
import type { MarketingContent } from "@/content/marketing";
import { FaqSection } from "@/components/marketing/faq-section";
import { buildPostHeroContent } from "./post-hero-content";
import { CloudDevOpsVisual, SystemVisual } from "./system-visuals";
import { PostHeroMotion } from "./post-hero-motion";

export const POST_HERO_DESIGN = "dark-systems-lab" as const;
export const POST_HERO_STARTS_AFTER_HERO = true as const;

const proofIcons = [WorkflowIcon, Code2Icon, PackageCheckIcon, ShieldCheckIcon] as const;

export function PostHeroHome({ content }: { content: MarketingContent }) {
  const postHero = buildPostHeroContent(content);
  const cloudService = content.services[3];
  const cloudGroups = content.technologyStack.filter((group) => group.category === "Cloud" || group.category === "DevOps");

  return (
    <div className="bd-post-hero" data-post-hero-design={POST_HERO_DESIGN}>
      <PostHeroMotion />
      <section className="bd-post-intro" aria-labelledby="post-hero-intro-title">
        <div className="content-shell bd-post-intro__grid">
          <div><p className="bd-post-kicker">Our approach</p><h2 id="post-hero-intro-title">From business need to working system.</h2></div>
          <p>{content.company.mission} One visible path keeps priorities, decisions, delivery, and release aligned.</p>
        </div>
      </section>

      <div className="bd-post-dark">
        <div className="content-shell">
          {postHero.serviceChapters.map((chapter, index) => (
            <section className="bd-service-chapter" data-motion-section key={chapter.index} aria-labelledby={`service-${chapter.index}`}>
              <div className="bd-service-chapter__copy">
                <span className="bd-chapter-index">{chapter.index}</span>
                <p className="bd-post-kicker">{chapter.eyebrow}</p>
                <h2 id={`service-${chapter.index}`}>{chapter.title}</h2>
                <p className="bd-service-chapter__description">{chapter.description}</p>
                <ul>{chapter.capabilities.map((item) => <li key={item.title}><CheckCircle2Icon aria-hidden="true" /><span><strong>{item.title}</strong><small>{item.outcome}</small></span></li>)}</ul>
                <Link className="bd-post-link" href={chapter.href}>{chapter.linkLabel}<ArrowRightIcon aria-hidden="true" /></Link>
              </div>
              <div className="bd-service-chapter__visual" data-motion-visual><SystemVisual variant={chapter.visual} /></div>
            </section>
          ))}

          <section className="bd-cloud-strip" data-motion-section aria-labelledby="cloud-title">
            <div className="bd-cloud-strip__copy"><p className="bd-post-kicker">Infrastructure</p><h2 id="cloud-title">{cloudService.title}</h2><p>{cloudService.description}</p>{cloudGroups.map((group) => <div key={group.category}><strong>{group.category}</strong><span>{group.items.join(" · ")}</span></div>)}</div>
            <CloudDevOpsVisual />
          </section>

          <section className="bd-delivery" data-motion-section aria-labelledby="delivery-title">
            <p className="bd-post-kicker">Delivery system</p><h2 id="delivery-title">From business need to working system</h2>
            <ol className="bd-delivery-rail">{content.process.map((step) => <li data-process-step key={step.step}><span>{step.step}</span><strong>{step.title}</strong><p>{step.description}</p></li>)}</ol>
          </section>

          <section className="bd-capability-index" data-motion-section aria-labelledby="capabilities-title">
            <div className="bd-section-heading"><p className="bd-post-kicker">Capability index</p><h2 id="capabilities-title">Technology depth. Industry context.</h2></div>
            <div className="bd-capability-index__grid"><div><h3>Technologies</h3>{content.technologyStack.map((group) => <div className="bd-capability-row" key={group.category}><strong>{group.category}</strong><span>{group.items.join(" · ")}</span></div>)}</div><div><h3>Industries we serve</h3>{content.industries.map((industry) => <div className="bd-capability-row" key={industry.title}><strong>{industry.title}</strong><span>{industry.description}</span></div>)}</div></div>
          </section>

          <section className="bd-proof-craft" data-motion-section aria-label="Proof of craft">
            {postHero.proofOfCraft.map((item, index) => { const Icon = proofIcons[index]; return <article key={item.title}><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.description}</p><Link href={item.href}>{item.linkLabel}<ArrowRightIcon aria-hidden="true" /></Link></article>; })}
          </section>
        </div>
      </div>

      <section className="bd-post-faq" aria-labelledby="post-faq-title"><div className="content-shell bd-post-faq__grid"><div><p className="bd-post-kicker">FAQ</p><h2 id="post-faq-title">Questions, answered clearly.</h2><p>Direct answers based on documented BracketDex services and working style.</p></div><FaqSection defaultOpenFirst items={content.faqs} /></div></section>

      <section className="bd-post-cta" aria-labelledby="post-cta-title"><div className="content-shell bd-post-cta__grid"><div><p className="bd-post-kicker">Start a project</p><h2 id="post-cta-title">{postHero.closingCta}</h2><p>{content.company.shortDescription}</p></div><Link href="/contact">Book Consultation<ArrowRightIcon aria-hidden="true" /></Link></div></section>
    </div>
  );
}
```

Break repeated JSX into small private functions only when it improves readability; keep the public exports exact.

- [ ] **Step 4: Temporarily satisfy the motion import**

Create `post-hero-motion.tsx` with a minimal no-op client boundary so Task 3 stays independently green:

```tsx
"use client";

export function PostHeroMotion() {
  return null;
}
```

Task 4 will replace this no-op through a separate red/green contract.

- [ ] **Step 5: Replace only the existing post-hero markup in `HomePage`**

- Remove obsolete post-hero imports and local arrays from `home-page.tsx`.
- Add `import { PostHeroHome } from "./post-hero/post-hero-home";`.
- Leave the `<Navbar ... />` and the complete `<div className="bd-hero">...</div>` byte-for-byte unchanged.
- Replace everything between the closing hero `</div>` and `<Footer ... />` with `<PostHeroHome content={content} />`.

- [ ] **Step 6: Extend the home-page contract**

Import `POST_HERO_STARTS_AFTER_HERO` from `./post-hero/post-hero-home` and add:

```ts
type PostHeroStartsAfterHero = typeof POST_HERO_STARTS_AFTER_HERO extends true ? true : false;
```

Then add `Expect<PostHeroStartsAfterHero>` to `HomePageHeroFeedbackContract` without changing the existing centered-hero assertion.

- [ ] **Step 7: Verify GREEN**

Run: `npm run typecheck`

Expected: PASS with exit code 0.

Run: `git diff -- src/components/home/home-page.tsx src/components/home/home-page.contract.tsx`

Expected: the navbar props, hero markup, `HOMEPAGE_HERO_PLACEMENT`, and hero content are unchanged; only old post-hero code is replaced.

- [ ] **Step 8: Commit**

```powershell
git add -- src/components/home/home-page.tsx src/components/home/home-page.contract.tsx src/components/home/post-hero/post-hero-home.tsx src/components/home/post-hero/post-hero-home.contract.tsx src/components/home/post-hero/post-hero-motion.tsx
git commit -m "feat: compose dark post-hero landing page"
```

---

### Task 4: Scoped Motion and Responsive Visual System

**Files:**
- Create: `src/components/home/post-hero/post-hero-motion.contract.tsx`
- Modify: `src/components/home/post-hero/post-hero-motion.tsx`
- Modify: `src/components/home/post-hero/post-hero-home.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: elements within one `[data-post-hero-design]` root.
- Produces: `PostHeroMotion()`, `POST_HERO_MOTION_SCOPE = "[data-post-hero-design]"`, and final `.bd-post-hero*` styles.

- [ ] **Step 1: Write the failing motion contract**

```tsx
import { PostHeroMotion, POST_HERO_MOTION_SCOPE } from "./post-hero-motion";

type Expect<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

export type PostHeroMotionContract = [
  Expect<Equal<typeof POST_HERO_MOTION_SCOPE, "[data-post-hero-design]">>,
];

export const postHeroMotionContract = <PostHeroMotion />;
```

- [ ] **Step 2: Verify RED**

Run: `npm run typecheck`

Expected: FAIL because `POST_HERO_MOTION_SCOPE` is not exported.

- [ ] **Step 3: Implement scoped GSAP enhancement**

Replace the no-op with:

```tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const POST_HERO_MOTION_SCOPE = "[data-post-hero-design]" as const;

export function PostHeroMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(POST_HERO_MOTION_SCOPE);
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-motion-section]").forEach((section) => {
        gsap.fromTo(section, { opacity: 0.7, y: 28 }, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-motion-visual]").forEach((visual) => {
        gsap.fromTo(visual, { clipPath: "inset(0 0 14% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: visual, start: "top 78%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-flow-step]").forEach((node, index) => {
        gsap.fromTo(node, { opacity: 0.35 }, { opacity: 1, duration: 0.35, delay: index * 0.06, scrollTrigger: { trigger: node.closest(".bd-system-visual"), start: "top 75%", once: true } });
      });
    }, root);
    return () => context.revert();
  }, []);

  return null;
}
```

If `@gsap/react` cleanup rejects returning from the callback, use the hook's context cleanup mechanism while preserving the same scoped behavior and selector export.

- [ ] **Step 4: Add the full post-hero CSS namespace**

Append styles after existing non-hero landing utilities. Required concrete rules:

```css
.bd-post-hero {
  --post-warm: #f5f5f2;
  --post-surface: #fbfbf8;
  --post-ink: #171717;
  --post-muted: #666762;
  --post-border: #dcdcd2;
  --post-dark: #08090a;
  --post-dark-surface: #0f1011;
  --post-dark-raised: #161718;
  --post-dark-border: #23252a;
  --post-dark-text: #d0d6e0;
  --post-dark-muted: #8a8f98;
  --post-blue: #1455d9;
  background: var(--post-warm);
  color: var(--post-ink);
}

.bd-post-hero :where(h2, h3, p) { margin-block: 0; }
.bd-post-kicker { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: .68rem; font-weight: 650; letter-spacing: .12em; text-transform: uppercase; }
.bd-post-intro { padding-block: clamp(5rem, 9vw, 8rem); border-bottom: 1px solid var(--post-border); background: var(--post-warm); }
.bd-post-intro__grid { display: grid; gap: 2.5rem; align-items: end; }
.bd-post-intro h2 { max-width: 13ch; margin-top: 1rem; font-size: clamp(3rem, 6vw, 5.75rem); line-height: .94; letter-spacing: -.045em; }
.bd-post-intro__grid > p { max-width: 34rem; color: var(--post-muted); font-size: clamp(1rem, 1.4vw, 1.2rem); line-height: 1.65; }

.bd-post-dark { position: relative; overflow: clip; padding-block: 1px clamp(5rem, 9vw, 8rem); background-color: var(--post-dark); background-image: linear-gradient(rgb(255 255 255 / .025) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .025) 1px, transparent 1px); background-size: 64px 64px; color: var(--post-dark-text); }
.bd-service-chapter { display: grid; gap: clamp(2.5rem, 6vw, 6rem); padding-block: clamp(5rem, 9vw, 8rem); border-bottom: 1px solid var(--post-dark-border); }
.bd-service-chapter__copy { align-self: center; }
.bd-chapter-index { display: inline-block; color: var(--post-blue); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: .8rem; font-weight: 700; }
.bd-service-chapter .bd-post-kicker { margin-top: .75rem; color: var(--post-dark-muted); }
.bd-service-chapter h2 { max-width: 12ch; margin-top: 1.25rem; color: #f2f5f9; font-size: clamp(2.45rem, 5vw, 4.7rem); line-height: .98; letter-spacing: -.035em; }
.bd-service-chapter__description { max-width: 34rem; margin-top: 1.5rem; color: var(--post-dark-muted); line-height: 1.7; }
.bd-service-chapter__copy ul { display: grid; gap: .9rem; margin: 2rem 0 0; padding: 0; list-style: none; }
.bd-service-chapter__copy li { display: flex; gap: .75rem; align-items: flex-start; }
.bd-service-chapter__copy li svg { flex: 0 0 auto; width: 1rem; margin-top: .2rem; color: var(--post-blue); }
.bd-service-chapter__copy li span { display: grid; gap: .12rem; }
.bd-service-chapter__copy li strong { font-size: .9rem; font-weight: 560; }
.bd-service-chapter__copy li small { color: var(--post-dark-muted); font-size: .78rem; }
.bd-post-link { display: inline-flex; gap: .55rem; align-items: center; margin-top: 2.25rem; color: #4f8dff; font-size: .88rem; font-weight: 600; }
.bd-post-link svg { width: 1rem; transition: transform 160ms ease; }
.bd-post-link:hover svg, .bd-post-link:focus-visible svg { transform: translateX(3px); }

.bd-system-visual, .bd-cloud-strip, .bd-delivery, .bd-capability-index, .bd-proof-craft article { border: 1px solid var(--post-dark-border); background: rgb(15 16 17 / .9); }
.bd-system-visual { overflow: hidden; border-radius: 10px; }
.bd-system-visual__bar { display: flex; justify-content: space-between; gap: 1rem; padding: .9rem 1rem; border-bottom: 1px solid var(--post-dark-border); color: var(--post-dark-muted); font: 600 .66rem/1.2 ui-monospace, monospace; text-transform: uppercase; }
.bd-system-flow { display: grid; gap: 1.5rem; margin: 0; padding: clamp(1.5rem, 4vw, 3.25rem); list-style: none; }
.bd-system-node { position: relative; display: grid; grid-template-columns: auto 1fr; gap: .2rem .75rem; align-items: center; min-width: 0; padding: .85rem; border: 1px solid var(--post-dark-border); border-radius: 6px; background: var(--post-dark-raised); }
.bd-system-node:not(:last-child)::after { position: absolute; top: 100%; left: 50%; width: 1px; height: 1.5rem; background: var(--post-blue); content: ""; opacity: .65; }
.bd-system-node__icon { grid-row: span 2; display: grid; place-items: center; width: 2rem; height: 2rem; border: 1px solid #30333a; border-radius: 5px; color: #6d9eff; }
.bd-system-node__icon svg { width: 1rem; }
.bd-system-node strong { overflow-wrap: anywhere; font-size: .78rem; }
.bd-system-node small { color: var(--post-dark-muted); font: .62rem ui-monospace, monospace; text-transform: uppercase; }
.bd-system-visual__status { display: flex; flex-wrap: wrap; gap: 1rem; padding: .9rem 1rem; border-top: 1px solid var(--post-dark-border); color: var(--post-dark-muted); font-size: .7rem; }
.bd-system-visual__status span { display: inline-flex; gap: .35rem; align-items: center; }
.bd-system-visual__status svg { width: .9rem; color: #58bd7b; }

.bd-cloud-strip, .bd-delivery, .bd-capability-index { margin-top: 1.25rem; border-radius: 10px; }
.bd-cloud-strip { display: grid; gap: 2rem; padding: clamp(1.5rem, 4vw, 3rem); }
.bd-cloud-strip__copy h2, .bd-delivery h2, .bd-capability-index h2 { margin-top: .75rem; color: #f2f5f9; font-size: clamp(2rem, 3.3vw, 3.25rem); line-height: 1; }
.bd-cloud-strip__copy > p { max-width: 34rem; margin-top: 1rem; color: var(--post-dark-muted); line-height: 1.65; }
.bd-cloud-strip__copy > div { display: grid; gap: .3rem; margin-top: 1rem; font-size: .78rem; }
.bd-cloud-strip__copy > div span { color: var(--post-dark-muted); }
.bd-cloud-visual { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .65rem; align-content: center; }
.bd-cloud-node { display: flex; gap: .55rem; align-items: center; min-height: 3rem; padding: .7rem; border: 1px solid var(--post-dark-border); border-radius: 5px; background: var(--post-dark-raised); color: var(--post-dark-muted); font-size: .72rem; }
.bd-cloud-node svg { width: 1rem; color: #6d9eff; }
.bd-delivery { padding: clamp(1.5rem, 4vw, 3rem); }
.bd-delivery-rail { position: relative; display: grid; gap: 1.5rem; margin: 2.5rem 0 0; padding: 0; list-style: none; }
.bd-delivery-rail li { position: relative; padding-left: 2.7rem; }
.bd-delivery-rail li::before { position: absolute; top: .25rem; bottom: -1.75rem; left: .9rem; width: 1px; background: var(--post-dark-border); content: ""; }
.bd-delivery-rail li:last-child::before { display: none; }
.bd-delivery-rail li > span { position: absolute; top: 0; left: 0; display: grid; place-items: center; width: 1.8rem; height: 1.8rem; border-radius: 50%; background: var(--post-blue); color: white; font: 700 .65rem ui-monospace, monospace; }
.bd-delivery-rail strong { display: block; color: #eef2f7; font-size: .83rem; }
.bd-delivery-rail p { margin-top: .35rem; color: var(--post-dark-muted); font-size: .72rem; line-height: 1.5; }
.bd-capability-index { padding: clamp(1.5rem, 4vw, 3rem); }
.bd-capability-index__grid { display: grid; gap: 2.5rem; margin-top: 2.5rem; }
.bd-capability-index__grid h3 { padding-bottom: .75rem; border-bottom: 1px solid var(--post-dark-border); color: var(--post-dark-muted); font: 650 .67rem ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; }
.bd-capability-row { display: grid; gap: .35rem; padding-block: .85rem; border-bottom: 1px solid var(--post-dark-border); }
.bd-capability-row strong { font-size: .78rem; }
.bd-capability-row span { color: var(--post-dark-muted); font-size: .72rem; line-height: 1.45; }
.bd-proof-craft { display: grid; gap: .75rem; margin-top: 1.25rem; }
.bd-proof-craft article { padding: 1.35rem; border-radius: 8px; }
.bd-proof-craft article > svg { width: 1.1rem; color: #6d9eff; }
.bd-proof-craft h3 { margin-top: 1.5rem; color: #f2f5f9; font-size: 1rem; }
.bd-proof-craft p { margin-top: .75rem; color: var(--post-dark-muted); font-size: .78rem; line-height: 1.55; }
.bd-proof-craft a { display: inline-flex; gap: .35rem; align-items: center; margin-top: 1.25rem; color: #4f8dff; font-size: .72rem; }
.bd-proof-craft a svg { width: .8rem; }

.bd-post-faq { padding-block: clamp(5rem, 9vw, 8rem); background: var(--post-warm); }
.bd-post-faq__grid { display: grid; gap: 3rem; }
.bd-post-faq h2 { max-width: 12ch; margin-top: 1rem; font-size: clamp(2.6rem, 5vw, 4.5rem); line-height: .98; }
.bd-post-faq__grid > div:first-child > p:last-child { max-width: 30rem; margin-top: 1.25rem; color: var(--post-muted); line-height: 1.65; }
.bd-post-faq details { border-color: var(--post-border); border-radius: 6px; background: var(--post-surface); }
.bd-post-cta { padding-block: clamp(3rem, 6vw, 5rem); background: var(--post-blue); color: white; }
.bd-post-cta__grid { display: grid; gap: 2rem; align-items: center; }
.bd-post-cta h2 { max-width: 16ch; margin-top: .7rem; font-size: clamp(2.3rem, 5vw, 4.4rem); line-height: .96; }
.bd-post-cta p { max-width: 38rem; margin-top: 1rem; color: rgb(255 255 255 / .75); line-height: 1.6; }
.bd-post-cta a { display: inline-flex; justify-content: center; gap: .55rem; align-items: center; min-height: 44px; width: fit-content; border-radius: 6px; background: white; padding: .8rem 1rem; color: var(--post-blue); font-weight: 650; }
.bd-post-cta a svg { width: 1rem; }

@media (min-width: 768px) {
  .bd-post-intro__grid, .bd-post-faq__grid, .bd-post-cta__grid { grid-template-columns: minmax(0, 1fr) minmax(18rem, .72fr); }
  .bd-cloud-strip { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); }
  .bd-capability-index__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .bd-proof-craft { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .bd-system-flow { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .75rem; }
  .bd-system-node:not(:last-child)::after { top: 50%; left: 100%; width: .75rem; height: 1px; }
}

@media (min-width: 1024px) {
  .bd-service-chapter { grid-template-columns: minmax(19rem, .72fr) minmax(0, 1.28fr); align-items: center; }
  .bd-service-chapter:nth-of-type(even) .bd-service-chapter__copy { order: 2; }
  .bd-service-chapter:nth-of-type(even) .bd-service-chapter__visual { order: 1; }
  .bd-delivery-rail { grid-template-columns: repeat(7, minmax(0, 1fr)); gap: .75rem; }
  .bd-delivery-rail li { padding: 2.7rem .6rem 0; text-align: center; }
  .bd-delivery-rail li::before { top: .9rem; right: -1rem; bottom: auto; left: calc(50% + .9rem); width: calc(100% + .25rem); height: 1px; }
  .bd-delivery-rail li > span { top: 0; left: 50%; transform: translateX(-50%); }
  .bd-proof-craft { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .bd-post-cta__grid { grid-template-columns: minmax(0, 1fr) auto; }
}

@media (max-width: 420px) {
  .bd-post-hero .content-shell { width: min(100% - 1.25rem, var(--container-content)); }
  .bd-system-visual__bar { align-items: flex-start; flex-direction: column; }
  .bd-cloud-visual { grid-template-columns: 1fr; }
  .bd-post-cta a { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .bd-post-hero [data-motion-section], .bd-post-hero [data-motion-visual], .bd-post-hero [data-flow-step] { opacity: 1 !important; transform: none !important; clip-path: none !important; }
}
```

Do not change any existing `.bd-nav*` or `.bd-hero*` declaration while placing this block.

- [ ] **Step 5: Verify GREEN and frozen CSS boundary**

Run: `npm run typecheck`

Expected: PASS with exit code 0.

Run: `git diff -U0 -- src/app/globals.css | Select-String -Pattern '^[-+]\.bd-(nav|hero)'`

Expected: no output.

- [ ] **Step 6: Commit**

```powershell
git add -- src/components/home/post-hero/post-hero-motion.tsx src/components/home/post-hero/post-hero-motion.contract.tsx src/components/home/post-hero/post-hero-home.tsx src/app/globals.css
git commit -m "feat: style and animate post-hero experience"
```

---

### Task 5: Production Verification and Design QA

**Files:**
- Create: `design-qa.md`
- Modify only if QA requires: `src/components/home/post-hero/*.tsx`, `src/app/globals.css`

**Interfaces:**
- Consumes: approved reference at `docs/superpowers/specs/assets/2026-07-17-bracketdex-post-hero-dark-reference.png` and rendered `/` route.
- Produces: browser screenshots and `design-qa.md` with `final result: passed` or `final result: blocked`.

- [ ] **Step 1: Run static verification**

Run: `npm run typecheck`

Expected: PASS with exit code 0.

Run: `npm run build`

Expected: PASS with exit code 0 and successful static route generation.

Run: `rg -n "theme.?toggle|trustMetricPlaceholders|projectPlaceholders|image will be here" src/components/home`

Expected: no matches in files imported by `home-page.tsx`. Legacy unimported `landing-visuals.tsx` may still contain old placeholder text and is not a public-render failure.

- [ ] **Step 2: Audit frozen files**

Run: `git diff ac90eae -- src/components/marketing/navbar.tsx src/components/marketing/hero-section.tsx public/media/hero-bg-01.webp`

Expected: no output.

Run: `git diff ac90eae -U0 -- src/app/globals.css | Select-String -Pattern '^[-+]\.bd-(nav|hero)'`

Expected: no output.

- [ ] **Step 3: Start and capture the local site**

Start the existing Next.js dev server on an available local port. Use the Codex in-app browser unless it is unavailable. Capture the homepage at:

- Desktop: `1440 × 1000`
- Tablet: `834 × 1112`
- Mobile: `390 × 844`
- Narrow overflow check: `320px` viewport width

Capture the full post-hero composition at desktop width and focused screenshots of service visuals, the process rail, FAQ, and mobile stacking. Check the console for hydration, key, GSAP, and runtime errors.

- [ ] **Step 4: Test interactions and accessibility behavior**

- Navigate through every post-hero link and FAQ summary with the keyboard.
- Verify the first FAQ starts open and each details control toggles.
- Emulate `prefers-reduced-motion: reduce` and confirm the content stays visible with no scroll transform.
- Confirm no horizontal overflow at 320px and no clipped primary CTA at 390px.

- [ ] **Step 5: Run blocking design QA**

Open the approved reference and the latest desktop implementation screenshot together in one comparison input. Compare hierarchy, section order, typography, spacing rhythm, dark/light balance, border density, diagrams, FAQ reset, CTA, and copy. Repeat focused comparisons for any detail not legible in the full view.

Write `design-qa.md` containing:

```md
# BracketDex Post-Hero Design QA

- Source visual truth: `docs/superpowers/specs/assets/2026-07-17-bracketdex-post-hero-dark-reference.png`
- Implementation screenshot: `<absolute screenshot path>`
- Viewport: `1440 × 1000` plus tablet and mobile captures
- State: homepage post-hero, first FAQ open

## Full-view comparison evidence
<visible comparison findings>

## Focused-region comparison evidence
<service/process/FAQ/CTA findings or why additional crops were unnecessary>

## Findings
<P0-P3 findings with locations, evidence, impact, and exact fixes>

## Comparison history
<each P0/P1/P2, applied fix, and post-fix evidence>

## Interaction and console checks
<keyboard, FAQ, reduced motion, overflow, console results>

final result: passed
```

If screenshots or comparison tooling are unavailable, use `final result: blocked` and name the missing evidence. Do not report the build as fully handed off.

- [ ] **Step 6: Fix P0/P1/P2 findings test-first**

For each behavioral finding, add or adjust the relevant contract so `npm run typecheck` fails for the expected reason before changing production code. For CSS-only visual corrections, record the reference mismatch in `design-qa.md`, apply the narrow `.bd-post-hero*` edit, recapture at the same viewport, and update comparison history. Repeat until no actionable P0/P1/P2 remains.

- [ ] **Step 7: Run final verification**

Run: `npm run typecheck`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

Run: `git status --short`

Expected: only intended implementation and `design-qa.md` changes before the final commit.

- [ ] **Step 8: Commit**

```powershell
git add -- design-qa.md src/components/home/post-hero src/components/home/home-page.tsx src/components/home/home-page.contract.tsx src/app/globals.css
git commit -m "test: verify post-hero redesign"
```

---

## Completion Checklist

- Navbar and hero code/assets/styles have no diff from `ac90eae`.
- The old post-hero placeholder experience is no longer rendered.
- Warm intro, dark services, Cloud & DevOps, seven-step delivery rail, taxonomy, proof of craft, light FAQ, and blue CTA render in the approved order.
- No theme toggle or unsupported social proof exists.
- All core content is server-rendered and motion is a progressive enhancement.
- Typecheck and production build pass from a clean command run.
- Desktop, tablet, mobile, narrow overflow, keyboard, reduced-motion, and console checks are recorded.
- `design-qa.md` exists with `final result: passed` before handoff.
