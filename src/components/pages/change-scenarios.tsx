"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { solutionScenarios } from "@/content/solution-scenarios";
import styles from "./solutions-scenarios.module.css";

export function ChangeScenarios() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const scenario = solutionScenarios[selected];

  function selectWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % solutionScenarios.length;
    else if (event.key === "ArrowLeft") next = (index + solutionScenarios.length - 1) % solutionScenarios.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = solutionScenarios.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section aria-labelledby="solutions-title" className={`${styles.editorial} ${styles.scenarios}`}>
      <div className={styles.shell}>
        <div className={styles.intro}>
          <p>Solutions / Change scenarios</p>
          <h1 id="solutions-title">What would better look like?</h1>
        </div>
        <div aria-label="Choose a business situation" className={styles.tabs} role="tablist">
          {solutionScenarios.map((item, index) => (
            <button aria-controls="scenario-panel" aria-selected={selected === index} id={`scenario-tab-${item.id}`} key={item.id} onClick={() => setSelected(index)} onKeyDown={(event) => selectWithKeyboard(event, index)} ref={(element) => { tabs.current[index] = element; }} role="tab" tabIndex={selected === index ? 0 : -1} type="button">
              <span aria-hidden="true" className={styles.selectionMark} />{item.label}
            </button>
          ))}
        </div>
        <div aria-labelledby={`scenario-tab-${scenario.id}`} className={styles.panel} id="scenario-panel" role="tabpanel" tabIndex={0}>
          <div className={styles.spread}>
            <article className={styles.column}>
              <p className={styles.columnLabel}>Before</p>
              <h2>{scenario.before.title}</h2>
              <div className={styles.sceneArt}><Image alt="Paperwork, envelopes and scattered forms connected by wandering routes." height={1055} priority sizes="(max-width: 700px) 90vw, 30vw" src="/media/solutions-scenarios/before.png" width={1491} /></div>
              <p className={styles.description}>{scenario.before.description}</p>
            </article>
            <article className={styles.column}>
              <p className={styles.columnLabel}>Change</p>
              <h2>{scenario.change.title}</h2>
              <div aria-label="A clear path from request to decision" className={styles.changeArt}>
                <Image alt="A document, a person and a recorded decision connected in a simple sequence." height={724} sizes="(max-width: 700px) 85vw, 28vw" src="/media/solutions-scenarios/change.png" width={2172} />
                <ol>{scenario.change.stages.map((stage) => <li key={stage}>{stage}</li>)}</ol>
              </div>
              <p className={styles.description}>{scenario.change.description}</p>
            </article>
            <article className={styles.column}>
              <p className={styles.columnLabel}>After</p>
              <h2>{scenario.after.title}</h2>
              <div className={styles.sceneArt}><Image alt="A person sees a shared work queue with clear status, documents and a completed next step." height={1071} priority sizes="(max-width: 700px) 90vw, 30vw" src="/media/solutions-scenarios/after.png" width={1469} /></div>
              <p className={styles.description}>{scenario.after.description}</p>
            </article>
          </div>
          <div className={styles.scenarioAction}>
            <Link className={styles.explore} href={`/contact?scenario=${scenario.id}`}>Explore this situation<span aria-hidden="true"><ArrowRight size={18} strokeWidth={1.5} /></span></Link>
            <p>Illustrative scenario</p>
          </div>
        </div>
      </div>
    </section>
  );
}
