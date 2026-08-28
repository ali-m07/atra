import { useCallback, useRef } from 'react'
import { LogoMark } from './Logo'

export type SocialCardProps = {
  title: string
  quote: string
  tags?: string[]
  handle?: string
  accent?: 'cyan' | 'amber' | 'violet'
  shareLabel?: string
}

export function SocialCard({
  title,
  quote,
  tags = [],
  handle = '@atra_futures',
  accent = 'cyan',
  shareLabel = 'Share',
}: SocialCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  const onShare = useCallback(async () => {
    const text = `${title}\n\n${quote}\n\n${handle}`
    if (navigator.share) {
      try {
        await navigator.share({ title, text })
        return
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(text)
  }, [title, quote, handle])

  return (
    <article ref={cardRef} className={`social-card social-card--${accent}`}>
      <div className="social-card__glow" aria-hidden="true" />
      <header className="social-card__head">
        <LogoMark className="social-card__mark" title="Atra" />
        <span className="social-card__brand">Atra</span>
      </header>
      <h3 className="social-card__title">{title}</h3>
      <blockquote className="social-card__quote">{quote}</blockquote>
      {tags.length ? (
        <ul className="social-card__tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      <footer className="social-card__foot">
        <bdi className="ltr" dir="ltr" lang="en">
          {handle}
        </bdi>
        <button type="button" className="social-card__share" onClick={onShare}>
          {shareLabel}
        </button>
      </footer>
    </article>
  )
}
