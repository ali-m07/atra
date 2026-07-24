import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import type { SiteMeta } from '../types'
import { useLocale } from '../locale/LocaleContext'
import { Reveal } from '../components/Reveal'
import { HeroSystems } from '../components/HeroSystems'

export function HomePage() {
  const { locale, ui, isFa } = useLocale()
  const [meta, setMeta] = useState<SiteMeta | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const brandName = isFa ? 'آترا' : 'Atra'

  useEffect(() => {
    let cancelled = false
    setError(null)
    setReady(false)
    api
      .meta(locale)
      .then((data) => {
        if (!cancelled) {
          setMeta(data)
          requestAnimationFrame(() => setReady(true))
        }
      })
      .catch(() => {
        if (!cancelled) setError(ui.loadError)
      })
    return () => {
      cancelled = true
    }
  }, [locale, ui.loadError])

  if (error && !meta) {
    return (
      <div className="shell error-panel">
        <p>{error}</p>
        <p>{ui.loadHint}</p>
      </div>
    )
  }

  if (!meta) {
    return (
      <div className="shell state-panel">
        <div className="loader" aria-hidden="true" />
        <p>{ui.loading}</p>
      </div>
    )
  }

  const schoolPillar = meta.pillars.find((p) => p.id === 'school')

  return (
    <div className={`home page-motion${ready ? ' is-ready' : ''}`}>
      <section className="hero-cinematic">
        <div className="hero-cinematic__atmosphere" aria-hidden="true">
          <div className="hero-cinematic__field">
            <HeroSystems />
          </div>
          <div className="hero-cinematic__orb" />
          <div className="hero-cinematic__orb hero-cinematic__orb--warm" />
          <div className="hero-cinematic__grain" />
        </div>

        <div className="shell hero-cinematic__stage">
          <div className="hero-cinematic__copy">
            <p
              className={`hero-cinematic__brand anim-item${isFa ? '' : ' ltr'}`}
              style={{ '--i': 0 } as CSSProperties}
              lang={isFa ? 'fa' : 'en'}
              dir={isFa ? undefined : 'ltr'}
            >
              {brandName}
            </p>
            <h1 className="anim-item" style={{ '--i': 1 } as CSSProperties}>
              {meta.tagline}
            </h1>
            <p className="hero-cinematic__lead anim-item" style={{ '--i': 2 } as CSSProperties}>
              {meta.heroLead}
            </p>
            <div className="cta-row anim-item" style={{ '--i': 3 } as CSSProperties}>
              <Link className="btn btn-solid" to="/philosophy">
                {ui.readPhilosophy}
              </Link>
              <Link className="btn btn-ghost" to="/methodology">
                {ui.workWithAtra}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" className="mission">
        <div className="shell mission__grid">
          <h2>{meta.welcomeLead}</h2>
          <p>{meta.welcomeBody}</p>
        </div>
      </Reveal>

      <Reveal as="section" className="block">
        <div className="shell">
          <div className="block__head">
            <span className="label">{ui.ecosystem}</span>
            <h2>{meta.ecosystemLead}</h2>
            <p>{meta.ecosystemBody}</p>
          </div>
          <div className="arms">
            {meta.pillars.map((pillar, i) => (
              <article key={pillar.id} className="arm" style={{ '--i': i } as CSSProperties}>
                <span className="arm__kind">{pillarLabel(pillar.id, ui)}</span>
                <h3>{pillar.title}</h3>
                <p className="arm__sub">{pillar.subtitle}</p>
                <p>{pillar.description}</p>
                <Link to={pillarLink(pillar.id)} className="arm__link">
                  {ui.learnMore}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="school-block" id="school">
        <div className="shell school-block__prose">
          <span className="label">{ui.school}</span>
          <h2>{schoolPillar?.title ?? ui.school}</h2>
          <p className="school-block__lead">{schoolPillar?.description}</p>
          <p>{ui.schoolStartBody}</p>
          <div className="cta-row" style={{ marginTop: '1rem' }}>
            <Link className="btn btn-solid" to="/methodology">
              {ui.exploreFramework}
            </Link>
            <Link className="btn btn-outline" to="/philosophy">
              {ui.enterSchool}
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="mandate">
        <div className="shell mandate__grid">
          <div>
            <span className="label">{ui.manifesto}</span>
            <h2>{meta.manifestoLead}</h2>
          </div>
          <div>
            <p>{meta.manifesto}</p>
            <div className="cta-row">
              <Link className="btn btn-solid" to="/whitepaper">
                {ui.openWhitepaper}
              </Link>
              <a
                className="btn btn-outline ltr"
                href="https://x.com/atra_futures"
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                lang="en"
              >
                {meta.handle}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function pillarLink(id: string) {
  if (id === 'school') return '/philosophy'
  if (id === 'think-tank') return '/whitepaper'
  return '/methodology'
}

function pillarLabel(
  id: string,
  ui: { thinkTank: string; school: string; laboratory: string; research: string },
) {
  if (id === 'think-tank') return ui.thinkTank
  if (id === 'school') return ui.school
  if (id === 'laboratory') return ui.laboratory
  return ui.research
}
