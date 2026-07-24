import type { Page, SiteMeta } from './types'
import type { Locale } from './i18n'

const LIVE_API = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '')
const USE_STATIC = import.meta.env.VITE_STATIC === 'true'

function resolveURL(path: string): string {
  // Live API override (separate backend host)
  if (LIVE_API) {
    return `${LIVE_API}${path}`
  }

  // GitHub Pages / static hosting: serve JSON from /content/{lang}/...
  if (USE_STATIC) {
    const url = new URL(path, 'http://local')
    const lang = url.searchParams.get('lang') || 'en'
    const base = import.meta.env.BASE_URL
    if (url.pathname === '/api/meta') {
      return `${base}content/${lang}/meta.json`
    }
    const match = url.pathname.match(/^\/api\/pages\/([^/]+)$/)
    if (match) {
      return `${base}content/${lang}/pages/${match[1]}.json`
    }
  }

  // Dev proxy + Go-served production
  return path
}

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(resolveURL(path))
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  meta: (lang: Locale) => getJSON<SiteMeta>(`/api/meta?lang=${lang}`),
  page: (slug: string, lang: Locale) => getJSON<Page>(`/api/pages/${slug}?lang=${lang}`),
}
