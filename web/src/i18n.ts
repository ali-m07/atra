export type Locale = 'en' | 'fa'

export type UiCopy = {
  futures: string
  philosophy: string
  framework: string
  whitepaper: string
  enterLab: string
  enterSchool: string
  workWithAtra: string
  menu: string
  readPhilosophy: string
  openWhitepaper: string
  exploreFramework: string
  learnMore: string
  welcome: string
  theName: string
  ecosystem: string
  manifesto: string
  research: string
  school: string
  incubator: string
  thinkTank: string
  laboratory: string
  featured: string
  heroLabel: string
  heroLabelSchool: string
  schoolForWhom: string
  schoolWhatTheyLearn: string
  schoolHowToStart: string
  researchCta: string
  schoolStartBody: string
  comingSoon: string
  loading: string
  loadError: string
  loadHint: string
  pageError: string
  footerBlurb: string
  switchTo: string
  langEn: string
  langFa: string
}

export const UI: Record<Locale, UiCopy> = {
  en: {
    futures: 'Laboratory',
    philosophy: 'Identity',
    framework: 'Method',
    whitepaper: 'Whitepaper',
    enterLab: 'Enter the lab',
    enterSchool: 'Enter the school — for parents & teachers',
    workWithAtra: 'Work with Atra',
    menu: 'Menu',
    readPhilosophy: 'About Atra',
    openWhitepaper: 'Read the whitepaper',
    exploreFramework: 'Explore the method',
    learnMore: 'Learn more',
    welcome: 'Mission',
    theName: 'The Name',
    ecosystem: 'The arms',
    manifesto: 'Mandate',
    research: 'Research',
    school: 'School',
    incubator: 'Laboratory',
    thinkTank: 'Think Tank',
    laboratory: 'Laboratory',
    featured: 'From the lab',
    heroLabel: 'Cognitive laboratory',
    heroLabelSchool: 'The Futures School',
    schoolForWhom: 'For parents, teachers & students',
    schoolWhatTheyLearn: 'What they learn',
    schoolHowToStart: 'How to start',
    researchCta: 'Read the research',
    schoolStartBody:
      'The school is for children and adults who want real literacy in systems and foresight — taught with warmth and seriousness. Start with the method and whitepaper, then walk the school path, or work with Atra when an organization needs structural diagnostics.',
    comingSoon: 'Coming soon',
    loading: 'Loading Atra…',
    loadError: 'Unable to load Atra content from the API.',
    loadHint: 'Start the Go server on port 8080, then refresh.',
    pageError: 'Unable to load this page from the API.',
    footerBlurb:
      'A cognitive laboratory for system dynamics and strategic foresight. Think Tank, School, Laboratory.',
    switchTo: 'Switch language',
    langEn: 'EN',
    langFa: 'فا',
  },
  fa: {
    futures: 'آزمایشگاه',
    philosophy: 'هویت',
    framework: 'روش',
    whitepaper: 'سپیدنامه',
    enterLab: 'ورود به آزمایشگاه',
    enterSchool: 'ورود به مدرسه — برای والدین و معلمان',
    workWithAtra: 'همکاری با آترا',
    menu: 'منو',
    readPhilosophy: 'درباره آترا',
    openWhitepaper: 'خواندن سپیدنامه',
    exploreFramework: 'کاوش روش',
    learnMore: 'بیشتر بدانید',
    welcome: 'مأموریت',
    theName: 'نام',
    ecosystem: 'بازوان',
    manifesto: 'الزام',
    research: 'پژوهش',
    school: 'مدرسه',
    incubator: 'آزمایشگاه',
    thinkTank: 'اندیشکده',
    laboratory: 'آزمایشگاه',
    featured: 'از آزمایشگاه',
    heroLabel: 'آزمایشگاه شناختی',
    heroLabelSchool: 'مدرسهٔ آینده‌ها',
    schoolForWhom: 'برای والدین، معلمان و دانش‌آموزان',
    schoolWhatTheyLearn: 'چه می‌آموزند',
    schoolHowToStart: 'چطور شروع کنیم',
    researchCta: 'خواندن پژوهش',
    schoolStartBody:
      'مدرسه برای کودکان و بزرگسالانی است که سواد واقعی سیستم‌ها و آینده‌نگری می‌خواهند — با گرمای انسانی و جدیت واقعی. از روش و سپیدنامه شروع کنید، سپس مسیر مدرسه را بگیرید، یا وقتی سازمان به تشخیص ساختاری نیاز دارد با آترا کار کنید.',
    comingSoon: 'به‌زودی',
    loading: 'در حال بارگذاری آترا…',
    loadError: 'بارگذاری محتوای آترا از رابط برنامه‌نویسی ممکن نشد.',
    loadHint: 'سرور Go را روی پورت ۸۰۸۰ اجرا کنید، سپس صفحه را تازه کنید.',
    pageError: 'بارگذاری این صفحه از رابط برنامه‌نویسی ممکن نشد.',
    footerBlurb:
      'آزمایشگاه شناختی پویایی سیستم‌ها و آینده‌نگری راهبردی. اندیشکده، مدرسه، آزمایشگاه.',
    switchTo: 'تغییر زبان',
    langEn: 'EN',
    langFa: 'فا',
  },
}

const STORAGE_KEY = 'atra-locale'

export function detectLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'fa') return saved
  const nav = navigator.language.toLowerCase()
  return nav.startsWith('fa') ? 'fa' : 'en'
}

export function persistLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale)
}

export function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
  document.title =
    locale === 'fa'
      ? 'آترا، آزمایشگاه شناختی پویایی سیستم‌ها'
      : 'Atra, Cognitive Laboratory for System Dynamics'
}
