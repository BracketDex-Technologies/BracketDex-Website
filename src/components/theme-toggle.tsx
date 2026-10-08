"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const transitioning = useRef(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    if (transitioning.current) return;
    const nextTheme = isDark ? "light" : "dark";
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !transitionDocument.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const originX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const originY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    const root = document.documentElement;
    root.style.setProperty("--bd-theme-origin", `${originX}% ${originY}%`);
    root.dataset.themeTransition = "circle-blur";
    transitioning.current = true;
    const cleanup = () => {
      delete root.dataset.themeTransition;
      root.style.removeProperty("--bd-theme-origin");
      transitioning.current = false;
    };
    try {
      const transition = transitionDocument.startViewTransition(() => {
        flushSync(() => setTheme(nextTheme));
        // Ensure next-themes' target class is captured in the new snapshot.
        root.classList.toggle("dark", nextTheme === "dark");
        root.classList.toggle("light", nextTheme === "light");
        root.style.colorScheme = nextTheme;
      });
      void transition.finished.then(cleanup, cleanup);
    } catch {
      cleanup();
      setTheme(nextTheme);
    }
  }

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="bd-theme-toggle"
      disabled={!mounted}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? <Sun size={20} strokeWidth={1.8} /> : <Moon size={20} strokeWidth={1.8} />}
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
