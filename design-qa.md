# Hero Design QA

## Comparison target

- Source visual truth:
  - `C:\Users\pawan\Downloads\Hero poster_ widescreen 16x9.webp` (1920 × 1080)
  - `C:\Users\pawan\Downloads\Hero poster_ vertical 9x16.webp` (1080 × 1920)
  - `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-12 203456.png`
  - `C:\Users\pawan\OneDrive\Pictures\Screenshots 1\Screenshot 2026-10-12 221748.png`
  - `C:\Users\pawan\Downloads\download (4).jpg`
- Implementation: `http://localhost:3000/`
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

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- P3: add Next.js `data-scroll-behavior="smooth"` migration metadata when global layout work is approved. This warning predates and sits outside the Hero slice.

## Final result

final result: passed
