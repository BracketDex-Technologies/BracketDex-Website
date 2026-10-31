import { contactDetails } from "@/lib/site";
import { MinimalMarketingShell } from "./minimal-marketing-shell";
import styles from "./minimal-pages.module.css";

const sections = [
  ["Information we process", "Our contact form processes your name, email, optional company name, and message to prepare an email draft. You choose whether to send it. Technical details, including your IP address, may be processed to deliver the site and prevent abuse."],
  ["How we use it", "We use enquiries to respond to your questions and discuss your project. The form validates your entries without saving them to an enquiry database. Messages you send are kept as email correspondence for the enquiry, any resulting work, and applicable record-keeping needs."],
  ["Cookies and external services", "This website currently has no advertising trackers or Google Analytics integration. Hosting and email providers process information to operate their services. External websites have their own privacy policies."],
  ["Your choices", "You can ask about information you have shared or request a correction or deletion. We may need to verify your identity; applicable legal requirements may affect what we can delete. Please avoid sending passwords or sensitive information."],
];

export function PrivacyMinimalPage() {
  return <MinimalMarketingShell page="privacy">
    <article className={styles.privacy} aria-labelledby="privacy-title">
      <header>
        <p className={styles.eyebrow}>Last updated: 31 October 2026</p>
        <h1 id="privacy-title">Privacy Policy.</h1>
        <p className={styles.privacyLead}>How BracketDex Technologies handles information shared through this website.</p>
      </header>
      {sections.map(([title, description]) => <section className={styles.privacySection} key={title}>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>)}
      <section className={styles.privacySection}>
        <h2>Contact us</h2>
        <p>For privacy requests, email <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>.</p>
        <p>BracketDex Technologies · {contactDetails.location}</p>
        <p>We update this policy when our practices change and show the revision date above.</p>
      </section>
    </article>
  </MinimalMarketingShell>;
}
