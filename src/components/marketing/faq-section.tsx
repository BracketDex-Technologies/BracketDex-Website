"use client";

import { useEffect, useId, useState } from "react";

import type { FaqItem } from "@/content/marketing";

type FaqSectionProps = {
  defaultOpenFirst?: boolean;
  items: readonly FaqItem[];
};

export const FAQ_INTERACTION = "button-panels" as const;

export function FaqSection({ defaultOpenFirst = false, items }: FaqSectionProps) {
  const id = useId();
  const [enhanced, setEnhanced] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenFirst && items.length > 0 ? 0 : null,
  );

  useEffect(() => {
    setEnhanced(true);
  }, []);

  return (
    <div className="bd-faq-list flex flex-col gap-3">
      {items.map((item, index) => {
        const controlId = `${id}-faq-control-${index}`;
        const panelId = `${id}-faq-panel-${index}`;
        const expanded = !enhanced || openIndex === index;

        return (
          <div
            className="bd-faq-item rounded-xl border border-border bg-card p-5 text-card-foreground shadow-none transition-shadow hover:shadow-soft"
            key={item.question}
          >
            <button
              aria-controls={panelId}
              aria-expanded={expanded}
              className="bd-faq-trigger flex w-full cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold tracking-tight"
              id={controlId}
              onClick={() => {
                setOpenIndex((current) => (current === index ? null : index));
              }}
              type="button"
            >
              <span>{item.question}</span>
              <span aria-hidden="true" className="bd-faq-icon text-xl leading-none text-primary transition-transform">
                +
              </span>
            </button>
            <div
              aria-labelledby={controlId}
              className="bd-faq-panel"
              hidden={enhanced && !expanded}
              id={panelId}
              role="region"
            >
              <p className="mt-4 leading-7 text-muted-foreground">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
