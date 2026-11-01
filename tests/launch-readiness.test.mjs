import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { randomBytes } from "node:crypto";

const contactFormSource = readFileSync(new URL("../src/components/marketing/contact-form.tsx", import.meta.url), "utf8");
const contactRouteSource = readFileSync(new URL("../src/app/api/contact/route.ts", import.meta.url), "utf8");

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
  const testAddress = `2001:db8:${randomBytes(2).toString("hex")}::1`;
  const post = (body, headers = {}) => fetch(`${base}/api/contact`, {
    method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": testAddress, ...headers }, body: JSON.stringify(body),
  });
  assert.equal((await post({ name: "x", email: "invalid", message: "short" })).status, 400);
  assert.equal((await post({ name: "Test", email: "test@example.com", message: "Honeypot validation only", website: "spam" })).status, 400);
  assert.equal((await post({}, { Origin: "https://unrelated.example" })).status, 403);
});

test("contact delivery stays in the browser so Web3Forms can apply its supported origin checks", () => {
  assert.match(contactFormSource, /https:\/\/api\.web3forms\.com\/submit/);
  assert.match(contactFormSource, /NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY/);
  assert.doesNotMatch(contactRouteSource, /https:\/\/api\.web3forms\.com\/submit/);
});
