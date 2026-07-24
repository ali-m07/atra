import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

export function useReveal<T extends HTMLElement>(rootMargin = '0px 0px -8% 0px') {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return ref
}

type RevealProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
  delay?: number
  id?: string
}

export function Reveal({ children, className = '', as = 'div', delay = 0, id }: RevealProps) {
  const ref = useReveal<HTMLDivElement>()
  const Tag = as

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal ${className}`.trim()}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
