"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { NavigationItem } from "@/content/marketing";
import styles from "./navbar.module.css";

export const NAVBAR_CONTROL_HEIGHT_PX = 44;

const DARK_SURFACE_LUMINANCE = 120;

function getBackgroundLuminance(element: Element) {
  const channels = window.getComputedStyle(element).backgroundColor.match(/[\d.]+/g)?.map(Number);
  if (!channels || channels.length < 3 || (channels[3] ?? 1) < 0.1) return null;

  const [red, green, blue] = channels;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

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
  const closeMenuRef = useRef<(restoreFocus?: boolean, animate?: boolean) => void>(() => {});

  useEffect(() => {
    const menu = menuRef.current;
    const summary = menu?.querySelector("summary");
    const panel = menu?.querySelector<HTMLElement>("[data-mobile-panel]");
    if (!menu || !summary || !panel) return;

    const mobile = window.matchMedia("(max-width: 1070px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | null = null;
    let closing = false;
    let locked = false;
    let previousBodyOverflow = "";
    let previousRootOverflow = "";

    const releaseMenu = () => {
      closing = false;
      menu.removeAttribute("role");
      menu.removeAttribute("aria-modal");
      menu.removeAttribute("aria-label");
      summary.setAttribute("aria-label", "Open navigation");
      if (locked) {
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousRootOverflow;
        locked = false;
      }
    };

    const finishClose = (restoreFocus: boolean) => {
      menu.open = false;
      animation?.cancel();
      animation = null;
      releaseMenu();
      if (restoreFocus && mobile.matches) summary.focus({ preventScroll: true });
    };

    const closeMenu = (restoreFocus = true, animate = true) => {
      if (!menu.open || closing) return;
      closing = true;
      const opacity = window.getComputedStyle(panel).opacity;
      animation?.cancel();
      if (!animate || reducedMotion.matches || typeof panel.animate !== "function") {
        finishClose(restoreFocus);
        return;
      }
      animation = panel.animate([{ opacity }, { opacity: 0 }], { duration: 220, easing: "ease", fill: "forwards" });
      animation.onfinish = () => finishClose(restoreFocus);
    };
    closeMenuRef.current = closeMenu;

    const activateMenu = () => {
      if (!mobile.matches) {
        finishClose(false);
        return;
      }
      const opacity = closing ? window.getComputedStyle(panel).opacity : 0;
      animation?.cancel();
      closing = false;
      menu.setAttribute("role", "dialog");
      menu.setAttribute("aria-modal", "true");
      menu.setAttribute("aria-label", "Site navigation");
      summary.setAttribute("aria-label", "Close navigation");
      if (!locked) {
        previousBodyOverflow = document.body.style.overflow;
        previousRootOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        locked = true;
      }
      if (!reducedMotion.matches && typeof panel.animate === "function") {
        animation = panel.animate([{ opacity }, { opacity: 1 }], { duration: 280, easing: "ease", fill: "both" });
      }
      panel.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
    };

    const onToggle = () => {
      if (menu.open) activateMenu();
      else {
        animation?.cancel();
        animation = null;
        releaseMenu();
      }
    };
    const onSummaryClick = (event: MouseEvent) => {
      event.preventDefault();
      if (closing) activateMenu();
      else if (menu.open) closeMenu();
      else menu.open = true;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!menu.open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      } else if (event.key === "Tab") {
        const controls = [summary, ...panel.querySelectorAll<HTMLAnchorElement>("a[href]")];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !menu.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !menu.contains(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (menu.open && !menu.contains(event.target as Node)) panel.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
    };
    const onBreakpointChange = () => {
      if (!mobile.matches) finishClose(false);
    };

    summary.addEventListener("click", onSummaryClick);
    menu.addEventListener("toggle", onToggle);
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    mobile.addEventListener("change", onBreakpointChange);
    if (menu.open) activateMenu();
    return () => {
      summary.removeEventListener("click", onSummaryClick);
      menu.removeEventListener("toggle", onToggle);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      mobile.removeEventListener("change", onBreakpointChange);
      animation?.cancel();
      releaseMenu();
      closeMenuRef.current = () => {};
    };
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

  useEffect(() => {
    if (!transparentOnHero) return;

    const header = headerRef.current;
    if (!header) return;

    let animationFrame = 0;
    const updateSurfaceTone = () => {
      animationFrame = 0;
      const sampleY = Math.min(window.innerHeight - 1, Math.round(header.getBoundingClientRect().height + 1));
      const surface = document
        .elementsFromPoint(window.innerWidth / 2, sampleY)
        .find((element) => !header.contains(element));

      let current: Element | null = surface ?? document.body;
      let luminance: number | null = null;
      while (current && luminance === null) {
        luminance = getBackgroundLuminance(current);
        current = current.parentElement;
      }

      header.dataset.surface = luminance !== null && luminance < DARK_SURFACE_LUMINANCE ? "dark" : "light";
    };

    const scheduleSurfaceUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateSurfaceTone);
    };

    updateSurfaceTone();
    window.addEventListener("scroll", scheduleSurfaceUpdate, { passive: true });
    window.addEventListener("resize", scheduleSurfaceUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleSurfaceUpdate);
      window.removeEventListener("resize", scheduleSurfaceUpdate);
      delete header.dataset.surface;
    };
  }, [transparentOnHero]);

  const closeMenu = () => closeMenuRef.current(false, false);

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
          <Link aria-label={`${brandName} home`} className={styles.wordmark} href="/" onClick={closeMenu}>
            <Image
              alt=""
              aria-hidden="true"
              className={styles.logoDark}
              height={104}
              priority={!transparentOnHero}
              src="/media/brand/bracketdex-logo-regular-dark.svg"
              width={572}
            />
            <Image
              alt=""
              aria-hidden="true"
              className={styles.logoLight}
              height={104}
              priority={transparentOnHero}
              src="/media/brand/bracketdex-logo-regular-light.svg"
              width={572}
            />
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
            <summary aria-label="Open navigation" className={styles.mobileToggle}>
              <span aria-hidden="true" className={styles.menuBars}><span /><span /></span>
            </summary>
            <div className={styles.mobilePanel} data-mobile-panel data-lenis-prevent>
              <div className={styles.mobileLinks}>
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
            </div>
          </details>
        </nav>
      </header>
    </>
  );
}
