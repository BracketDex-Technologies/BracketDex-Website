import type { TechnologyGroup } from "@/content/marketing";
import styles from "./services-bento.module.css";

export type ServiceVisualKind = "automation" | "software" | "ai" | "growth" | "cloud";

export function ServiceBentoVisual({ kind, technologies }: { kind: ServiceVisualKind; technologies: readonly TechnologyGroup[] }) {
  if (kind === "software") {
    const labels = technologies.filter((group) => ["Frontend", "Backend", "Mobile", "Database"].includes(group.category)).flatMap((group) => group.items).slice(0, 8);
    const positions = [[60, 60], [202, 22], [344, 60], [486, 22], [100, 204], [242, 166], [384, 204], [526, 166]];
    return (
      <svg className={`${styles.svg} ${styles.ecosystem}`} viewBox="0 0 600 260" fill="none" aria-hidden="true" focusable="false">
        <g data-bento-pointer="0.5">
          {positions.map(([x, y], index) => (
            <g key={index} transform={`translate(${x} ${y})`}>
              <g data-bento-float>
                <path d="M-60 -30 Q-66 -26 -66 -18 L-66 38 Q-66 46 -58 50 L-8 74 Q0 78 8 74 L58 50 Q66 46 66 38 L66 -18 Q66 -26 60 -30 L8 -56 Q0 -60 -8 -56 Z" fill={index % 3 === 0 ? "#2f261f" : "#232323"} stroke="#494039" />
                <path d="M-53 -24 L0 -50 L53 -24" stroke="#f25623" opacity="0.2" />
                <circle data-bento-pulse cx="0" cy="-10" r="3" fill="#f25623" />
                <text x="0" y="23" textAnchor="middle" className={styles.techLabel}>{labels[index]}</text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg className={styles.svg} viewBox="0 0 320 240" fill="none" aria-hidden="true" focusable="false">
      {kind === "automation" && (
        <>
          <g data-bento-pointer="0.4" opacity="0.55">
            <rect x="62" y="42" width="210" height="68" rx="21" fill="#111" stroke="#45413d" />
            <path d="M82 64 H114 M82 76 H160" stroke="#5c554e" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g data-bento-pointer="1">
            <g data-bento-float>
              <rect x="34" y="78" width="252" height="88" rx="23" fill="#111" stroke="#504238" />
              <rect x="48" y="92" width="61" height="60" rx="15" fill="#231b16" />
              <path d="M64 122 H91 M79 109 L91 122 L79 135" stroke="#f25623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle data-bento-pulse cx="127" cy="103" r="3" fill="#f25623" />
              <text x="138" y="107" className={styles.svgMicro}>CONNECTED</text>
              <text x="124" y="128" className={styles.svgLabel}>One workflow.</text>
              <text x="124" y="147" className={styles.svgMuted}>Less manual work.</text>
            </g>
          </g>
          <path data-bento-signal d="M160 168 V188 Q160 201 175 201 H230" stroke="#f25623" strokeOpacity="0.7" strokeDasharray="4 8" />
          <circle cx="234" cy="201" r="4" fill="#f25623" opacity="0.7" />
        </>
      )}
      {kind === "ai" && (
        <>
          <g data-bento-pointer="0.35">
            {[180, 144, 108].map((size, index) => <rect key={size} data-bento-pulse x={160 - size / 2} y={117 - size / 2} width={size} height={size} rx={30 - index * 5} stroke="#f25623" strokeOpacity={0.13 + index * 0.12} />)}
            <path d="M160 9 V27 M160 207 V225 M52 117 H70 M250 117 H268" stroke="#514237" />
          </g>
          <g data-bento-pointer="1">
            <g data-bento-float>
              <rect x="121" y="78" width="78" height="78" rx="19" fill="#1a1a1a" stroke="#5e4536" />
              <rect x="128" y="85" width="64" height="64" rx="14" fill="#24201d" />
              <text x="160" y="130" textAnchor="middle" className={styles.aiLabel}>AI</text>
            </g>
          </g>
        </>
      )}
      {kind === "growth" && (
        <>
          <g data-bento-pointer="0.3" stroke="#38332e">
            {[60, 110, 160, 210, 260].map((x) => <path key={x} d={`M${x} 40 V207`} strokeDasharray="2 7" />)}
            <path d="M35 207 H286" />
          </g>
          <g data-bento-pointer="1">
            <path d="M32 194 C65 164 75 184 104 154 S142 164 167 136 S201 148 221 113 S248 90 263 52" stroke="#534035" strokeWidth="3" strokeLinecap="round" />
            <path data-bento-draw d="M32 194 C65 164 75 184 104 154 S142 164 167 136 S201 148 221 113 S248 90 263 52" pathLength="1" stroke="#f25623" strokeWidth="3" strokeLinecap="round" />
            <circle data-bento-pulse cx="263" cy="52" r="17" fill="#f25623" opacity="0.14" />
            <circle cx="263" cy="52" r="6" fill="#f25623" />
          </g>
        </>
      )}
      {kind === "cloud" && (
        <>
          <g data-bento-pointer="0.35" opacity="0.5">
            <rect x="54" y="45" width="222" height="127" rx="18" stroke="#514237" />
            <rect x="46" y="53" width="222" height="127" rx="18" stroke="#514237" />
          </g>
          <g data-bento-pointer="1">
            <g data-bento-float>
              <rect x="38" y="61" width="222" height="127" rx="18" fill="#121212" stroke="#514237" />
              <path d="M39 105 H259 M39 147 H259" stroke="#39302a" />
              {[84, 126, 168].map((y, index) => (
                <g key={y}>
                  <rect x="55" y={y - 9} width="24" height="18" rx="4" stroke="#b56743" />
                  <path d={`M60 ${y - 3} H74 M60 ${y + 3} H69`} stroke="#b56743" />
                  <text x="94" y={y + 4} className={styles.svgLabel}>{["Build", "Deploy", "Scale"][index]}</text>
                  <circle data-bento-pulse cx="239" cy={y} r="3" fill="#f25623" />
                </g>
              ))}
            </g>
          </g>
        </>
      )}
    </svg>
  );
}
