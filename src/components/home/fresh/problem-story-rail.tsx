"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./problem-section.module.css";

export type ProblemStory = {
  problem: string;
  challenges: readonly string[];
  solution: string;
  outcome: string;
};

type ScrollState = {
  canMoveBack: boolean;
  canMoveForward: boolean;
  scrollable: boolean;
};

const initialScrollState: ScrollState = {
  canMoveBack: false,
  canMoveForward: true,
  scrollable: true,
};

export function ProblemStoryRail({
  description,
  label,
  stories,
  title,
}: {
  description: string;
  label: string;
  stories: readonly ProblemStory[];
  title: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>(initialScrollState);

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const nextState = {
      canMoveBack: track.scrollLeft > 4,
      canMoveForward: track.scrollLeft < maxScroll - 4,
      scrollable: maxScroll > 4,
    };

    setScrollState((current) => (
      current.canMoveBack === nextState.canMoveBack
      && current.canMoveForward === nextState.canMoveForward
      && current.scrollable === nextState.scrollable
        ? current
        : nextState
    ));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    syncScrollState();
    track.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState, { passive: true });

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-problem-card]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | undefined;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      cards.forEach((card) => { card.dataset.visible = "true"; });
    } else {
      track.dataset.enhanced = "true";
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer?.unobserve(entry.target);
        });
      }, { root: track, threshold: 0.22 });
      cards.forEach((card) => observer?.observe(card));
    }

    return () => {
      track.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
      observer?.disconnect();
    };
  }, [syncScrollState]);

  const move = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector<HTMLElement>("[data-problem-card]");
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || "0");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      behavior: reducedMotion ? "auto" : "smooth",
      left: direction * (firstCard.getBoundingClientRect().width + gap),
    });
  }, []);

  return (
    <>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>{label}</p>
          <h2 id="home-problems-title">{title}</h2>
        </div>
        <div className={styles.headingAside}>
          <p className={styles.description}>{description}</p>
          <div aria-label="Problem story controls" className={styles.controls} role="group">
            <button
              aria-label="Previous problem story"
              className={styles.control}
              disabled={!scrollState.canMoveBack}
              onClick={() => move(-1)}
              type="button"
            >
              <ChevronLeft aria-hidden="true" size={21} strokeWidth={1.7} />
            </button>
            <button
              aria-label="Next problem story"
              className={styles.control}
              disabled={!scrollState.canMoveForward}
              onClick={() => move(1)}
              type="button"
            >
              <ChevronRight aria-hidden="true" size={21} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </header>

      <ul
        aria-label="Business problems and matching solutions"
        className={styles.track}
        data-scrollable={scrollState.scrollable}
        ref={trackRef}
      >
        {stories.map((story, index) => (
          <li className={styles.card} data-problem-card="true" key={story.problem}>
            <div className={styles.cardCopy}>
              <span aria-hidden="true" className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{story.problem}</h3>
              <ul className={styles.challengeList}>
                {story.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}
              </ul>
            </div>
            <div className={styles.solutionBlock} data-problem-solution="true">
              <span className={styles.solutionLabel}>Solution</span>
              <strong className={styles.solutionTitle}>{story.solution}</strong>
              <p>{story.outcome}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
