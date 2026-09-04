import { GraduationCap, Languages, ShieldCheck, UsersRound } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { useT } from '../../hooks/useT'

export default function TeamProfile() {
  const t = useT()
  const cards = [
    { icon: UsersRound, title: t.team.teachersTitle, description: t.team.teachersDesc, color: 'bg-primary-50 text-primary-600' },
    { icon: GraduationCap, title: t.team.teacherAuthorisationTitle, description: t.team.teacherAuthorisationDesc, color: 'bg-accent-50 text-accent-700' },
    { icon: ShieldCheck, title: t.team.leadershipTitle, description: t.team.leadershipDesc, color: 'bg-emerald-50 text-emerald-600' },
  ]

  return (
    <section id="team" className="py-section bg-surface-alt">
      <div className="container-page">
        <SectionHeading label={t.team.label} title={t.team.title} subtitle={t.team.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 0.08}>
              <article className="bg-white rounded-2xl border border-neutral-100 p-6 sm:p-7 h-full">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${card.color}`}>
                  <card.icon size={20} />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900 mb-2">{card.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{card.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <div className="max-w-xl mx-auto mt-8 flex items-center justify-center gap-2 text-center text-xs text-neutral-500">
          <Languages size={14} className="text-primary-500 shrink-0" />
          {t.team.recognition}
        </div>
      </div>
    </section>
  )
}
