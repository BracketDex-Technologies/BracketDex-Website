import type { MarketingContent } from "@/content/marketing";
import styles from "./trust-strip.module.css";

export function TrustStrip({ content }: { content: MarketingContent }) {
  return (
    <section aria-label="Trust indicators" className={styles.section} data-home-section="trust">
      <div className={styles.inner}>
        {content.homepage.trustMetricPlaceholders.map(({ label }) => (
          <span className={styles.label} key={label}>{label}</span>
        ))}
      </div>
    </section>
  );
}
