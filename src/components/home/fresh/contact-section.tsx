import { ContactForm } from "@/components/marketing/contact-form";
import { contactDetails } from "@/lib/site";

export function ContactSection() {
  return (
    <section aria-labelledby="fresh-contact-title" className="bd-fresh-contact" data-motion-section id="contact">
      <div className="content-shell bd-fresh-contact__grid">
        <div>
          <p className="bd-fresh-eyebrow">Contact</p>
          <h2 id="fresh-contact-title">Let&apos;s discuss your project.</h2>
          <p>
            Have an idea, project, or business challenge? Share it and BracketDex
            will review your requirement.
          </p>
          <address className="bd-fresh-contact__details">
            <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
            <span>{contactDetails.location}</span>
          </address>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
