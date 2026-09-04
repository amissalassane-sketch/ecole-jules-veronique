import { motion } from 'framer-motion'
import { Shield, MapPin, School, Languages, CalendarDays } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { school } from '../../data/school'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

export default function Introduction() {
  const t = useT()
  const { language } = useLanguage()
  const stats = [
    { number: t.stats.yearsValue, label: t.stats.years, icon: CalendarDays },
    { number: t.stats.studentsValue, label: t.stats.students, icon: School },
    { number: t.stats.languagesValue, label: t.stats.languages, icon: Languages },
    { number: t.stats.satisfactionValue, label: t.stats.satisfaction, icon: Languages },
  ]

  return (
    <section id="school" className="py-section bg-surface">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 10% 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-200 via-primary-100 to-surface-alt relative">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center text-primary-500">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-white/70 flex items-center justify-center shadow-sm">
                    <School size={34} className="text-primary-400" />
                  </div>
                  <span className="block text-[11px] md:text-xs font-semibold tracking-[0.14em] uppercase text-primary-600">
                    {t.intro.schoolPhoto}
                  </span>
                  <span className="block text-xs text-primary-700/60 mt-2 max-w-[15rem]">
                    {school.name}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block absolute bottom-6 right-6 w-24 md:w-32 h-24 md:h-32 border-2 border-primary-300/30 rounded-2xl" />
              <div className="hidden sm:block absolute top-5 left-5 w-20 md:w-24 h-20 md:h-24 bg-accent-400/20 rounded-2xl" />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              label={t.intro.label}
              title={t.intro.title}
              subtitle={t.intro.subtitle}
              align="left"
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap gap-x-5 gap-y-2 mb-8 mt-6"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                <MapPin size={13} className="text-primary-400 shrink-0" />
                {school.address}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                <Shield size={13} className="text-primary-400 shrink-0" />
                {language === 'en' ? school.accreditationEn : school.accreditation}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-x-5 gap-y-5"
            >
              {stats.map(({ number, label, icon: Icon }) => (
                <div key={label}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={15} className="text-accent-500" />
                    <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary-600">
                      {number}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-tight">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
