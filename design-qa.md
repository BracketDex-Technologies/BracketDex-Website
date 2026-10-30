# Services Fieldguide design QA

Date: October 30, 2026.

## Comparison target

- Source: `C:/Users/pawan/.codex/visualizations/2026/10/29/01a18877-8b29-76f3-adf5-d195d0d3ea8a/fresh-directions/services-2.png` — the selected fresh Services direction 2.
- Implementation: `http://127.0.0.1:3101/services`, using the production build.
- State: ivory desktop page, all five service chapters present, mobile menu closed, real home Footer retained.
- Reference pixels: 935 × 1681. Browser override: 950 × 879 CSS pixels, with a 935px document content width and devicePixelRatio approximately 1.
- IAB viewport capture: 935 × 866 pixels. Captures are uniformly resized to 950px wide, then cropped to the 935px content width to remove the scrollbar. The full implementation is 935 × 2046 pixels. The extra footer height follows the existing home Footer rather than the mockup's abbreviated footer.
- Full-page capture is unavailable through this browser surface. Three overlapping viewport captures are stitched at recorded, settled scroll positions. Captures taken while smooth scrolling was moving were discarded and replaced.

Evidence folder: `C:/Users/pawan/.codex/visualizations/2026/10/29/01a18877-8b29-76f3-adf5-d195d0d3ea8a/implementation-services/`.

## Evidence

- `desktop-full-comparison-final.png`: reference on the left and implementation on the right at the same content width.
- `software-detail-comparison.png`: focused comparison of the main serif heading, copy, spacing and consultation control.
- `ai-and-supporting-comparison.png`: focused comparison of the workflow, chapter dividers, illustrations, descriptions and lower actions.
- `desktop-top-final.png`, `desktop-middle-final.png`, `desktop-bottom-final.png`: original production viewport captures.
- `capture-positions-final.json`: viewport, page dimensions and scroll offsets used for stitching.
- `mobile-390-final.png`, `mobile-menu-final.png`, `mobile-skip-focus-final.png`: final mobile layout, menu and focused skip-link evidence.
- `mobile-320-top.png`, `mobile-320-growth.png`, `desktop-1440-top.png`: additional responsive evidence from the implementation checks.

## Findings and comparison history

1. **P1, invisible page text:** The global progressive reveal stylesheet hid inner-page headings and links even though the observer excludes inner pages. Services now explicitly renders this text without inherited reveal transforms or opacity. Post-fix evidence begins at `desktop-top-v2.png`.
2. **P2, typography and illustration framing:** High-specificity legacy resets suppressed heading weights and margins. Transparent asset padding made lower illustrations too small and pushed content down. Low-specificity resets, explicit heading wraps and fitted image frames correct these issues. Compare intermediate v4/v5 captures with `desktop-full-comparison-v6.png`.
3. **P2, home Footer context:** Rendering Footer without its existing closing-card context changed its framing. Services now uses the same closing shell, card and Footer component as home. Shared Footer code is unchanged.
4. **P2, keyboard focus contrast:** The first orange focus outline had 2.93:1 contrast on ivory. A darker focus token replaces it; the focused contrast test failed before the change and passes afterward. Escape closes the mobile menu and restores focus to its summary.
5. **P2, inherited offscreen shadow:** The global skip link remained above the viewport but cast its 64px shadow onto the ivory surface. A selector scoped through Services removes the shadow only while that link is unfocused. Its focused keyboard state is preserved. The final production captures and combined comparisons show the corrected ivory surface; browser inspection confirms the hidden shadow is `none` and the focused link remains visible.

The final full-view and focused comparisons contain no actionable P0/P1/P2 findings. The remaining P3 differences are recorded below.

## Required fidelity surfaces

| Surface | Review |
| --- | --- |
| Fonts and typography | Newsreader display text and DM Sans body text follow the selected direction. The main heading is one line at the reference width. Software and AI headings preserve their intended hierarchy and line groups. Mobile headings wrap naturally. |
| Spacing and layout | Software uses the dominant split composition, AI uses a narrow copy column beside its workflow, and the last three services share a divided row. Image transparency is framed without stretching. Mobile stacks these regions. |
| Colors and tokens | Ivory, near-black text, thin gray rules and restrained orange accents match the source palette. Focus uses a darker orange for visibility. The original home Footer remains dark. |
| Image quality | Five individual transparent PNGs match the technical line-art subjects and orange accents. Real brand assets and Lucide arrow/menu icons are reused. The page mockup is not embedded as the interface. |
| Copy and content | Selected headings, descriptions, labels and actions are editable HTML. The workflow is marked illustrative. Existing home Footer copy and contact details take priority over generated footer text. No metrics or customer claims were added. |

## Behavior and regression checks

- All five chapter anchors and all five consultation destinations pass the production route test. Intelligence and Growth navigation were exercised in the browser.
- The Software action opens `/contact?service=software-development`; the existing contact heading and form are visible. No form was submitted.
- Mobile menu opening and closing, selecting a menu link, Escape focus restoration and visible focus styling were checked at 390px. The final skip link appears at 16px from the viewport top when focused and casts no shadow while hidden.
- At 320px, 390px and 1440px, the page has no horizontal document overflow. The narrow Growth section remains readable with its action visible.
- All visible illustration assets load. The browser error log is empty.
- TypeScript passes. The production build generates all 17 static pages. Three Services tests and six selected existing regression checks pass.
- Existing checks cover home/contact routing, primary navigation, the protected Solutions problem section, Projects placement and six documented project cards, and the shared Footer.
- Reduced-motion readability follows the static scoped styles; separate browser media emulation was not performed.

## Intentional constraints and remaining polish

The home Footer is reused with its actual framing, typography and contact details, as requested. Its height and surrounding card differ from the generated mockup. This is intentional.

P3: Generated illustration strokes and a few small copy line breaks differ from the raster mock. The service body ends about 46px lower at the reference width. These differences do not hide content or alter the selected page structure.

## Completion checklist

- [x] Implement only Services from the selected image.
- [x] Preserve home, shared Footer source, project cards and Solutions problem cards.
- [x] Verify links, menu, focus, responsive rendering, assets and browser errors.
- [x] Pass TypeScript, production build and focused regression checks.
- [x] Compare the final production capture after removing the inherited skip-link shadow.

## Follow-up: shared homepage navigation

The user replaced the mockup's custom Services header with the homepage Navbar as the default for every marketing page. Services now renders that same component in its standard inner-page state, with Services active and the Contact us action present. Its chapter navigation remains within the page body, with a sticky-header scroll offset. The unused custom header and its CSS were removed.

Production checks confirm that Services, Solutions, Projects, About, FAQ, Contact and Privacy use the same Navbar class and identical Footer markup as home. All three Services tests pass. Desktop at 1440px and mobile at 390px have no horizontal overflow; the shared mobile menu opens, Escape closes it and restores focus, and the browser error log is empty.

Latest evidence: `shared-navbar-desktop.png` and `shared-navbar-mobile-menu.png` in the evidence folder. Both captures were opened and inspected. Earlier full-page comparisons document the approved page body; their custom header has intentionally been superseded by this request.

The normal production build collided with an already running Turbopack dev server's `.next` output. An optional `NEXT_BUILD_DIR` override and ignored `.next-verify` folder isolate verification. `NEXT_BUILD_DIR=.next-verify npm run build` passes, including type checking and all 17 static pages. The default build directory remains `.next`.

final result: passed
