/** Restrained dark systems field for the hero atmosphere — not a gadget, not a globe. */
export function HeroSystems() {
  return (
    <svg
      className="hero-systems"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hero-field-spot" cx="72%" cy="42%" r="52%">
          <stop offset="0%" stopColor="rgba(107,138,173,0.28)" />
          <stop offset="45%" stopColor="rgba(196,164,116,0.1)" />
          <stop offset="100%" stopColor="rgba(5,6,8,0)" />
        </radialGradient>
        <radialGradient id="hero-field-spot-b" cx="18%" cy="72%" r="38%">
          <stop offset="0%" stopColor="rgba(196,164,116,0.14)" />
          <stop offset="100%" stopColor="rgba(5,6,8,0)" />
        </radialGradient>
        <linearGradient id="hero-field-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(5,6,8,0.94)" />
          <stop offset="38%" stopColor="rgba(5,6,8,0.62)" />
          <stop offset="100%" stopColor="rgba(5,6,8,0.08)" />
        </linearGradient>
        <linearGradient id="hero-spine" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(196,164,116,0)" />
          <stop offset="35%" stopColor="rgba(196,164,116,0.45)" />
          <stop offset="100%" stopColor="rgba(107,138,173,0.35)" />
        </linearGradient>
        <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1440" height="900" fill="url(#hero-field-spot)" />
      <rect width="1440" height="900" fill="url(#hero-field-spot-b)" />

      <g className="hero-systems__grid" opacity="0.28">
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={`v-${i}`}
            className="hero-systems__grid-line"
            x1={90 + i * 78}
            y1="20"
            x2={40 + i * 72}
            y2="880"
            stroke="rgba(240,236,228,0.14)"
            strokeWidth="1"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-${i}`}
            className="hero-systems__grid-line hero-systems__grid-line--h"
            x1="60"
            y1={80 + i * 82}
            x2="1400"
            y2={50 + i * 78}
            stroke="rgba(240,236,228,0.09)"
            strokeWidth="1"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </g>

      <path
        className="hero-systems__spine"
        d="M160 680 C320 540, 430 430, 580 390 S880 310, 1000 270 S1240 190, 1340 150"
        fill="none"
        stroke="url(#hero-spine)"
        strokeWidth="1.8"
      />

      <path
        className="hero-systems__loop hero-systems__loop--r"
        d="M540 430 C640 300, 820 280, 900 370 C980 460, 940 580, 810 610 C680 640, 540 550, 540 430 Z"
        fill="none"
        stroke="rgba(196,164,116,0.48)"
        strokeWidth="1.4"
      />
      <path
        className="hero-systems__loop hero-systems__loop--b"
        d="M900 480 C990 400, 1150 420, 1210 520 C1270 620, 1200 720, 1070 730 C940 740, 860 590, 900 480 Z"
        fill="none"
        stroke="rgba(107,138,173,0.42)"
        strokeWidth="1.3"
      />
      <path
        className="hero-systems__loop hero-systems__loop--r"
        d="M280 540 C370 440, 510 460, 550 560 C590 660, 500 750, 380 730 C260 710, 220 610, 280 540 Z"
        fill="none"
        stroke="rgba(196,164,116,0.32)"
        strokeWidth="1.2"
        style={{ animationDelay: '1.1s' }}
      />

      <g className="hero-systems__particles">
        {[
          [420, 320, 1.2],
          [680, 240, 0.9],
          [1120, 380, 1.4],
          [1260, 620, 1.0],
          [340, 620, 1.1],
          [960, 180, 0.85],
          [1180, 280, 1.3],
          [520, 720, 0.95],
        ].map(([cx, cy, delay], i) => (
          <circle
            key={`p-${i}`}
            className="hero-systems__particle"
            cx={cx}
            cy={cy}
            r="1.5"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </g>

      <circle className="hero-systems__glow" cx="810" cy="500" r="62" />
      <circle
        className="hero-systems__node hero-systems__node--core"
        cx="810"
        cy="500"
        r="7"
        filter="url(#hero-glow)"
      />
      <circle className="hero-systems__node" cx="580" cy="390" r="5" />
      <circle
        className="hero-systems__node"
        cx="1000"
        cy="270"
        r="4.5"
        style={{ animationDelay: '1.2s' }}
      />
      <circle
        className="hero-systems__node hero-systems__node--warm"
        cx="380"
        cy="730"
        r="5"
        style={{ animationDelay: '0.45s' }}
      />
      <circle
        className="hero-systems__node"
        cx="1070"
        cy="730"
        r="4"
        style={{ animationDelay: '1.7s' }}
      />
      <circle className="hero-systems__node" cx="1210" cy="520" r="3.5" />

      <text
        className="ltr-label hero-systems__label"
        x="850"
        y="465"
        direction="ltr"
        fill="rgba(240,236,228,0.45)"
        fontFamily="Syne, sans-serif"
        fontSize="13"
        fontWeight="700"
      >
        R
      </text>
      <text
        className="ltr-label hero-systems__label"
        x="1120"
        y="590"
        direction="ltr"
        fill="rgba(107,138,173,0.55)"
        fontFamily="Syne, sans-serif"
        fontSize="13"
        fontWeight="700"
      >
        B
      </text>

      <rect width="1440" height="900" fill="url(#hero-field-fade)" className="hero-systems__wash" />
    </svg>
  )
}
