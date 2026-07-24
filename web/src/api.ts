import type { Page, SiteMeta } from './types'
import type { Locale } from './i18n'

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  meta: (lang: Locale) => getJSON<SiteMeta>(`/api/meta?lang=${lang}`),
  page: (slug: string, lang: Locale) => getJSON<Page>(`/api/pages/${slug}?lang=${lang}`),
}
