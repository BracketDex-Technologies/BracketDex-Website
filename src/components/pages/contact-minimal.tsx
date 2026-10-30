import { ContactForm } from "@/components/marketing/contact-form";
import { contactDetails } from "@/lib/site";
import { MinimalMarketingShell } from "./minimal-marketing-shell";
import styles from "./contact-minimal.module.css";

export function ContactMinimalPage() {
  return <MinimalMarketingShell page="contact">
    <div className={styles.contact} data-contact-minimal>
      <header className={styles.intro}>
        <h1>Contact us.</h1>
        <p>Have a project in mind? Share a few details below.</p>
      </header>
      <section aria-labelledby="enquiry-title">
        <h2 className="sr-only" id="enquiry-title">Project enquiry form</h2>
        <ContactForm className={styles.form} />
      </section>
      <p className={styles.direct}>Prefer email? <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></p>
    </div>
  </MinimalMarketingShell>;
}
