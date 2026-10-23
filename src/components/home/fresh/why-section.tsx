import type { FeatureItem, MarketingContent } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import { WhyProofVisual } from "./why-proof-visual";
import styles from "./why-section.module.css";

function ProofCard({ item, index }: { item: FeatureItem; index: number }) {
  return (
    <li className={styles.card} data-proof-card tabIndex={0}>
      <div className={styles.copy}>
        <span className={styles.index}>0{index + 1}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <WhyProofVisual index={index} />
    </li>
  );
}

export function WhySection({ content }: { content: MarketingContent }) {
  const section = pageContent.solutions.sections[3];
  return (
    <section aria-labelledby="home-why-title" className={styles.section} data-home-section="why" data-motion-section id="why">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>{section.label}</p>
          <h2 id="home-why-title">{section.title}</h2>
          <p>{section.description}</p>
        </div>
        <ul className={styles.grid}>
          {content.whyChooseUs.map((item, index) => <ProofCard index={index} item={item} key={item.title} />)}
        </ul>
      </div>
    </section>
  );
}
