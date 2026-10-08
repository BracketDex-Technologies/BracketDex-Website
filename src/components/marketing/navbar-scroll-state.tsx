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

    const menu = document.querySelector<HTMLDetailsElement>(".bd-mobile-menu");
    const closeAfterNavigation = (event: Event) => {
      if (event.target instanceof Element && event.target.closest("a") && menu) menu.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    };
    menu?.addEventListener("click", closeAfterNavigation);
    window.addEventListener("keydown", closeOnEscape);

    updateNavbarState();
    window.addEventListener("scroll", requestNavbarUpdate, { passive: true });
    window.addEventListener("resize", requestNavbarUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestNavbarUpdate);
      window.removeEventListener("resize", requestNavbarUpdate);
      root.removeAttribute("data-nav-glass");
      menu?.removeEventListener("click", closeAfterNavigation);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [transparentOnHero]);

  return null;
}
