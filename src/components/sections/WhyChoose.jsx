import { Globe, Heart, Lightbulb, Shield, Target } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { useT } from '../../hooks/useT'

export default function WhyChoose() {
  const t = useT()
  return (
    <section className="py-section bg-white">
      <div className="container-page">
        <SectionHeading label={t.whyChoose.label} title={t.whyChoose.title} subtitle={t.whyChoose.subtitle} />
        <div className="flex flex-col gap-3 md:gap-4 lg:grid lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <div className="bg-surface-alt rounded-2xl p-6 sm:p-8 md:p-10 transition-colors duration-500">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-600 flex items-center justify-center shrink-0"><Globe size={24} className="text-white" /></div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-2 md:mb-3">{t.whyChoose.bilingualTitle}</h3>
                  <p className="text-neutral-600 leading-relaxed text-sm sm:text-base max-w-xl">{t.whyChoose.bilingualDesc}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-primary-600">
                    <span className="px-3 py-1 rounded-full bg-primary-100/60">{t.whyChoose.lang1}</span>
                    <span className="px-3 py-1 rounded-full bg-primary-100/60">{t.whyChoose.lang2}</span>
                    <span className="px-3 py-1 rounded-full bg-primary-100/60">{t.whyChoose.dailyImmersion}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0}><Card i={0} t={t} Icon={Heart} col="bg-rose-50 text-rose-500" tk="personalizedTitle" dk="personalizedDesc" /></ScrollReveal>
          <ScrollReveal delay={0.08}><Card i={1} t={t} Icon={Lightbulb} col="bg-amber-50 text-amber-600" tk="modernTitle" dk="modernDesc" /></ScrollReveal>
          <ScrollReveal delay={0.16}><Card i={2} t={t} Icon={Shield} col="bg-emerald-50 text-emerald-600" tk="safeTitle" dk="safeDesc" /></ScrollReveal>
          <ScrollReveal delay={0.24}><Card i={3} t={t} Icon={Target} col="bg-violet-50 text-violet-600" tk="globalTitle" dk="globalDesc" /></ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function Card({ t, Icon, col, tk, dk }) {
  return (
    <div className="bg-surface-alt rounded-2xl p-6 sm:p-8 md:p-10 lg:p-6 xl:p-8 h-full transition-colors duration-300">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${col} flex items-center justify-center mb-4`}><Icon size={20} /></div>
      <h3 className="font-display text-lg md:text-xl font-bold text-neutral-900 mb-2">{t.whyChoose[tk]}</h3>
      <p className="text-neutral-600 leading-relaxed text-sm">{t.whyChoose[dk]}</p>
    </div>
  )
}
