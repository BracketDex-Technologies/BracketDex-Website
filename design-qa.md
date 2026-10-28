# Why section design QA

- Source: selected third concept image, `exec-02c24c1e-dffb-41cb-87b7-88b36c4b04e8.png`.
- Target: homepage `#why` at a desktop viewport near 1440px wide.
- Implementation: `src/components/home/fresh/why-section.tsx`, its CSS module, and three generated illustration assets.
- Source image opened and inspected. Production build and TypeScript check passed.
- Rendered browser capture unavailable: requests to the local server fail with `connect EACCES 127.0.0.1:3001`. The in-app browser also could not reach the local server in this workspace.

Typography, spacing, color, illustration scale and transparency, responsive layout, and copy wrapping need a same-viewport browser comparison before visual fidelity can be marked verified.

final result: blocked
