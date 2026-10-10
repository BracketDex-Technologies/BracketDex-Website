import { CheckCircle2 } from "lucide-react";
import type { MarketingContent, TechnologyGroup } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import { IndustryCard } from "@/components/marketing/industry-card";
import styles from "./capability-index.module.css";

function CapabilityRow({ group }: { group: TechnologyGroup }) {
  return (
    <div className={styles.row}>
      <CheckCircle2 aria-hidden="true" size={16} />
      <div><strong>{group.category}</strong><span>{group.items.join(" · ")}</span></div>
    </div>
  );
}

export function CapabilityIndex({ content }: { content: MarketingContent }) {
  const technology = pageContent.services.sections[2];
  const industries = pageContent.industries;
  return (
    <section aria-labelledby="home-capability-title" className={styles.section} data-home-section="capabilities" data-motion-section id="industries">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>{technology.label}</p>
            <h2 id="home-capability-title">{technology.title}</h2>
            <p className={styles.description}>{technology.description}</p>
          </div>
          <div>
            <p className={styles.eyebrow}>{industries.eyebrow}</p>
            <h2>{industries.title}</h2>
            <p className={styles.description}>{industries.description}</p>
          </div>
        </div>
        <div className={styles.rows}>
          {content.technologyStack.map((group) => <CapabilityRow group={group} key={group.category} />)}
        </div>
        <div className={styles.industryGrid}>
          {content.industries.map((industry) => <IndustryCard description={industry.description} key={industry.title} title={industry.title} />)}
        </div>
      </div>
    </section>
  );
}
