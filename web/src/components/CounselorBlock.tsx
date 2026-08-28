import { Reveal } from './Reveal'
import { useLocale } from '../locale/LocaleContext'

export function CounselorBlock() {
  const { ui } = useLocale()

  return (
    <Reveal as="section" className="counselors" id="counseling">
      <div className="shell">
        <div className="counselors__intro prose">
          <span className="label">{ui.counselingLabel}</span>
          <h2>{ui.counselingTitle}</h2>
          <p className="counselors__lead">{ui.counselingLead}</p>
          <ul className="counselors__points">
            {ui.counselingPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="counselors__grid">
          {ui.counselors.map((person) => (
            <article key={person.name} className="counselor-card">
              <header className="counselor-card__head">
                <h3>{person.name}</h3>
                <p className="counselor-card__focus">{person.focus}</p>
              </header>
              <p className="counselor-card__bio">{person.bio}</p>
              <ul className="counselor-card__tags">
                {person.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p className="counselor-card__fit">{person.fit}</p>
            </article>
          ))}
        </div>

        <div className="counselors__cta prose">
          <p>{ui.counselingClosing}</p>
          <a className="btn btn-solid" href={`tel:${ui.counselingPhone.replace(/\s/g, '')}`}>
            {ui.counselingCta}
          </a>
        </div>
      </div>
    </Reveal>
  )
}
