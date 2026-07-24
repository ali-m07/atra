import { useLocale } from '../locale/LocaleContext'

export function LanguageSwitcher() {
  const { locale, setLocale, ui } = useLocale()

  return (
    <div className="lang-switch" role="group" aria-label={ui.switchTo} dir="ltr">
      <span className="lang-switch__track" aria-hidden="true">
        <span className={`lang-switch__thumb${locale === 'fa' ? ' is-fa' : ''}`} />
      </span>
      <button
        type="button"
        className={`lang-switch__btn ltr${locale === 'en' ? ' is-active' : ''}`}
        aria-pressed={locale === 'en'}
        lang="en"
        dir="ltr"
        onClick={() => setLocale('en')}
      >
        {ui.langEn}
      </button>
      <button
        type="button"
        className={`lang-switch__btn${locale === 'fa' ? ' is-active' : ''}`}
        aria-pressed={locale === 'fa'}
        lang="fa"
        onClick={() => setLocale('fa')}
      >
        {ui.langFa}
      </button>
    </div>
  )
}
