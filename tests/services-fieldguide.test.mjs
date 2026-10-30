import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const baseUrl = process.env.SITE_TEST_URL ?? "http://127.0.0.1:3000";

test("services fieldguide exposes all five chapters and consultation actions", async () => {
  const response = await fetch(new URL("/services", baseUrl));
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes("The service fieldguide"), "the approved Fieldguide heading renders");
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0];
  assert.ok(header, "the shared homepage navbar renders");
  assert.match(header, /data-mobile-menu/);
  assert.match(header, /Contact us/);
  assert.match(header, /aria-current="page"[^>]*href="\/services"|href="\/services"[^>]*aria-current="page"/);

  for (const id of ["build", "intelligence", "operations", "infrastructure", "growth"]) {
    assert.ok(html.includes(`id="${id}"`), `${id} chapter exists`);
    assert.ok(html.includes(`href="#${id}"`), `${id} index link exists`);
  }
  for (const service of ["software-development", "ai-solutions", "business-automation", "cloud-devops", "digital-growth"]) {
    assert.ok(html.includes(`href="/contact?service=${service}"`), `${service} action reaches Contact`);
  }
  assert.doesNotMatch(html, /Software Development &amp; Technology Services|How Work Moves Forward|Book Consultation/);
  assert.match(html, /aria-label="Footer navigation"/);
  assert.match(html, /bracketdevs\.teams@gmail\.com/);
});

test("services fieldguide illustration assets are served as PNGs", async () => {
  for (const asset of ["software-stack", "ai-workflow", "automation", "cloud", "growth"]) {
    const response = await fetch(new URL(`/media/services-fieldguide/${asset}.png`, baseUrl));
    assert.equal(response.status, 200, `${asset} loads`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    assert.deepEqual([...bytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], `${asset} is a PNG`);
  }
});

test("fieldguide keyboard focus has at least 3:1 non-text contrast", () => {
  const css = readFileSync(new URL("../src/components/pages/services-fieldguide.module.css", import.meta.url), "utf8");
  const tokens = Object.fromEntries([...css.matchAll(/(--fieldguide-[\w-]+):\s*(#[0-9a-f]{6})/gi)].map((match) => [match[1], match[2]]));
  const focusToken = css.match(/focus-visible\s*\{[^}]*outline:\s*[^;]*var\((--fieldguide-[\w-]+)\)/)?.[1];
  assert.ok(focusToken && tokens[focusToken], "focus color resolves to a declared token");
  const luminance = (hex) => {
    const channels = hex.slice(1).match(/../g).map((value) => parseInt(value, 16) / 255);
    const [r, g, b] = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return r * 0.2126 + g * 0.7152 + b * 0.0722;
  };
  const values = [luminance(tokens[focusToken]), luminance(tokens["--fieldguide-paper"])].sort((a, b) => a - b);
  const ratio = (values[1] + 0.05) / (values[0] + 0.05);
  assert.ok(ratio >= 3, `focus contrast must be at least 3:1; received ${ratio.toFixed(2)}:1`);
});
