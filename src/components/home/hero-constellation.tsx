"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

/**
 * Animated node / constellation backdrop for the landing hero.
 *
 * - Draws a drifting network of nodes with distance-based links (systems / AI motif).
 * - Reacts to the cursor: nearby nodes link to the pointer, drift toward it, and a
 *   soft brand-blue glow tracks the cursor.
 * - Also owns the hero headline / copy intro so the reveal is orchestrated in one place
 *   (the copy is opted out of the global progressive-text reveal — see
 *   progressive-text-reveal.tsx EXCLUDED selector).
 * - Fully gated behind prefers-reduced-motion, pauses when the hero is offscreen or the
 *   tab is hidden, and is DPR-aware.
 */

const NODE_COLOR = "rgb(180 210 255 / 0.85)";
const NODE_CORE = "rgb(233 242 255 / 0.95)";
const LINK_COLOR = "79, 140, 255"; // --primary-ish, as rgb triplet for alpha compositing
const LINK_DISTANCE = 132;
const MOUSE_DISTANCE = 172;
const MAX_NODES = 110;
const MIN_NODES = 26;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function HeroConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement ?? null;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let rafId = 0;
    let running = false;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const buildNodes = () => {
      const target = Math.round(
        Math.min(MAX_NODES, Math.max(MIN_NODES, (width * height) / 15000))
      );
      nodes = Array.from({ length: target }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.22, 0.22),
        vy: rand(-0.22, 0.22),
        r: rand(0.8, 2.1),
      }));
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const drawFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      // Cursor glow
      if (mouse.active) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_DISTANCE);
        glow.addColorStop(0, "rgba(79, 140, 255, 0.14)");
        glow.addColorStop(1, "rgba(79, 140, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_DISTANCE, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];

        if (animate) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;
          a.x = Math.max(0, Math.min(width, a.x));
          a.y = Math.max(0, Math.min(height, a.y));

          // Gentle pull toward the cursor when in range
          if (mouse.active) {
            const dx = mouse.x - a.x;
            const dy = mouse.y - a.y;
            const dist = Math.hypot(dx, dy);
            if (dist < MOUSE_DISTANCE && dist > 0.001) {
              const pull = (1 - dist / MOUSE_DISTANCE) * 0.35;
              a.x += (dx / dist) * pull;
              a.y += (dy / dist) * pull;
            }
          }
        }

        // Node-to-node links
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.42;
            ctx.strokeStyle = `rgba(${LINK_COLOR}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Cursor links
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DISTANCE) {
            const alpha = (1 - dist / MOUSE_DISTANCE) * 0.6;
            ctx.strokeStyle = `rgba(120, 170, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Node dot
        ctx.beginPath();
        ctx.fillStyle = a.r > 1.6 ? NODE_CORE : NODE_COLOR;
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      drawFrame(true);
      rafId = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      rafId = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(rafId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();

    if (reduceMotion) {
      drawFrame(false);
    } else {
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) drawFrame(false);
    });
    resizeObserver.observe(host);

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(host);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerMove, { passive: true });
      host.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibilityChange);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Hero copy intro (owns .bd-hero-copy, which is excluded from the global reveal).
  useEffect(() => {
    const copy = document.querySelector<HTMLElement>(".bd-hero-copy");
    const eyebrow = document.querySelector<HTMLElement>(".bd-hero-eyebrow");
    const title = document.querySelector<HTMLElement>(".bd-hero-title");
    const subtitle = document.querySelector<HTMLElement>(".bd-hero-subtitle");
    const ctas = Array.from(
      document.querySelectorAll<HTMLElement>(".bd-hero-actions a")
    );
    if (!copy || !title) return;

    // The global progressive-text rule hides main h1/p/a, so the eyebrow and the
    // CTA <a> links must be revealed directly (animating a wrapper is not enough).
    const supporting = [subtitle, ...ctas].filter(Boolean) as HTMLElement[];
    const everything = [eyebrow, title, ...supporting].filter(Boolean) as HTMLElement[];

    const revealAll = () => {
      // Force an explicit, light, un-blurred final state. Never clearProps here:
      // the global progressive-text CSS sets filter: blur() brightness(0%) on
      // main h1/p/a, so the inline filter must stay to override it.
      gsap.set(everything, {
        opacity: 1,
        y: 0,
        filter: "none",
      });
      // If the headline was already split (e.g. rAF/GSAP was paused in a hidden
      // tab and the char timeline never advanced), reset the chars too so the
      // headline can never be left stuck at its animation start state.
      const chars = title.querySelectorAll(".bd-hero-char");
      if (chars.length > 0) {
        gsap.set(chars, { opacity: 1, y: 0, yPercent: 0, rotateX: 0 });
      }
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      revealAll();
      return;
    }

    // Failsafe: if anything throws or stalls, force the copy visible (well past
    // the intro timeline's total runtime so it never pre-empts a healthy reveal).
    const failsafe = window.setTimeout(revealAll, 2800);
    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      try {
        gsap.registerPlugin(SplitText);
        split = new SplitText(title, { type: "chars,words", charsClass: "bd-hero-char" });

        gsap.set(title, { opacity: 1, filter: "none" });
        gsap.set([eyebrow, ...supporting].filter(Boolean), {
          opacity: 0,
          y: 16,
          filter: "blur(8px)",
        });

        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          onComplete: () => window.clearTimeout(failsafe),
        });

        if (eyebrow) {
          tl.to(eyebrow, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 });
        }

        tl.from(
          split.chars,
          {
            opacity: 0,
            yPercent: 120,
            rotateX: -55,
            stagger: 0.022,
            duration: 0.72,
          },
          eyebrow ? "-=0.2" : 0
        ).to(
          supporting,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.12 },
          "-=0.35"
        );
      } catch {
        revealAll();
        window.clearTimeout(failsafe);
      }
    });

    return () => {
      window.clearTimeout(failsafe);
      split?.revert();
      ctx.revert();
    };
  }, []);

  return <canvas aria-hidden="true" className="bd-hero-canvas" ref={canvasRef} />;
}
