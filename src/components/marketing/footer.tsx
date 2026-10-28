import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { NavigationItem } from "@/content/marketing";
import { contactDetails } from "@/lib/site";
import styles from "./footer.module.css";

type FooterProps = {
  brandName: string;
  description: string;
  navigation: readonly NavigationItem[];
};

const FOOTER_LINK_GROUPS = [
  { title: "Explore", labels: ["Home", "Services", "Solutions", "Projects"] },
  { title: "Company", labels: ["About", "FAQ", "Contact"] },
] as const;

export function Footer({ brandName, description, navigation }: FooterProps) {
  const linkGroups = FOOTER_LINK_GROUPS.map((group) => ({
    ...group,
    links: group.labels.flatMap((label) => {
      const item = navigation.find((navigationItem) => navigationItem.label === label);
      return item ? [item] : [];
    }),
  }));

  return (
    <footer className={`bd-fresh-footer ${styles.footer}`}>
      <div className={`content-shell ${styles.shell}`}>
        <div className={styles.panel}>
          <div className={styles.top}>
            <div className={styles.identity}>
              <div className={styles.brand}>
                <span aria-label={brandName} className={styles.brandName} role="img">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.brandLogoDark}
                    height={104}
                    src="/media/brand/bracketdex-logo-regular-dark.svg"
                    width={572}
                  />
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.brandLogoLight}
                    height={104}
                    src="/media/brand/bracketdex-logo-regular-light.svg"
                    width={572}
                  />
                </span>
                <p className={styles.description}>{description}</p>
              </div>
              <address className={styles.contact}>
                <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
                <span className={styles.location}>
                  {contactDetails.locationLines.map((line) => <span key={line}>{line}</span>)}
                </span>
              </address>
            </div>

            <nav aria-label="Footer navigation" className={styles.linkColumns}>
              {linkGroups.map((group) => (
                <div className={styles.linkGroup} key={group.title}>
                  <h2>{group.title}</h2>
                  <div className={styles.navigation}>
                    {group.links.map((item) => (
                      <Link className={styles.link} href={item.href} key={item.href}>
                        <span>{item.label === "Contact" ? "Contact us" : item.label}</span>
                        {item.label === "Contact" ? (
                          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className={styles.base}>
            <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
            <Link href="/privacy">Privacy policy</Link>
          </div>

          <div aria-hidden="true" className={styles.watermarkStage}>
            <div className={styles.wordmark} data-footer-wordmark />
          </div>
        </div>
      </div>
    </footer>
  );
}
