import { MinimalMarketingShell } from "./minimal-marketing-shell";
import styles from "./minimal-pages.module.css";

const values = [
  ["Quality First", "Simplicity", "Transparency"],
  ["Innovation", "Long-Term Partnership", "Continuous Improvement"],
];

export function AboutMinimalPage() {
  return <MinimalMarketingShell page="about">
    <div className={styles.about}>
      <section aria-labelledby="about-title">
        <p className={styles.eyebrow}>About BracketDex</p>
        <h1 id="about-title"><span>Thoughtful technology.</span>{" "}<span>Clear intent.</span></h1>
        <div className={styles.story}>
          <p>BracketDex Technologies was founded with a simple goal: make high-quality technology accessible to growing businesses.</p>
          <p>We value clear communication, useful simplicity and work that can improve over time. Our aim is to build long-term relationships through careful, dependable choices.</p>
        </div>
      </section>
      <section className={styles.values} aria-labelledby="values-title">
        <h2 id="values-title">What guides us.</h2>
        <div className={styles.valuesList}>
          {values.map((row, index) => <ul role="list" key={index}>{row.map(value => <li key={value}>{value}</li>)}</ul>)}
        </div>
      </section>
    </div>
  </MinimalMarketingShell>;
}
