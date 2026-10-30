import assert from "node:assert/strict";
import { test } from "node:test";

const base = process.env.SITE_TEST_URL ?? "http://127.0.0.1:3101";

test("solutions offers the selected scenario journey and retains the problem rail", async () => {
  const response = await fetch(`${base}/solutions`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /What would better look like\?/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((html.match(/role="tab"/g) ?? []).length, 3);
  assert.match(html, /aria-selected="true"/);
  const readable = html.replace(/<[^>]+>/g, "");
  for (const text of ["Every approval needs a chase.", "Give each decision an owner.", "Work has a visible next step.", "A useful solution has a clear test."]) assert.ok(readable.includes(text), text);
  assert.equal((html.match(/data-problem-card="true"/g) ?? []).length, 4);
  assert.match(html, /aria-label="Previous problem story"/);
  assert.match(html, /aria-label="Next problem story"/);
  assert.match(html, /href="\/contact\?scenario=repeated-approvals"/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /aria-label="Footer navigation"/);
  assert.doesNotMatch(html, /Book Consultation/);
});

test("solutions illustrations are individually served PNGs", async () => {
  for (const file of ["before", "change", "after", "notebook"]) {
    const res = await fetch(`${base}/media/solutions-scenarios/${file}.png`);
    assert.equal(res.status, 200, file);
    assert.deepEqual([...new Uint8Array(await res.arrayBuffer()).slice(0, 8)], [137,80,78,71,13,10,26,10]);
  }
});
