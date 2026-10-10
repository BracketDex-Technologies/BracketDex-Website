import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { PostHeroServiceChapter } from "./post-hero-content";
import { SystemVisual } from "./system-visuals";
import styles from "./chapter-block.module.css";

export function ChapterBlock({ chapter, flipped }: { chapter: PostHeroServiceChapter; flipped: boolean }) {
  return (
    <article className={styles.chapter} data-flipped={flipped} data-home-chapter={chapter.index} data-motion-section>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Services / {chapter.index}</p>
          <h2>{chapter.title}</h2>
          <p className={styles.description}>{chapter.description}</p>
          <ul className={styles.capabilities}>
            {chapter.capabilities.map((capability) => (
              <li key={capability.title}>
                <CheckCircle2 aria-hidden="true" size={20} />
                <div><strong>{capability.title}</strong><span>{capability.outcome}</span></div>
              </li>
            ))}
          </ul>
          <Link className={styles.link} href={chapter.href}>{chapter.linkLabel}<ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
        <div className={styles.diagram}><SystemVisual variant={chapter.visual} /></div>
      </div>
    </article>
  );
}
