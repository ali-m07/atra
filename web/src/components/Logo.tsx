type Props = {
  className?: string
  title?: string
}

/** Geometric A mark in a square. Institutional, no flame imagery. */
export function LogoMark({ className, title = 'Atra' }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <rect width="64" height="64" fill="currentColor" />
      <path
        d="M18 48 L32 14 L46 48"
        fill="none"
        stroke="#fff"
        strokeWidth="4.5"
        strokeLinejoin="miter"
      />
      <path d="M24 36 H40" stroke="#fff" strokeWidth="4" />
    </svg>
  )
}
