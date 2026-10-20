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

const ESSENTIAL_FOOTER_LINKS = new Set(["Home", "Projects", "Solutions", "Contact"]);

export function Footer({ brandName, navigation }: FooterProps) {
  const essentialLinks = navigation.filter((item) => ESSENTIAL_FOOTER_LINKS.has(item.label));

  return (
    <footer className={`bd-fresh-footer ${styles.footer}`}>
      <div className={`content-shell ${styles.shell}`}>
        <div className={styles.panel}>
          <div className={styles.top}>
            <nav aria-label="Footer navigation" className={styles.navigation}>
              {essentialLinks.map((item) => {
                const label = item.label === "Contact" ? "Contact us" : item.label;

                return (
                  <Link className={styles.link} href={item.href} key={item.href}>
                    <span>{label}</span>
                    {item.label === "Contact" ? (
                      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <address className={styles.contact}>
              <a href={`mailto:${contactDetails.email}`}>E-mail: {contactDetails.email}</a>
              <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
              <span>{contactDetails.location}</span>
            </address>
          </div>

          <p aria-hidden="true" className={styles.wordmark} data-footer-wordmark>
            <span
              className="bd-fresh-footer__logo"
              style={{ fontFamily: logoFont.style.fontFamily }}
            >
              {NAVBAR_LOGO_TEXT}
            </span>
          </p>
        </div>

        <div className={styles.base}>
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <Link href="/privacy">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
}
