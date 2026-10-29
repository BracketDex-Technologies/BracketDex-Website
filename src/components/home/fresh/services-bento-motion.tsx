"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import styles from "./services-bento.module.css";

export function ServicesBentoMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setReady(true), []);

  useGSAP(() => {
    if (!ready || !root.current || reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: (() => void)[] = [];
    const media = gsap.matchMedia();

    root.current.querySelectorAll<HTMLElement>("[data-service-card]").forEach((card) => {
      // Each element repeats independently so staggered items never wait for the longest tween.
      const loop = gsap.timeline({ paused: true, defaults: { duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true } });
      const float = card.querySelectorAll("[data-bento-float]");
      const pulse = card.querySelectorAll("[data-bento-pulse]");
      const signal = card.querySelectorAll("[data-bento-signal]");
      const draw = card.querySelectorAll("[data-bento-draw]");
      float.forEach((element, index) => loop.to(element, { y: -4 }, index * 0.12));
      pulse.forEach((element, index) => {
        const opacity = Number(gsap.getProperty(element, "opacity"));
        loop.to(element, { opacity: opacity * 0.65, duration: 2.8 }, index * 0.18);
      });
      // Two complete 4/8 dash cycles keep the reset seamless and the signal moving forward.
      if (signal.length) loop.to(signal, { strokeDashoffset: -24, duration: 2.4, ease: "none", yoyo: false, autoRound: false }, 0);
      // Start from the rendered full line rather than snapping to a partly erased chart on hydration.
      // pathLength="1" needs fractional offsets; CSS pixel rounding would make the line blink.
      if (draw.length) loop.fromTo(draw, { strokeDasharray: 1, strokeDashoffset: 0 }, { strokeDashoffset: 0.35, duration: 3.8, autoRound: false }, 0);

      let visible = false;
      const sync = () => { if (visible && !document.hidden) loop.play(); else loop.pause(); };
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
      observer.observe(card);
      document.addEventListener("visibilitychange", sync);
      cleanups.push(() => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); });

      // Separate targets keep scroll, cursor, and ambient transforms independent.
      gsap.fromTo(card.querySelector("[data-bento-parallax]"), { y: 9 }, {
        y: -9, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.7 },
      });

      media.add("(hover: hover) and (pointer: fine)", () => {
        const layers = Array.from(card.querySelectorAll<SVGElement>("[data-bento-pointer]"), (element) => ({
          x: gsap.quickTo(element, "x", { duration: 0.8, ease: "power3.out" }),
          y: gsap.quickTo(element, "y", { duration: 0.8, ease: "power3.out" }),
          depth: Number(element.dataset.bentoPointer),
        }));
        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          const bounds = card.getBoundingClientRect();
          const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
          const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
          layers.forEach((layer) => { layer.x(x * 8 * layer.depth); layer.y(y * 6 * layer.depth); });
        };
        const reset = () => layers.forEach((layer) => { layer.x(0); layer.y(0); });
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", reset);
        cleanups.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", reset); });
        return () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", reset); };
      });
    });
    return () => { cleanups.forEach((cleanup) => cleanup()); media.revert(); };
  }, { scope: root, dependencies: [reduce, ready], revertOnUpdate: true });

  return (
    <div className={styles.motionRoot} ref={root}>
      {children}
    </div>
  );
}
