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
        <radialGradient id="hero-field-spot" cx="72%" cy="42%" r="48%">
          <stop offset="0%" stopColor="rgba(155,123,184,0.22)" />
          <stop offset="55%" stopColor="rgba(90,110,170,0.08)" />
          <stop offset="100%" stopColor="rgba(7,8,12,0)" />
        </radialGradient>
        <linearGradient id="hero-field-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(7,8,12,0.92)" />
          <stop offset="42%" stopColor="rgba(7,8,12,0.55)" />
          <stop offset="100%" stopColor="rgba(7,8,12,0.12)" />
        </linearGradient>
        <linearGradient id="hero-spine" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(196,168,224,0)" />
          <stop offset="35%" stopColor="rgba(196,168,224,0.35)" />
          <stop offset="100%" stopColor="rgba(212,163,92,0.28)" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#hero-field-spot)" />

      <g className="hero-systems__grid" opacity="0.22">
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={120 + i * 82}
            y1="40"
            x2={60 + i * 74}
            y2="860"
            stroke="rgba(243,240,234,0.18)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="80"
            y1={100 + i * 85}
            x2="1380"
            y2={70 + i * 82}
            stroke="rgba(243,240,234,0.12)"
            strokeWidth="1"
          />
        ))}
      </g>

      <path
        className="hero-systems__spine"
        d="M160 680 C320 540, 430 430, 580 390 S880 310, 1000 270 S1240 190, 1340 150"
        fill="none"
        stroke="url(#hero-spine)"
        strokeWidth="1.6"
      />

      <path
        className="hero-systems__loop hero-systems__loop--r"
        d="M540 430 C640 300, 820 280, 900 370 C980 460, 940 580, 810 610 C680 640, 540 550, 540 430 Z"
        fill="none"
        stroke="rgba(196,168,224,0.42)"
        strokeWidth="1.35"
      />
      <path
        className="hero-systems__loop hero-systems__loop--b"
        d="M900 480 C990 400, 1150 420, 1210 520 C1270 620, 1200 720, 1070 730 C940 740, 860 590, 900 480 Z"
        fill="none"
        stroke="rgba(167,161,151,0.38)"
        strokeWidth="1.25"
      />
      <path
        className="hero-systems__loop hero-systems__loop--r"
        d="M280 540 C370 440, 510 460, 550 560 C590 660, 500 750, 380 730 C260 710, 220 610, 280 540 Z"
        fill="none"
        stroke="rgba(196,168,224,0.28)"
        strokeWidth="1.15"
        style={{ animationDelay: '1.1s' }}
      />

      <circle className="hero-systems__glow" cx="810" cy="500" r="58" />
      <circle className="hero-systems__node hero-systems__node--core" cx="810" cy="500" r="7" />
      <circle className="hero-systems__node" cx="580" cy="390" r="5" />
      <circle className="hero-systems__node" cx="1000" cy="270" r="4.5" style={{ animationDelay: '1.2s' }} />
      <circle className="hero-systems__node hero-systems__node--warm" cx="380" cy="730" r="5" style={{ animationDelay: '0.45s' }} />
      <circle className="hero-systems__node" cx="1070" cy="730" r="4" style={{ animationDelay: '1.7s' }} />
      <circle className="hero-systems__node" cx="1210" cy="520" r="3.5" />

      <text
        className="ltr-label hero-systems__label"
        x="850"
        y="465"
        direction="ltr"
        fill="rgba(243,240,234,0.42)"
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
        fill="rgba(167,161,151,0.5)"
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
