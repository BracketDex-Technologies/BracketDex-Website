import type { MarketingContent } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import { ProcessTimeline } from "./process-timeline";
import styles from "./process-rail.module.css";

export function ProcessRail({ content }: { content: MarketingContent }) {
  const section = pageContent.services.sections[1];
  return (
    <section aria-labelledby="home-process-title" className={styles.section} data-home-section="process" id="process">
      <div className={styles.inner}>
        <ProcessTimeline
          label={section.label}
          title={section.title}
          description={section.description}
          steps={content.process}
        />
      </div>
    </section>
  );
}
