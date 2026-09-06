import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import HomePage from './pages/HomePage'
/* DS V2 §16 P2 — the registration flow is code-split out of the initial bundle. */
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'))
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
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}>
        <Suspense fallback={<div className="min-h-screen-dynamic bg-paper" aria-busy="true" />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/confirmation" element={<RegistrationPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      {/* DS V2 §14 — every Motion animation honours prefers-reduced-motion. */}
      <MotionConfig reducedMotion="user" transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <AnimatedRoutes />
          {import.meta.env.DEV && <GridOverlay />}
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  )
}
