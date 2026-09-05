import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import { school } from '../../data/school'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'

export default function FinalCTA() {
  const t = useT()
  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-accent-500/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary-400/10 rounded-full blur-3xl translate-y-1/4" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="container-page relative z-10 text-center"
      >
        <h2
          className="font-display font-bold text-white leading-[1.1] mb-4 md:mb-5 text-balance max-w-3xl mx-auto"
          style={{ fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 3.75rem)' }}
        >
          {t.finalCta.title}
        </h2>

        <p className="text-white/60 text-sm sm:text-base md:text-lg mb-8 md:mb-10 max-w-lg mx-auto px-2">
          {t.finalCta.subtitle.replace('[SCHOOL YEAR]', school.schoolYear)}
        </p>

        {/* PRIMARY CTA */}
        <div className="mb-3">
          <Button variant="accent" size="lg" to="/registration" className="text-sm md:text-base shadow-lg shadow-accent-500/25">
            {t.finalCta.enroll}
            <ArrowRight size={18} />
          </Button>
        </div>

        {/* SECONDARY CTAs */}
        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center">
          <Button variant="outlineWhite" size="lg" href={`tel:${school.phone}`} className="text-sm md:text-base">
            <Calendar size={18} />
            {t.finalCta.bookVisit}
          </Button>
          <Button variant="outlineWhite" size="lg" href={waLinkFor('enroll')} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base">
            <MessageCircle size={18} />
            {t.finalCta.talk}
          </Button>
        </div>

        <p className="text-white/30 text-xs sm:text-sm mt-6 md:mt-8 max-w-xs mx-auto">
          {t.finalCta.contact.replace('[PHONE]', school.phone).replace('[WHATSAPP]', school.whatsapp)}
        </p>
      </motion.div>
    </section>
  )
}
