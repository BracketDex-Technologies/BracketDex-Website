import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { MarketingContent } from "@/content/marketing";
import { buildPostHeroContent } from "@/components/home/post-hero/post-hero-content";
import styles from "./cta-section.module.css";

export function FreshCta({ content }: { content: MarketingContent }) {
  const postHero = buildPostHeroContent(content);

  return (
    <section
      aria-labelledby="fresh-cta-title"
      className={`bd-fresh-cta ${styles.section}`}
      data-home-section="cta"
      data-motion-section
      id="contact"
    >
      <div className={`content-shell ${styles.shell}`}>
        <div className={styles.panel}>
          <div className={styles.copy}>
            <h2 id="fresh-cta-title">{postHero.closingCta}</h2>
            <p className={styles.description}>{content.company.shortDescription}</p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/contact">
                Start a project
                <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.8} />
              </Link>
              <Link className={styles.secondaryAction} href="/projects">
                View our work
                <ArrowRight aria-hidden="true" size={20} strokeWidth={1.8} />
              </Link>
            </div>
          </div>

          <div aria-hidden="true" className={styles.artwork}>
            <Image
              alt=""
              height={785}
              priority={false}
              sizes="(max-width: 767px) 100vw, 55vw"
              src="/media/cta/ascii-magic-characters.png"
              width={736}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
