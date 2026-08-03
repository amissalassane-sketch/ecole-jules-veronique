import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, ArrowUpRight } from 'lucide-react'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { school } from '../../data/school'
import { waLink } from '../../utils/contact'
import { useT } from '../../hooks/useT'

const navLinks = [
  { label: 'School', href: '#school', key: 'school' },
  { label: 'Programs', href: '#programs', key: 'programs' },
  { label: 'Student Life', href: '#student-life', key: 'studentLife' },
  { label: 'Tuition', href: '#pricing', key: 'tuition' },
  { label: 'FAQ', href: '#faq', key: 'faq' },
]

export default function Navbar() {
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(true)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isRegistration = location.pathname === '/registration'

  useEffect(() => {
    let lastScrollY = 0
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      if (y > 300 && y > lastScrollY) {
        setShowBottomBar(false)
      } else {
        setShowBottomBar(true)
      }
      lastScrollY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setMobileOpen(false)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen, handleKeyDown])

  const isDarkBg = isHome && !scrolled && !mobileOpen

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isDarkBg
            ? 'bg-transparent py-3'
            : 'bg-white/90 backdrop-blur-xl border-b border-neutral-200/40 shadow-sm py-2'
        )}
      >
        <nav className="container-page flex items-center justify-between h-12">
          <Link
            to="/"
            className="shrink-0 flex items-center gap-2.5 group touch-target rounded-lg px-1"
            aria-label={`${school.shortName} — Home`}
          >
            <div className={cn(
              'w-8 h-8 md:w-9 md:h-9 rounded-lg transition-all duration-500 flex items-center justify-center',
              isDarkBg ? 'bg-white/20 backdrop-blur' : 'bg-primary-600'
            )}>
              <span className="font-display font-bold text-base md:text-lg text-white">
                {school.shortName.charAt(0)}
              </span>
            </div>
            <span className={cn(
              'font-display font-bold text-base md:text-lg transition-colors duration-500 hidden sm:block',
              isDarkBg ? 'text-white' : 'text-neutral-900'
            )}>
              {school.shortName}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-300',
                  isDarkBg
                    ? 'text-white/75 hover:text-white hover:bg-white/10'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                )}
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 px-2 py-1.5 rounded-lg',
                isDarkBg ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-neutral-500 hover:text-primary-600 hover:bg-primary-50'
              )}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={15} />
              <span className="hidden xl:inline">{t.nav.whatsapp}</span>
            </a>
            <a
              href={`tel:${school.phone}`}
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 px-2 py-1.5 rounded-lg',
                isDarkBg ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-neutral-500 hover:text-primary-600 hover:bg-primary-50'
              )}
            >
              <Phone size={15} />
              <span className="hidden xl:inline">{school.phone}</span>
            </a>
            <Button
              variant={isDarkBg ? 'outlineWhite' : 'primary'}
              size="sm"
              to="/registration"
            >
              {t.nav.enroll}
            </Button>
          </div>

          <div className="hidden lg:flex items-center ml-2">
            <LanguageSwitcher dark={isDarkBg} />
          </div>

          {/* Mobile: LanguageSwitcher + hamburger grouped on the right */}
          <div className="lg:hidden flex items-center gap-1">
            <LanguageSwitcher dark={isDarkBg} compact />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'p-2.5 rounded-xl transition-colors cursor-pointer touch-target',
                isDarkBg ? 'text-white hover:bg-white/10' : 'text-neutral-700 hover:bg-neutral-100'
              )}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              className="absolute inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-[320px] bg-white shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col min-h-full pt-20 px-5 pb-safe">
                <nav className="flex flex-col gap-1" role="navigation">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={isHome ? link.href : `/${link.href}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="py-4 px-4 text-base font-medium text-neutral-800 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors touch-target flex items-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t.nav[link.key]}
                    </motion.a>
                  ))}
                </nav>
                <div className="mt-6 p-4 rounded-2xl bg-surface-alt space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{t.footer.language}</span>
                    <LanguageSwitcher dark={false} />
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors touch-target rounded-lg"
                  >
                    <MessageCircle size={17} className="text-emerald-600" />
                    {t.nav.chatOnWhatsApp}
                  </a>
                  <a
                    href={`tel:${school.phone}`}
                    className="flex items-center gap-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors touch-target rounded-lg"
                  >
                    <Phone size={17} className="text-primary-500" />
                    {school.phone}
                  </a>
                </div>
                <div className="mt-6">
                  <Button variant="primary" size="lg" to="/registration" className="w-full" onClick={() => setMobileOpen(false)}>
                    {t.nav.enroll}
                    <ArrowUpRight size={17} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isRegistration && (
        <AnimatePresence>
          {showBottomBar && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-neutral-200/60 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
              style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
              <div className="px-4 py-3 flex items-center gap-2.5">
                <Button variant="primary" size="md" to="/registration" className="flex-1 text-sm">
                  {t.nav.enroll}
                </Button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 touch-target"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle size={19} />
                </a>
                <a
                  href={`tel:${school.phone}`}
                  className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-primary-50 text-primary-600 touch-target"
                  aria-label={`Call ${school.phone}`}
                >
                  <Phone size={19} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {!isRegistration && showBottomBar && (
        <div className="lg:hidden h-16" aria-hidden="true" />
      )}
    </>
  )
}
