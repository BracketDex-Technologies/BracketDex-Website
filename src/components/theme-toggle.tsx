"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    const root = document.documentElement;
    root.setAttribute("data-theme-transition", "true");
    setTheme(nextTheme);
    window.setTimeout(() => root.removeAttribute("data-theme-transition"), 760);
  }

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="bd-theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
