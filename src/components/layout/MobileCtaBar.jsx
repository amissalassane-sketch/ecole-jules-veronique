import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'

/**
 * MobileCtaBar — DS V2 §18. Fixed bottom bar < 1024 px: Primary md (flex-1)
 * + Icon button WhatsApp 44. 56 px + safe-area. Visibility (anti-flicker
 * logic) is decided by the parent.
 */
export default function MobileCtaBar({ show }) {
  const t = useT()
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 72 }}
          animate={{ y: 0 }}
          exit={{ y: 72 }}
          transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="container-page h-14 flex items-center gap-2">
            <Button variant="primary" size="sm" to="/registration" className="flex-1 h-11">
              {t.nav.enroll}
            </Button>
            <Button
              variant="icon"
              size="md"
              href={waLinkFor('admissions')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.nav.chatOnWhatsApp}
              className="border border-border text-primary"
            >
              <MessageCircle size={20} aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
