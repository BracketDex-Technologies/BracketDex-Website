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
  assert.match(contact, /<h1>Contact us\.<\/h1>/);
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
  const source = readFileSync(new URL("../src/components/marketing/navbar.tsx", import.meta.url), "utf8");
  assert.match(css, /min-height:\s*clamp\(3\.5rem,\s*3\.7vw,\s*3\.6rem\)/);
  assert.match(css, /width:\s*min\(calc\(100% - 4rem\),\s*75rem\)/);
  assert.match(css, /margin-inline:\s*auto/);
  assert.match(css, /border-bottom:\s*0\.5px solid rgb\(23 23 23 \/ 14%\)/);
  assert.match(css, /data-scrolled="true"[\s\S]*background:\s*transparent[\s\S]*backdrop-filter:\s*blur\(16px\)/);
  assert.match(css, /data-surface="dark"[\s\S]*background:\s*rgb\(255 255 255 \/ 14%\)/);
  assert.doesNotMatch(css, /linear-gradient/);
  assert.doesNotMatch(css, /background:\s*rgb\(255 255 255 \/ 52%\)/);
  assert.match(source, /document[\s\S]*\.elementsFromPoint\(/);
  assert.match(source, /header\.dataset\.surface\s*=/);
  assert.match(css, /gap:\s*clamp\(0\.5rem,\s*0\.9vw,\s*1rem\)/);
  assert.match(css, /@media \(max-width:\s*1070px\)[\s\S]*width:\s*100%[\s\S]*min-height:\s*3\.25rem/);
  assert.match(css, /inset:\s*3\.25rem 0 auto/);
  assert.match(source, /bracketdex-logo-regular-dark\.svg/);
  assert.match(source, /bracketdex-logo-regular-light\.svg/);
  assert.match(css, /--logo-dark-display:\s*block/);
  assert.match(css, /--logo-light-display:\s*block/);
});

test("trust strip keeps a compact vertical rhythm", () => {
  const css = readFileSync(new URL("../src/components/home/fresh/trust-strip.module.css", import.meta.url), "utf8");
  assert.match(css, /padding-block:\s*clamp\(0\.5rem,\s*0\.8vw,\s*0\.7rem\)/);
  assert.match(css, /font-size:\s*clamp\(0\.9rem,\s*1\.25vw,\s*1\.18rem\)/);
  assert.match(css, /font-weight:\s*560/);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*padding-block:\s*0\.55rem/);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*font-size:\s*0\.86rem/);
});

test("hero headline uses simple undistorted typography across breakpoints", () => {
  const css = readFileSync(
    new URL("src/components/home/home-hero.module.css", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );

  assert.match(css, /max-width:\s*68rem/);
  assert.match(css, /font-family:\s*var\(--font-hero-body\),\s*sans-serif/);
  assert.match(css, /font-size:\s*clamp\(3rem,\s*4\.6vw,\s*5\.75rem\)/);
  assert.match(css, /font-weight:\s*680/);
  assert.match(css, /letter-spacing:\s*-0\.045em/);
  assert.match(css, /line-height:\s*1\.02/);
  assert.match(css, /word-spacing:\s*0\.01em/);
  assert.match(css, /text-transform:\s*none/);
  assert.match(css, /\.titleLine:nth-child\(2\)[\s\S]*color:\s*rgb\(255 250 243 \/ 76%\)/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.titleLine\s*\{[\s\S]*white-space:\s*normal/);
  assert.match(css, /font-size:\s*clamp\(2\.75rem,\s*7vw,\s*5\.25rem\)/);
});

test("hero headline uses the approved AI message", async () => {
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.equal(marketingContent.homepage.hero.headline.label, "Your Business Running Smarter with AI");
  assert.equal(marketingContent.homepage.hero.headline.lines.flat().join(" "), "Your Business Running Smarter with AI");
  assert.equal(marketingContent.homepage.hero.supportingLine, "Automate workflows, connect systems, and scale with confidence.");
});

test("hero subtitle keeps full desktop copy and a compact mobile summary", async () => {
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  const source = readFileSync(
    new URL("src/components/home/home-hero.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  const css = readFileSync(
    new URL("src/components/home/home-hero.module.css", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );

  assert.equal(
    marketingContent.homepage.hero.mobileSummary,
    "Custom software, AI, and cloud for your business—automate workflows, connect systems, scale confidently.",
  );
  assert.match(source, /styles\.desktopSubtitle/);
  assert.match(source, /styles\.mobileSubtitle/);
  assert.match(source, /hero\.mobileSummary/);
  assert.match(css, /\.mobileSubtitle[\s\S]*display:\s*none/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.desktopSubtitle[\s\S]*display:\s*none/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.mobileSubtitle[\s\S]*display:\s*block/);
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

test("capability marquee stays on home and problem stories move to solutions", async () => {
  const home = await getHtml("/");
  const solutionsPage = await getHtml("/solutions");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(0, 6), ["trust", "why", "services", "process", "capabilities", "cta"]);
  assert.ok(!homeKeys(home).includes("problems"));
  assert.ok(!homeKeys(home).includes("projects"));
  const trust = homeSection(home, "trust");
  const problems = homeSection(solutionsPage, "problems");
  for (const service of marketingContent.services.slice(0, 4)) {
    assert.ok(trust.includes(service.title.replaceAll("&", "&amp;")), service.title);
  }
  for (const item of marketingContent.homepage.trustMetricPlaceholders) {
    assert.ok(!trust.includes(item.label), `${item.label} is replaced by documented capabilities`);
  }
  assert.match(trust, /data-capability-strip="true"/);
  assert.match(trust, /data-capability-marquee="true"/);
  assert.ok(trust.includes("SEO &amp; Growth"));
  assert.ok(trust.includes("SaaS Platforms"));
  assert.equal((trust.match(/data-marquee-copy="true"/g) ?? []).length, 2);
  assert.ok((trust.match(/data-capability-star="true"/g) ?? []).length >= 12);
  assert.doesNotMatch(trust, />0[1-9]</);
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
  assert.doesNotMatch(trust, /\b\d\+\b/i);
});

test("problem section renders only on the solutions page", () => {
  const homeSource = readFileSync(
    new URL("../src/components/home/post-hero/post-hero-home.tsx", import.meta.url),
    "utf8",
  );
  const pageSource = readFileSync(
    new URL("../src/components/pages/static-marketing-page.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(homeSource, /ProblemSection/);
  assert.match(pageSource, /isSolutions && <ProblemSection content=\{marketingContent\}/);
  assert.match(pageSource, /isSolutions && <a href="#problems"/);
});

test("projects section renders only on the projects page", () => {
  const homeSource = readFileSync(
    new URL("../src/components/home/post-hero/post-hero-home.tsx", import.meta.url),
    "utf8",
  );
  const pageSource = readFileSync(
    new URL("../src/components/pages/static-marketing-page.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(homeSource, /ProjectsSection/);
  assert.match(pageSource, /isProjects \? <ProjectsSection all \/>/);
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

test("service bento cards use opposing neumorphic shadows", () => {
  const css = readFileSync(new URL("../src/components/home/fresh/services-bento.module.css", import.meta.url), "utf8");
  const card = css.match(/\.card \{([^}]+)\}/)?.[1] ?? "";
  const hover = css.match(/\.card:hover, \.card:focus-within \{([^}]+)\}/)?.[1] ?? "";
  assert.match(card, /box-shadow:[^;]*14px 14px 30px[^;]*-10px -10px 26px/s);
  assert.match(hover, /box-shadow:[^;]*18px 18px 36px[^;]*-12px -12px 30px/s);
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
  assert.match(source, /bracketdex-logo-regular-light\.svg/);
});

test("technology stack leads into the final action on the homepage", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.deepEqual(homeKeys(home).slice(4, 6), ["capabilities", "cta"]);
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

test("why BracketDex shows six working principles in three visual pillars", async () => {
  const home = await getHtml("/");
  const why = homeSection(home, "why");
  assert.deepEqual(homeKeys(home).slice(0, 3), ["trust", "why", "services"]);
  assert.ok(why.includes("How We Work Together"));
  assert.ok(why.includes("Six practical principles"));
  assert.equal((why.match(/<article\b/g) ?? []).length, 3);
  assert.equal((why.match(/<li\b/g) ?? []).length, 6);
  assert.ok(!why.includes("Chew. Digest. Deliver."));
  for (const title of ["Clarity", "Execution", "Continuity", "Discuss. Agree. Document.", "Understand the Why", "Accurate Speed", "Get the Job Done", "No Single Point of Failure", "Build Better Together"]) {
    assert.ok(why.includes(title), title);
  }
  for (const image of ["clarity.png", "execution.png", "continuity.png"]) assert.ok(why.includes(image), image);

  const css = readFileSync(new URL("../src/components/home/fresh/why-section.module.css", import.meta.url), "utf8");
  assert.match(css, /\.pillars\s*\{[^}]*grid-template-columns:\s*repeat\(3/);
  assert.match(css, /@media \(max-width:\s*1000px\)/);
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

test("homepage closing content uses one shared shell", () => {
  const stackUrl = new URL(
    "src/components/home/fresh/home-closing-stack.tsx",
    `file:///${root.replaceAll("\\", "/")}/`,
  );
  const homeSource = readFileSync(
    new URL("src/components/home/home-page.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  const postHeroSource = readFileSync(
    new URL("src/components/home/post-hero/post-hero-home.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  const stackExists = existsSync(stackUrl);
  const stackSource = stackExists ? readFileSync(stackUrl, "utf8") : "";
  const stackCss = readFileSync(
    new URL(
      "src/components/home/fresh/home-closing-stack.module.css",
      `file:///${root.replaceAll("\\", "/")}/`,
    ),
    "utf8",
  );

  assert.equal(stackExists, true);
  assert.match(homeSource, /<HomeClosingStack content=\{content\}/);
  assert.doesNotMatch(postHeroSource, /FreshCta/);
  assert.match(stackSource, /<FreshCta content=\{content\} \/>[\s\S]*<Footer/);
  assert.match(stackSource, /styles\.card/);
  assert.match(stackCss, /\.card[\s\S]*border-radius:\s*clamp/);
  assert.match(stackCss, /\.card[\s\S]*overflow:\s*hidden/);
  assert.match(stackCss, /\.card[\s\S]*padding:\s*0\.5rem 0\.5rem 0/);
  assert.match(stackCss, /\.card[\s\S]*gap:\s*0\.5rem/);
});

test("conversion panel uses the approved split artwork layout", () => {
  const source = readFileSync(
    new URL("src/components/home/fresh/cta-section.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  const css = readFileSync(
    new URL("src/components/home/fresh/cta-section.module.css", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  const pageSource = readFileSync(
    new URL("src/components/pages/static-marketing-page.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );

  assert.equal(existsSync(new URL("public/media/cta/ascii-magic-characters.png", `file:///${root.replaceAll("\\", "/")}/`)), true);
  assert.match(source, /cta-section\.module\.css/);
  assert.match(source, /from "next\/image"/);
  assert.match(source, /ascii-magic-characters\.png/);
  assert.match(source, /width=\{736\}/);
  assert.match(source, /height=\{785\}/);
  assert.match(source, /href="\/contact"/);
  assert.match(source, /href="\/projects"/);
  assert.doesNotMatch(source, /ContactForm/);
  assert.match(pageSource, /<ContactForm \/>/);
  assert.match(source, /data-home-section="cta"/);
  assert.match(source, /styles\.artwork/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*0\.9fr\) minmax\(0,\s*1\.1fr\)/);
  assert.match(css, /height:\s*auto/);
  assert.match(css, /text-align:\s*left/);
  assert.match(css, /border:\s*1px solid rgb\(255 253 248 \/ 8%\)/);
  assert.match(css, /border-radius:\s*1rem/);
  assert.match(css, /background:\s*#0c0c0c/);
  assert.match(css, /\.section[\s\S]*padding:\s*0\s*!important/);
  assert.match(css, /\.section[\s\S]*background:\s*transparent\s*!important/);
  assert.match(css, /\.shell[\s\S]*width:\s*100%\s*!important[\s\S]*margin-inline:\s*0/);
  assert.match(css, /\.artwork img[\s\S]*position:\s*relative[\s\S]*width:\s*100%\s*!important[\s\S]*height:\s*auto\s*!important/);
  assert.doesNotMatch(css, /height:\s*200%\s*!important/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.copy[\s\S]*text-align:\s*center/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.actions[\s\S]*width:\s*100%/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.artwork[\s\S]*opacity:\s*0\.14/);
});

test("footer uses expanded route columns and a mostly visible watermark", () => {
  const cssUrl = new URL("src/components/marketing/footer.module.css", `file:///${root.replaceAll("\\", "/")}/`);
  const source = readFileSync(
    new URL("src/components/marketing/footer.tsx", `file:///${root.replaceAll("\\", "/")}/`),
    "utf8",
  );
  assert.ok(existsSync(cssUrl), "footer CSS module must exist");
  const css = readFileSync(cssUrl, "utf8");

  assert.match(source, /footer\.module\.css/);
  assert.match(source, /FOOTER_LINK_GROUPS/);
  assert.match(source, /description/);
  for (const label of ["Home", "Services", "Solutions", "Projects", "About", "FAQ", "Contact"]) {
    assert.match(source, new RegExp(`"${label}"`));
  }
  assert.match(source, /Explore/);
  assert.match(source, /Company/);
  assert.match(source, /contactDetails\.email/);
  assert.match(source, /contactDetails\.phone/);
  assert.match(source, /contactDetails\.location/);
  assert.match(source, /Privacy policy/);
  assert.doesNotMatch(source, /Instagram|LinkedIn|WhatsApp|Dribbble/i);
  assert.match(css, /#f25623/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*1\.3fr\) minmax\(0,\s*1fr\)/);
  assert.match(css, /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /\.shell[\s\S]*width:\s*100%\s*!important[\s\S]*margin-inline:\s*0/);
  assert.match(css, /\.wordmark[\s\S]*width:\s*100%/);
  assert.match(css, /\.wordmark[\s\S]*aspect-ratio:\s*572\.25\s*\/\s*103\.5/);
  assert.match(css, /mask:\s*url\("\/media\/brand\/bracketdex-logo-regular-light\.svg"\) center \/ 103% auto/);
  assert.match(source, /bracketdex-logo-regular-dark\.svg/);
  assert.match(source, /bracketdex-logo-regular-light\.svg/);
  assert.match(css, /:global\(\[data-home-closing-shell\]\) \.footer \.brand \.brandLogoDark\s*\{\s*display:\s*none/);
  assert.match(css, /:global\(\[data-home-closing-shell\]\) \.footer \.brand \.brandLogoLight\s*\{\s*display:\s*block/);
  assert.match(css, /\.watermarkStage\s*\{[^}]*overflow:\s*hidden;[^}]*background:\s*linear-gradient/);
  assert.match(css, /:global\(\[data-home-closing-shell\]\) \.footer\s*\{[^}]*width:\s*calc\(100% \+ 1rem\);[^}]*margin-inline:\s*-0\.5rem/);
  assert.match(css, /\.wordmark[\s\S]*opacity:\s*0\.6/);
  assert.match(css, /\.wordmark[\s\S]*transform:\s*translateY\(29%\)/);
  assert.match(css, /justify-content:\s*center/);
  assert.match(css, /\.panel[\s\S]*background:\s*transparent[\s\S]*border:\s*0[\s\S]*border-radius:\s*0[\s\S]*box-shadow:\s*none/);
  assert.doesNotMatch(css, /\.base[\s\S]*border-top/);
  assert.match(source, /styles\.identity/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.identity[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.brand[\s\S]*width:\s*min\(100%,\s*20rem\)/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.contact[\s\S]*text-align:\s*left[\s\S]*white-space:\s*normal/);
});

test("final action closes the homepage without duplicated projects", async () => {
  const home = await getHtml("/");
  const { marketingContent } = await loadDataModule("src/content/marketing.ts");
  assert.equal(homeKeys(home).at(-1), "cta");
  assert.ok(!homeKeys(home).includes("projects"));
  assert.doesNotMatch(home, /<section[^>]*id="projects"/);
  const cta = homeSection(home, "cta");
  assert.ok(cta.includes(marketingContent.ctas[2].replace("'", "&#x27;")));
  assert.match(cta, /href="\/contact"/);
  assert.match(cta, /href="\/projects"/);
  assert.match(cta, /ascii-magic-characters\.png/);
});
