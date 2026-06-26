import Link from "next/link";
import { MenuIcon } from "lucide-react";

import type { NavigationItem } from "@/content/marketing";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  brandName: string;
  items: readonly NavigationItem[];
  ctaLabel: string;
  ctaHref: string;
};

export function Navbar({ brandName, ctaHref, ctaLabel, items }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="content-shell flex min-h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            BD
          </span>
          <span>{brandName}</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild>
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>

        <details className="group relative lg:hidden">
          <summary className="inline-flex size-9 cursor-pointer list-none items-center justify-center rounded-md border border-input bg-background shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Toggle navigation menu</span>
            <MenuIcon aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-12 w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-border bg-background p-3 shadow-lift">
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
