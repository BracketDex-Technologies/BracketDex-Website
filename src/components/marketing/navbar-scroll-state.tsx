"use client";

import { useEffect } from "react";

const NAVBAR_GLASS_SCROLL_THRESHOLD_PX = 40;

export function NavbarScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    const hasHeroNavbar = Boolean(document.querySelector(".bd-hero .bd-nav-surface"));
    let animationFrame = 0;

    const updateNavbarState = () => {
      const shouldUseSolidNav = hasHeroNavbar && window.scrollY > NAVBAR_GLASS_SCROLL_THRESHOLD_PX;
      root.toggleAttribute("data-nav-glass", shouldUseSolidNav);
    };

    const requestNavbarUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateNavbarState);
    };

    updateNavbarState();
    window.addEventListener("scroll", requestNavbarUpdate, { passive: true });
    window.addEventListener("resize", requestNavbarUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestNavbarUpdate);
      window.removeEventListener("resize", requestNavbarUpdate);
      root.removeAttribute("data-nav-glass");
    };
  }, []);

  return null;
}
