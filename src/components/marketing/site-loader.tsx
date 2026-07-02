"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { NAVBAR_LOGO_TEXT, NAVBAR_WORDMARK_DOCK_SELECTOR } from "./navbar";
import {
  SITE_LOADER_DURATION_MS,
  SITE_LOADER_SESSION_KEY,
} from "./site-loader-config";

gsap.registerPlugin(useGSAP);

const LETTERS = NAVBAR_LOGO_TEXT.split("");

export function SiteLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"checking" | "visible" | "hidden">("checking");

  useEffect(() => {
    if (status === "hidden") {
      document.documentElement.classList.remove("bd-site-loader-active");
      return;
    }

    document.documentElement.classList.add("bd-site-loader-active");

    return () => {
      document.documentElement.classList.remove("bd-site-loader-active");
    };
  }, [status]);

  useGSAP(
    () => {
      if (status === "hidden") {
        return;
      }

      if (status === "checking") {
        const hasSeenLoader = window.sessionStorage.getItem(SITE_LOADER_SESSION_KEY) === "true";

        setStatus(hasSeenLoader ? "hidden" : "visible");
        return;
      }

      const root = rootRef.current;
      const mark = markRef.current;
      const navMark = document.querySelector<HTMLElement>(NAVBAR_WORDMARK_DOCK_SELECTOR);

      if (!root || !mark || !navMark) {
        window.sessionStorage.setItem(SITE_LOADER_SESSION_KEY, "true");
        setStatus("hidden");
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.to(root, {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power1.out",
          onComplete: () => {
            window.sessionStorage.setItem(SITE_LOADER_SESSION_KEY, "true");
            setStatus("hidden");
          },
        });
        return;
      }

      const markRect = mark.getBoundingClientRect();
      const navRect = navMark.getBoundingClientRect();
      const textWidth =
        root.querySelector<HTMLElement>(".bd-site-loader-text")?.scrollWidth ?? markRect.width;
      const dockX = navRect.left + navRect.width / 2 - (markRect.left + markRect.width / 2);
      const dockY = navRect.top + navRect.height / 2 - (markRect.top + markRect.height / 2);
      const dockScale = navRect.width / Math.max(textWidth, 1);

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.sessionStorage.setItem(SITE_LOADER_SESSION_KEY, "true");
          setStatus("hidden");
        },
      });

      tl.set(root, { autoAlpha: 1 })
        .set(".bd-site-loader-word", { width: 0, autoAlpha: 1 })
        .set(".bd-site-loader-letter", { autoAlpha: 0, y: 5 })
        .set(".bd-site-loader-underline", { scaleX: 0, autoAlpha: 0 })
        .set(mark, { scale: 1, x: 0, y: 0 })
        .fromTo(
          ".bd-site-loader-bracket",
          { autoAlpha: 0, y: 7, scale: 0.72 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: "elastic.out(1, 0.62)" }
        )
        .to(".bd-site-loader-mark", { gap: "0.54em", duration: 0.56, ease: "back.out(1.8)" }, ">+=0.18")
        .to(".bd-site-loader-word", { width: textWidth, duration: 0.82, ease: "steps(10)" }, ">-=0.1")
        .to(
          ".bd-site-loader-letter",
          { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.04, ease: "back.out(1.6)" },
          "<"
        )
        .to(".bd-site-loader-bracket", { autoAlpha: 0, scale: 0.78, duration: 0.42, ease: "back.in(1.4)" }, ">+=0.16")
        .to(".bd-site-loader-mark", { gap: 0, duration: 0.38, ease: "elastic.out(1, 0.85)" }, "<")
        .to(".bd-site-loader-text", { color: "#f5f5f2", duration: 0.34, ease: "sine.out" }, ">-=0.05")
        .to(".bd-site-loader-underline", { scaleX: 1, autoAlpha: 0.52, duration: 0.36, ease: "back.out(1.4)" }, "<+=0.08")
        .to(
          mark,
          { x: dockX, y: dockY, scale: dockScale, duration: 1.08, ease: "elastic.out(1, 0.78)" },
          ">+=0.08"
        )
        .to(root, { backgroundColor: "rgba(16, 16, 14, 0)", duration: 0.58, ease: "sine.out" }, ">-=0.42")
        .to(root, { autoAlpha: 0, duration: 0.46, ease: "power2.out" }, "<+=0.12");

      tl.duration(SITE_LOADER_DURATION_MS / 1000);
    },
    { scope: rootRef, dependencies: [status] }
  );

  if (status === "hidden") {
    return null;
  }

  return (
    <div
      aria-label="Loading BracketDex Technologies"
      aria-live="polite"
      className="bd-site-loader"
      ref={rootRef}
      role="status"
    >
      <div className="bd-site-loader-mark" ref={markRef}>
        <span aria-hidden="true" className="bd-site-loader-bracket">
          {"{"}
        </span>
        <span className="bd-site-loader-word" aria-hidden="true">
          <span className="bd-site-loader-text">
            {LETTERS.map((letter, index) => (
              <span className="bd-site-loader-letter" key={`${letter}-${index}`}>
                {letter}
              </span>
            ))}
            <span aria-hidden="true" className="bd-site-loader-underline" />
          </span>
        </span>
        <span aria-hidden="true" className="bd-site-loader-bracket">
          {"}"}
        </span>
      </div>
      <span className="sr-only">Loading BracketDex Technologies</span>
    </div>
  );
}
