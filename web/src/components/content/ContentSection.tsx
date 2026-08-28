import type { SectionBlock } from '../../types'
import { resolveSectionVariant } from '../../lib/sectionVariant'
import { Reveal } from '../Reveal'

type Props = {
  section: SectionBlock
  index: number
}

export function ContentSection({ section, index }: Props) {
  const variant = resolveSectionVariant(section)

  return (
    <Reveal
      as="section"
      className={`content-section content-section--${variant}`}
      delay={index * 40}
    >
      <header className="content-section__head">
        <h2 className="content-section__title">{section.title}</h2>
      </header>

      <div className="content-section__body prose">
        {section.lead ? <p className="content-section__lead">{section.lead}</p> : null}
        {section.body ? <p className="content-section__text">{section.body}</p> : null}

        {section.bullets?.length ? (
          <ul className={`content-list content-list--${variant}`}>
            {section.bullets.map((bullet, bulletIndex) => (
              <li key={bullet.label} className="content-list__item">
                {variant === 'cognitive' ? (
                  <span className="content-list__layer" aria-hidden="true">
                    {bulletIndex + 1}
                  </span>
                ) : null}
                <div className="content-list__copy">
                  <strong className="content-list__label">{bullet.label}</strong>
                  <p>{bullet.text}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  )
}
