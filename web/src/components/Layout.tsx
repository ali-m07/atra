import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogoMark } from './Logo'

const links = [['/','خانه'],['/about','درباره ما'],['/articles','مقالات'],['/podcasts','پادکست‌ها'],['/courses','دوره‌ها'],['/contact','تماس']]
export function Header(){
  const [open,setOpen]=useState(false); const {pathname}=useLocation();
  useEffect(()=>setOpen(false),[pathname])
  return <header className="site-header"><div className="shell header-inner">
    <Link className="brand" to="/"><LogoMark className="brand-mark" title="آترا"/><span><b>آترا</b><small>مدرسه و اندیشکده آینده</small></span></Link>
    <nav className={open?'nav open':'nav'} aria-label="منوی اصلی">{links.map(([to,label])=><NavLink key={to} to={to} end={to==='/' }>{label}</NavLink>)}<Link className="nav-login" to="/login">ورود</Link></nav>
    <div className="header-actions"><Link className="button small" to="/register">ثبت‌نام در دوره</Link><button className="menu-toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label="نمایش منو">{open?'×':'☰'}</button></div>
  </div></header>
}
export function Footer(){return <footer className="site-footer"><div className="shell footer-grid"><div><Link className="brand footer-brand" to="/"><LogoMark className="brand-mark" title="آترا"/><span><b>آترا</b><small>فهم بهتر امروز، ساختن فردای بهتر</small></span></Link><p>مدرسه و اندیشکده‌ای برای یادگیری تفکر سیستمی، آینده‌پژوهی و تصمیم‌گیری آگاهانه.</p></div><div><h3>مسیرهای اصلی</h3><Link to="/courses">دوره‌ها</Link><Link to="/articles">مقالات</Link><Link to="/free">محتوای رایگان</Link></div><div><h3>ارتباط</h3><a href="mailto:hello@atra.school">hello@atra.school</a><a href="tel:+989378011428">۰۹۳۷۸۰۱۱۴۲۸</a><span className="socials"><a href="https://t.me/atra_futures">تلگرام</a><a href="https://www.linkedin.com">لینکدین</a></span></div></div><div className="shell footer-bottom"><span>© ۱۴۰۵ آترا</span><span><a href="/privacy">حریم خصوصی</a> · <a href="/terms">قوانین استفاده</a></span></div></footer>}
