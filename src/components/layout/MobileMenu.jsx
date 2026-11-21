import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import { school } from '../../data/school'
import { waLink, phoneLink } from '../../utils/contact'
import { useT } from '../../hooks/useT'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
const EASE = [0.2, 0.8, 0.2, 1]

/**
 * MobileMenu — DS V2 §18. Right-hand panel (full width ≤ 480, 400 px above),
 * 280 ms, links 17 px × 52 px, Primary CTA at the bottom, contacts as
 * Tertiary buttons. Focus trap + Escape + focus returned to the trigger.
 *
 * Scroll lock is handled by the parent (Navbar) with the existing
 * position:fixed technique — it must never touch html/body overflow.
 */
export default function MobileMenu({ open, onClose, links, isHome, triggerRef, id }) {
  const t = useT()
  const panelRef = useRef(null)

  // Focus trap + Escape + return focus
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const trigger = triggerRef?.current
    const first = panel?.querySelector(FOCUSABLE)
    first?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const nodes = [...panel.querySelectorAll(FOCUSABLE)]
      if (!nodes.length) return
      const firstNode = nodes[0]
      const lastNode = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === firstNode) {
        e.preventDefault(); lastNode.focus()
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault(); firstNode.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      trigger?.focus?.()
    }
  }, [open, onClose, triggerRef])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" id={id}>
          {/* Backdrop — plain ink veil, no blur */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute inset-0 w-full bg-ink/60 cursor-pointer"
            onClick={onClose}
            aria-label={t.nav.closeMenu}
            tabIndex={-1}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menuTitle}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute right-0 top-0 bottom-0 w-full xs:w-[400px] xs:max-w-full bg-white flex flex-col overflow-y-auto"
          >
            {/* Top row: same height as the header, close button aligned with the hamburger */}
            <div className="container-page flex items-center justify-between h-[60px] shrink-0 border-b border-border">
              <span className="flex items-center gap-2.5 font-display font-semibold text-[18px] text-text-1">
                <Logo size={36} />
                {school.shortName}
              </span>
              <Button variant="icon" size="md" onClick={onClose} aria-label={t.nav.closeMenu} className="-mr-2">
                <X size={24} aria-hidden="true" />
              </Button>
            </div>

            <nav aria-label={t.nav.mainNav} className="container-page pt-2">
              <ul>
                {links.map((link) => (
                  <li key={link.href} className="border-b border-border">
                    <a
                      href={isHome ? link.href : `/${link.href}`}
                      onClick={onClose}
                      className="flex items-center min-h-13 py-3 text-[17px] font-medium text-text-1 hover:text-primary transition-colors duration-(--duration-fast)"
                    >
                      {t.nav[link.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="container-page mt-auto pt-8 pb-safe">
              <Button variant="primary" size="lg" to="/registration" className="w-full" onClick={onClose}>
                {t.nav.enroll}
              </Button>
              <div className="grid grid-cols-2 gap-2 mt-3 mb-4">
                <Button variant="tertiary" size="md" href={phoneLink} className="w-full" aria-label={`${t.nav.call} ${school.phone}`}>
                  <Phone size={20} aria-hidden="true" />
                  <span>{t.nav.call}</span>
                </Button>
                <Button variant="tertiary" size="md" href={waLink} target="_blank" rel="noopener noreferrer" className="w-full">
                  <MessageCircle size={20} aria-hidden="true" />
                  <span>{t.nav.whatsapp}</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
