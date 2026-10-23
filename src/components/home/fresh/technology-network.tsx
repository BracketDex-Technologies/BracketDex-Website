"use client";

import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { TechnologyGroup } from "@/content/marketing";
import styles from "./technology-network.module.css";
import { TechnologyIcon } from "./technology-icon";

type Props = { groups: readonly TechnologyGroup[]; label: string; title: string };

const positions = [
  [18, 12], [50, 10], [82, 12], [11, 51], [89, 51], [30, 88], [70, 88],
];

export function TechnologyNetwork({ groups, label, title }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const diagram = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const scheduleMeasure = useRef<() => void>(() => {});
  const onPositionChange = useCallback(() => scheduleMeasure.current(), []);
  const technologies = groups.flatMap((group) => group.items.map((name) => ({ name, key: `${group.category}-${name}` })));

  useEffect(() => {
    const canvas = diagram.current;
    const center = hub.current;
    if (!canvas || !center) return;
    const nodes = Array.from(canvas.querySelectorAll<HTMLElement>("[data-tech-icon]"));
    const connectors = canvas.querySelectorAll<SVGGElement>("[data-tech-connection]");
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
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
        if (Math.abs(dy) > anchor.height) {
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
        const sy = cy + Math.max(-anchor.height * 0.28, Math.min(anchor.height * 0.28, (ny - cy) * 0.4));
        return `M ${sx} ${sy} C ${sx + bend} ${sy}, ${ex - bend} ${ny}, ${ex} ${ny}`;
      });
      next.forEach((path, index) => {
        connectors[index]?.querySelectorAll("path").forEach((element) => element.setAttribute("d", path));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    scheduleMeasure.current = schedule;
    const observer = new ResizeObserver(schedule);
    [canvas, center, ...nodes].forEach((element) => observer.observe(element));
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    schedule();
    return () => { disposed = true; scheduleMeasure.current = () => {}; observer.disconnect(); cancelAnimationFrame(frame); };
  }, [groups]);

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const wordmark = element.querySelector("[data-tech-wordmark]");
      const signals = element.querySelectorAll("[data-tech-signal]");
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.1 });
      // A soft double beat launches one outward wave. Never blink the text off.
      loop.to(wordmark, { scale: 1.025, duration: 0.3, ease: "sine.inOut" }, 0)
        .to(wordmark, { scale: 1, duration: 0.3, ease: "sine.inOut" }, 0.3)
        .to(wordmark, { scale: 1.015, duration: 0.25, ease: "sine.inOut" }, 0.6)
        .to(wordmark, { scale: 1, duration: 0.5, ease: "sine.inOut" }, 0.85);
      signals.forEach((signal, index) => {
        const start = 0.45 + index * 0.025;
        loop.fromTo(signal, { strokeDashoffset: 0, opacity: 0.15 }, {
          strokeDashoffset: -52, opacity: 0.7, duration: 1.9, ease: "none",
        }, start)
          .to(signal, { opacity: 0.15, duration: 0.3 }, start + 1.9);
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
  }, { scope: root, dependencies: [groups], revertOnUpdate: true });

  return (
    <div ref={root} className={styles.section} id="tech-stack" role="region" aria-labelledby="home-capability-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p>{label}</p>
          <h2 id="home-capability-title">{title}</h2>
          <div className={styles.subheading}>Different technologies. <span>One connected system.</span></div>
        </header>
        <div className={styles.diagram} ref={diagram}>
          <svg className={styles.connections} aria-hidden="true" focusable="false">
            {technologies.map(({ key }) => (
              <g key={key} data-tech-connection>
                <path className={styles.string} strokeDasharray="4 9" />
                <path className={styles.signal} data-tech-signal strokeDasharray="4 9" />
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
                <div className={styles.icons}>
                  {group.items.map((name) => <TechnologyIcon key={name} name={name} onPositionChange={onPositionChange} />)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
