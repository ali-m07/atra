import { useEffect, useState, type CSSProperties } from 'react'
import { api } from '../api'
import type { Page } from '../types'
import { useLocale } from '../locale/LocaleContext'
import { ContentSection } from '../components/content/ContentSection'
import { SectionDivider } from '../components/content/SectionDivider'
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
    <div className={`page-motion content-page${ready ? ' is-ready' : ''}`}>
      <header className="page-hero">
        <div className="shell page-hero__inner">
          <span className="page-hero__eyebrow anim-item" style={{ '--i': 0 } as CSSProperties}>
            {page.title}
          </span>
          <h1 className="anim-item" style={{ '--i': 1 } as CSSProperties}>
            {page.headline}
          </h1>
          <p className="page-hero__lead anim-item prose" style={{ '--i': 2 } as CSSProperties}>
            {page.lead}
          </p>
        </div>
      </header>

      <div className="shell content-stack">
        {page.sections.map((section, i) => (
          <div key={section.title}>
            {i > 0 ? <SectionDivider /> : null}
            <ContentSection section={section} index={i} />
          </div>
        ))}

        {page.closing ? (
          <>
            <SectionDivider label={ui.sectionDivider} />
            <Reveal>
              <blockquote className="cognitive-quote">
                <p>{page.closing}</p>
              </blockquote>
            </Reveal>
          </>
        ) : null}

        {page.handle ? (
          <Reveal delay={60}>
            <p className="content-handle">
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
