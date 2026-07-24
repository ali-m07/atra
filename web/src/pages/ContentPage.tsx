import { useEffect, useState, type CSSProperties } from 'react'
import { api } from '../api'
import type { Page } from '../types'
import { useLocale } from '../locale/LocaleContext'
import { Reveal } from '../components/Reveal'

type Props = {
  slug: 'philosophy' | 'methodology' | 'whitepaper'
}

export function ContentPage({ slug }: Props) {
  const { locale, ui } = useLocale()
  const [page, setPage] = useState<Page | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    setError(null)
    setReady(false)
    api
      .page(slug, locale)
      .then((data) => {
        if (!cancelled) {
          setPage(data)
          requestAnimationFrame(() => setReady(true))
        }
      })
      .catch(() => {
        if (!cancelled) setError(ui.pageError)
      })
    return () => {
      cancelled = true
    }
  }, [slug, locale, ui.pageError])

  if (error && !page) {
    return (
      <div className="shell error-panel">
        <p>{error}</p>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="shell state-panel">
        <div className="loader" aria-hidden="true" />
        <p>{ui.loading}</p>
      </div>
    )
  }

  return (
    <div className={`page-motion${ready ? ' is-ready' : ''}`}>
      <header className="page-hero">
        <div className="shell">
          <span className="page-hero__eyebrow anim-item" style={{ '--i': 0 } as CSSProperties}>
            {page.title}
          </span>
          <h1 className="anim-item" style={{ '--i': 1 } as CSSProperties}>
            {page.headline}
          </h1>
          <p className="anim-item" style={{ '--i': 2 } as CSSProperties}>
            {page.lead}
          </p>
        </div>
      </header>

      <div className="shell content-stack">
        {page.sections.map((section, i) => (
          <Reveal key={section.title} as="section" className="content-block" delay={i * 40}>
            <h2>{section.title}</h2>
            <div>
              {section.lead ? <p className="lead">{section.lead}</p> : null}
              {section.body ? <p className="body">{section.body}</p> : null}
              {section.bullets?.length ? (
                <ul className="bullet-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.label}>
                      <strong>{bullet.label}</strong>
                      <p>{bullet.text}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        ))}

        {page.closing ? (
          <Reveal>
            <p className="closing-band">{page.closing}</p>
          </Reveal>
        ) : null}

        {page.handle ? (
          <Reveal delay={60}>
            <p>
              <bdi className="ltr" dir="ltr" lang="en">
                {page.handle}
              </bdi>
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  )
}
