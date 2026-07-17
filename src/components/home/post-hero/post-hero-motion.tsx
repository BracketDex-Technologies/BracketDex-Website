"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const POST_HERO_MOTION_SCOPE = "[data-post-hero-design]" as const;

export function PostHeroMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(POST_HERO_MOTION_SCOPE);
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-motion-section]").forEach((section) => {
        gsap.fromTo(section, { opacity: 0.7, y: 28 }, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-motion-visual]").forEach((visual) => {
        gsap.fromTo(visual, { clipPath: "inset(0 0 14% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: visual, start: "top 78%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-flow-step]").forEach((node, index) => {
        gsap.fromTo(node, { opacity: 0.35 }, { opacity: 1, duration: 0.35, delay: index * 0.06, scrollTrigger: { trigger: node.closest(".bd-system-visual"), start: "top 75%", once: true } });
      });
    }, root);
    return () => context.revert();
  }, []);

  return null;
}
