"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, LifeBuoy, PenTool, Rocket, Route, Search, ShieldCheck } from "lucide-react";
import type { ProcessStep } from "@/content/marketing";
import styles from "./process-rail.module.css";

const icons = [Search, Route, PenTool, Code2, ShieldCheck, Rocket, LifeBuoy];

type ProcessTimelineProps = {
  label: string;
  title: string;
  description: string;
  steps: readonly ProcessStep[];
};

export function ProcessTimeline({ label, title, description, steps }: ProcessTimelineProps) {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = rail.current;
    if (!list) return;
    const rows = list.querySelectorAll<HTMLElement>("[data-process-step]");
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      const visible = new Set<HTMLElement>();
      const height = window.innerHeight;
      // Pixel margins keep the reading band tied to viewport height, not width.
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(element);
          else visible.delete(element);
        });
        let nearest: HTMLElement | undefined;
        let distance = Infinity;
        visible.forEach((element) => {
          const bounds = element.getBoundingClientRect();
          const nextDistance = Math.abs(bounds.top + bounds.height / 2 - height * 0.45);
          if (nextDistance < distance) {
            nearest = element;
            distance = nextDistance;
          }
        });
        if (nearest) setActive(Number(nearest.dataset.processIndex));
      }, {
        rootMargin: `-${Math.round(height * 0.3)}px 0px -${Math.round(height * 0.4)}px 0px`,
        threshold: [0, 0.5, 1],
      });
      rows.forEach((step) => observer.observe(step));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [steps]);

  useGSAP(() => {
    const element = root.current;
    const list = rail.current;
    if (!element || !list) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(element.querySelector("[data-process-fill]"), { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: list, start: "top 55%", end: "bottom 55%", scrub: 0.5 },
      });
      list.querySelectorAll<HTMLElement>("[data-process-body]").forEach((step) => {
        gsap.fromTo(step, { y: 16 }, {
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: step, start: "top 92%", once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: root });

  return (
    <div ref={root} className={styles.layout}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{label}</p>
        <h2 id="home-process-title">{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.readout} aria-hidden="true">
          <div className={styles.count}>
            <span className={styles.current}>{steps[active]?.step}</span>
            <span className={styles.total}>/ {String(steps.length).padStart(2, "0")}</span>
          </div>
          <div className={styles.segments}>
            {steps.map((step, index) => <span key={step.step} data-reached={index <= active} />)}
          </div>
          <span className={styles.currentLabel}>{steps[active]?.title}</span>
        </div>
      </div>
      <div className={styles.journey}>
        <div className={styles.track} aria-hidden="true"><span className={styles.fill} data-process-fill /></div>
        <ol className={styles.rail} ref={rail}>
          {steps.map((step, index) => {
            const Icon = icons[index] ?? Route;
            return (
              <li className={styles.step} key={step.step} data-process-step data-process-index={index} data-active={active === index}>
                <span className={styles.number} aria-hidden="true">{step.step}</span>
                <div className={styles.stepBody} data-process-body>
                  <div>
                    <strong data-process-title>{step.title}</strong>
                    <p>{step.description}</p>
                  </div>
                  <span className={styles.icon} aria-hidden="true"><Icon size={22} strokeWidth={1.5} /></span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
