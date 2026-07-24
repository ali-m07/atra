export type Pillar = {
  id: string
  title: string
  subtitle: string
  description: string
}

export type Bullet = {
  label: string
  text: string
}

export type SectionBlock = {
  title: string
  lead?: string
  bullets?: Bullet[]
  body?: string
}

export type Page = {
  slug: string
  title: string
  headline: string
  lead: string
  sections: SectionBlock[]
  closing?: string
  tags?: string[]
  handle?: string
  lang: string
}

export type NameMeaning = {
  wordEn: string
  wordFa: string
  glossEn: string
  glossFa: string
  visionEn: string
  visionFa: string
  body: string
}

export type SiteMeta = {
  brand: string
  tagline: string
  handle: string
  founder: string
  tags: string[]
  pillars: Pillar[]
  manifesto: string
  welcomeLead: string
  welcomeBody: string
  name: NameMeaning
  heroLead: string
  ecosystemLead: string
  ecosystemBody: string
  manifestoLead: string
  lang: string
}
