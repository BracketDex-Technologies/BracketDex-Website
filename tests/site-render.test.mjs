import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("..", import.meta.url));
const baseUrl = process.env.SITE_TEST_URL ?? "http://127.0.0.1:3000";

async function getHtml(path) {
  const response = await fetch(new URL(path, baseUrl));
  assert.equal(response.status, 200, `${path} must render`);
  return response.text();
}

async function loadDataModule(path) {
  const source = readFileSync(new URL(path, `file:///${root.replaceAll("\\", "/")}/`), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`);
}

function homeKeys(html) {
  return [...html.matchAll(/data-home-section="([^"]+)"/g)].map((match) => match[1]);
}

function homeSection(html, key) {
  const start = html.indexOf(`data-home-section="${key}"`);
  assert.notEqual(start, -1, `${key} section must render`);
  const next = html.indexOf('data-home-section="', start + 1);
  return html.slice(start, next === -1 ? undefined : next);
}

test("local fonts and route baseline", async () => {
  for (const asset of [
    "src/assets/fonts/stint-ultra-expanded/StintUltraExpanded-Regular.ttf",
    "src/assets/fonts/stint-ultra-expanded/OFL.txt",
    "src/assets/fonts/pontano-sans/PontanoSans-VariableFont_wght.ttf",
    "src/assets/fonts/pontano-sans/OFL.txt",
  ]) {
    assert.ok(existsSync(new URL(asset, `file:///${root.replaceAll("\\", "/")}/`)), `${asset} required`);
  }

  const home = await getHtml("/");
  assert.match(home, /AI that works for the business you’ve built\./);

  const contact = await getHtml("/contact");
  assert.match(contact, /Contact BracketDex Technologies/);
});

test("hero and navigation", async () => {
  const home = await getHtml("/");
  assert.equal((home.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(home.indexOf('href="/contact"') < home.indexOf('data-hero-system="true"'));
  const heroSvg = home.match(/<svg[^>]*data-hero-system="true"[\s\S]*?<\/svg>/)?.[0];
  assert.ok(heroSvg, "hero system SVG must render on server");
  for (const label of ["Software", "AI", "Automation", "Cloud"]) {
    assert.match(heroSvg, new RegExp(label));
  }
  assert.match(heroSvg, /data-pointer-layer/);
  assert.doesNotMatch(home, /<canvas\b/);
  assert.doesNotMatch(home, /Loading BracketDex Technologies/);
  for (const destination of ["/", "/services", "/solutions", "/industries", "/projects", "/about", "/faq", "/contact"]) {
    assert.ok(home.includes(`href="${destination}"`), `${destination} is present in navigation`);
  }
});

test("trust then problems", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(0, 2), ["trust", "problems"]);
  const trust = homeSection(home, "trust");
  const problems = homeSection(home, "problems");
  for (const item of marketingContent.homepage.trustMetricPlaceholders) {
    assert.ok(trust.includes(item.label), item.label);
    assert.ok(!trust.includes(item.placeholder), "placeholder instructions are not public copy");
  }
  for (const group of marketingContent.homepage.problemGroups) {
    assert.ok(problems.includes(group.title), group.title);
    for (const challenge of group.challenges) assert.ok(problems.includes(challenge), challenge);
  }
  assert.doesNotMatch(trust, /marquee|\b\d\+\b/i);
});
