import { Code2, PackageCheck, ShieldCheck, Workflow } from "lucide-react";
import type { FeatureItem, MarketingContent } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import styles from "./why-section.module.css";

const icons = [Workflow, Code2, PackageCheck, ShieldCheck] as const;

function ProofCard({ item, index }: { item: FeatureItem; index: number }) {
  const Icon = icons[index % icons.length];
  return (
    <li className={styles.card} data-proof-card>
      <Icon aria-hidden="true" size={20} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </li>
  );
}

export function WhySection({ content }: { content: MarketingContent }) {
  const section = pageContent.solutions.sections[3];
  return (
    <section aria-labelledby="home-why-title" className={styles.section} data-home-section="why" data-motion-section id="why">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{section.label}</p>
        <div className={styles.heading}>
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
