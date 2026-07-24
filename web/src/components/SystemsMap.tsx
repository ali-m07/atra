import { useEffect, useRef } from 'react'

export function SystemsMap() {
  return (
    <svg
      className="systems-map"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dfe8e2" />
          <stop offset="55%" stopColor="#c9d6cf" />
          <stop offset="100%" stopColor="#b7c7c0" />
        </linearGradient>
        <radialGradient id="spot" cx="70%" cy="35%" r="45%">
          <stop offset="0%" stopColor="rgba(14,124,116,0.28)" />
          <stop offset="100%" stopColor="rgba(14,124,116,0)" />
        </radialGradient>
        <radialGradient id="accent" cx="62%" cy="42%" r="28%">
          <stop offset="0%" stopColor="rgba(198,226,110,0.45)" />
          <stop offset="100%" stopColor="rgba(198,226,110,0)" />
        </radialGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#wash)" />
      <rect width="1440" height="900" fill="url(#spot)" />
      <rect width="1440" height="900" fill="url(#accent)" />

      {/* Structural grid plane */}
      <g opacity="0.35" stroke="rgba(12,18,25,0.18)" strokeWidth="1">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`v-${i}`} x1={80 + i * 80} y1="40" x2={40 + i * 70} y2="860" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h-${i}`} x1="40" y1={80 + i * 80} x2="1400" y2={60 + i * 78} />
        ))}
      </g>

      {/* Feedback architecture */}
      <path
        className="spine"
        d="M180 640 C320 520, 420 420, 560 380 S860 300, 980 260 S1220 180, 1320 140"
      />
      <path
        className="loop loop-r"
        d="M520 420 C610 300, 780 280, 860 360 C940 440, 900 560, 780 590 C660 620, 530 540, 520 420 Z"
      />
      <path
        className="loop loop-b"
        d="M880 470 C970 400, 1120 420, 1180 510 C1240 600, 1180 700, 1060 710 C940 720, 850 580, 880 470 Z"
      />
      <path
        className="loop loop-r"
        d="M260 520 C340 430, 470 450, 510 540 C550 630, 470 720, 360 700 C250 680, 210 580, 260 520 Z"
        style={{ animationDelay: '0.9s' }}
      />

      <circle className="glow" cx="780" cy="490" r="54" />
      <circle className="glow glow-accent" cx="780" cy="490" r="28" />
      <circle className="node node-accent" cx="780" cy="490" r="8" />
      <circle className="node" cx="560" cy="380" r="6" />
      <circle className="node" cx="980" cy="260" r="5" style={{ animationDelay: '1.2s' }} />
      <circle className="node node-accent" cx="360" cy="700" r="6" style={{ animationDelay: '0.4s' }} />
      <circle className="node" cx="1060" cy="710" r="5" style={{ animationDelay: '1.6s' }} />
      <circle className="node" cx="1180" cy="510" r="4" />

      <text
        className="ltr-label"
        x="820"
        y="455"
        direction="ltr"
        fill="#0c1219"
        fontFamily="Syne, sans-serif"
        fontSize="14"
        fontWeight="700"
        opacity="0.55"
      >
        R
      </text>
      <text
        className="ltr-label"
        x="1100"
        y="580"
        direction="ltr"
        fill="#3a5566"
        fontFamily="Syne, sans-serif"
        fontSize="14"
        fontWeight="700"
        opacity="0.7"
      >
        B
      </text>
    </svg>
  )
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.16 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
