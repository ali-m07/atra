import { SocialCard } from './SocialCard'
import { Reveal } from './Reveal'
import { useLocale } from '../locale/LocaleContext'

export function InsightsStrip() {
  const { ui } = useLocale()

  return (
    <Reveal as="section" className="insights">
      <div className="shell">
        <div className="insights__head">
          <span className="label">{ui.featured}</span>
          <h2>{ui.insightsTitle}</h2>
          <p className="insights__lead">{ui.insightsLead}</p>
        </div>
        <div className="insights__grid">
          {ui.insightCards.map((card, i) => (
            <SocialCard
              key={card.title}
              title={card.title}
              quote={card.quote}
              tags={card.tags}
              accent={i === 0 ? 'cyan' : i === 1 ? 'amber' : 'violet'}
              shareLabel={ui.shareLabel}
            />
          ))}
        </div>
      </div>
    </Reveal>
  )
}
