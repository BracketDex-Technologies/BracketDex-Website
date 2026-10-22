"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { TechnologyGroup } from "@/content/marketing";
import styles from "./technology-network.module.css";

type Props = { groups: readonly TechnologyGroup[]; label: string; title: string };

const positions = [
  [18, 12], [50, 10], [82, 12], [11, 51], [89, 51], [30, 88], [70, 88],
];

export function TechnologyNetwork({ groups, label, title }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const diagram = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const canvas = diagram.current;
    const center = hub.current;
    if (!canvas || !center) return;
    const nodes = Array.from(canvas.querySelectorAll<HTMLElement>("[data-tech-node]"));
    let frame = 0;
    let disposed = false;
    const measure = () => {
      const origin = canvas.getBoundingClientRect();
      const anchor = center.getBoundingClientRect();
      const cx = anchor.left + anchor.width / 2 - origin.left;
      const cy = anchor.top + anchor.height / 2 - origin.top;
      const next = nodes.map((node) => {
        const bounds = node.getBoundingClientRect();
        const nx = bounds.left + bounds.width / 2 - origin.left;
        const ny = bounds.top + bounds.height / 2 - origin.top;
        const dx = nx - cx;
        const dy = ny - cy;
        // Connect actual card edges, including after font loading and mobile reflow.
        if (Math.abs(dy) > Math.abs(dx) * 0.65) {
          const direction = Math.sign(dy);
          const sy = cy + direction * anchor.height / 2;
          const ey = ny - direction * bounds.height / 2;
          const bend = (ey - sy) * 0.55;
          const sx = cx + dx * 0.15;
          return `M ${sx} ${sy} C ${sx} ${sy + bend}, ${nx} ${ey - bend}, ${nx} ${ey}`;
        }
        const direction = Math.sign(dx);
        const sx = cx + direction * anchor.width / 2;
        const ex = nx - direction * bounds.width / 2;
        const bend = (ex - sx) * 0.55;
        return `M ${sx} ${cy} C ${sx + bend} ${cy}, ${ex - bend} ${ny}, ${ex} ${ny}`;
      });
      setPaths((previous) => previous.join("|") === next.join("|") ? previous : next);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    [canvas, center, ...nodes].forEach((element) => observer.observe(element));
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    schedule();
    return () => { disposed = true; observer.disconnect(); cancelAnimationFrame(frame); };
  }, [groups]);

  useGSAP(() => {
    const element = root.current;
    if (!element || paths.length === 0) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const wordmark = element.querySelector("[data-tech-wordmark]");
      const signals = element.querySelectorAll("[data-tech-signal]");
      const cards = element.querySelectorAll("[data-tech-node]");
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.1 });
      // A soft double beat launches one outward wave. Never blink the text off.
      loop.to(wordmark, { scale: 1.025, duration: 0.3, ease: "sine.inOut" }, 0)
        .to(wordmark, { scale: 1, duration: 0.3, ease: "sine.inOut" }, 0.3)
        .to(wordmark, { scale: 1.015, duration: 0.25, ease: "sine.inOut" }, 0.6)
        .to(wordmark, { scale: 1, duration: 0.5, ease: "sine.inOut" }, 0.85);
      signals.forEach((signal, index) => {
        const start = 0.45 + index * 0.07;
        loop.fromTo(signal, { strokeDashoffset: 12, opacity: 0 }, {
          strokeDashoffset: -100, opacity: 0.9, duration: 1.9, ease: "none",
        }, start)
          .to(signal, { opacity: 0, duration: 0.2 }, start + 1.7)
          .to(cards[index], { borderColor: "#f25623", duration: 0.25 }, start + 1.6)
          .to(cards[index], { borderColor: "#454039", duration: 0.8 }, start + 1.95);
      });
      let visible = false;
      const sync = () => { if (visible && !document.hidden) loop.play(); else loop.pause(); };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      }, { threshold: 0.1 });
      observer.observe(element);
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [paths], revertOnUpdate: true });

  return (
    <div ref={root} className={styles.section} id="tech-stack" role="region" aria-labelledby="home-capability-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p>{label}</p>
          <h2 id="home-capability-title">{title}</h2>
        </header>
        <div className={styles.diagram} ref={diagram}>
          <svg className={styles.connections} aria-hidden="true" focusable="false">
            {paths.map((path, index) => (
              <g key={groups[index].category}>
                <path className={styles.string} d={path} />
                <path className={styles.signal} data-tech-signal d={path} pathLength="100" strokeDasharray="12 100" />
              </g>
            ))}
          </svg>
          <div className={styles.hub} ref={hub}>
            <div className={styles.wordmark} data-tech-wordmark="true" aria-label="BracketDex">
              <span aria-hidden="true">[</span>BracketDex<span aria-hidden="true">]</span>
            </div>
          </div>
          <ul className={styles.nodes} aria-label="Technology stack">
            {groups.map((group, index) => (
              <li key={group.category} className={styles.node} data-tech-node="true"
                style={{ "--node-x": `${positions[index][0]}%`, "--node-y": `${positions[index][1]}%`, "--node-order": index } as CSSProperties}>
                <h3>{group.category}</h3>
                <p>{group.items.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
