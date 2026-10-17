import type { MarketingContent } from "@/content/marketing";
import styles from "./trust-strip.module.css";

export function TrustStrip({ content }: { content: MarketingContent }) {
  const capabilities = content.services.slice(0, 4);

  return (
    <section aria-label="Core capabilities" className={styles.section} data-home-section="trust" data-capability-strip="true" data-motion-section>
      <div className={styles.inner}>
        {capabilities.map(({ title }, index) => (
          <span className={styles.item} key={title}>
            <span aria-hidden="true" className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.label}>{title}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
