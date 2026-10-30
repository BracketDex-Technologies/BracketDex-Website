import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const base = process.env.SITE_TEST_URL ?? "http://127.0.0.1:3101";
async function dataModule(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

test("Project Atlas keeps the complete portfolio and offers context navigation", async () => {
  const res = await fetch(`${base}/projects`);
  assert.equal(res.status, 200);
  const html = await res.text();
  const text = html.replace(/<[^>]+>/g, "");
  assert.ok(text.includes("Different contexts. Useful systems."));
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((html.match(/data-project-card(?:=|\s|>)/g) ?? []).length, 18);
  assert.equal((html.match(/data-atlas-context=/g) ?? []).length, 5);
  assert.match(html, /aria-label="Project context"/);
  assert.match(text, /All sectors · 18 projects/);
  assert.match(html, /href="\/contact\?topic=project-brief"/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /aria-label="Footer navigation"/);
  assert.doesNotMatch(html, /Book Consultation/);
});

test("every portfolio item belongs to exactly one Atlas context", async () => {
  const { caseStudies } = await dataModule("../src/content/case-studies.ts");
  const { projectCategories, projectMatchesCategory } = await dataModule("../src/content/project-categories.ts");
  const contexts = projectCategories.filter((name) => name !== "All");
  assert.equal(caseStudies.length, 18);
  for (const study of caseStudies) {
    assert.equal(contexts.filter((context) => projectMatchesCategory(study.category, context)).length, 1, study.name);
    assert.ok(projectMatchesCategory(study.category, "All"));
  }
  for (const context of contexts) assert.ok(caseStudies.some((study) => projectMatchesCategory(study.category, context)), context);
  assert.ok(projectMatchesCategory(caseStudies.find((study) => study.name === "WiseMelon").category, "Education"));
});

test("Atlas orbital illustrations load individually", async () => {
  for (const asset of ["education", "operations", "crm", "community", "automation"]) {
    const res = await fetch(`${base}/media/project-atlas/${asset}.png`);
    assert.equal(res.status, 200, asset);
    assert.deepEqual([...new Uint8Array(await res.arrayBuffer()).slice(0, 8)], [137,80,78,71,13,10,26,10]);
  }
});
