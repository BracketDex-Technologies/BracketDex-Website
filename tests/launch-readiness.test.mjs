import assert from "node:assert/strict";
import { test } from "node:test";

const base = process.env.SITE_TEST_URL ?? "http://localhost:3010";

test("missing pages return 404 and confirmation stays out of search", async () => {
  assert.equal((await fetch(`${base}/launch-test-page-does-not-exist`)).status, 404);
  const html = await (await fetch(`${base}/thank-you`)).text();
  assert.match(html, /noindex/);
  assert.doesNotMatch(html, /Thank you \| BracketDex Technologies \|/);
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.doesNotMatch(sitemap, /thank-you/);
  assert.match(sitemap, /https:\/\/www\.bracketdex\.com/);
});

test("invalid and automated enquiries are rejected without sending email", async () => {
  const post = (body, headers = {}) => fetch(`${base}/api/contact`, {
    method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body),
  });
  assert.equal((await post({ name: "x", email: "invalid", message: "short" })).status, 400);
  assert.equal((await post({ name: "Test", email: "test@example.com", message: "Honeypot validation only", website: "spam" })).status, 400);
  assert.equal((await post({}, { Origin: "https://unrelated.example" })).status, 403);
});
