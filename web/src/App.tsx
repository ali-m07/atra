import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, Footer } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ContentPage } from './pages/ContentPage'
import { LocaleProvider } from './locale/LocaleContext'

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/philosophy" element={<ContentPage slug="philosophy" />} />
            <Route path="/methodology" element={<ContentPage slug="methodology" />} />
            <Route path="/whitepaper" element={<ContentPage slug="whitepaper" />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </LocaleProvider>
  )
}
