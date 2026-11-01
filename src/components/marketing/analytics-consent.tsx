"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import styles from "./analytics-consent.module.css";

const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const enabled = /^G-[A-Z0-9]+$/.test(id) && !/^G-X+$/.test(id);
const storageKey = "bracketdex-analytics-consent";

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { setChoice(localStorage.getItem(storageKey)); } catch { /* Consent can still be chosen for this visit. */ }
    setReady(true);
  }, []);
  if (!enabled || !ready) return null;
  function choose(value: "accepted" | "declined") {
    try { localStorage.setItem(storageKey, value); } catch { /* Storage may be disabled. */ }
    if (choice === "accepted" && value === "declined") {
      // Reload clears the already-loaded analytics runtime after withdrawal.
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (!name.startsWith("_ga")) continue;
        const domains = ["", ...location.hostname.split(".").map((_, i, parts) => `; domain=.${parts.slice(i).join(".")}`)];
        domains.forEach(domain => { document.cookie = `${name}=; Max-Age=0; path=/${domain}`; });
      }
      location.reload();
    }
    setChoice(value);
    setOpen(false);
  }
  return <>
    {choice === "accepted" && <>
      <Script id="analytics-setup" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{allow_google_signals:false,allow_ad_personalization_signals:false});`}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
    </>}
    {(choice !== "accepted" && choice !== "declined") || open ? <section className={styles.banner} aria-label="Analytics preferences">
      <p>May we use optional Google Analytics cookies to understand website visits? You can change your choice anytime. <Link href="/privacy">Privacy policy</Link></p>
      <div><button onClick={() => choose("declined")}>Decline</button><button onClick={() => choose("accepted")}>Accept analytics</button></div>
    </section> : <button className={styles.settings} onClick={() => setOpen(true)}>Cookie settings</button>}
  </>;
}
