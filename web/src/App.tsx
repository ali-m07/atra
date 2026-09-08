import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LocaleProvider, useLocale } from './locale/LocaleContext'
import { Footer, Header } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { AboutPage, ArticlesPage, ContactPage, CoursesPage, DashboardPage, FreeContentPage, LoginPage, NotFoundPage, PodcastsPage, RegisterPage } from './pages/PortalPages'

function SkipLink(){const {isFa}=useLocale();return <a className="skip-link" href="#main">{isFa?'رفتن به محتوای اصلی':'Skip to main content'}</a>}

export default function App() {
  return <LocaleProvider><BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
    <SkipLink /><Header />
    <main id="main"><Routes>
      <Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} />
      <Route path="/articles" element={<ArticlesPage />} /><Route path="/podcasts" element={<PodcastsPage />} />
      <Route path="/courses" element={<CoursesPage />} /><Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegisterPage />} />
      <Route path="/free" element={<FreeContentPage />} /><Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes></main><Footer />
  </BrowserRouter></LocaleProvider>
}
