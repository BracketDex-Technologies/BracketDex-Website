import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

async function loaderModule(name) {
  const file = new URL(`../src/components/marketing/site-loader-${name}.ts`, import.meta.url);
  const source = readFileSync(file, "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

test("loader lands on the exact navbar image bounds across viewport sizes", async () => {
  const { getLoaderPlacement } = await loaderModule("geometry");
  for (const [viewportWidth, viewportHeight, width, target] of [
    [1440, 900, 440, { left: 120, top: 9, width: 181.44, height: 32.815 }],
    [390, 844, 304.2, { left: 20, top: 11.675, width: 158.4, height: 28.65 }],
    [320, 568, 249.6, { left: 16, top: 12.978, width: 144, height: 26.044 }],
  ]) {
    const height = width * target.height / target.width;
    const result = getLoaderPlacement({ viewportWidth, viewportHeight, width, height, target }, 1, 0);
    assert.equal(result.x, target.left);
    assert.equal(result.y, target.top);
    assert.ok(Math.abs(width * result.scale - target.width) < 0.00001);
    assert.ok(Math.abs(height * result.scale - target.height) < 0.00001);
  }
});

test("loader stays centered before docking, including after viewport resize", async () => {
  const { getLoaderPlacement } = await loaderModule("geometry");
  for (const viewportWidth of [1440, 390, 320]) {
    const frame = { viewportWidth, viewportHeight: 844, width: 250, height: 45.2, target: { left: 20, top: 12, width: 144, height: 26 } };
    const result = getLoaderPlacement(frame, 0, 1);
    assert.equal(result.x + frame.width / 2, viewportWidth / 2);
    assert.equal(result.y + frame.height / 2, frame.viewportHeight / 2);
    assert.equal(result.scale, 1);
  }
});

test("mobile loader centers in the visible viewport without relying on computed SVG height", async () => {
  const { getLoaderPlacement } = await loaderModule("geometry");
  const logo = readFileSync(new URL("../public/media/brand/bracketdex-logo-regular-dark.svg", import.meta.url), "utf8");
  const [, logoWidth, logoHeight] = logo.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const target = { left: 20, top: 12, width: 158.4, height: 158.4 * Number(logoHeight) / Number(logoWidth) };

  for (const viewport of [
    { viewportLeft: 0, viewportTop: 0, viewportWidth: 390, viewportHeight: 664 },
    { viewportLeft: 12, viewportTop: 58, viewportWidth: 366, viewportHeight: 600 },
    { viewportLeft: 0, viewportTop: 120, viewportWidth: 390, viewportHeight: 430 },
    { viewportLeft: 0, viewportTop: 0, viewportWidth: 844, viewportHeight: 390 },
  ]) {
    const width = Math.min(viewport.viewportWidth * 0.78, 440);
    const height = width * Number(logoHeight) / Number(logoWidth);
    const frame = { ...viewport, width, target };
    const centered = getLoaderPlacement(frame, 0, 1);
    assert.ok(Math.abs(centered.x + width / 2 - (viewport.viewportLeft + viewport.viewportWidth / 2)) < 0.00001);
    assert.ok(Math.abs(centered.y + height / 2 - (viewport.viewportTop + viewport.viewportHeight / 2)) < 0.00001);
    const docked = getLoaderPlacement(frame, 1, 0);
    assert.equal(docked.x, target.left);
    assert.equal(docked.y, target.top);
    assert.ok(Math.abs(height * docked.scale - target.height) < 0.00001);
  }
});

function runBootstrap(script, session, blocked = false) {
  const classes = new Set();
  const root = { dataset: {}, classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name) } };
  const timers = [];
  runInNewContext(script, {
    sessionStorage: {
      getItem: (key) => { if (blocked) throw new Error("Storage unavailable"); return session.get(key) ?? null; },
      setItem: (key, value) => session.set(key, value),
    },
    matchMedia: () => ({ matches: false }),
    document: { documentElement: root },
    performance: { now: () => 1000 },
    setTimeout: (callback) => timers.push(callback),
  });
  return { root, classes, timers };
}

test("loader plays on first visit and skips reloads and other pages in the session", async () => {
  const { SITE_LOADER_BOOTSTRAP } = await loaderModule("bootstrap");
  const session = new Map();
  const firstVisit = runBootstrap(SITE_LOADER_BOOTSTRAP, session);
  assert.equal(firstVisit.root.dataset.siteLoader, "pending");
  assert.equal(firstVisit.classes.has("bd-site-loader-active"), true);

  for (let visit = 0; visit < 2; visit++) {
    const nextDocument = runBootstrap(SITE_LOADER_BOOTSTRAP, session);
    assert.equal(nextDocument.classes.has("bd-site-loader-active"), false);
    assert.equal(nextDocument.root.dataset.siteLoader, undefined);
    assert.equal(nextDocument.timers.length, 0);
  }
  assert.equal(runBootstrap(SITE_LOADER_BOOTSTRAP, new Map()).root.dataset.siteLoader, "pending");
});

test("blocked session storage still plays the intro with a release timeout", async () => {
  const { SITE_LOADER_BOOTSTRAP } = await loaderModule("bootstrap");
  const result = runBootstrap(SITE_LOADER_BOOTSTRAP, new Map(), true);
  assert.equal(result.classes.has("bd-site-loader-active"), true);
  assert.equal(result.root.dataset.siteLoader, "pending");
  assert.equal(result.timers.length, 1);
});
