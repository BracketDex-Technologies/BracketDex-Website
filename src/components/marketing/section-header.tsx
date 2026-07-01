import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  label?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  align = "left",
  className,
  description,
  label,
  title,
}: SectionHeaderProps) {
  const labelUsesBrandFont = label?.includes("BracketDex");
  const titleUsesBrandFont = title.includes("BracketDex");

  return (
    <div
      className={cn(
        "max-w-reading",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label ? (
        <p className={cn("mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary", labelUsesBrandFont && "bd-brand-font")}>
          {label}
        </p>
      ) : null}
      <h2 className={cn("text-3xl font-semibold tracking-tight text-foreground sm:text-5xl", titleUsesBrandFont && "bd-brand-font")}>
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
