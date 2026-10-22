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
      const loop = gsap.timeline({ paused: true, repeat: -1, yoyo: true, defaults: { duration: 2.5, ease: "sine.inOut" } });
      const float = card.querySelectorAll("[data-bento-float]");
      const pulse = card.querySelectorAll("[data-bento-pulse]");
      const signal = card.querySelectorAll("[data-bento-signal]");
      const draw = card.querySelectorAll("[data-bento-draw]");
      if (float.length) loop.to(float, { y: -6, stagger: 0.12 }, 0);
      if (pulse.length) loop.to(pulse, { opacity: 0.25, stagger: 0.18 }, 0);
      if (signal.length) loop.to(signal, { strokeDashoffset: -24 }, 0);
      if (draw.length) loop.fromTo(draw, { strokeDasharray: 1, strokeDashoffset: 0.7 }, { strokeDashoffset: 0 }, 0);

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
          x: gsap.quickTo(element, "x", { duration: 0.6, ease: "power3.out" }),
          y: gsap.quickTo(element, "y", { duration: 0.6, ease: "power3.out" }),
          depth: Number(element.dataset.bentoPointer),
        }));
        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          const bounds = card.getBoundingClientRect();
          const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
          const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
          layers.forEach((layer) => { layer.x(x * 11 * layer.depth); layer.y(y * 9 * layer.depth); });
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
