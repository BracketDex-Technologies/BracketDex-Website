# BracketDex editorial design

## Current applied palette and motion

The approved charcoal (#151619), warm-white (#FAF9F6), mist (#F0F0EC), and cobalt (#315BFF) direction is applied across all routes. Inner pages have light reading surfaces, About has a dark mission panel, and the primary closing CTAs are cobalt. The homepage's cloud/process/capability sections are light, with charcoal cloud diagrams. The Three.js braces use silver material with cobalt rim lighting. GSAP reveals are shorter and gentler, cards trigger individually, and the legacy blur observer is excluded from the BracketDex layout so content does not depend on two competing reveal systems. Reduced-motion support remains.

## Current: coding-bracket identity

Latest code refinement removes the visible pause/resume control and enlarges the canvas code font from 58px to 78px, with a slightly larger texture plane. Offscreen/document pausing and the static reduced-motion presentation remain. Proposed next color system is documented in color-direction.md; it has not been applied.

The braces now contain an illustrative, valid JavaScript array/map snippet. A local canvas texture is mapped onto a Three.js plane in the same group as the braces. GSAP controls typing and the cursor hold/restart sequence. Pause/resume controls, offscreen/document visibility pausing, a static reduced-motion version, and screen-reader code text are included. GSAP and 21st.dev were inspected as references; no 21st.dev component or additional MCP installation was needed.

Latest refinement: the 3D initials have been removed, leaving only a centered pair of cyan curly braces. The company wordmark above the canvas remains unchanged.

The homepage now features a custom Three.js `{BD}` monogram: extruded B/D letterforms with genuine counters and cyan curly braces. Geometry is constructed locally without external fonts or textures. Bounded tilt and floating motion keep the logo readable, with responsive camera framing. The palette is graphite (#0b1220), ice (#f2f6fc), and electric cyan (#36d6ed), applied across the site in premium.css. This supersedes the copper sculpture and forest palette below.

## Forest / ivory refinement

The current design replaces lavender/mint with forest (#102923), ivory (#f4f1e9), sage (#a9c0a8), and copper (#d3a781). `premium.css` contains the shared overrides. Both heading/body font variables now use the existing local Alpino variable font; the reference site's commercial fonts are no longer loaded. The hero uses a custom lit copper torus-knot sculpture, replacing the particle dome. Mobile benefit rows use a fixed icon column and consistent left-aligned text, with stacked full-width CTAs. The WebGL lifecycle retains offscreen pausing, reduced-motion support and disposal.

## October 8 expanded design pass

Taste Skill (https://www.tasteskill.dev/, Leonxlnx/taste-skill) was used as design guidance, not a runtime framework. Dials: variance 7, motion 8, density 4. Its asymmetric composition and purposeful visual guidance informed the split homepage hero. User-requested Athreix typography and section theme changes override Taste defaults. Existing business copy remains intact.

The hero adapts ThreeUI's MIT Structure Flow particle renderer from https://github.com/MengTo/threeui/blob/main/src/shaders/structure-flow/structureFlowRenderer.ts. The local component uses current Three.js, custom BracketDex branding, reduced-motion support, visibility pausing, responsive sizing, resource disposal and a readable WebGL fallback. License: threeui-license.txt. The visual represents software, AI and automation; it is not a client logo or a product screenshot.

GSAP ScrollTrigger drives scroll-scrubbed word illumination, section reveals, brand parallax and oversized inner-page titles. Services, solutions, industries, projects, about, FAQ and contact now use the existing page content with a shared editorial layout. Mobile layouts stack and reduced-motion users receive readable static content.

Reference: https://www.athreix.com/ (inspected October 8, 2026).

The homepage retains the existing BracketDex sections and content, with the requested new tagline and SaaS for MSMEs eyebrow. Styling lives in `src/app/editorial.css`. The updated palette combines midnight (#10101e), lavender (#c9b6ff), mint (#bef7da), and pale lavender sections (#f3f1fa). Entrance motion is recreated locally with GSAP; it is not a copy of the reference site's animation implementation. The hero reveals words in sequence over drifting light and orbital lines; cards and service rows enter in staggered groups on scroll. Hover states add color, elevation, and directional arrow movement. Reduced-motion preferences bypass these animations.

Font assets match the reference's publicly served webfonts:

- `AvantGarde-ExtraLight.woff2`: https://www.athreix.com/_next/static/media/itc_avant_garde_gothic_extra_light-s.p.3d03nvwlu59ks.woff2
- `Alliance-Regular.woff2`: https://www.athreix.com/_next/static/media/alliance_no2_regular-s.p.0v1j2ji-ggihy.woff2

These commercial font assets were obtained for the requested local design preview. Public availability does not establish a license for BracketDex. Confirm the appropriate webfont licenses before publishing, or replace the two local font declarations with licensed alternatives.
