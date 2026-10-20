import { ArrowUpRight } from "lucide-react";

import { ContactForm } from "@/components/marketing/contact-form";
import type { MarketingContent } from "@/content/marketing";
import { contactDetails } from "@/lib/site";
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
          <div className={styles.content}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Start a project</p>
              <h2 id="fresh-cta-title">{postHero.closingCta}</h2>
              <p className={styles.description}>{content.company.shortDescription}</p>
              <a className={styles.emailLink} href={`mailto:${contactDetails.email}`}>
                Email directly
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
              </a>
            </div>

            <ContactForm className={styles.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
