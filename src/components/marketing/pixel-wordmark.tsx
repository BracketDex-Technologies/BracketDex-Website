export function PixelWordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`bd-pixel-wordmark ${className}`}
      viewBox="0 0 304 54"
      role="img"
    >
      <defs>
        <pattern id="bd-pixel-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="2.45" fill="currentColor" />
        </pattern>
        <mask id="bd-pixel-letter-mask">
          <text x="152" y="41" textAnchor="middle" fill="white" fontFamily="var(--font-geist-mono), monospace" fontSize="42" fontWeight="500" letterSpacing="-1.4">{`{BracketDex}`}</text>
        </mask>
      </defs>
      <rect width="304" height="54" fill="url(#bd-pixel-dots)" mask="url(#bd-pixel-letter-mask)" />
    </svg>
  );
}
