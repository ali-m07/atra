import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { LanguageSwitcher } from './LanguageSwitcher'
import { LogoMark } from './Logo'
import { useLocale } from '../locale/LocaleContext'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { ui, isFa } = useLocale()
  const { pathname } = useLocation()
  const brandName = isFa ? 'آترا' : 'Atra'
  const onHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const links = [
    { to: '/philosophy', label: ui.philosophy },
    { to: '/methodology', label: ui.framework },
    { to: '/whitepaper', label: ui.whitepaper },
  ]

  const headerClass = [
    'site-header',
    onHome ? 'site-header--home' : '',
    onHome && !scrolled && !open ? 'site-header--transparent' : 'site-header--solid',
    scrolled || open ? 'is-scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <div className="shell site-header__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)} lang={isFa ? 'fa' : 'en'}>
          <LogoMark className="brand__mark" title={brandName} />
          <span className={`brand__text${isFa ? '' : ' ltr'}`} dir={isFa ? undefined : 'ltr'}>
            {brandName}
          </span>
        </Link>

        <nav id="site-nav" className={`nav${open ? ' is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/methodology" className="nav-cta" onClick={() => setOpen(false)}>
            {ui.workWithAtra}
          </Link>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {ui.menu}
          </button>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  const { ui, isFa } = useLocale()
  const brandName = isFa ? 'آترا' : 'Atra'

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div>
          <div className="brand brand--footer" lang={isFa ? 'fa' : 'en'}>
            <LogoMark className="brand__mark" title={brandName} />
            <span className={`brand__text${isFa ? '' : ' ltr'}`} dir={isFa ? undefined : 'ltr'}>
              {brandName}
            </span>
          </div>
          <p>{ui.footerBlurb}</p>
        </div>
        <div className="footer-meta">
          <a
            className="ltr"
            href="https://x.com/atra_futures"
            target="_blank"
            rel="noreferrer"
            dir="ltr"
            lang="en"
          >
            @atra_futures
          </a>
        </div>
      </div>
    </footer>
  )
}
