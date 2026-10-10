import type { MarketingContent } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import styles from "./process-rail.module.css";

export function ProcessRail({ content }: { content: MarketingContent }) {
  const section = pageContent.services.sections[1];
  return (
    <section aria-labelledby="home-process-title" className={styles.section} data-home-section="process" data-motion-section id="process">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{section.label}</p>
        <div className={styles.heading}>
          <h2 id="home-process-title">{section.title}</h2>
          <p>{section.description}</p>
        </div>
        <ol className={styles.rail}>
          {content.process.map((step) => (
            <li className={styles.step} data-process-step key={step.step}>
              <span aria-hidden="true" className={styles.number}>{step.step}</span>
              <strong data-process-title>{step.title}</strong>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
