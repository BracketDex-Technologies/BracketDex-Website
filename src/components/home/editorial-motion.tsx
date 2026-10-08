"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function EditorialMotion() {
  useEffect(() => {
    const root = document.querySelector(".bd-landing");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      // Start once the existing brand intro has finished docking into the header.
      const start = () => {
        gsap.fromTo(".bd-hero-copy > :not(h1)", { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out",
        });
        gsap.fromTo(".bd-hero-word", { yPercent: 105, rotate: 1.5 }, {
          yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.045, ease: "power4.out",
        });
        gsap.fromTo(".bd-flow-visual", { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, delay: 0.3, duration: 1.1, ease: "power3.out" });
      };
      const observer = new MutationObserver(() => {
        if (!document.documentElement.classList.contains("bd-site-loader-active")) {
          observer.disconnect();
          context.add(start);
        }
      });
      const timer = window.setTimeout(() => {
        if (document.documentElement.classList.contains("bd-site-loader-active")) {
          observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        } else {
          context.add(start);
        }
      }, 100);
      return () => { window.clearTimeout(timer); observer.disconnect(); };
    }, root);
    return () => context.revert();
  }, []);
  return null;
}
