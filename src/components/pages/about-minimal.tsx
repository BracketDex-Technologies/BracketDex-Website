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
      <section className={styles.aboutIntro} aria-labelledby="about-title">
        <div>
        <p className={styles.eyebrow}>About BracketDex</p>
        <h1 id="about-title"><span>Thoughtful technology.</span>{" "}<span>Clear intent.</span></h1>
        <div className={styles.story}>
          <p>BracketDex Technologies was founded with a simple goal: make high-quality technology accessible to growing businesses.</p>
          <p>We bring together custom software, AI, automation and cloud infrastructure to help businesses connect their systems and simplify everyday work. We start with the problem, then choose the technology that fits.</p>
          <p>We value clear communication, useful simplicity and work that can improve over time. Our aim is to build long-term relationships through careful, dependable choices.</p>
        </div>
        </div>
        <svg className={styles.aboutArt} viewBox="0 0 440 480" fill="none" aria-hidden="true" focusable="false">
          <g stroke="#c5c2bb" strokeWidth="1">
            <circle cx="220" cy="240" r="190" strokeDasharray="3 7" />
            <ellipse cx="220" cy="240" rx="140" ry="190" transform="rotate(35 220 240)" />
            <path d="M30 240h380M220 50v380" strokeDasharray="3 7" />
          </g>
          <g stroke="#252521" strokeWidth="1.6" strokeLinejoin="round">
            <path d="m80 310 140-70 140 70-140 70Z" fill="#f2ede3" />
            <path d="M80 310v16l140 70 140-70v-16M220 380v16" />
            <path d="M110 172v138m220-138v138M220 227v110" stroke="#918a7e" strokeDasharray="5 6" />
            <path d="m80 160 140-70 140 70-140 70Z" fill="#fffdf7" />
            <path d="M80 160v16l140 70 140-70v-16M220 230v16" />
            <path d="m145 160 75-38 75 38-75 38Z" fill="#f25623" />
            <path d="m192 158-15 7 15 7m56-28 15 7-15 7m-18-14-17 33" stroke="#fffdf7" strokeWidth="2.5" />
            <path d="m190 296 30-15 30 15v30l-30 15-30-15Zm0 0 30 15 30-15m-30 15v30" fill="#fffdf7" />
            <path d="m120 305 28-14 28 14-28 14Zm144 0 28-14 28 14-28 14Z" />
            <circle cx="64" cy="240" r="18" fill="#fffdf7" />
            <path d="M57 240h14m-7-7v14" />
            <circle cx="376" cy="240" r="18" fill="#fffdf7" />
            <path d="m369 240 5 5 9-10" />
          </g>
          <g fill="#f25623">
            <circle cx="220" cy="50" r="5" />
            <circle cx="112" cy="396" r="4" />
            <circle cx="376" cy="132" r="4" />
          </g>
        </svg>
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
