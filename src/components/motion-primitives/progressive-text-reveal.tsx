"use client";

import { useEffect } from "react";

export const PROGRESSIVE_TEXT_REVEAL_DURATION_MS = 500;
export const PROGRESSIVE_TEXT_REVEAL_ROOT_CLASS = "bd-progressive-text-active";
export const PROGRESSIVE_TEXT_REVEAL_VISIBLE_CLASS = "bd-text-effect-visible";

const TEXT_REVEAL_SELECTOR = [
  ".bd-nav-surface .bd-wordmark",
  ".bd-nav-surface .bd-nav-link",
  ".bd-nav-surface .bd-nav-cta > span:last-child",
  "main h1",
  "main h2",
  "main h3",
  "main p",
  "main a",
  "main li",
  "main summary",
  "footer p",
  "footer a",
].join(",");

const EXCLUDED_TEXT_REVEAL_SELECTOR = [
  ".sr-only",
  "[aria-hidden='true']",
  ".bd-site-loader",
  ".bd-site-loader *",
  ".agentation-toolbar",
  ".agentation-toolbar *",
  "script",
  "style",
  "svg",
  "video",
].join(",");

function isRevealCandidate(element: Element) {
  if (element.closest(EXCLUDED_TEXT_REVEAL_SELECTOR)) {
    return false;
  }

  return Boolean(element.textContent?.trim());
}

function isElementInRevealViewport(element: Element) {
  const rect = element.getBoundingClientRect();

  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function ProgressiveTextReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add(PROGRESSIVE_TEXT_REVEAL_ROOT_CLASS);

    if (reduceMotion) {
      document.querySelectorAll(TEXT_REVEAL_SELECTOR).forEach((element) => {
        element.classList.add(PROGRESSIVE_TEXT_REVEAL_VISIBLE_CLASS);
      });
      return;
    }

    const revealElement = (element: Element) => {
      element.classList.add(PROGRESSIVE_TEXT_REVEAL_VISIBLE_CLASS);
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealElement(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      }
    );

    const prepareText = () => {
      document.querySelectorAll(TEXT_REVEAL_SELECTOR).forEach((element) => {
        if (!isRevealCandidate(element) || element.classList.contains(PROGRESSIVE_TEXT_REVEAL_VISIBLE_CLASS)) {
          return;
        }

        if (isElementInRevealViewport(element)) {
          revealElement(element);
          return;
        }

        observer.observe(element);
      });
    };

    const schedulePrepare = () => {
      window.requestAnimationFrame(prepareText);
    };

    schedulePrepare();
    const prepareTimers = [100, 300, 700].map((delay) => window.setTimeout(schedulePrepare, delay));
    window.addEventListener("load", schedulePrepare);
    window.addEventListener("resize", schedulePrepare);
    window.addEventListener("scroll", schedulePrepare, { passive: true });

    const mutationObserver = new MutationObserver(schedulePrepare);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      prepareTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", schedulePrepare);
      window.removeEventListener("resize", schedulePrepare);
      window.removeEventListener("scroll", schedulePrepare);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
