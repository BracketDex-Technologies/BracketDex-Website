"use client";

import { useEffect } from "react";

const NAVBAR_GLASS_SCROLL_THRESHOLD_PX = 40;

type NavbarScrollStateProps = {
  transparentOnHero: boolean;
};

export function NavbarScrollState({ transparentOnHero }: NavbarScrollStateProps) {
  useEffect(() => {
    const root = document.documentElement;
    let animationFrame = 0;

    const updateNavbarState = () => {
      const shouldUseSolidNav = transparentOnHero && window.scrollY > NAVBAR_GLASS_SCROLL_THRESHOLD_PX;
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
  }, [transparentOnHero]);

  return null;
}
