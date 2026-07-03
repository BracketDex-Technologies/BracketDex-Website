"use client";

import { useEffect } from "react";

const NAVBAR_GLASS_SCROLL_THRESHOLD_PX = 24;

export function NavbarScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    const hasHeroNavbar = Boolean(document.querySelector(".bd-hero .bd-nav-surface"));
    let animationFrame = 0;

    const updateNavbarState = () => {
      animationFrame = 0;
      const isTransparent = hasHeroNavbar && window.scrollY <= NAVBAR_GLASS_SCROLL_THRESHOLD_PX;

      root.toggleAttribute("data-nav-transparent", isTransparent);
      root.toggleAttribute("data-nav-glass", !isTransparent);
    };

    const requestNavbarUpdate = () => {
      if (animationFrame !== 0) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateNavbarState);
    };

    updateNavbarState();
    window.addEventListener("scroll", requestNavbarUpdate, { passive: true });
    window.addEventListener("resize", requestNavbarUpdate);

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", requestNavbarUpdate);
      window.removeEventListener("resize", requestNavbarUpdate);
      root.removeAttribute("data-nav-transparent");
      root.removeAttribute("data-nav-glass");
    };
  }, []);

  return null;
}
