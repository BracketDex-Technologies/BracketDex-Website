# BracketDex Post-Hero Dark Redesign

**Date:** 2026-07-17  
**Status:** Locked for implementation review  
**Approved visual:** [Post-hero dark reference](./assets/2026-07-17-bracketdex-post-hero-dark-reference.png)

## 1. Outcome

Redesign only the BracketDex homepage content that follows the existing hero. The result should read as a precise, technically credible SaaS and technology-startup landing page: a warm transition out of the current hero, followed by a dark systems-lab narrative, a light FAQ reset, and a BracketDex-blue closing call to action.

The approved reference image is the visual source of truth for hierarchy, pacing, contrast, and section order. Implementation should adapt it responsively and use documented BracketDex content rather than reproducing text artifacts from the image.

## 2. Hard Scope Boundary

### In scope

- Homepage sections after the existing hero and before the shared footer.
- New post-hero components and home-specific styles.
- Content selection from `src/content/marketing.ts`.
- Purposeful motion for the post-hero experience using the libraries already installed.
- Responsive, accessible interface diagrams built with HTML and CSS.
- Home-specific contract checks needed to preserve the locked boundary and content rules.

### Frozen and unchanged

- The current navbar, including its markup, styling, scroll behavior, and loader docking.
- The current hero, including its markup, content, media, dimensions, typography, and motion.
- `src/components/marketing/navbar.tsx`.
- `src/components/marketing/hero-section.tsx` and the hero block in `src/components/home/home-page.tsx`.
- `marketingContent.homepage.hero` and `HOMEPAGE_HERO_PLACEMENT`.
- Every `.bd-nav*` and `.bd-hero*` rule.
- `public/media/hero-bg-01.webp`.
- Global font wiring in `src/app/layout.tsx`.
- Shared footer behavior and content unless a compile-time integration change is strictly required.

No theme toggle will be added. The dark presentation is an intentional section-level art direction, not a site-wide selectable theme.

## 3. Design Principles

1. **Technical clarity over decoration.** Grids, hairlines, labels, diagrams, and restrained motion should make the service story easier to understand.
2. **Editorial hierarchy.** Array display typography introduces ideas; Alpino handles readable body copy; compact mono labels organize technical information.
3. **Evidence without invention.** Show methodology, engineering standards, deliverables, and capabilities. Do not fabricate client logos, project names, testimonials, awards, or performance statistics.
4. **One continuous system.** Sections should feel connected through shared rails, rules, spacing, and numbered chapters rather than isolated marketing cards.
5. **Motion supports comprehension.** Animation reveals relationships and progression. It must not delay access to content or compete with the existing hero.

## 4. Visual System

### Color roles

| Role | Value | Use |
| --- | --- | --- |
| Warm canvas | `#f5f5f2` | Opening transition and FAQ reset |
| Warm surface | `#fbfbf8` | Light cards and accordion surfaces |
| Warm ink | `#171717` | Primary text on light surfaces |
| Warm muted | `#666762` | Supporting text on light surfaces |
| Warm border | `#dcdcd2` | Light hairlines |
| Dark canvas | `#08090a` | Main post-hero systems-lab field |
| Dark surface | `#0f1011` | Dark panels and chapter surfaces |
| Dark elevated | `#161718` | Interface modules and selected states |
| Dark border | `#23252a` | Dark hairlines and diagram structure |
| Dark text | `#d0d6e0` | Primary text on dark surfaces |
| Dark muted | `#8a8f98` | Supporting text and metadata |
| BracketDex blue | `#1455d9` | Active states, diagram signals, links, final CTA |

The palette does not use acid-lime, neon, Stripe-style indigo gradients, large glows, frosted glass, or novelty chrome.

### Typography

- Display and chapter headings: Array, using the current display-font variable.
- Body and interface copy: Alpino, using the current sans variable.
- Technical labels, indices, and diagram metadata: the current mono fallback stack in compact uppercase styling.
- Headings use tight line-height and controlled tracking; body measures stay readable at approximately 55–70 characters.

### Geometry and spacing

- Maximum content width: `1200px`, aligned with the current site shell.
- Desktop section rhythm: approximately `96px` to `128px` vertical padding.
- Hairline borders organize sections; shadows are minimal and used only where depth improves comprehension.
- Small controls may use a `6px` radius. Product and system frames may use up to `12px`. Large pill-shaped containers are avoided.
- Background grid lines should remain subtle and never reduce text contrast.

## 5. Page Narrative and Section Order

### A. Warm transition statement

The current hero flows directly into a full-width warm-light statement section:

- Eyebrow: `HOW WE WORK`
- Heading: `From business need to working system.`
- Supporting copy should come from the documented company positioning and mission.
- A fine horizontal rule and compact technical metadata establish the visual grammar used below.

This section must not overlap, recolor, or alter the hero.

### B. Dark service chapters

The background switches to the dark systems-lab field. Three numbered chapters explain the primary offering:

1. `Software Development`
2. `AI Solutions`
3. `Business Automation`

Each chapter uses a two-column desktop layout:

- Narrative column: index, title, documented service description, relevant solution outcomes, and a text link to the corresponding service or contact path.
- Visual column: a generic but meaningful system diagram illustrating the service without claiming to show a real client product.

The visual types are:

- Software Development: modular product architecture or application workspace.
- AI Solutions: input, reasoning/context, tool, and output pipeline.
- Business Automation: trigger, validation, routing, action, and audit workflow.

Diagrams use semantic text, CSS layout, and Lucide icons where useful. They are not raster screenshots, fake dashboards, or unlabeled decorative blocks.

### C. Cloud & DevOps capability strip

A horizontal technical band connects the service chapters to delivery. It uses the documented `Cloud & DevOps` service copy and the approved stack categories for Cloud and DevOps. Infrastructure nodes, deployment stages, and health signals can be represented as generic capabilities, not live operational metrics.

### D. Delivery process rail

The implementation uses the complete documented process in `marketingContent.process`: Discovery, Planning, Design, Development, Testing, Deployment, and Support.

On desktop, the stages form a connected rail with a progressive signal line. On smaller screens, they become a readable vertical sequence. The rail must not compress, rename, or contradict the seven documented stages.

### E. Capability index

Technology and industry information appears as an editorial taxonomy rather than a logo cloud:

- Technology groups come only from `marketingContent.technologyStack`.
- Industries come only from `marketingContent.industries`.
- Each row presents a category label and its documented items or description.
- Hover and focus states may expose a blue rule or selected-row marker, but all information remains visible without interaction.

### F. Proof of craft

Four compact evidence blocks replace fabricated social proof:

- Methodology
- Engineering Standards
- Deliverables
- Quality & Security

Content must describe how BracketDex works using existing documented process, stack, and why-choose-us statements. It may mention practices already implied by the repository and marketing content, such as clear milestones, scalable architecture, testing, deployment support, and transparent communication. It must not introduce certifications, compliance claims, guaranteed outcomes, numerical performance claims, or unnamed client results.

### G. Light FAQ reset

The page returns to the warm-light canvas for the FAQ section. Questions and answers come directly from `marketingContent.faqs`.

- One item may be expanded by default on desktop.
- Accordions use real buttons with `aria-expanded` and associated panels.
- Keyboard behavior and focus styling are first-class.
- Content remains readable if JavaScript is unavailable.

### H. BracketDex-blue closing CTA

A solid `#1455d9` band closes the redesigned content before the existing footer.

- Heading: use one approved statement from `marketingContent.ctas`, with preference for `Let's Discuss Your Project.`
- Primary action: `Book Consultation` or `Contact Us`, routed to the existing contact destination.
- Secondary text link may point to services or projects if that destination already exists.
- No gradients, floating glass card, fake urgency, or animated background spectacle.

## 6. Component Architecture

The post-hero experience should be isolated from the locked hero and navbar. A suitable structure is:

```text
HomePage
├── existing Navbar (frozen)
├── existing Hero (frozen)
├── PostHeroHome
│   ├── TransitionStatement
│   ├── ServiceChapter × 3
│   │   └── SystemVisual (typed variants)
│   ├── CloudDevOpsStrip
│   ├── DeliveryRail
│   ├── CapabilityIndex
│   ├── ProofOfCraft
│   ├── HomeFaq
│   └── ClosingCta
└── existing Footer (frozen)
```

Recommended placement is under `src/components/home/post-hero/`, with static content rendering in server-compatible components and a small client-only motion/accordion boundary where state or browser APIs are required. The existing `landing-visuals.tsx` may be reused only when a primitive matches the approved direction; obsolete placeholder visuals should not constrain the new architecture.

## 7. Motion System

Use the installed GSAP/Motion stack without adding dependencies.

- GSAP with ScrollTrigger may drive section entry, diagram signal progress, and the desktop process rail.
- Motion may handle small component-level transitions such as accordion height, selected taxonomy rows, or diagram state changes.
- Initial content should be visible in server output. Animation enhances from a stable layout and must not cause cumulative layout shift.
- Avoid broad selectors that can collide with the global progressive text reveal.
- Do not animate the navbar or hero from this feature.
- Avoid scroll hijacking, pinned sections that trap navigation, perpetual ambient motion, cursor followers, and parallax on essential text.
- Under `prefers-reduced-motion: reduce`, skip scroll-driven transforms and show final visual states immediately.
- Clean up GSAP contexts and observers on unmount.

## 8. Responsive Behavior

### Desktop (`>= 1024px`)

- Two-column service chapters with alternating visual balance.
- Seven-stage horizontal delivery rail.
- Wide capability rows and four-column proof-of-craft area where copy remains readable.

### Tablet (`768px–1023px`)

- Service narratives and visuals stack with the narrative first.
- Diagrams retain their structure without tiny labels.
- Process may use a two-column wrapped sequence or vertical rail, chosen by available width.

### Mobile (`< 768px`)

- Single-column flow with reduced section padding.
- All diagrams fit the viewport without horizontal page scrolling.
- Process becomes vertical and preserves the documented order.
- Capability rows wrap naturally; no interaction is required to reveal essential text.
- CTA actions stack and keep touch targets at least `44px` high.

The page must be checked at 320px width and at common tablet and desktop sizes.

## 9. Accessibility and Semantics

- Maintain logical heading order beginning after the existing hero heading.
- Sections receive descriptive headings and optional `aria-labelledby` relationships.
- Decorative grid lines and connectors are hidden from assistive technology.
- Text and controls meet WCAG AA contrast on both warm and dark surfaces.
- Every interactive element is reachable and operable by keyboard with visible focus.
- Accordion state is announced correctly.
- Motion respects reduced-motion preferences.
- Generic diagrams include concise accessible summaries where their structure communicates meaning.

## 10. Content and Trust Rules

- `src/content/marketing.ts` is the source of truth for services, solutions, process, technology, industries, FAQs, company positioning, and CTAs.
- Do not render any `trustMetricPlaceholders` or `projectPlaceholders` as public proof.
- Do not invent statistics, logos, client names, testimonials, screenshots, locations, certifications, or case-study outcomes.
- UI diagrams must be clearly generic representations of systems and workflows.
- Small editorial adaptations are allowed for labels and transitions, but claims must remain within the documented meaning.

## 11. Failure and Progressive-Enhancement Behavior

- If JavaScript does not execute, all core section content, service explanations, process steps, capabilities, and FAQ answers remain available.
- Motion setup failures must leave the final static layout visible.
- Diagrams should use CSS and inline semantic structure so no remote image dependency can break them.
- Links use existing routes; no dead placeholder actions or `#` links are introduced.

## 12. Verification Strategy

Implementation is accepted only when all of the following are true:

1. Contract checks verify that the locked navbar and hero integration remain untouched and that no theme-toggle control exists.
2. Type checking passes.
3. The production build passes.
4. Desktop, tablet, and mobile screenshots confirm the approved hierarchy and no horizontal overflow.
5. Keyboard navigation covers taxonomy links, FAQ controls, and CTA actions.
6. Reduced-motion behavior is manually verified.
7. Browser console shows no hydration, animation cleanup, or missing-key errors.
8. A diff audit confirms no `.bd-nav*`, `.bd-hero*`, hero content, or hero asset changes.

## 13. Acceptance Criteria

- The existing navbar and hero are visually and structurally unchanged.
- The post-hero area matches the approved dark-first reference in hierarchy, color balance, density, and pacing.
- There is no separate theme-toggle button or site-wide theme switcher.
- All seven documented delivery steps are represented once in a coherent sequence.
- Service, technology, industry, FAQ, and CTA content is sourced from approved marketing data.
- No unsupported proof or fabricated interface claim appears.
- GSAP/Motion enhancements are restrained, performant, cleanly scoped, and reduced-motion safe.
- The experience is responsive, accessible, and deployable with the repository's current dependencies.
