import Link from "next/link";

import { Button } from "@/components/ui/button";

type CtaSectionProps = {
  headline: string;
  description?: string;
  cta: {
    label: string;
    href: string;
  };
};

export function CtaSection({ cta, description, headline }: CtaSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-card-foreground shadow-soft sm:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-reading">
          <h2 className="text-3xl font-semibold tracking-tight">{headline}</h2>
          {description ? (
            <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <Button asChild size="lg">
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>
    </div>
  );
}

