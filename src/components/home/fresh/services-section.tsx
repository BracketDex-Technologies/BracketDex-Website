"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  BotIcon,
  CloudIcon,
  Code2Icon,
  TrendingUpIcon,
  WorkflowIcon,
} from "lucide-react";

import type { MarketingContent } from "@/content/marketing";

const icons = [Code2Icon, BotIcon, WorkflowIcon, CloudIcon, TrendingUpIcon] as const;

export function ServicesSection({ content }: { content: MarketingContent }) {
  const [active, setActive] = useState<number | null>(null);
  const services = content.services;

  return (
    <section
      aria-labelledby="fresh-services-title"
      className="bd-fresh-services"
      data-motion-section
      id="services"
    >
      <div className="content-shell">
        <p className="bd-fresh-eyebrow bd-fresh-services__eyebrow">( Services )</p>
        <div className="bd-fresh-services__head">
          <h2 id="fresh-services-title">
            What BracketDex builds
            <br />
            for growing businesses
          </h2>
        </div>

        <ul
          className="bd-fresh-services__list"
          onMouseLeave={() => setActive(null)}
        >
          {services.map((service, i) => {
            const Icon = icons[i % icons.length];
            const index = `0${i + 1}`;
            const isActive = i === active;
            return (
              <li key={service.title}>
                <Link
                  aria-current={isActive ? "true" : undefined}
                  className="bd-fresh-services__row"
                  data-active={isActive}
                  href="/contact"
                  onBlur={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="bd-fresh-services__index">{index}</span>
                  <span className="bd-fresh-services__title">{service.title}</span>
                  <span className="bd-fresh-services__desc">{service.description}</span>
                  <span aria-hidden="true" className="bd-fresh-services__arrow">
                    <ArrowUpRightIcon />
                  </span>
                  <span aria-hidden="true" className="bd-fresh-services__preview">
                    <span className="bd-fresh-services__preview-top">
                      {index} / Service
                    </span>
                    <Icon />
                    <strong>{service.title}</strong>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
