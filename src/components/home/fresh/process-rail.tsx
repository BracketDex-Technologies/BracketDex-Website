import type { MarketingContent } from "@/content/marketing";

export function ProcessRail({ content }: { content: MarketingContent }) {
  return (
    <section
      aria-labelledby="fresh-process-title"
      className="bd-fresh-process"
      data-motion-section
    >
      <p className="bd-fresh-eyebrow bd-fresh-process__eyebrow">Delivery system</p>
      <div className="bd-fresh-process__head">
        <h2 id="fresh-process-title">From business need to working system.</h2>
        <p>One visible path keeps priorities, decisions, delivery, and release aligned.</p>
      </div>
      <ol className="bd-fresh-process__rail">
        {content.process.map((step) => (
          <li className="bd-fresh-process__step" data-process-step key={step.step}>
            <span aria-hidden="true" className="bd-fresh-process__num">
              {step.step}
            </span>
            <strong>{step.title}</strong>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
