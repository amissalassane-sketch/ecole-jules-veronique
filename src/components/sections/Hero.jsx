import { motion } from 'framer-motion'
import { ArrowDown, Star, Shield, Globe, MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import { school } from '../../data/school'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'

export default function Hero() {
  const t = useT()
  return (
    <section className="relative min-h-screen-dynamic flex items-center overflow-hidden bg-primary-950">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
        <div className="absolute -top-32 -right-32 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-accent-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: 'clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)',
          }}
        />
      </div>

      <div className="container-page relative z-10 w-full pt-24 pb-28 md:pt-32 md:pb-24">
        <div className="max-w-3xl mx-auto md:mx-0 lg:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap items-center gap-3 mb-5 md:mb-8"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-white/85 text-[11px] xs:text-xs font-semibold tracking-[0.12em] uppercase border border-white/10">
              <Globe size={12} className="text-accent-400" />
              {school.city}, {school.country}
            </span>
            <span className="hidden xs:inline text-white/40 text-xs">&bull;</span>
            <span className="text-white/50 text-[11px] xs:text-xs font-medium tracking-wide">
              {school.schoolYear}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-accent-300 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] mb-4"
          >
            {school.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display font-bold text-white leading-[1.08] text-balance mb-4 md:mb-6"
            style={{ fontSize: 'clamp(1.75rem, 5vw + 0.5rem, 5.5rem)' }}
          >
            {school.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-md md:max-w-xl mb-8 md:mb-10 text-balance"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* ── CTA HIERARCHY ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col xs:flex-row gap-3 xs:gap-3.5 mb-3 md:mb-4"
          >
            <Button variant="accent" size="lg" to="/registration" className="w-full xs:w-auto text-sm md:text-base shadow-lg shadow-accent-500/25">
              {t.hero.enroll}
            </Button>
            <Button
              variant="outlineWhite"
              size="lg"
              href={waLinkFor('admissions')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full xs:w-auto text-sm md:text-base"
            >
              <MessageCircle size={17} />
              {t.hero.talkToAdmissions}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-8 md:mb-16"
          >
            <a
              href="#school"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-xs sm:text-sm font-medium transition-colors duration-300"
            >
              <ArrowDown size={14} />
              {t.hero.discoverSchool}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-x-5 gap-y-3 md:gap-x-8"
          >
            {[
              { icon: Star, text: t.hero.excellence },
              { icon: Globe, text: t.hero.bilingual },
              { icon: Shield, text: t.hero.safeEnv },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/45 text-xs md:text-sm">
                <item.icon size={15} className="text-accent-400 shrink-0" />
                <span className="whitespace-nowrap">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6, 1] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden"
        aria-hidden="true"
      >
        <ArrowDown size={20} className="text-white/30" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </section>
  )
}
