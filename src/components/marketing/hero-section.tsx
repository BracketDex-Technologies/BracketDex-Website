import Link from "next/link";

import { Button } from "@/components/ui/button";

type CtaLink = {
  label: string;
  href: string;
};

type HeroSectionProps = {
  headline: string;
  subheadline: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export function HeroSection({
  headline,
  primaryCta,
  secondaryCta,
  subheadline,
}: HeroSectionProps) {
  return (
    <section className="content-shell flex min-h-[calc(100vh-4rem)] flex-col justify-center gap-8 py-20">
      <div className="max-w-reading">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-primary">
          BracketDex Technologies
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">{subheadline}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href={primaryCta.href}>{primaryCta.label}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
        </Button>
      </div>
    </section>
  );
}

