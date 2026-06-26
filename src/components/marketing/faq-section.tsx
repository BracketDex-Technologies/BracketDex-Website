import type { FaqItem } from "@/content/marketing";

type FaqSectionProps = {
  defaultOpenFirst?: boolean;
  items: readonly FaqItem[];
};

export function FaqSection({ defaultOpenFirst = false, items }: FaqSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <details
          className="group rounded-xl border border-border bg-card p-5 text-card-foreground shadow-none transition-shadow hover:shadow-soft"
          key={item.question}
          open={defaultOpenFirst && index === 0}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span aria-hidden="true" className="text-xl leading-none text-primary transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 leading-7 text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
