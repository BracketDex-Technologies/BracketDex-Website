import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { MarketingContent } from "@/content/marketing";
import { ServicesBentoMotion } from "./services-bento-motion";
import { ServiceBentoVisual, type ServiceVisualKind } from "./services-bento-visual";
import styles from "./services-bento.module.css";

const cards: readonly { index: number; visual: ServiceVisualKind; href: string; wide?: boolean }[] = [
  { index: 2, visual: "automation", href: "/solutions" },
  { index: 0, visual: "software", href: "/services", wide: true },
  { index: 1, visual: "ai", href: "/solutions" },
  { index: 4, visual: "growth", href: "/services" },
  { index: 3, visual: "cloud", href: "/services" },
];

export function ServicesBento({ content }: { content: MarketingContent }) {
  return (
    <section className={styles.section} aria-labelledby="services-title" data-home-section="services" id="services">
      <div className={styles.shell}>
        <ServicesBentoMotion>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Our services</p>
            <h2 id="services-title">Built to work together.</h2>
          </header>
          <div className={styles.grid}>
            {cards.map(({ index, visual, href, wide }) => {
              const service = content.services[index];
              return (
                <article className={styles.card} data-service-card={visual} data-wide={wide || undefined} key={visual}>
                  <div aria-hidden="true" className={styles.art}>
                    <div className={styles.parallax} data-bento-parallax>
                      <ServiceBentoVisual kind={visual} technologies={content.technologyStack} />
                    </div>
                  </div>
                  <div className={styles.copy}>
                    <h3><Link href={href} className={styles.link}>{service.title}<ArrowUpRight className={styles.arrow} size={19} aria-hidden="true" /></Link></h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </ServicesBentoMotion>
      </div>
    </section>
  );
}
