import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionContainerProps = ComponentPropsWithoutRef<"section"> & {
  tone?: "default" | "muted" | "dark";
};

export function SectionContainer({
  children,
  className,
  tone = "default",
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-24",
        tone === "muted" && "bg-muted",
        tone === "dark" && "dark bg-background text-foreground",
        className
      )}
      {...props}
    >
      <div className="content-shell">{children}</div>
    </section>
  );
}

