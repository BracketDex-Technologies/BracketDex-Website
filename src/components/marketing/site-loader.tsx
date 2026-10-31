"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

import { logoFont } from "./logo-font";
import { getLoaderPlacement } from "./site-loader-geometry";

const LETTERS = Array.from("BracketDex");
// Array Regular at 100 units, including the original logo's -6.25-unit “ra” kerning.
const LETTER_X = [43.75, 93.75, 125, 175, 225, 275, 325, 362.5, 418.75, 468.75];
const WORD_WIDTH = 475;

export function SiteLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const glyphsRef = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const mark = markRef.current;
    const glyphs = glyphsRef.current;
    const content = document.getElementById("site-content");
    const navbar = document.querySelector<HTMLElement>("[data-navbar-wordmark]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let timeline: gsap.core.Timeline | undefined;
    let animationFrame = 0;
    let failSafe: number | undefined;
    let land: (() => void) | undefined;
    let resize: (() => void) | undefined;
    const onPreferenceChange = () => { if (reduce.matches) finish(); };

    const release = () => {
      html.classList.remove("bd-site-loader-active");
      if (content) content.inert = false;
    };
    const finish = () => {
      land?.();
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(failSafe);
      timeline?.kill();
      window.removeEventListener("bd-site-loader-timeout", finish);
      reduce.removeEventListener("change", onPreferenceChange);
      if (resize) window.removeEventListener("resize", resize);
      html.dataset.siteLoader = "done";
      release();
    };

    if (!root || !mark || !glyphs || !navbar || reduce.matches || html.dataset.siteLoader !== "pending") {
      finish();
      return;
    }

    html.classList.add("bd-site-loader-active");
    if (content) content.inert = true;
    failSafe = window.setTimeout(finish, 5500);
    window.addEventListener("bd-site-loader-timeout", finish);
    reduce.addEventListener("change", onPreferenceChange);

    const start = async () => {
      const font = window.getComputedStyle(mark).fontFamily;
      const loaded = await document.fonts.load(`100px ${font}`, "{BracketDex}");
      if (cancelled || html.dataset.siteLoader !== "pending") return;
      if (!loaded.length) { finish(); return; }

      const image = Array.from(navbar.querySelectorAll("img")).find((item) => item.getBoundingClientRect().width > 0);
      const open = glyphs.querySelector<SVGGElement>("[data-loader-open]")!;
      const close = glyphs.querySelector<SVGGElement>("[data-loader-close]")!;
      const word = glyphs.querySelector<SVGGElement>("[data-loader-word]")!;
      const letters = Array.from(word.querySelectorAll("text"));
      if (!image) { finish(); return; }

      const motion = { travel: 0, settle: 1, typed: 0 };
      const measure = () => {
        const size = window.getComputedStyle(mark);
        return {
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          width: parseFloat(size.width),
          height: parseFloat(size.height),
          target: image.getBoundingClientRect(),
        };
      };
      let frame = measure();
      const renderPlacement = () => {
        gsap.set(mark, getLoaderPlacement(frame, motion.travel, motion.settle));
        const remaining = (WORD_WIDTH - motion.typed) / 2;
        open.style.transform = `translateX(${remaining}px)`;
        word.style.transform = `translateX(${remaining}px)`;
        close.style.transform = `translateX(${-remaining}px)`;
      };
      land = () => {
        motion.travel = 1;
        motion.settle = 0;
        motion.typed = WORD_WIDTH;
        renderPlacement();
      };
      resize = () => { frame = measure(); renderPlacement(); };
      window.addEventListener("resize", resize);
      renderPlacement();
      gsap.set([open, close], { opacity: 0 });
      gsap.set(letters, { opacity: 0 });
      gsap.set(mark, { visibility: "visible" });

      timeline = gsap.timeline({ paused: true, onUpdate: renderPlacement, onComplete: finish });
      timeline.to([open, close], { opacity: 1, duration: 0.45, ease: "power2.out" }, 0);
      for (const [index, letter] of letters.entries()) {
        const typedWidth = (LETTER_X[index + 1] ?? 518.75) - LETTER_X[0];
        const at = 0.7 + index * 0.125;
        timeline.to(motion, { typed: typedWidth, duration: 0.19, ease: "power2.out" }, at);
        timeline.to(letter, { opacity: 1, duration: 0.22, ease: "sine.out" }, at + 0.03);
      }
      timeline.to(motion, { travel: 1, duration: 1.2, ease: "power3.inOut" }, 2.65);
      timeline.to(root.querySelector(".bd-site-loader-backdrop"), { opacity: 0, duration: 0.95, ease: "sine.inOut" }, 2.7);
      timeline.to(mark, { color: image.src.includes("-dark.svg") ? "#101114" : "#ffffff", duration: 0.6, ease: "sine.inOut" }, 3.15);
      timeline.to(motion, { settle: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" }, 3.85);
      timeline.call(renderPlacement, [], 4.8);
      // Keep the intro within its wall-clock budget even when a frame is dropped.
      const started = performance.now();
      const elapsed = (started - Number(html.dataset.siteLoaderStarted)) / 1000;
      const budget = Math.min(4.8, Math.max(0.1, 5.75 - elapsed));
      const tick = (now: number) => {
        if (cancelled) return;
        timeline?.time(Math.min((now - started) / (budget * 1000), 1) * 4.8);
        if (!cancelled) animationFrame = window.requestAnimationFrame(tick);
      };
      animationFrame = window.requestAnimationFrame(tick);
    };
    void start().catch(finish);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      timeline?.kill();
      window.clearTimeout(failSafe);
      window.removeEventListener("bd-site-loader-timeout", finish);
      if (resize) window.removeEventListener("resize", resize);
      reduce.removeEventListener("change", onPreferenceChange);
      release();
    };
  }, []);

  return (
    <div className="bd-site-loader" ref={rootRef} role="status" aria-label="Loading BracketDex Technologies" data-lenis-prevent>
      <div className="bd-site-loader-backdrop" aria-hidden="true" />
      <svg className={`bd-site-loader-mark ${logoFont.className}`} ref={markRef} viewBox="0 0 572.25 103.5" aria-hidden="true">
        <g ref={glyphsRef} style={{ transform: "translate(8px, 83px)" }}>
          <g data-loader-open><text>{"{"}</text></g>
          <g data-loader-word>{LETTERS.map((letter, index) => <text x={LETTER_X[index]} key={index}>{letter}</text>)}</g>
          <g data-loader-close><text x={518.75}>{"}"}</text></g>
        </g>
      </svg>
    </div>
  );
}
