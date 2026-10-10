import styles from "./hero-system-illustration.module.css";

const nodes = [
  { name: "Software", href: "#services", x: 36, y: 54, width: 220 },
  { name: "AI", href: "#services", x: 356, y: 98, width: 190 },
  { name: "Automation", href: "#services", x: 72, y: 294, width: 234 },
  { name: "Cloud", href: "#cloud", x: 360, y: 314, width: 188 },
] as const;

export function HeroSystemIllustration() {
  return (
    <div aria-label="How BracketDex systems connect" className={styles.frame} role="group">
      <div aria-hidden="true" className={styles.frameTop}><span>BRACKETDEX TECHNOLOGIES</span><span>01 — 04</span></div>
      <svg
        aria-label="Software, AI, Automation, and Cloud form a connected system"
        className={styles.svg}
        data-hero-system="true"
        role="group"
        viewBox="0 0 600 440"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern height="28" id="hero-grid" patternUnits="userSpaceOnUse" width="28">
            <circle cx="1" cy="1" fill="#66707d" opacity=".24" r="1" />
          </pattern>
        </defs>
        <rect fill="url(#hero-grid)" height="440" width="600" />
        <g aria-hidden="true" className={styles.connections} data-pointer-layer="back">
          <path d="M256 106 C308 106 305 152 356 152" />
          <path d="M146 154 C146 220 187 230 187 294" />
          <path d="M450 198 C450 246 454 270 454 314" />
          <path d="M306 344 C330 344 334 364 360 364" />
          <path d="M278 162 C278 230 310 230 360 246" />
        </g>
        <g aria-hidden="true" data-pointer-layer="near">
          <circle className={styles.pulse} cx="308" cy="220" r="56" />
          <circle className={styles.core} cx="308" cy="220" r="30" />
          <path className={styles.coreGlyph} d="m296 220 8 8 16-17" />
        </g>
        {nodes.map((node, index) => (
          <a aria-label={`${node.name} services`} className={styles.node} href={node.href} key={node.name} tabIndex={0}>
            <rect height="100" rx="9" width={node.width} x={node.x} y={node.y} />
            <text className={styles.number} x={node.x + 16} y={node.y + 26}>{String(index + 1).padStart(2, "0")}</text>
            <text className={styles.name} x={node.x + 16} y={node.y + 66}>{node.name}</text>
            <path className={styles.arrow} d={`M${node.x + node.width - 30} ${node.y + 22}l8 0m-4 -4 4 4-4 4`} />
          </a>
        ))}
      </svg>
    </div>
  );
}
