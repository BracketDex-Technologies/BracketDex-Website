"use client";

import { useId, useState } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";
import { DatabaseZap, Workflow, Code2 } from "lucide-react";
import { technologyIcons } from "./technology-icons";
import styles from "./technology-network.module.css";

export function TechnologyIcon({ name, onPositionChange }: { name: string; onPositionChange: () => void }) {
  const controls = useDragControls();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const tooltip = useId();
  const asset = technologyIcons[name];
  const Symbol = name === "CI/CD" ? Workflow : name === "Vector Databases" ? DatabaseZap : Code2;

  return (
    <motion.button type="button" className={styles.icon} data-tech-icon="true"
      aria-label={name} aria-describedby={open ? tooltip : undefined}
      drag={!reduced} dragControls={controls} dragListener={false} dragSnapToOrigin
      dragConstraints={{ left: -48, right: 48, top: -48, bottom: 48 }}
      dragElastic={0.12} dragMomentum={false}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 20 }}
      onUpdate={onPositionChange}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse" && event.button === 0 && !reduced) controls.start(event);
      }}
      onPointerEnter={() => setOpen(true)} onPointerLeave={(event) => {
        if (!event.currentTarget.matches(":focus-visible")) setOpen(false);
      }}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      onClick={() => setOpen(true)} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
      onDragEnd={onPositionChange} onPointerCancel={onPositionChange}
    >
      {asset && !failed ? (
        // Native image preserves the source SVG without a remote request or optimization proxy.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/technology/${asset}`} alt="" width="40" height="40" draggable={false}
          onError={() => setFailed(true)} className={name === "OpenAI" ? styles.lightMark : undefined} />
      ) : <Symbol size={34} aria-hidden="true" />}
      <span className={styles.tooltip} id={tooltip} role="tooltip" data-open={open}>{name}</span>
    </motion.button>
  );
}
