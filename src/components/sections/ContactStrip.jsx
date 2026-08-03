import { motion } from 'framer-motion'
import { MessageCircle, Phone, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { school } from '../../data/school'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'

export default function ContactStrip() {
  const t = useT()
  return (
    <section className="py-10 sm:py-14 bg-white border-y border-neutral-100">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="text-center lg:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
              {t.contactStrip.title}
            </h3>
            <p className="text-neutral-500 text-sm max-w-md">
              {t.contactStrip.subtitle}
            </p>
          </div>

          <div className="flex flex-col xs:flex-row items-center gap-3 shrink-0">
            <a
              href={waLinkFor('visit')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm font-semibold transition-colors touch-target"
            >
              <MessageCircle size={17} />
              {t.contactStrip.chat}
            </a>
            <a
              href={`tel:${school.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 text-sm font-semibold transition-colors touch-target"
            >
              <Phone size={17} />
              {school.phone}
            </a>
            <Button variant="outline" size="md" to="/registration" className="text-sm">
              {t.contactStrip.enrollNow}
              <ArrowRight size={15} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
