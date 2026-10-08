"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollChoreography() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>(".bd-landing");
    if (!root) return;
    const media = gsap.matchMedia();
    let alive = true;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(".bd-scroll-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
        root.querySelectorAll<HTMLElement>("[data-scroll-words]").forEach((text) => {
          const scene = text.closest(".bd-manifesto");
          if (!scene) {
            gsap.fromTo(text.querySelectorAll("[data-scroll-word]"), { y: 8, opacity: 0.75 }, {
              y: 0, opacity: 1, stagger: 0.025, duration: 0.5, ease: "power2.out",
              scrollTrigger: { trigger: text, start: "top 92%", once: true },
            });
            return;
          }
          gsap.fromTo(text.querySelectorAll("[data-scroll-word]"), { opacity: 0.15 }, {
            opacity: 1, stagger: 0.13, ease: "none",
            scrollTrigger: { trigger: scene ?? text, start: scene ? "top 25%" : "top 88%", end: scene ? "bottom 85%" : "top 38%", scrub: 0.5 },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-scroll-row]").forEach((row) => {
          gsap.fromTo(row, { y: 12, opacity: 0.75 }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 94%", once: true } });
        });
        root.querySelectorAll<HTMLElement>(".bd-post-hero h2:not(:has([data-scroll-words]))").forEach((heading) => {
          gsap.fromTo(heading, { y: 35 }, { y: 0, ease: "none", scrollTrigger: { trigger: heading, start: "top 95%", end: "top 55%", scrub: 0.5 } });
        });
        const title = root.querySelector(".bd-page-display");
        if (title) {
          gsap.fromTo(root.querySelectorAll(".bd-page-intro > *, .bd-page-index"), { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.06, ease: "power3.out" });
          gsap.fromTo(title.querySelectorAll("span"), { yPercent: 35, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.025, duration: 0.65, ease: "power3.out" });
        }
        root.querySelectorAll<HTMLElement>(".bd-fresh-footer__logo").forEach((mark) => {
          gsap.fromTo(mark, { yPercent: 65 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: mark.closest("footer"), start: "top 98%", end: "bottom bottom", scrub: 0.7 } });
        });
      }, root);
      return () => context.revert();
    });
    document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
    return () => { alive = false; media.revert(); };
  }, [pathname]);
  return <div className="bd-scroll-progress" aria-hidden="true" />;
}
