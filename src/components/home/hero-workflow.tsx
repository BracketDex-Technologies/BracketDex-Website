"use client";

import { Fragment, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

type HeroWorkflowStep = {
  label: string;
};

type HeroWorkflowProps = {
  steps: readonly HeroWorkflowStep[];
  activeLabel: string;
};

const listVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.28,
      duration: 0.56,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const stepVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: "easeOut",
    },
  },
};

export function HeroWorkflow({ activeLabel, steps }: HeroWorkflowProps) {
  const rootRef = useRef<HTMLOListElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let disposed = false;

    async function animateConnectors() {
      if (shouldReduceMotion) {
        return;
      }

      const { gsap } = await import("gsap");

      if (disposed || !rootRef.current) {
        return;
      }

      context = gsap.context(() => {
        const lines = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(".bd-hero-workflow-line-fill") ?? []);

        gsap.set(lines, {
          opacity: 0.18,
          scaleX: 0,
          transformOrigin: "left center",
        });

        const timeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.25,
        });

        timeline
          .to(lines, {
            duration: 0.72,
            ease: "power2.inOut",
            opacity: 0.68,
            scaleX: 1,
            stagger: 0.2,
          })
          .to(
            lines,
            {
              duration: 0.48,
              ease: "power2.out",
              opacity: 0.2,
              stagger: 0.1,
            },
            ">-0.08"
          )
          .set(lines, {
            scaleX: 0,
          });
      }, rootRef);
    }

    void animateConnectors();

    return () => {
      disposed = true;
      context?.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <motion.ol
      animate="visible"
      aria-label="Business automation workflow"
      className="bd-hero-workflow"
      initial={shouldReduceMotion ? false : "hidden"}
      ref={rootRef}
      variants={listVariants}
    >
      {steps.map((step, index) => {
        const isActive = step.label === activeLabel;

        return (
          <Fragment key={step.label}>
            <motion.li className="bd-hero-workflow-step" variants={stepVariants}>
              <motion.span
                className="bd-hero-workflow-label"
                data-active={isActive ? "true" : undefined}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.03,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.99,
                      }
                }
              >
                <span className="bd-hero-workflow-dot" aria-hidden="true" />
                {step.label}
              </motion.span>
            </motion.li>
            {index < steps.length - 1 ? (
              <span className="bd-hero-workflow-connector" aria-hidden="true">
                <span className="bd-hero-workflow-line" />
                <span className="bd-hero-workflow-line-fill" />
              </span>
            ) : null}
          </Fragment>
        );
      })}
    </motion.ol>
  );
}
