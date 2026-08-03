import { motion } from 'framer-motion'
import { Shield, MapPin } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { school } from '../../data/school'
import { useT } from '../../hooks/useT'

export default function Introduction() {
  const t = useT()
  const stats = [
    { number: '[XX]', label: t.stats.years },
    { number: '[XX+]', label: t.stats.students },
    { number: '2', label: t.stats.languages },
    { number: '[XX%]', label: t.stats.satisfaction },
  ]
  return (
    <section id="school" className="py-section bg-surface">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 10% 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-200 via-primary-100 to-surface-alt relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="font-display text-2xl md:text-3xl text-primary-300">&spades;</span>
                  </div>
                  <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-primary-400">
                    {t.intro.schoolPhoto}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block absolute bottom-6 right-6 w-24 md:w-32 h-24 md:h-32 border-2 border-primary-300/30 rounded-2xl -z-10" />
              <div className="hidden sm:block absolute -top-4 -left-4 w-20 md:w-24 h-20 md:h-24 bg-accent-400/20 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Text + Trust */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              label={t.intro.label}
              title={t.intro.title}
              subtitle={t.intro.subtitle}
              align="left"
            />

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap gap-x-5 gap-y-2 mb-8 mt-6"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                <MapPin size={13} className="text-primary-400 shrink-0" />
                {school.city}, {school.region}, {school.country}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                <Shield size={13} className="text-primary-400 shrink-0" />
                {school.accreditation}
              </span>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-x-5 gap-y-5"
            >
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-0.5">
                    {stat.number}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
