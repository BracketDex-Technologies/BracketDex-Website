import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const homePagePath = resolve(root, "src/components/home/home-page.tsx");
const navbarPath = resolve(root, "src/components/marketing/navbar.tsx");
const cssPath = resolve(root, "src/app/globals.css");
const heroAssetPath = resolve(root, "public/media/hero-bg-01.webp");

function normalizeText(value) {
  return value.replace(/\r\n?/g, "\n");
}

const homePage = normalizeText(readFileSync(homePagePath, "utf8"));
const navbar = normalizeText(readFileSync(navbarPath, "utf8"));
const css = normalizeText(readFileSync(cssPath, "utf8"));
const heroAsset = readFileSync(heroAssetPath);

const expectedDigests = {
  navbar: "ae9b1521575f92790fd213032f649725754766113f3a5dc3c3ac8d2b23306264",
  heroAsset: "6b5527ce4704bc31a6fa89ccd497e3099696172dc3317450b2c579250f42be79",
  homeHeroSlice: "141476af6cce19995f7c4bd80bec6f055c3079088d98fe8a05ac4ae570c0efcc",
  frozenLandingCssRange: "269ef3bcb8f7dc80ae7084935e50997fdb0f77b77e9bf1961afefcd5eda4212c",
};

function fail(message) {
  console.error(`Homepage boundary verification failed: ${message}`);
  process.exit(1);
}

function findMarker(source, marker, label) {
  const index = source.indexOf(marker);

  if (index === -1) {
    fail(`missing ${label} marker ${JSON.stringify(marker)}`);
  }

  return index;
}

function sliceBefore(source, startMarker, endMarker, label) {
  const start = findMarker(source, startMarker, `${label} start`);
  const end = source.indexOf(endMarker, start);

  if (end === -1) {
    fail(`missing ${label} end marker ${JSON.stringify(endMarker)}`);
  }

  return source.slice(start, end);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

const navbarIndex = findMarker(homePage, "<Navbar", "Navbar");
const heroIndex = findMarker(homePage, '<div className="bd-hero">', "bd-hero");
const postHeroIndex = findMarker(homePage, "<PostHeroHome", "PostHeroHome");
const footerIndex = findMarker(homePage, "<Footer", "Footer");

if (!(navbarIndex < heroIndex && heroIndex < postHeroIndex && postHeroIndex < footerIndex)) {
  fail("source order must remain Navbar < bd-hero < PostHeroHome < Footer");
}

const heroClosingStart = homePage.lastIndexOf("</div>", postHeroIndex);

if (heroClosingStart === -1 || heroClosingStart < heroIndex) {
  fail("could not locate the hero closing boundary before PostHeroHome");
}

const heroClosingEnd = heroClosingStart + "</div>".length;

if (!/^\s*$/.test(homePage.slice(heroClosingEnd, postHeroIndex))) {
  fail("the hero closing boundary is not immediately before PostHeroHome");
}

const actualDigests = {
  navbar: sha256(navbar),
  heroAsset: sha256(heroAsset),
  homeHeroSlice: sha256(homePage.slice(navbarIndex, heroClosingEnd)),
  frozenLandingCssRange: sha256(
    sliceBefore(css, ".bd-hero {", ".bd-post-hero {", "frozen landing CSS range"),
  ),
};

const mismatches = Object.entries(expectedDigests).filter(
  ([name, expected]) => actualDigests[name] !== expected,
);

if (mismatches.length > 0) {
  for (const [name, expected] of mismatches) {
    console.error(
      `Homepage boundary verification failed: ${name} SHA-256 expected ${expected} but received ${actualDigests[name]}`,
    );
  }

  console.error("Actual SHA-256 digests:");
  for (const [name, digest] of Object.entries(actualDigests)) {
    console.error(`${name}=${digest}`);
  }

  process.exit(1);
}

console.log("Homepage frozen boundary verified.");
