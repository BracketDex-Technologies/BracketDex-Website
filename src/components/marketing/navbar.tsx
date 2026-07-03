import Link from "next/link";

import type { NavigationItem } from "@/content/marketing";
import { cn } from "@/lib/utils";
import { NavbarScrollState } from "./navbar-scroll-state";

export const NAVBAR_LOGO_TEXT = "BracketDex";
export const NAVBAR_WORDMARK_DOCK_SELECTOR = "[data-site-wordmark]";
export const NAVBAR_CONTROL_RADIUS_PX = 8;
export const NAVBAR_CONTROL_HEIGHT_PX = 32;
export const NAVBAR_IS_STICKY = true;
const PRIMARY_NAVIGATION_HREFS = new Set(["/services", "/solutions", "/projects", "/about"]);

type NavbarProps = {
  brandName: string;
  items: readonly NavigationItem[];
  ctaLabel: string;
  ctaHref: string;
  activeHref?: string;
};

export function Navbar({ activeHref, brandName, ctaHref, ctaLabel, items }: NavbarProps) {
  const navigationItems = items.filter((item) => PRIMARY_NAVIGATION_HREFS.has(item.href));

  return (
    <header className="bd-nav-surface sticky top-0 z-40 flex justify-center">
      <NavbarScrollState />
      <nav aria-label="Primary navigation" className="bd-nav-inner flex items-center justify-between">
        <Link
          href="/"
          className="bd-brand-link shrink-0"
          aria-label={`${brandName} home`}
        >
          <span aria-hidden="true" className="bd-wordmark" data-site-wordmark>
            {NAVBAR_LOGO_TEXT}
          </span>
          <span className="sr-only">{brandName}</span>
        </Link>

        <div className="bd-desktop-menu items-center gap-3">
          <div className="bd-nav-group relative flex h-[32px] items-center px-[9px] pl-[12px]">
            <span aria-hidden="true" className="bd-glass-pill absolute inset-0" />
            <div className="relative z-10 flex items-center">
              {navigationItems.map((item, index) => (
                <span className="contents" key={item.href}>
                  {index > 0 ? <span aria-hidden="true" className="bd-nav-divider" /> : null}
                  <span className="group relative inline-flex items-center justify-center rounded-[4px] px-[5px] py-[2px]">
                    <span aria-hidden="true" className="bd-nav-hover absolute inset-0 opacity-0 group-hover:opacity-100" />
                    <Link
                      aria-current={activeHref === item.href ? "page" : undefined}
                      className="bd-nav-link relative z-10"
                      data-active={activeHref === item.href}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </span>
                </span>
              ))}
            </div>
          </div>

          <Link
            className="bd-nav-cta group relative inline-flex h-[32px] items-center justify-center px-3"
            href={ctaHref}
          >
            <span aria-hidden="true" className="bd-nav-cta-surface absolute inset-0" />
            <span className="relative z-10">{ctaLabel}</span>
          </Link>
        </div>

        <details className="bd-mobile-menu group">
          <summary className="bd-mobile-toggle">
            <span className="sr-only">Toggle navigation menu</span>
            <span aria-hidden="true" className="bd-mobile-toggle-lines">
              <span />
              <span />
              <span />
            </span>
          </summary>
          <div className="bd-mobile-panel absolute right-0 top-12 w-[min(21rem,calc(100vw-2rem))] p-3">
            <div className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <Link
                  aria-current={activeHref === item.href ? "page" : undefined}
                  className={cn(
                    "bd-mobile-link",
                    activeHref === item.href ? "bd-mobile-link-active" : undefined
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="bd-mobile-cta mt-2 px-3 py-3 text-center"
                href={ctaHref}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
