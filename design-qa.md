# Project Atlas design QA

Date: October 30, 2026.

## Result and reference

No actionable P0/P1/P2 findings remain within the approved scope. Existing project cards and shared homepage Navbar/Footer take precedence over their generated approximations. This is a responsive implementation of Project Atlas with deliberate differences for those protected surfaces.

- Reference: `C:/Users/pawan/.codex/visualizations/2026/10/29/01a18877-8b29-76f3-adf5-d195d0d3ea8a/fresh-directions/projects-2.png`.
- Preview: `http://127.0.0.1:3101/projects`.
- Compared state: All sectors, all 18 projects, no context selected.
- Source: 906 x 1737, uniformly normalized to 935px wide.
- Browser: 950 x 879 CSS pixels, document content width 935px, devicePixelRatio approximately 1.
- Raw viewport captures: 935 x 866, uniformly resized to 950 x 880, then cropped to 935px content width.
- Final full implementation: 935 x 5430. Seven overlapping captures use settled scroll offsets. Later frames exclude the top 60px to avoid duplicating the sticky Navbar; earlier frames cover those regions.
- Additional visual checks: 1440px desktop, 390px and 320px mobile.

Evidence directory: `C:/Users/pawan/.codex/visualizations/2026/10/29/01a18877-8b29-76f3-adf5-d195d0d3ea8a/implementation-projects/`.

## Comparison history

1. **P2, title weight and spacing.** The first combined comparison (`desktop-top-v1-comparison.png`) showed a heavier, higher title and an early collection boundary. Newsreader weight 400 and revised spacing restore the composition. The collection now starts at 650.4px versus approximately 654px in the normalized reference.
2. **P2, SVG alignment.** A global SVG rule interfered with transform-based positioning. Scoped individual CSS translation centers the dropdown arrow and context icons. Final arrow center delta is less than 0.01px.

Opened and inspected the source beside the implementation in `desktop-top-final-comparison.png`, `desktop-full-comparison-final.png` and `closing-comparison-final.png`. Standalone evidence: `desktop-top-final.png`, `desktop-1440-final.png`, `desktop-full-final.png`, `mobile-390-final.png`, `mobile-320-final.png`. Capture offsets and geometry: `positions-final.json`.

Previous Solutions QA is archived in `docs/superpowers/qa/2026-10-30-solutions-design-qa.md`. Services QA remains in the same directory.

## Fidelity assessment

| Surface | Assessment |
| --- | --- |
| Typography | Newsreader title and context labels; DM Sans editorial copy and controls. Two approved title lines preserved. Original card and shared chrome typography retained. |
| Layout | Ivory introduction, five orbital contexts, thin-rule toolbar, three-column desktop collection, quiet closing link. Two columns on tablets and one on mobile. |
| Color and borders | Warm ivory, dark ink, pale orbital lines, restrained orange interaction accents. Existing card surfaces and borders unchanged. |
| Assets | Five generated transparent orbital backings with real Lucide icons and accessible, functional buttons. Curves and node positions vary slightly from the image. |
| Controls | Pressed-state buttons and synchronized native select update cards and live result count. Visible hover, focus and selected states. |
| Mobile | Horizontal context rail with exposed scrollbar; readable labels and one-column cards. Toolbar wraps at narrow widths. No document overflow at 390px or 320px. |
| Shared chrome | Actual homepage Navbar and Footer, including existing menu breakpoint, Footer panel proportions and watermark. |

## Intentional differences and preserved boundaries

- The source previews six abbreviated cards. All 18 existing projects retain full original content, card markup, rows, tags, styles and hover behavior. Unabridged content makes the cards and full page taller than the image.
- The card-rendering block matches HEAD after line-ending normalization. Original project stylesheet, case studies and case-study details are unchanged. Only the collection layout and surrounding presentation changed.
- Existing category assignments were extracted without change. Education includes WiseMelon; AI & automation uses the existing Media mapping.
- Initial state correctly shows All sectors and 18 projects. Education becomes orange on hover/focus/selection, avoiding a selected Education context with an incorrect All count.
- Shared Navbar/Footer, home body, Services, Solutions and protected Solutions problem cards were not edited.
- Remaining P3 variation: orbital curves/nodes, minor type tracking and paper tones. No further styling loops warranted.

## Functional and technical verification

- Production build passed using isolated `.next-verify` output; all 17 static pages generated. Standalone TypeScript check passed.
- Eight focused route/asset/taxonomy checks passed across Projects, Services and Solutions. Four existing checks passed for navbar destinations, project-route placement, the six-card homepage showcase and Footer columns/watermark: 12 checks total.
- The new Projects route contract first failed against the previous page before implementation.
- All browser filters displayed the expected names: Education 2; Business & operations 5; CRM & professional services 4; Community & lifestyle 5; AI & automation 2. All sectors resets to 18.
- Keyboard Enter activates Education; native-select Home resets to All. Button state, select value, cards and live count stay synchronized.
- Mobile Menu opens; Escape closes it and restores focus. The brief link reaches `/contact?topic=project-brief` with Contact heading and form visible. No form submitted.
- Final browser error log contains no errors after the final production reload.
- HTTP comparison confirms identical shared Footer markup and homepage Navbar class on Services, Solutions and Projects.
- `git diff --check` passed. Build-generated `next-env.d.ts` and `tsconfig.json` changes restored. No dependency changes, staging, commits or pushes.

Local production preview remains running on port 3101. Nothing deployed.
