import assert from "node:assert/strict";
import { test } from "node:test";

const base = process.env.SITE_TEST_URL ?? "http://127.0.0.1:3102";
const get = async (path) => {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  return response.text();
};

test("About presents the approved story and values without duplicated marketing sections", async () => {
  const html = await get("/about");
  assert.match(html, /data-minimal-page="about"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /Thoughtful technology\./);
  assert.match(html, /Clear intent\./);
  for (const value of ["Quality First", "Simplicity", "Transparency", "Innovation", "Long-Term Partnership", "Continuous Improvement"]) assert.ok(html.includes(value), value);
  assert.doesNotMatch(html, /Book Consultation|data-project-card|bd-page-display/);
});

test("FAQ exposes five native disclosures and matching structured answers", async () => {
  const html = await get("/faq");
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  const rows = [...html.matchAll(/<details\b([^>]*\bname="general-questions"[^>]*)>[\s\S]*?<summary[^>]*><span>([^<]+)<\/span>[\s\S]*?<p>([^<]+)<\/p>[\s\S]*?<\/details>/g)];
  assert.equal(rows.length, 5);
  assert.ok(rows.every(row => row[1].includes('name="general-questions"')));
  assert.deepEqual(rows.map(row => /\bopen(?:=|\s|$)/.test(row[1])), [true, false, false, false, false]);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const faq = schemas.find(schema => schema["@type"] === "FAQPage");
  assert.ok(faq);
  assert.deepEqual(faq.mainEntity.map(item => [item.name, item.acceptedAnswer.text]), rows.map(row => [row[2], row[3]]));
  assert.match(html, /Still have a question\?/);
  assert.match(html, /href="\/contact">Contact us\./);
  assert.doesNotMatch(html, /Book Consultation|bd-page-display/);
});

test("About and FAQ retain the exact homepage Footer and shared Navbar", async () => {
  const home = await get("/");
  const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];
  const navbarClass = home.match(/<header[^>]*class="([^"]+)"/)[1];
  for (const path of ["/about", "/faq"]) {
    const html = await get(path);
    assert.equal(html.match(/<footer[\s\S]*?<\/footer>/)[0], footer);
    assert.equal(html.match(/<header[^>]*class="([^"]+)"/)[1], navbarClass);
    assert.match(html, new RegExp(`aria-current="page"[^>]*href="${path}"|href="${path}"[^>]*aria-current="page"`));
  }
});
