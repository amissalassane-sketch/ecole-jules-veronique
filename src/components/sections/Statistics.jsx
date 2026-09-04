import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useT } from '../../hooks/useT'

function StatItem({ value, label, delay = 0 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2"
      >
        {value}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-sm md:text-base font-medium text-white/60"
      >
        {label}
      </motion.p>
    </div>
  )
}

export default function Statistics() {
  const t = useT()
  const stats = [
    { value: '[XX]', label: t.stats.years },
    { value: '[XX+]', label: t.stats.students },
    { value: '2', label: t.stats.languages },
    { value: '[XX%]', label: t.stats.satisfaction },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary-900 relative overflow-hidden" aria-label="Key statistics">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-primary-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <StatItem key={i} value={stat.value} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
        <p className="text-center text-white/25 text-[11px] mt-8 max-w-sm mx-auto">
          {t.stats.placeholderNote}
        </p>
      </div>
    </section>
  )
}
