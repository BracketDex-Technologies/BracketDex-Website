import Link from "next/link";

import type { NavigationItem } from "@/content/marketing";

type FooterProps = {
  brandName: string;
  description: string;
  navigation: readonly NavigationItem[];
};

export function Footer({ brandName, description, navigation }: FooterProps) {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="content-shell grid gap-10 py-14 md:grid-cols-[1.2fr_1fr]">
        <div className="max-w-reading">
          <div className="bd-logo-slot rounded-md text-foreground">Logo will be here</div>
          <p className="mt-4 text-lg font-semibold tracking-tight">{brandName}</p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {navigation.map((item) => (
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
