import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { NavigationItem } from "@/content/marketing";
import { contactDetails } from "@/lib/site";
import { logoFont } from "./logo-font";
import { NAVBAR_LOGO_TEXT } from "./navbar";
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
                <p className={styles.brandName} style={{ fontFamily: logoFont.style.fontFamily }}>
                  <span aria-hidden="true">[</span>{NAVBAR_LOGO_TEXT}<span aria-hidden="true">]</span>
                </p>
                <p className={styles.description}>{description}</p>
              </div>
              <address className={styles.contact}>
                <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
                <span>{contactDetails.location}</span>
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
            <p className={styles.wordmark} data-footer-wordmark>
              <span
                className="bd-fresh-footer__logo"
                style={{ fontFamily: logoFont.style.fontFamily }}
              >
                {NAVBAR_LOGO_TEXT}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
