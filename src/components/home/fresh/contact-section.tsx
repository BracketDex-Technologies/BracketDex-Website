import { ContactForm } from "@/components/marketing/contact-form";

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
            <a href="mailto:bracketdex@gmail.com">bracketdex@gmail.com</a>
            <span>Pune, India</span>
          </address>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
