import type { SectionBlock, SectionVariant } from '../types'

const TITLE_HINTS: Record<SectionVariant, RegExp[]> = {
  cognitive: [/تفکر سه|لایه|کنجکاوی|curiosity|layer|performing knowledge/i],
  scenario: [/سناریو|آینده|پشیمانی|futures|regret|scenario/i],
  signal: [/سیگنال|نویز|signal|noise|filter/i],
  prose: [/نام|name|مأموریت|mandate/i],
  default: [],
}

export function resolveSectionVariant(section: SectionBlock): SectionVariant {
  if (section.variant) return section.variant

  for (const [variant, patterns] of Object.entries(TITLE_HINTS) as [SectionVariant, RegExp[]][]) {
    if (variant === 'default') continue
    if (patterns.some((re) => re.test(section.title))) return variant
  }

  return 'default'
}
