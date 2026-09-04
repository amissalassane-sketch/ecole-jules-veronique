import { Palette, Trophy, Sparkles } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { activities } from '../../data/activities'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

export default function StudentLife() {
  const t = useT()
  const { language } = useLanguage()
  const groups = [activities.younger, activities.older]

  return (
    <section id="student-life" className="py-section bg-surface-alt">
      <div className="container-page">
        <SectionHeading label={t.studentLife.label} title={t.studentLife.title} subtitle={t.studentLife.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {groups.map((group, index) => {
            const items = language === 'en' ? group.itemsEn : group.items
            return (
              <ScrollReveal key={group.label} delay={index * 0.1}>
                <article className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${index === 0 ? 'bg-accent-50 text-accent-600' : 'bg-primary-50 text-primary-600'}`}>
                      {index === 0 ? <Palette size={22} /> : <Trophy size={22} />}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-1">
                        {language === 'en' ? group.labelEn : group.label}
                      </p>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900">
                        {index === 0 ? t.studentLife.arts : t.studentLife.events}
                      </h3>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 md:mt-12 max-w-3xl mx-auto rounded-2xl bg-white/70 border border-neutral-200 p-5 sm:p-6 flex items-start gap-3">
            <Sparkles size={18} className="text-accent-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm mb-1">{t.studentLife.photo}</h3>
              <p className="text-neutral-500 text-xs sm:text-sm">{t.studentLife.noPhotos}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
