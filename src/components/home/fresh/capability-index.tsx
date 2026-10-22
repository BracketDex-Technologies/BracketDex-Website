import type { MarketingContent } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import { IndustryCard } from "@/components/marketing/industry-card";
import styles from "./capability-index.module.css";
import { TechnologyNetwork } from "./technology-network";

export function CapabilityIndex({ content }: { content: MarketingContent }) {
  const technology = pageContent.services.sections[2];
  const industries = pageContent.industries;
  return (
    <section aria-labelledby="home-capability-title" data-home-section="capabilities">
      <TechnologyNetwork groups={content.technologyStack} label={technology.label} title={technology.title} />
      <div className={styles.section} id="industries" data-motion-section>
       <div className={styles.inner}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>{industries.eyebrow}</p>
            <h2>{industries.title}</h2>
            <p className={styles.description}>{industries.description}</p>
          </div>
        </div>
        <div className={styles.industryGrid}>
          {content.industries.map((industry) => <IndustryCard description={industry.description} key={industry.title} title={industry.title} />)}
        </div>
       </div>
      </div>
    </section>
  );
}
