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
  assert.match(home, /Your Business Running Smarter with AI/i);

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
  for (const destination of ["/", "/services", "/solutions", "/projects", "/about", "/faq", "/contact"]) {
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

  for (const label of ["Services", "Solutions", "Projects", "About", "FAQ"]) {
    assert.match(homeHeader, new RegExp(`>${label}<`), `${label} is visible in the primary navbar`);
  }
  assert.doesNotMatch(homeHeader, />Industries</);
});

test("navbar keeps a compact desktop and mobile rhythm", () => {
  const css = readFileSync(new URL("../src/components/marketing/navbar.module.css", import.meta.url), "utf8");
  assert.match(css, /min-height:\s*clamp\(3\.75rem,\s*4\.2vw,\s*4\.5rem\)/);
  assert.match(css, /gap:\s*clamp\(0\.5rem,\s*0\.9vw,\s*1rem\)/);
  assert.match(css, /@media \(max-width:\s*1070px\)[\s\S]*min-height:\s*4rem/);
  assert.match(css, /inset:\s*4rem 0 auto/);
});

test("hero headline uses simple undistorted typography across breakpoints", () => {
  const css = readFileSync(
    new URL("src/components/home/home-hero.module.css", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );

  assert.match(css, /max-width:\s*82rem/);
  assert.match(css, /font-family:\s*var\(--font-hero-body\),\s*sans-serif/);
  assert.match(css, /font-size:\s*clamp\(3rem,\s*5\.75vw,\s*7\.75rem\)/);
  assert.match(css, /font-weight:\s*700/);
  assert.match(css, /letter-spacing:\s*-0\.04em/);
  assert.match(css, /line-height:\s*0\.98/);
  assert.match(css, /text-transform:\s*none/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.titleLine\s*\{[\s\S]*white-space:\s*normal/);
  assert.match(css, /font-size:\s*clamp\(3\.1rem,\s*7vw,\s*5\.75rem\)/);
});

test("hero headline uses the approved AI message", async () => {
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.equal(marketingContent.homepage.hero.headline.label, "Your Business Running Smarter with AI");
  assert.equal(marketingContent.homepage.hero.headline.lines.flat().join(" "), "Your Business Running Smarter with AI");
});

test("hero capability chip keeps compact proportions", () => {
  const css = readFileSync(
    new URL("src/components/home/home-hero.module.css", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  const rail = css.match(/\.capabilityRail \{([^}]+)\}/)?.[1] ?? "";
  const divider = css.match(/\.divider \{([^}]+)\}/)?.[1] ?? "";

  assert.match(rail, /min-height:\s*2rem/);
  assert.match(rail, /padding:\s*0\.4rem 0\.75rem/);
  assert.match(rail, /font-size:\s*0\.62rem/);
  assert.match(rail, /letter-spacing:\s*0\.1em/);
  assert.match(divider, /margin-inline:\s*0\.45rem/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.capabilityRail \{[\s\S]*min-height:\s*1\.9rem/);
});

test("capability strip and problem solution stories remain intact", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(0, 6), ["trust", "why", "services", "process", "capabilities", "problems"]);
  const trust = homeSection(home, "trust");
  const problems = homeSection(home, "problems");
  for (const service of marketingContent.services.slice(0, 4)) {
    assert.ok(trust.includes(service.title.replaceAll("&", "&amp;")), service.title);
  }
  for (const item of marketingContent.homepage.trustMetricPlaceholders) {
    assert.ok(!trust.includes(item.label), `${item.label} is replaced by documented capabilities`);
  }
  assert.match(trust, /data-capability-strip="true"/);
  assert.equal((problems.match(/data-problem-card="true"/g) ?? []).length, 4);
  for (const group of marketingContent.homepage.problemGroups) {
    assert.ok(problems.includes(group.title.replaceAll("&", "&amp;")), group.title);
    for (const challenge of group.challenges) assert.ok(problems.includes(challenge), challenge);
  }
  for (const index of [0, 3, 4, 5]) {
    assert.ok(problems.includes(marketingContent.solutions[index].title), marketingContent.solutions[index].title);
  }
  assert.ok(problems.includes("Cloud &amp; DevOps"));
  assert.ok(problems.includes("Reliable infrastructure"));
  assert.ok(problems.includes("Deployment pipelines"));
  assert.match(problems, /aria-label="Previous problem story"/);
  assert.match(problems, /aria-label="Next problem story"/);
  assert.doesNotMatch(trust, /marquee|\b\d\+\b/i);
});

test("problem section follows technology stack", () => {
  const source = readFileSync(
    new URL("../src/components/home/post-hero/post-hero-home.tsx", import.meta.url),
    "utf8",
  );
  assert.ok(source.indexOf("<CapabilityIndex") < source.indexOf("<ProblemSection"));
  assert.ok(source.indexOf("<ProblemSection") < source.indexOf("<ProjectsSection"));
});

test("five documented services in the interactive bento", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  const services = homeSection(home, "services");
  assert.equal((services.match(/data-service-card=/g) ?? []).length, 5);
  for (const item of marketingContent.services) {
    assert.ok(services.includes(item.title.replaceAll("&", "&amp;")), item.title);
    assert.ok(services.includes(item.description), item.description);
  }
  assert.equal((services.match(/<h3\b/g) ?? []).length, 5);
  assert.equal((services.match(/href="\/(services|solutions)"/g) ?? []).length, 5);
  assert.doesNotMatch(services, /run_[a-z0-9]+|exec_[a-z0-9]+|Last run|Latency|Tokens|Cost|2m ago/i);
});

test("services lead directly into seven process steps", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(2, 4), ["services", "process"]);
  assert.ok(!homeKeys(home).includes("cloud"));
  const process = homeSection(home, "process");
  const titles = [...process.matchAll(/data-process-title[^>]*>([^<]+)<\/strong>/g)].map((match) => match[1]);
  assert.deepEqual(titles, marketingContent.process.map((step) => step.title));
});

test("technology tooltips preserve pointer access", () => {
  const css = readFileSync(new URL("../src/components/home/fresh/technology-network.module.css", import.meta.url), "utf8");
  const tooltip = css.match(/\.tooltip \{([^}]+)\}/)?.[1] ?? "";
  assert.match(tooltip, /pointer-events:\s*auto/);
  assert.match(tooltip, /top:\s*100%/);
});

test("technology network gives large side icons separate connector lanes", () => {
  const css = readFileSync(new URL("../src/components/home/fresh/technology-network.module.css", import.meta.url), "utf8");
  const source = readFileSync(new URL("../src/components/home/fresh/technology-network.tsx", import.meta.url), "utf8");
  assert.match(css, /--tech-icon-size:\s*72px/);
  assert.match(css, /\.node:nth-child\(4\)[\s\S]*\.icon:nth-child\(odd\)/);
  assert.match(css, /\.node:nth-child\(5\)[\s\S]*\.icon:nth-child\(even\)/);
  assert.match(source, /const sy = cy \+ Math\.max/);
});

test("technology stack leads into problem stories", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(4, 6), ["capabilities", "problems"]);
  const capabilities = homeSection(home, "capabilities");
  assert.ok(capabilities.includes('id="tech-stack"'), "technology has its own anchor");
  assert.ok(capabilities.includes('data-tech-wordmark="true"'), "centered brand wordmark renders");
  assert.equal((capabilities.match(/data-tech-node="true"/g) ?? []).length, 7);
  assert.ok(capabilities.includes("Different technologies."));
  assert.ok(capabilities.includes("One connected system."));
  assert.equal((capabilities.match(/data-tech-icon="true"/g) ?? []).length,
    marketingContent.technologyStack.flatMap((group) => group.items).length);
  assert.doesNotMatch(capabilities, /id="industries"|data-industry-card/);
  for (const group of marketingContent.technologyStack) {
    assert.ok(capabilities.includes(group.category), group.category);
    for (const item of group.items) assert.ok(capabilities.includes(`aria-label="${item}"`), item);
  }
});

test("why BracketDex bento follows the hero strip with seven animated visuals", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  const why = homeSection(home, "why");
  assert.deepEqual(homeKeys(home).slice(0, 3), ["trust", "why", "services"]);
  assert.equal((why.match(/data-proof-card/g) ?? []).length, 7);
  assert.equal((why.match(/data-proof-visual=/g) ?? []).length, 7);
  for (const item of marketingContent.whyChooseUs) {
    assert.ok(why.includes(item.title), item.title);
    assert.ok(why.includes(item.description), item.description);
  }

  const css = readFileSync(new URL("../src/components/home/fresh/why-section.module.css", import.meta.url), "utf8");
  assert.match(css, /\.card:hover[\s\S]*\.visual/);
  assert.match(css, /\.card:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("industries route and navigation entry are removed", () => {
  const navigation = readFileSync(new URL("../src/content/site-navigation.ts", import.meta.url), "utf8");
  const marketing = readFileSync(new URL("../src/content/marketing.ts", import.meta.url), "utf8");
  const pages = readFileSync(new URL("../src/content/pages.ts", import.meta.url), "utf8");
  const renderer = readFileSync(new URL("../src/components/pages/static-marketing-page.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(navigation, /href:\s*"\/industries"|label:\s*"Industries"/);
  assert.doesNotMatch(marketing, /label:\s*"Industries",\s*href:\s*"#industries"/);
  assert.doesNotMatch(pages, /^\s{2}industries:\s*\{/m);
  assert.doesNotMatch(renderer, /path === "\/industries"|CapabilityIndex/);
});

test("homepage project showcase uses six documented cards", async () => {
  const { featuredCaseStudies } = await loadDataModule("src/content/case-studies.ts");
  const source = readFileSync(
    new URL("src/components/home/fresh/projects-section.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  const css = readFileSync(
    new URL("src/components/home/fresh/projects-section.module.css", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );

  assert.equal(featuredCaseStudies.length, 6);
  assert.match(source, /projects-section\.module\.css/);
  assert.match(source, /styles\.header/);
  assert.match(source, /styles\.grid/);
  assert.match(source, /data-project-card/);
  assert.match(source, /data-project-row/);
  assert.match(source, /View all projects/);
  assert.match(source, /Start a project/);
  assert.match(css, /grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)\s*!important/);
});

test("conversion panel keeps the existing enquiry flow", () => {
  const source = readFileSync(
    new URL("src/components/home/fresh/cta-section.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  const css = readFileSync(
    new URL("src/components/home/fresh/cta-section.module.css", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  const formSource = readFileSync(
    new URL("src/components/marketing/contact-form.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );

  assert.equal(existsSync(new URL("public/media/conversion/bracketdex-conversion-halftone.png", `file:///${root.replaceAll("\\", "/")}/`)), false);
  assert.match(source, /cta-section\.module\.css/);
  assert.doesNotMatch(source, /next\/image|PixelWordmark|bracketdex-conversion-halftone\.png/);
  assert.match(source, /<ContactForm/);
  assert.match(source, /Email directly/);
  assert.match(source, /data-home-section="cta"/);
  assert.match(source, /styles\.content/);
  assert.match(css, /text-align:\s*center/);
  assert.match(css, /background:\s*#0c0c0c/);
  assert.doesNotMatch(css, /background-image|linear-gradient|radial-gradient/);
  assert.match(formSource, /className\?: string/);
});

test("footer keeps only essential routes and verified BracketDex details", () => {
  const cssUrl = new URL("src/components/marketing/footer.module.css", `file:///${root.replaceAll("\\", "/")}/`);
  const source = readFileSync(
    new URL("src/components/marketing/footer.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  assert.ok(existsSync(cssUrl), "footer CSS module must exist");
  const css = readFileSync(cssUrl, "utf8");

  assert.match(source, /footer\.module\.css/);
  assert.match(source, /ESSENTIAL_FOOTER_LINKS/);
  for (const label of ["Home", "Projects", "Solutions", "Contact us"]) {
    assert.match(source, new RegExp(`"${label}"`));
  }
  assert.match(source, /contactDetails\.email/);
  assert.match(source, /contactDetails\.phone/);
  assert.match(source, /contactDetails\.location/);
  assert.match(source, /Privacy policy/);
  assert.doesNotMatch(source, /Instagram|LinkedIn|WhatsApp|Dribbble/i);
  assert.match(css, /border-radius:\s*clamp/);
  assert.match(css, /#f25623/);
  assert.match(css, /grid-template-columns:\s*minmax\(0, 1fr\)\s+minmax\(0, 1fr\)/);
  assert.match(css, /inset-inline:\s*0/);
  assert.match(css, /width:\s*100%/);
  assert.match(css, /justify-content:\s*center/);
  assert.doesNotMatch(css, /right:\s*50%|translateX\(50%\)/);
});

test("projects and final action close the homepage", async () => {
  const home = await getHtml("/");
  const { featuredCaseStudies } = await loadDataModule("src/content/case-studies.ts");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(6), ["cta"]);
  const projects = home.match(/<section[^>]*id="projects"[\s\S]*?<\/section>/)?.[0] ?? "";
  const cta = homeSection(home, "cta");
  assert.ok(projects, "projects section must render before the final action");
  assert.ok(home.indexOf('id="projects"') < home.indexOf('data-home-section="cta"'));
  for (const study of featuredCaseStudies) {
    assert.ok(projects.includes(study.name), study.name);
    assert.ok(projects.includes(study.benefit), study.benefit);
  }
  assert.ok(cta.includes(marketingContent.ctas[2].replace("'", "&#x27;")));
  assert.doesNotMatch(projects, /20\+ projects delivered/i);
});
