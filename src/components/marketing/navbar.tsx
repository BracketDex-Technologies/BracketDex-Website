"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import type { NavigationItem } from "@/content/marketing";
import styles from "./navbar.module.css";

export const NAVBAR_LOGO_TEXT = "BracketDex";
export const NAVBAR_CONTROL_HEIGHT_PX = 44;

type NavbarProps = {
  brandName: string;
  items: readonly NavigationItem[];
  ctaLabel: string;
  ctaHref: string;
  activeHref?: string;
  transparentOnHero?: boolean;
};

export function Navbar({
  activeHref,
  brandName,
  ctaHref,
  ctaLabel,
  items,
  transparentOnHero,
}: NavbarProps) {
  const routes = items.filter((item) => item.href !== "/" && item.href !== ctaHref);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const sentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!transparentOnHero) return;

    const header = headerRef.current;
    const sentinel = sentinelRef.current;
    if (!header || !sentinel) return;

    const setScrolled = (scrolled: boolean) => {
      header.dataset.scrolled = scrolled ? "true" : "false";
    };

    setScrolled(window.scrollY > 1);

    const IntersectionObserverConstructor = window.IntersectionObserver as typeof IntersectionObserver | undefined;
    if (!IntersectionObserverConstructor) {
      const updateFromScroll = () => setScrolled(window.scrollY > 1);
      window.addEventListener("scroll", updateFromScroll, { passive: true });
      return () => window.removeEventListener("scroll", updateFromScroll);
    }

    const observer = new IntersectionObserverConstructor(([entry]) => {
      setScrolled(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [transparentOnHero]);

  const closeMenu = () => { if (menuRef.current) menuRef.current.open = false; };

  return (
    <>
      {transparentOnHero ? <span aria-hidden="true" className={styles.scrollSentinel} ref={sentinelRef} /> : null}
      <header
        className={styles.header}
        data-overlay={transparentOnHero || undefined}
        data-scrolled={transparentOnHero ? "false" : undefined}
        ref={headerRef}
      >
        <nav aria-label="Primary navigation" className={styles.inner}>
          <Link aria-label={`${brandName} home`} className={styles.wordmark} href="/">
            <span aria-hidden="true">[</span>
            {NAVBAR_LOGO_TEXT}
            <span aria-hidden="true">]</span>
          </Link>
          <div className={styles.desktopLinks}>
            {routes.map((item) => (
              <Link
                aria-current={activeHref === item.href ? "page" : undefined}
                className={styles.navLink}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link className={styles.desktopCta} href={ctaHref}>
            {ctaLabel}
            <span aria-hidden="true" className={styles.ctaArrow}>↗</span>
          </Link>
          <details className={styles.mobileMenu} data-mobile-menu ref={menuRef}>
            <summary className={styles.mobileToggle}>
              <span className={styles.mobileToggleLabel}>Menu</span>
              <span aria-hidden="true" className={styles.menuBars}><span /><span /></span>
            </summary>
            <div className={styles.mobilePanel}>
              {routes.map((item) => (
                <Link
                  aria-current={activeHref === item.href ? "page" : undefined}
                  className={styles.mobileLink}
                  href={item.href}
                  key={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link className={styles.mobileCta} href={ctaHref} onClick={closeMenu}>
                {ctaLabel}
                <span aria-hidden="true" className={styles.ctaArrow}>↗</span>
              </Link>
            </div>
          </details>
        </nav>
      </header>
    </>
  );
}
