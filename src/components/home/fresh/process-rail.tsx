import type { MarketingContent } from "@/content/marketing";

export function ProcessRail({ content, compact = false }: { content: MarketingContent; compact?: boolean }) {
  const steps = compact ? [
    { step: "01", title: "Understand", description: "Start with the real business bottleneck." },
    { step: "02", title: "Build", description: "Make a useful system and test it with the team." },
    { step: "03", title: "Improve", description: "Support the work after launch and keep refining it." },
  ] : content.process;
  return (
    <section
      aria-labelledby="fresh-process-title"
      className={`bd-fresh-process${compact ? " bd-fresh-process--compact" : ""}`}
      data-motion-section
      id="process"
    >
      <p className="bd-fresh-eyebrow bd-fresh-process__eyebrow">Delivery system</p>
      <div className="bd-fresh-process__head">
        <h2 id="fresh-process-title">From business need to working system.</h2>
        <p>One visible path keeps priorities, decisions, delivery, and release aligned.</p>
      </div>
      <ol className="bd-fresh-process__rail">
        {steps.map((step) => (
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
