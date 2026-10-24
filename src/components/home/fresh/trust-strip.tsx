import type { MarketingContent } from "@/content/marketing";
import styles from "./trust-strip.module.css";

export function TrustStrip({ content }: { content: MarketingContent }) {
  const capabilities = [
    ...content.services.slice(0, 4).map(({ title }) => title),
    "SEO & Growth",
    content.solutions.find(({ title }) => title === "SaaS Platforms")?.title ?? "SaaS Platforms",
  ];

  return (
    <section
      aria-label="Core capabilities"
      className={styles.section}
      data-home-section="trust"
      data-capability-marquee="true"
      data-capability-strip="true"
      data-motion-section
    >
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((copyIndex) => (
            <div
              aria-hidden={copyIndex === 1 ? "true" : undefined}
              className={styles.group}
              data-marquee-copy="true"
              key={copyIndex}
            >
              {capabilities.map((title) => (
                <span className={styles.item} key={`${copyIndex}-${title}`}>
                  <span className={styles.label}>{title}</span>
                  <span aria-hidden="true" className={styles.star} data-capability-star="true">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
