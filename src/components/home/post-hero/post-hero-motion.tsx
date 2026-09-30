"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const POST_HERO_MOTION_SCOPE = "[data-post-hero-design]" as const;
export const POST_HERO_FLOW_TARGET = "[data-diagram-node]" as const;

export function PostHeroMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(POST_HERO_MOTION_SCOPE);
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-motion-section]").forEach((section) => {
        gsap.fromTo(section, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
      });
      root.querySelectorAll<HTMLElement>(".bd-cloud-topology__connector").forEach((line, index) => {
        gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.6, delay: index * 0.08, ease: "expo.out", scrollTrigger: { trigger: line.closest(".bd-cloud-visual"), start: "top 78%", once: true } });
      });
      root.querySelectorAll<HTMLElement>(POST_HERO_FLOW_TARGET).forEach((node) => {
        gsap.fromTo(node, { opacity: 0.45 }, { opacity: 1, duration: 0.6, ease: "expo.out", scrollTrigger: { trigger: node.closest(".bd-system-visual, .bd-cloud-visual"), start: "top 75%", once: true } });
      });
    }, root);
    return () => context.revert();
  }, []);

  return null;
}
