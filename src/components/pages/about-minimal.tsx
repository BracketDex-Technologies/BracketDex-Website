import { MinimalMarketingShell } from "./minimal-marketing-shell";
import styles from "./minimal-pages.module.css";

const values = [
  ["Quality First", "Build dependable software with care for the details that matter in everyday use."],
  ["Simplicity", "Make complex work easier with clear interfaces and practical technology choices."],
  ["Transparency", "Keep scope, decisions and progress clear throughout the work."],
  ["Innovation", "Use AI and automation where they solve a real business problem."],
  ["Long-Term Partnership", "Think beyond launch, with systems that can grow alongside the business."],
  ["Continuous Improvement", "Learn from real use and refine what makes the work better."],
];

export function AboutMinimalPage() {
  return <MinimalMarketingShell page="about">
    <div className={styles.about}>
      <section aria-labelledby="about-title">
        <p className={styles.eyebrow}>About BracketDex</p>
        <h1 id="about-title"><span>Thoughtful technology.</span>{" "}<span>Clear intent.</span></h1>
        <div className={styles.story}>
          <p>BracketDex Technologies was founded with a simple goal: make high-quality technology accessible to growing businesses.</p>
          <p>We bring together custom software, AI, automation and cloud infrastructure to help businesses connect their systems and simplify everyday work. We start with the problem, then choose the technology that fits.</p>
          <p>We value clear communication, useful simplicity and work that can improve over time. Our aim is to build long-term relationships through careful, dependable choices.</p>
        </div>
      </section>
      <section className={styles.values} aria-labelledby="values-title">
        <h2 id="values-title">What guides us.</h2>
        <ul className={styles.valuesList} role="list">
          {values.map(([title, description]) => <li key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>)}
        </ul>
      </section>
    </div>
  </MinimalMarketingShell>;
}
