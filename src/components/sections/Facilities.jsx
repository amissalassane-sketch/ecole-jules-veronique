import { Building2, BookOpen, Computer, Dumbbell, Utensils, ShieldCheck, Gamepad2, CheckCircle2, Clock3 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { facilities } from '../../data/facilities'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

const icons = {
  building: Building2,
  book: BookOpen,
  computer: Computer,
  sport: Dumbbell,
  food: Utensils,
  shield: ShieldCheck,
  play: Gamepad2,
}

export default function Facilities() {
  const t = useT()
  const { language } = useLanguage()

  return (
    <section id="facilities" className="py-section bg-white">
      <div className="container-page">
        <SectionHeading label={t.facilities.label} title={t.facilities.title} subtitle={t.facilities.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {facilities.map((facility, i) => {
            const Icon = icons[facility.icon] || Building2
            const isPlanned = facility.status === 'planned'
            return (
              <ScrollReveal key={facility.id} delay={i * 0.05}>
                <article className={`h-full rounded-2xl p-5 sm:p-6 border ${isPlanned ? 'bg-amber-50/50 border-amber-200' : 'bg-surface-alt border-neutral-100'}`}>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isPlanned ? 'bg-amber-100 text-amber-700' : 'bg-primary-50 text-primary-600'}`}>
                      <Icon size={20} />
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${isPlanned ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {isPlanned ? <Clock3 size={11} /> : <CheckCircle2 size={11} />}
                      {isPlanned ? t.facilities.planned : t.facilities.confirmed}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900 mb-2">
                    {language === 'en' ? facility.nameEn : facility.name}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {language === 'en' ? facility.descriptionEn : facility.description}
                  </p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>

        <p className="text-center text-neutral-400 text-xs mt-8">{t.facilities.photoReplace}</p>
      </div>
    </section>
  )
}
