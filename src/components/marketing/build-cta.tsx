"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Code2, Cpu, Database, ShieldCheck, Workflow, ArrowUpRight } from "lucide-react";
import styles from "./build-cta.module.css";

const icons = [Code2, Cpu, ShieldCheck, Database, Cloud, Workflow];

export function BuildCta({ headline, description, href = "/contact", label = "Book Consultation", id }: {
  headline: string; description?: string; href?: string; label?: string; id?: string;
}) {
  const reduced = useReducedMotion();
  return <div className={styles.surround}><section className={styles.panel} id={id} aria-label="Build with BracketDex">
    <div className={styles.icons} aria-hidden="true">
      {icons.map((Icon, index) => <motion.div className={styles.tile} key={index}
        initial={reduced ? false : { y: -300, opacity: 0, rotate: 0 }}
        whileInView={{ y: 0, opacity: 1, rotate: [-12, 12, -14, 28, 8, -30][index] }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: "spring", stiffness: 65, damping: 15, delay: index * 0.12 }}>
        <Icon size={29} strokeWidth={1.4} />
      </motion.div>)}
    </div>
    <div className={styles.copy}>
      <p className={styles.eyebrow}>Build with BracketDex</p>
      <h2>{headline}</h2>
      {description && <p className={styles.description}>{description}</p>}
      <Link className={styles.action} href={href}>{label}<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
    <div className={styles.strip}><span>Custom software</span><span>AI & automation</span><span>Cloud & DevOps</span><span>Built around your business</span></div>
  </section></div>;
}
