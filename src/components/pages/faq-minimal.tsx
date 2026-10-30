import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { minimalFaqs } from "@/content/minimal-faq";
import { buildFaqJsonLd } from "@/lib/seo";
import { MinimalMarketingShell } from "./minimal-marketing-shell";
import styles from "./minimal-pages.module.css";

export function FaqMinimalPage() {
  return <MinimalMarketingShell page="faq">
    <JsonLd data={buildFaqJsonLd(minimalFaqs)} />
    <section className={styles.faq} aria-labelledby="faq-title">
      <h1 id="faq-title">Frequently asked questions.</h1>
      <div className={styles.answers}>
        {minimalFaqs.map((item, index) => <details className={styles.answer} name="general-questions" open={index === 0} key={item.question}>
          <summary><span>{item.question}</span><Plus className={styles.plus} aria-hidden="true" strokeWidth={1.4} /><Minus className={styles.minus} aria-hidden="true" strokeWidth={1.4} /></summary>
          <p>{item.answer}</p>
        </details>)}
      </div>
      <p className={styles.contact}>Still have a question? <Link href="/contact">Contact us.</Link></p>
    </section>
  </MinimalMarketingShell>;
}
