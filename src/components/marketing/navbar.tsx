import Link from "next/link";
import { MenuIcon } from "lucide-react";

import type { NavigationItem } from "@/content/marketing";
import { cn } from "@/lib/utils";

type NavbarProps = {
  brandName: string;
  items: readonly NavigationItem[];
  ctaLabel: string;
  ctaHref: string;
  activeHref?: string;
};

export function Navbar({ activeHref, brandName, ctaHref, ctaLabel, items }: NavbarProps) {
  const primaryItems = items.filter((item) =>
    ["/services", "/solutions", "/projects", "/industries"].includes(item.href)
  );
  const secondaryItems = items.filter((item) =>
    ["/why-choose-us", "/about", "/blog"].includes(item.href)
  );

  return (
    <header className="bd-nav-surface sticky top-0 z-40">
      <nav aria-label="Primary navigation" className="content-shell bd-nav-inner flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight"
          aria-label={`${brandName} home`}
        >
          <span className="bd-logo-slot rounded-md">Logo will be here</span>
          <span className="sr-only">{brandName}</span>
        </Link>

        <div className="bd-desktop-menu items-center gap-3">
          <div className="bd-nav-group flex items-center gap-1 px-4 py-2">
            {primaryItems.map((item) => (
              <Link
                aria-current={activeHref === item.href ? "page" : undefined}
                className="bd-nav-link px-3 py-1 text-sm font-medium transition-opacity hover:opacity-80"
                data-active={activeHref === item.href}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {secondaryItems.map((item) => (
            <Link
              aria-current={activeHref === item.href ? "page" : undefined}
              className={cn(
                "rounded-lg border border-border bg-card/70 px-4 py-2.5 text-sm font-medium shadow-soft transition-colors hover:bg-card",
                activeHref === item.href ? "text-foreground" : "text-muted-foreground"
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lift transition-opacity hover:opacity-90"
            href={ctaHref}
          >
            {ctaLabel}
          </Link>
        </div>

        <details className="bd-mobile-menu group fixed right-4 top-8 z-50">
          <summary className="inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-lg border border-border bg-card/80 shadow-soft transition-colors hover:bg-card focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Toggle navigation menu</span>
            <MenuIcon aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-12 w-[min(21rem,calc(100vw-2rem))] rounded-xl border border-border bg-card p-3 shadow-lift">
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  aria-current={activeHref === item.href ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-medium hover:bg-muted hover:text-foreground",
                    activeHref === item.href ? "bg-muted text-foreground" : "text-muted-foreground"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="mt-2 rounded-lg bg-foreground px-3 py-3 text-center text-sm font-medium text-background"
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
