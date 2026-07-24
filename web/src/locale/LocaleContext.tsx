import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  UI,
  applyDocumentLocale,
  detectLocale,
  persistLocale,
  type Locale,
  type UiCopy,
} from '../i18n'

type LocaleContextValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  isFa: boolean
  ui: UiCopy
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en'
    return detectLocale()
  })

  useEffect(() => {
    applyDocumentLocale(locale)
    persistLocale(locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'fa' : 'en'))
  }, [])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: locale === 'fa' ? 'rtl' : 'ltr',
      isFa: locale === 'fa',
      ui: UI[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
