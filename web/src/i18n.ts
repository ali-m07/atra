export type Locale = 'en' | 'fa'

export type InsightCard = {
  title: string
  quote: string
  tags: string[]
}

export type CounselorProfile = {
  name: string
  focus: string
  bio: string
  tags: string[]
  fit: string
}

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
  insightsTitle: string
  insightsLead: string
  insightCards: InsightCard[]
  counselingLabel: string
  counselingTitle: string
  counselingLead: string
  counselingPoints: string[]
  counselors: CounselorProfile[]
  counselingClosing: string
  counselingCta: string
  counselingPhone: string
  sectionDivider: string
  shareLabel: string
}

export const UI: Record<Locale, UiCopy> = {
  en: {
    futures: 'Laboratory',
    philosophy: 'Identity',
    framework: 'Method',
    whitepaper: 'Whitepaper',
    enterLab: 'Enter the lab',
    enterSchool: 'Explore the school',
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
    schoolStartBody:
      'The school is for children and adults who want real literacy in systems and foresight. Start with the method and whitepaper, then enter the school path or work with Atra when an organization needs structural diagnostics.',
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
    insightsTitle: 'From the cognitive lab',
    insightsLead:
      'Core ideas we publish and teach — distilled from system dynamics, foresight, and decision-making under uncertainty.',
    insightCards: [
      {
        title: 'Performing knowledge vs. curiosity',
        quote:
          'Real curiosity needs no proof and is not afraid to admit I do not know. Awakening begins when we stop swapping display rulers.',
        tags: ['#systemic_thinking', '#mental_models', '#atra'],
      },
      {
        title: 'Three layers of thought',
        quote:
          'From reactive robot to self-appointed hero to mind architect — the path is not rebellion alone, but holding paradox without defensive labels.',
        tags: ['#cognitive_layers', '#foresight', '#atra'],
      },
      {
        title: 'Signal vs. noise',
        quote:
          'Ask not which headline is true. Ask: if this data is true, which decision I make today becomes meaningless?',
        tags: ['#weak_signals', '#decision_making', '#atra'],
      },
    ],
    counselingLabel: 'School',
    counselingTitle: 'Field selection with foresight',
    counselingLead:
      'At Atra, choosing a major is not only about rank and acceptance odds. It is about aligning today’s choice with skills, careers, and futures that may diverge.',
    counselingPoints: [
      'Know yourself and your interests',
      'Map study and career paths',
      'Read labor-market and technology trends',
      'Explore entrepreneurship angles',
      'Design a choice that fits your path',
    ],
    counselors: [
      {
        name: 'Mohammad Reza Tozandjani',
        focus: 'Entrepreneurship · Management · Personal fit',
        bio: 'Years of counseling plus executive and research work in entrepreneurship and management — field choice beyond rank and university name.',
        tags: ['Career path', 'Personal fit', 'Entrepreneurship'],
        fit: 'Best if you want study aligned with career, entrepreneurship, or you are still between several paths.',
      },
      {
        name: 'Ali Mansouri',
        focus: 'Technology · Futures · Labor market',
        bio: 'Systems and organizational design background — field choice through technology shifts, labor trends, and professional trajectories.',
        tags: ['AI impact', 'Labor market', 'Professional track'],
        fit: 'Best if technology, future skills, and a strategic foresight lens matter to your decision.',
      },
    ],
    counselingClosing: 'Two perspectives, one goal: a more aware choice. The decision is yours.',
    counselingCta: 'Book counseling',
    counselingPhone: '09378011428',
    sectionDivider: 'Continue',
    shareLabel: 'Share',
  },
  fa: {
    futures: 'آزمایشگاه',
    philosophy: 'هویت',
    framework: 'روش',
    whitepaper: 'سپیدنامه',
    enterLab: 'ورود به آزمایشگاه',
    enterSchool: 'کاوش مدرسه',
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
    schoolStartBody:
      'مدرسه برای کودکان و بزرگسالانی است که سواد واقعی سیستم‌ها و آینده‌نگری می‌خواهند. از روش و سپیدنامه شروع کنید، سپس مسیر مدرسه را بگیرید یا وقتی سازمان به تشخیص ساختاری نیاز دارد با آترا کار کنید.',
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
    insightsTitle: 'از آزمایشگاه شناختی',
    insightsLead:
      'ایده‌های محوری که منتشر و آموزش می‌دهیم — از تفکر سیستمی، آینده‌پژوهی و تصمیم‌گیری در عدم‌قطعیت.',
    insightCards: [
      {
        title: 'نمایش دانایی در برابر کنجکاوی',
        quote:
          'کنجکاوی واقعی نیازی به اثبات ندارد و از اعتراف به «نمی‌دانم» نمی‌ترسد. بیداری از توقف جابه‌جایی خط‌کش‌های نمایشی آغاز می‌شود.',
        tags: ['#تفکر_سیستمی', '#مدل_ذهنی', '#آترا'],
      },
      {
        title: 'تفکر سه‌لایه‌ای',
        quote:
          'از ربات روبه‌رو تا قهرمان خودخوانده تا معماری ذهن — مسیر فقط طغیان نیست؛ نگه‌داشتن پارادوکس بدون برچسب دفاعی است.',
        tags: ['#لایه‌های_شناختی', '#آینده_پژوهی', '#آترا'],
      },
      {
        title: 'سیگنال در برابر نویز',
        quote:
          'به‌جای «کدام خبر درست است؟» بپرس: «اگر این داده درست باشد، کدام تصمیم امروز بی‌معنا می‌شود؟»',
        tags: ['#سیگنال_ضعیف', '#تصمیم_گیری', '#آترا'],
      },
    ],
    counselingLabel: 'مدرسه',
    counselingTitle: 'انتخاب رشته با نگاه آینده‌پژوهانه',
    counselingLead:
      'در آترا، انتخاب رشته فقط با رتبه و شانس قبولی دیده نمی‌شود. انتخاب امروز می‌تواند مسیر شغلی، مهارت‌ها و سبک زندگی سال‌های آینده را شکل دهد.',
    counselingPoints: [
      'شناخت خودت و علایقت',
      'بررسی مسیرهای تحصیلی و شغلی',
      'شناخت روندهای آینده و بازار کار',
      'بررسی فرصت‌های کارآفرینی',
      'طراحی انتخابی متناسب با مسیر خودت',
    ],
    counselors: [
      {
        name: 'محمدرضا توزندجانی',
        focus: 'کارآفرینی · مدیریت · شناخت فردی',
        bio: 'سال‌ها مشاوره تحصیلی و فردی در کنار تجربه اجرایی و پژوهشی در کارآفرینی و مدیریت — انتخاب رشته فراتر از رتبه و نام دانشگاه.',
        tags: ['مسیر شغلی', 'شناخت فردی', 'کارآفرینی'],
        fit: 'اگر می‌خواهی مسیر تحصیلی با آینده شغلی، کارآفرینی یا مردد بین چند مسیر هماهنگ شود.',
      },
      {
        name: 'علی منصوری',
        focus: 'فناوری · روندهای آینده · بازار کار',
        bio: 'تجربه طراحی سیستم‌ها و فرآیندهای سازمانی — انتخاب رشته از زاویه تحولات فناوری، بازار کار و مسیر حرفه‌ای.',
        tags: ['هوش مصنوعی', 'بازار کار', 'مسیر حرفه‌ای'],
        fit: 'اگر تأثیر فناوری، مهارت‌های آینده و نگاه استراتژیک برای انتخاب رشته‌ات مهم است.',
      },
    ],
    counselingClosing: 'دو مسیر متفاوت، یک هدف مشترک: انتخاب آگاهانه‌تر. انتخاب با توست.',
    counselingCta: 'تعیین وقت مشاوره',
    counselingPhone: '09378011428',
    sectionDivider: 'ادامه',
    shareLabel: 'اشتراک',
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
