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
  const close = html.indexOf("</section>", start);
  const end = Math.min(next === -1 ? Infinity : next, close === -1 ? Infinity : close + "</section>".length);
  return html.slice(start, Number.isFinite(end) ? end : undefined);
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
  assert.match(home, /Your systems,/i);
  assert.match(home, /Working as one\./i);

  const contact = await getHtml("/contact");
  assert.match(contact, /Contact BracketDex Technologies/);
});

test("hero and navigation", async () => {
  const home = await getHtml("/");
  assert.equal((home.match(/<h1\b/g) ?? []).length, 1);
  const hero = home.match(/<section[^>]*data-home-hero="cinematic"[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero, "cinematic hero must render on server");
  for (const label of ["Software", "AI", "Cloud"]) {
    assert.match(hero, new RegExp(`>${label}<`, "i"));
  }
  assert.match(hero, /Custom software, AI, and cloud/);
  assert.match(hero, /href="\/contact"[^>]*>[\s\S]*Discuss Your Project/);
  assert.match(hero, /Hero poster_ widescreen 16x9\.webp/);
  assert.match(hero, /Hero poster_ vertical 9x16\.webp/);
  assert.doesNotMatch(hero, /data-hero-system/);
  assert.doesNotMatch(home, /<canvas\b/);
  assert.doesNotMatch(home, /Loading BracketDex Technologies/);
  for (const asset of [
    "public/media/hero/Hero background loop_ 5s 9x16.webm",
    "public/media/hero/Hero background loop_ 5s 9x16.mp4",
    "public/media/hero/Hero scroll preview_ widescreen 16x9.webm",
    "public/media/hero/Hero scroll preview_ widescreen 16x9.mp4",
    "public/media/hero/Hero poster_ vertical 9x16.webp",
    "public/media/hero/Hero poster_ widescreen 16x9.webp",
  ]) {
    assert.ok(existsSync(new URL(asset, `file:///${root.replaceAll("\\", "/")}/`)), `${asset} required`);
  }
  for (const destination of ["/", "/services", "/solutions", "/industries", "/projects", "/about", "/faq", "/contact"]) {
    assert.ok(home.includes(`href="${destination}"`), `${destination} is present in navigation`);
  }
});

test("navbar overlays the hero and keeps every primary destination reachable", async () => {
  const home = await getHtml("/");
  const contact = await getHtml("/contact");
  const homeHeader = home.match(/<header[\s\S]*?<\/header>/)?.[0];
  const contactHeader = contact.match(/<header[\s\S]*?<\/header>/)?.[0];

  assert.ok(homeHeader, "homepage navbar must render");
  assert.ok(contactHeader, "static-page navbar must render");
  assert.match(homeHeader, /data-overlay="true"/);
  assert.doesNotMatch(contactHeader, /data-overlay="true"/);
  assert.match(homeHeader, /Contact us/);
  assert.match(contactHeader, /Contact us/);

  for (const label of ["Services", "Solutions", "Industries", "Projects", "About", "FAQ"]) {
    assert.match(homeHeader, new RegExp(`>${label}<`), `${label} is visible in the primary navbar`);
  }
});

test("hero headline keeps side breathing across breakpoints", () => {
  const css = readFileSync(
    new URL("src/components/home/home-hero.module.css", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );

  assert.match(css, /max-width:\s*82rem/);
  assert.match(css, /font-size:\s*clamp\(3rem,\s*5\.75vw,\s*7\.75rem\)/);
  assert.match(css, /max-width:\s*18rem/);
  assert.match(css, /font-size:\s*clamp\(1\.85rem,\s*8\.6vw,\s*4\.15rem\)/);
  assert.match(css, /font-size:\s*clamp\(3\.1rem,\s*7vw,\s*5\.75rem\)/);
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

test("three service chapters", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  const services = homeSection(home, "services");
  assert.equal((services.match(/data-home-chapter=/g) ?? []).length, 3);
  for (const item of marketingContent.services.slice(0, 3)) {
    assert.ok(services.includes(item.title), item.title);
    assert.ok(services.includes(item.description), item.description);
  }
  for (const index of [0, 1, 2, 3, 4, 5]) {
    const item = marketingContent.solutions[index];
    assert.ok(services.includes(item.title), item.title);
    assert.ok(services.includes(item.outcome), item.outcome);
  }
  assert.doesNotMatch(services, /Digital Growth|run_[a-z0-9]+|exec_[a-z0-9]+|Last run|Latency|Tokens|Cost|2m ago/i);
});

test("cloud then seven process steps", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(3, 5), ["cloud", "process"]);
  const cloud = homeSection(home, "cloud");
  const process = homeSection(home, "process");
  for (const group of marketingContent.technologyStack.filter((item) => ["Cloud", "DevOps"].includes(item.category))) {
    for (const item of group.items) assert.ok(cloud.includes(item), item);
  }
  const titles = [...process.matchAll(/data-process-title[^>]*>([^<]+)<\/strong>/g)].map((match) => match[1]);
  assert.deepEqual(titles, marketingContent.process.map((step) => step.title));
  assert.doesNotMatch(cloud, /Last updated|Success|Run #/i);
});

test("capabilities industries and proof", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(5, 7), ["capabilities", "why"]);
  const capabilities = homeSection(home, "capabilities");
  const why = homeSection(home, "why");
  for (const group of marketingContent.technologyStack) {
    assert.ok(capabilities.includes(group.category), group.category);
    for (const item of group.items) assert.ok(capabilities.includes(item), item);
  }
  for (const item of marketingContent.industries) {
    assert.ok(capabilities.includes(item.title), item.title);
    assert.ok(capabilities.includes(item.description), item.description);
  }
  for (const item of marketingContent.whyChooseUs) {
    assert.ok(why.includes(item.title), item.title);
    assert.ok(why.includes(item.description), item.description);
  }
  assert.equal((capabilities.match(/data-industry-card/g) ?? []).length, 9);
  assert.equal((why.match(/data-proof-card/g) ?? []).length, 7);
});

test("projects FAQ and final action", async () => {
  const home = await getHtml("/");
  const { featuredCaseStudies } = await loadDataModule("src/content/case-studies.ts");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(7), ["projects", "faq", "cta"]);
  const projects = homeSection(home, "projects");
  const faq = homeSection(home, "faq");
  const cta = homeSection(home, "cta");
  for (const study of featuredCaseStudies) {
    assert.ok(projects.includes(study.name), study.name);
    assert.ok(projects.includes(study.benefit), study.benefit);
  }
  assert.equal((faq.match(/data-faq-item=/g) ?? []).length, 5);
  assert.match(faq, /aria-expanded="true"/);
  assert.ok(cta.includes(marketingContent.ctas[2]));
  assert.doesNotMatch(projects, /20\+ projects delivered/i);
});
