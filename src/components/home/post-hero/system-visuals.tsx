import type { TechnologyGroup } from "@/content/marketing";
import { marketingContent } from "@/content/marketing";
import type { PostHeroVisual } from "./post-hero-content";
import styles from "./system-visuals.module.css";

export const SYSTEM_VISUAL_LAYOUTS = ["software-flow", "ai-branch", "automation-pipeline", "cloud-topology"] as const;

const visualContent = {
  software: { service: marketingContent.services[0], solutions: [marketingContent.solutions[0], marketingContent.solutions[1], marketingContent.solutions[4]] },
  ai: { service: marketingContent.services[1], solutions: [marketingContent.solutions[2], marketingContent.solutions[3], marketingContent.solutions[4]] },
  automation: { service: marketingContent.services[2], solutions: [marketingContent.solutions[3], marketingContent.solutions[4], marketingContent.solutions[5]] },
} as const;

const paths: Record<PostHeroVisual, readonly string[]> = {
  software: ["M183 96 C249 96 232 199 315 199", "M315 199 C395 199 367 298 435 298"],
  ai: ["M190 199 C254 199 239 91 330 91", "M190 199 C254 199 239 303 330 303"],
  automation: ["M182 199 H314", "M402 199 H524"],
};

export function SystemVisual({ variant }: { variant: PostHeroVisual }) {
  const data = visualContent[variant];
  return (
    <div aria-label={`${data.service.title} system diagram`} className={styles.visual} data-visual={variant} role="group">
      <div className={styles.meta}><span>{data.service.title}</span><span aria-hidden="true">{variant === "software" ? "01" : variant === "ai" ? "02" : "03"} / 03</span></div>
      <div className={styles.canvas} data-layout={variant}>
        <svg aria-hidden="true" className={styles.lines} data-pointer-layer="diagram" preserveAspectRatio="none" viewBox="0 0 600 400">
          {paths[variant].map((path) => <path d={path} key={path} />)}
        </svg>
        <div className={styles.nodes}>
          {data.solutions.map((solution, index) => (
            <div className={styles.node} data-diagram-node key={`${variant}-${solution.title}`}>
              <span aria-hidden="true" className={styles.nodeIndex}>{String(index + 1).padStart(2, "0")}</span>
              <strong>{solution.title}</strong>
              <span>{solution.outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CloudDevOpsVisual({ groups }: { groups: readonly TechnologyGroup[] }) {
  const cloud = groups.find((group) => group.category === "Cloud");
  const devOps = groups.find((group) => group.category === "DevOps");
  return (
    <div aria-label="Cloud and DevOps topology" className={styles.cloud} role="group">
      <svg aria-hidden="true" className={styles.cloudLines} data-pointer-layer="cloud" preserveAspectRatio="none" viewBox="0 0 600 320">
        <path d="M205 85 C295 85 285 80 385 80" />
        <path d="M205 160 H385" />
        <path d="M205 235 C295 235 285 240 385 240" />
      </svg>
      <div className={styles.cloudColumn}>
        <span className={styles.cloudLabel}>{devOps?.category}</span>
        {devOps?.items.map((item) => <span className={styles.cloudNode} data-diagram-node key={item}>{item}</span>)}
      </div>
      <div className={styles.cloudColumn}>
        <span className={styles.cloudLabel}>{cloud?.category}</span>
        {cloud?.items.map((item) => <span className={styles.cloudNode} data-diagram-node key={item}>{item}</span>)}
      </div>
    </div>
  );
}
