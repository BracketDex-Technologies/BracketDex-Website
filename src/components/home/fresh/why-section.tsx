import Image from "next/image";

import styles from "./why-section.module.css";

const principles = [
  {
    title: "Discuss. Agree. Document.",
    description:
      "We use DAD (Discuss, Agree, Document) or ID (Inform, Document) to keep decisions clear.",
  },
  {
    title: "Know the Why",
    description:
      "We understand the purpose behind each task so we can explain decisions, stay aligned, and choose the right next step.",
  },
  {
    title: "Accurate Speed",
    description:
      "We move deliberately to deliver performance, quality, and reliability (PQR) without trading care for pace.",
  },
  {
    title: "Get the Job Done",
    description:
      "When we spot a missing link, we raise it with the team and take ownership of the fix.",
  },
  {
    title: "No Single Point of Failure",
    description:
      "We share context and design around bottlenecks so progress does not depend on one system.",
  },
  {
    title: "Constructive Teamwork",
    description:
      "We build trust, stay constructive, and avoid bonding through negativity so the team can perform at its best.",
  },
] as const;

const pillars = [
  { title: "Clarity", image: "/media/why/clarity.png", items: principles.slice(0, 2) },
  { title: "Execution", image: "/media/why/execution.png", items: principles.slice(2, 4) },
  { title: "Continuity", image: "/media/why/continuity.png", items: principles.slice(4) },
] as const;

export function WhySection() {
  return (
    <section aria-labelledby="home-why-title" className={styles.section} data-home-section="why" data-motion-section id="why">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Why BracketDex</p>
          <h2 id="home-why-title">How We Work Together</h2>
          <p>Six practical principles keep communication clear, ownership visible, and delivery dependable.</p>
        </header>
        <div className={styles.pillars}>
          {pillars.map((pillar, pillarIndex) => {
            const start = pillarIndex === 0 ? 0 : pillarIndex === 1 ? 2 : 4;
            return (
              <article className={styles.pillar} key={pillar.title}>
                <div aria-hidden="true" className={styles.artwork}>
                  <Image alt="" className={styles.artworkImage} height={470} src={pillar.image} width={600} />
                </div>
                <div className={styles.pillarContent}>
                  <span aria-hidden="true" className={styles.accent} />
                  <h3>{pillar.title}</h3>
                  <ol className={styles.principles} start={start + 1}>
                    {pillar.items.map((item, index) => (
                      <li className={styles.principle} key={item.title}>
                        <span aria-hidden="true" className={styles.number}>{String(start + index + 1).padStart(2, "0")}</span>
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
