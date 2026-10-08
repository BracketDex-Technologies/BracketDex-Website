"use client";

import Script from "next/script";
import { useState } from "react";

const STORAGE_KEY = "bracketdex-analytics-consent";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "accepted" || stored === "declined" ? stored : null;
  });

  function choose(next: "accepted" | "declined") {
    window.localStorage.setItem(STORAGE_KEY, next);
    setConsent(next);
  }

  return (
    <>
      {consent === "accepted" && measurementId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="bracketdex-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}</Script>
        </>
      ) : null}
      {consent === null ? (
        <aside aria-label="Cookie preferences" className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-soft">
          <p className="max-w-xl text-sm text-muted-foreground">We use optional analytics to understand site usage. Analytics stays off unless you accept.</p>
          <div className="flex gap-2"><button className="rounded-md border border-border px-3 py-2 text-sm" onClick={() => choose("declined")} type="button">Decline</button><button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground" onClick={() => choose("accepted")} type="button">Accept analytics</button></div>
        </aside>
      ) : null}
    </>
  );
}
