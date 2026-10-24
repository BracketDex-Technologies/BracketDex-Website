"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { MarketingContent } from "@/content/marketing";
import styles from "./home-hero.module.css";

type HomeHeroProps = {
  hero: MarketingContent["homepage"]["hero"];
};

type VideoVariant = "desktop" | "mobile";
type NetworkInformation = EventTarget & { saveData?: boolean };
type NavigatorWithConnection = Navigator & { connection?: NetworkInformation };

const HERO_MEDIA = {
  desktop: {
    mp4: "/media/hero/Hero scroll preview_ widescreen 16x9.mp4",
    poster: "/media/hero/Hero poster_ widescreen 16x9.webp",
    webm: "/media/hero/Hero scroll preview_ widescreen 16x9.webm",
  },
  mobile: {
    mp4: "/media/hero/Hero background loop_ 5s 9x16.mp4",
    poster: "/media/hero/Hero poster_ vertical 9x16.webp",
    webm: "/media/hero/Hero background loop_ 5s 9x16.webm",
  },
} as const;

export function HomeHero({ hero }: HomeHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [videoVariant, setVideoVariant] = useState<VideoVariant | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const revealItems = heroRef.current?.querySelectorAll<HTMLElement>("[data-hero-reveal]");
      if (!revealItems?.length) return;

      gsap.fromTo(
        revealItems,
        { opacity: 0, y: 24 },
        {
          clearProps: "opacity,transform",
          delay: 0.12,
          duration: 0.82,
          ease: "power3.out",
          opacity: 1,
          stagger: 0.09,
          y: 0,
        },
      );
    },
    { scope: heroRef },
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorWithConnection).connection;

    const syncVideoVariant = () => {
      const shouldLoadVideo = !reducedMotionQuery.matches && !connection?.saveData;
      setVideoPlaying(false);
      setVideoVariant(shouldLoadVideo ? (mobileQuery.matches ? "mobile" : "desktop") : null);
    };

    syncVideoVariant();
    mobileQuery.addEventListener("change", syncVideoVariant);
    reducedMotionQuery.addEventListener("change", syncVideoVariant);
    connection?.addEventListener("change", syncVideoVariant);

    return () => {
      mobileQuery.removeEventListener("change", syncVideoVariant);
      reducedMotionQuery.removeEventListener("change", syncVideoVariant);
      connection?.removeEventListener("change", syncVideoVariant);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const heroElement = heroRef.current;
    if (!video || !heroElement) return;

    const playVideo = () => {
      void video.play().catch(() => setVideoPlaying(false));
    };

    if (!("IntersectionObserver" in window)) {
      playVideo();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playVideo();
        else video.pause();
      },
      { threshold: 0.12 },
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, [videoVariant]);

  const activeMedia = videoVariant ? HERO_MEDIA[videoVariant] : null;

  return (
    <section
      aria-labelledby="home-hero-title"
      className={styles.hero}
      data-home-hero="cinematic"
      ref={heroRef}
    >
      <div aria-hidden="true" className={styles.media}>
        <picture className={styles.poster}>
          <source
            media="(max-width: 767px)"
            srcSet={HERO_MEDIA.mobile.poster}
            type="image/webp"
          />
          <img
            alt=""
            decoding="async"
            fetchPriority="high"
            height="1080"
            src={HERO_MEDIA.desktop.poster}
            width="1920"
          />
        </picture>
        {activeMedia ? (
          <video
            autoPlay
            className={`${styles.video} ${videoPlaying ? styles.videoPlaying : ""}`}
            key={videoVariant}
            loop
            muted
            onError={() => setVideoPlaying(false)}
            onPlaying={() => setVideoPlaying(true)}
            playsInline
            poster={activeMedia.poster}
            preload="metadata"
            ref={videoRef}
            tabIndex={-1}
          >
            <source src={activeMedia.webm} type="video/webm" />
            <source src={activeMedia.mp4} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div aria-hidden="true" className={styles.scrim} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <Link
            aria-label="Explore software, AI, and cloud services"
            className={styles.capabilityRail}
            data-hero-reveal
            href="/services"
          >
            {hero.capabilities.map((capability, index) => (
              <span className={styles.capabilityItem} key={capability}>
                {index > 0 ? <span aria-hidden="true" className={styles.divider}>—</span> : null}
                <span>{capability}</span>
              </span>
            ))}
          </Link>

          <h1
            aria-label={hero.headline.label}
            className={styles.title}
            data-hero-reveal
            id="home-hero-title"
          >
            {hero.headline.lines.map((line) => (
              <span className={styles.titleLine} key={line.join(" ")}>
                {line.map((fragment, index) => (
                  <span key={fragment}>{index > 0 ? " " : null}{fragment}</span>
                ))}
              </span>
            ))}
          </h1>

          <p className={styles.subtitle} data-hero-reveal>
            <span>{hero.subheadline}</span>
            <span>{hero.supportingLine}</span>
          </p>

          <motion.div
            className={styles.ctaMotion}
            data-hero-reveal
            transition={{ duration: 0.2, ease: "easeOut" }}
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98, y: 0 }}
          >
            <Link className={styles.primaryCta} href="/contact">
              {hero.primaryCta}
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
