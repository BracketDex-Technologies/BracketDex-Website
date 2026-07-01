import Link from "next/link";
import { ArrowRightIcon, BrainCircuitIcon, Code2Icon, WorkflowIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLink = {
  label: string;
  href: string;
};

type HeroSectionProps = {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export function HeroSection({
  eyebrow = "BracketDex Technologies",
  headline,
  primaryCta,
  secondaryCta,
  subheadline,
}: HeroSectionProps) {
  const eyebrowUsesBrandFont = eyebrow.includes("BracketDex");
  const headlineUsesBrandFont = headline.includes("BracketDex");

  return (
    <section className="content-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.65fr)] lg:items-center lg:py-24">
      <div className="max-w-reading">
        <p className={cn("mb-4 text-sm font-medium uppercase tracking-[0.18em] text-primary", eyebrowUsesBrandFont && "bd-brand-font")}>
          {eyebrow}
        </p>
        <h1 className={cn("text-4xl font-semibold tracking-tight text-foreground sm:text-6xl", headlineUsesBrandFont && "bd-brand-font")}>
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">{subheadline}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </div>
      </div>

      <div aria-hidden="true" className="hidden md:block">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="rounded-xl border border-border bg-muted/70 p-4">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Delivery Flow</p>
                <p className="mt-1 text-sm text-muted-foreground">Idea to scalable system</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Live</span>
            </div>
            <div className="grid gap-3">
              {[
                { Icon: Code2Icon, label: "Software", value: "Build" },
                { Icon: BrainCircuitIcon, label: "AI", value: "Automate" },
                { Icon: WorkflowIcon, label: "Operations", value: "Scale" },
              ].map(({ Icon, label, value }, index) => (
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3" key={label}>
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-card-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{value}</p>
                  </div>
                  {index < 2 ? <ArrowRightIcon className="size-4 shrink-0 text-secondary" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
