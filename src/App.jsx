import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import GridOverlay from './components/dev/GridOverlay'

function ScrollToTop() {
  const { pathname } = useLocation()
  // 'instant' overrides html{scroll-behavior:smooth}, which would otherwise
  // animate a long scroll back to the top on every route change.
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/confirmation" element={<RegistrationPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <AnimatedRoutes />
        {import.meta.env.DEV && <GridOverlay />}
      </BrowserRouter>
    </LanguageProvider>
  )
}
