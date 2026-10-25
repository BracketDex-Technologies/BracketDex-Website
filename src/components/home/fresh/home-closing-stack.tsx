import type { MarketingContent } from "@/content/marketing";
import { siteNavigation } from "@/content/site-navigation";
import { Footer } from "@/components/marketing/footer";
import { FreshCta } from "./cta-section";
import styles from "./home-closing-stack.module.css";

export function HomeClosingStack({ content }: { content: MarketingContent }) {
  return (
    <div className={styles.section} data-home-closing-shell>
      <div className={`content-shell ${styles.shell}`}>
        <div className={styles.card}>
          <FreshCta content={content} />
          <Footer
            brandName={content.company.name}
            description={content.company.footerDescription}
            navigation={siteNavigation}
          />
        </div>
      </div>
    </div>
  );
}
