import type { MarketingContent, ProblemGroup } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import styles from "./problem-section.module.css";

function ProblemCard({ group, index }: { group: ProblemGroup; index: number }) {
  return (
    <li className={styles.card}>
      <span aria-hidden="true" className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
      <h3>{group.title}</h3>
      <ul>
        {group.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}
      </ul>
    </li>
  );
}

export function ProblemSection({ content }: { content: MarketingContent }) {
  const section = pageContent.solutions.sections[0];
  return (
    <section aria-labelledby="home-problems-title" className={styles.section} data-home-section="problems" id="problems">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{section.label}</p>
        <div className={styles.heading}>
          <h2 id="home-problems-title">{section.title}</h2>
          <p>{section.description}</p>
        </div>
        <ul className={styles.grid}>
          {content.homepage.problemGroups.map((group, index) => <ProblemCard group={group} index={index} key={group.title} />)}
        </ul>
      </div>
    </section>
  );
}
