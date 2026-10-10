import type { MarketingContent } from "@/content/marketing";
import { CloudDevOpsVisual } from "@/components/home/post-hero/system-visuals";
import styles from "./cloud-panel.module.css";

export function CloudPanel({ content }: { content: MarketingContent }) {
  const service = content.services[3];
  const groups = content.technologyStack.filter((group) => group.category === "Cloud" || group.category === "DevOps");

  return (
    <section aria-labelledby="home-cloud-title" className={styles.section} data-home-section="cloud" data-motion-section id="cloud">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{content.solutions[5].title}</p>
          <h2 id="home-cloud-title">{service.title}</h2>
          <p className={styles.description}>{service.description}</p>
          <dl className={styles.groups}>
            {groups.map((group) => (
              <div key={group.category}>
                <dt>{group.category}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
        <CloudDevOpsVisual groups={groups} />
      </div>
    </section>
  );
}
