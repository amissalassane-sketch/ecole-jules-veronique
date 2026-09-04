import { motion } from 'framer-motion'
import { CalendarDays, School, Languages, Scale } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useT } from '../../hooks/useT'

function StatItem({ value, label, Icon, delay = 0 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        className="flex items-center justify-center gap-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2"
      >
        <Icon size={22} className="text-accent-400" />
        {value}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-xs sm:text-sm md:text-base font-medium text-white/60"
      >
        {label}
      </motion.p>
    </div>
  )
}

export default function Statistics() {
  const t = useT()
  const stats = [
    { value: t.stats.yearsValue, label: t.stats.years, Icon: CalendarDays },
    { value: t.stats.studentsValue, label: t.stats.students, Icon: School },
    { value: t.stats.languagesValue, label: t.stats.languages, Icon: Languages },
    { value: t.stats.satisfactionValue, label: t.stats.satisfaction, Icon: Scale },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary-900 relative overflow-hidden" aria-label="Key school information">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-primary-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>
        <p className="text-center text-white/35 text-[11px] mt-8 max-w-xl mx-auto">
          {t.stats.placeholderNote}
        </p>
      </div>
    </section>
  )
}
