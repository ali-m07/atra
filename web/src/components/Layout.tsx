import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogoMark } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLocale } from '../locale/LocaleContext'

export function Header(){
  const [open,setOpen]=useState(false); const {pathname}=useLocation(); const {isFa}=useLocale()
  useEffect(()=>setOpen(false),[pathname])
  const links=isFa?[['/','خانه'],['/about','درباره ما'],['/articles','مقالات'],['/podcasts','پادکست‌ها'],['/courses','دوره‌ها'],['/contact','تماس']]:[['/','Home'],['/about','About'],['/articles','Articles'],['/podcasts','Podcasts'],['/courses','Courses'],['/contact','Contact']]
  return <header className="site-header"><div className="shell header-inner">
    <Link className="brand" to="/"><LogoMark className="brand-mark" title={isFa?'آترا':'Atra'}/><span><b>{isFa?'آترا':'Atra'}</b><small>{isFa?'مدرسه و اندیشکده آینده':'School & Futures Think Tank'}</small></span></Link>
    <nav className={open?'nav open':'nav'} aria-label={isFa?'منوی اصلی':'Main navigation'}>{links.map(([to,label])=><NavLink key={to} to={to} end={to==='/' }>{label}</NavLink>)}<Link className="nav-login" to="/login">{isFa?'ورود':'Sign in'}</Link><Link className="button small nav-enroll" to="/register">{isFa?'ثبت‌نام در دوره':'Enroll'}</Link></nav>
    <div className="header-actions"><LanguageSwitcher/><Link className="button small" to="/register">{isFa?'ثبت‌نام':'Enroll'}</Link><button className="menu-toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label={isFa?'نمایش منو':'Open menu'}>{open?'×':'☰'}</button></div>
  </div></header>
}
export function Footer(){const {isFa}=useLocale();return <footer className="site-footer"><div className="shell footer-grid"><div><Link className="brand footer-brand" to="/"><LogoMark className="brand-mark" title={isFa?'آترا':'Atra'}/><span><b>{isFa?'آترا':'Atra'}</b><small>{isFa?'فهم بهتر امروز، ساختن فردای بهتر':'Understand today. Build tomorrow.'}</small></span></Link><p>{isFa?'مدرسه و اندیشکده‌ای برای یادگیری تفکر سیستمی، آینده‌پژوهی و تصمیم‌گیری آگاهانه.':'A school and think tank for systems thinking, strategic foresight, and informed decision-making.'}</p></div><div><h3>{isFa?'مسیرهای اصلی':'Explore'}</h3><Link to="/courses">{isFa?'دوره‌ها':'Courses'}</Link><Link to="/articles">{isFa?'مقالات':'Articles'}</Link><Link to="/free">{isFa?'محتوای رایگان':'Free resources'}</Link></div><div><h3>{isFa?'ارتباط':'Contact'}</h3><a href="mailto:hello@atra.school">hello@atra.school</a><a href="tel:+989378011428">{isFa?'+۹۸ ۹۳۷ ۸۰۱ ۱۴۲۸':'+98 937 801 1428'}</a><span className="socials"><a href="https://t.me/atra_futures">Telegram</a><a href="https://www.linkedin.com">LinkedIn</a></span></div></div><div className="shell footer-bottom"><span>{isFa?'© ۲۰۲۶ آترا':'© 2026 Atra'}</span><span>{isFa?'حریم خصوصی · قوانین استفاده':'Privacy · Terms'}</span></div></footer>}
