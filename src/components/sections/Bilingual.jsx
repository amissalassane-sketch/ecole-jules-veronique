import { motion } from 'framer-motion'
import { Globe, Sparkles, Brain, MessageSquareText, CalendarDays } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { school } from '../../data/school'
import { bilingualSchedule } from '../../data/schedule'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

export default function Bilingual() {
  const t = useT()
  const { language } = useLanguage()
  const benefits = [
    { icon: Brain, title: t.bilingual.cognitiveTitle, description: t.bilingual.cognitiveDesc },
    { icon: Globe, title: t.bilingual.culturalTitle, description: t.bilingual.culturalDesc },
    { icon: MessageSquareText, title: t.bilingual.communicationTitle, description: t.bilingual.communicationDesc },
    { icon: Sparkles, title: t.bilingual.futureTitle, description: t.bilingual.futureDesc },
  ]

  return (
    <section id="bilingual" className="py-section bg-primary-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary-600/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent-500/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container-page relative z-10">
        <SectionHeading label={t.bilingual.label} title={t.bilingual.title} subtitle={t.bilingual.subtitle} light />

        <ScrollReveal className="mb-12 md:mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-8 md:p-12 text-center overflow-hidden">
              <div className="absolute top-3 left-4 sm:top-4 sm:left-6 flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
              </div>
              <motion.blockquote
                className="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mt-4 sm:mt-6 text-balance"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                &ldquo;{t.bilingual.quote}&rdquo;
              </motion.blockquote>
              <div className="mt-5 flex justify-center gap-4 text-xs sm:text-sm text-white/45 font-medium">
                {school.languages.map((languageName, index) => (
                  <span key={languageName} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${index === 0 ? 'bg-accent-400' : 'bg-primary-300'}`} />
                    {language === 'en' && languageName === 'Français' ? 'French' : languageName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto mb-12 md:mb-16 text-center">
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-3">{t.bilingual.howItWorksTitle}</h3>
          <p className="text-white/55 leading-relaxed text-sm sm:text-base">{t.bilingual.howItWorksDesc}</p>
        </div>

        <ScheduleTable t={t} language={language} />

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-12 md:mt-16">
          {benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.title} delay={i * 0.08}>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 sm:p-6 h-full hover:bg-white/10 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                  <benefit.icon size={18} className="text-accent-400" />
                </div>
                <h4 className="font-semibold text-white text-sm sm:text-base mb-1.5">{benefit.title}</h4>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScheduleTable({ t, language }) {
  return (
    <ScrollReveal>
      <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-start gap-3">
          <CalendarDays size={20} className="text-accent-400 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold">{t.bilingual.balanceTitle}</h3>
            <p className="text-white/50 text-sm mt-1">{t.bilingual.balanceDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {bilingualSchedule.map((group) => (
            <div key={group.id} className="p-4 sm:p-6">
              <h4 className="font-semibold text-white text-sm sm:text-base mb-4">
                {language === 'en' ? group.groupEn : group.group}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm min-w-[360px]">
                  <thead>
                    <tr className="text-white/40 border-b border-white/10">
                      <th className="py-2 pr-3 font-medium">{t.bilingual.day}</th>
                      <th className="py-2 px-3 font-medium">{t.bilingual.morning}</th>
                      <th className="py-2 pl-3 font-medium">{t.bilingual.afternoon}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr key={row.day} className="border-b border-white/5 last:border-0">
                        <td className="py-2.5 pr-3 text-white/70">{language === 'en' ? row.dayEn : row.day}</td>
                        <td className="py-2.5 px-3 text-accent-300">{language === 'en' && row.morning === 'Français' ? 'French' : language === 'en' && row.morning === 'Anglais' ? 'English' : row.morning}</td>
                        <td className="py-2.5 pl-3 text-primary-200">{language === 'en' && row.afternoon === 'Français' ? 'French' : language === 'en' && row.afternoon === 'Anglais' ? 'English' : row.afternoon}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-white/35 text-xs">{t.bilingual.scheduleNote}</p>
      </div>
    </ScrollReveal>
  )
}
