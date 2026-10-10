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

export function Navbar({ activeHref, brandName, ctaHref, ctaLabel, items }: NavbarProps) {
  const routes = items.filter((item) => item.href !== "/" && item.href !== ctaHref);
  const menuRef = useRef<HTMLDetailsElement>(null);

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

  const closeMenu = () => { if (menuRef.current) menuRef.current.open = false; };

  return (
    <header className={styles.header}>
      <nav aria-label="Primary navigation" className={styles.inner}>
        <Link aria-label={`${brandName} home`} className={styles.wordmark} href="/">
          <span aria-hidden="true">[</span>{NAVBAR_LOGO_TEXT}<span aria-hidden="true">]</span>
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
        <Link className={styles.desktopCta} href={ctaHref}>{ctaLabel}</Link>
        <details className={styles.mobileMenu} data-mobile-menu ref={menuRef}>
          <summary className={styles.mobileToggle}>
            <span className={styles.mobileToggleLabel}>Menu</span>
            <span aria-hidden="true" className={styles.menuBars}><span /><span /></span>
          </summary>
          <div className={styles.mobilePanel}>
            {routes.map((item, index) => (
              <Link
                aria-current={activeHref === item.href ? "page" : undefined}
                className={styles.mobileLink}
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
            <Link className={styles.mobileCta} href={ctaHref} onClick={closeMenu}>{ctaLabel}</Link>
          </div>
        </details>
      </nav>
    </header>
  );
}
