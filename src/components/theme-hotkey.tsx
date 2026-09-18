"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeHotkey() {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      const tag = target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;
      if (e.key === "d") {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTheme, resolvedTheme]);

  return null;
}
