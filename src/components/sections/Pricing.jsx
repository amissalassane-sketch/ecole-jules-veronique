import { Check, HelpCircle, MessageCircle } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import ScrollReveal from '../animations/ScrollReveal'
import { pricing } from '../../data/pricing'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'

export default function Pricing() {
  const t = useT()
  return (
    <section id="pricing" className="py-section bg-surface">
      <div className="container-page">
        <SectionHeading label={t.pricing.label} title={t.pricing.title} subtitle={t.pricing.subtitle} />
        <ScrollReveal><div className="max-w-2xl mx-auto mb-8 md:mb-12 p-3 md:p-4 rounded-xl bg-amber-50 border border-amber-200 text-center"><p className="text-amber-800 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5"><HelpCircle size={14} className="shrink-0" />{pricing.note}</p></div></ScrollReveal>
        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          <ScrollReveal><Row title={pricing.registrationFee.label} subtitle={pricing.registrationFee.note} amount={pricing.registrationFee.amount} frequency={pricing.registrationFee.frequency} /></ScrollReveal>
          {pricing.tuition.map((item, i) => (<ScrollReveal key={i} delay={i * 0.08}><Row title={item.program} subtitle={item.note} amount={item.amount} frequency={item.frequency} /></ScrollReveal>))}
        </div>
        <ScrollReveal delay={0.2}><div className="max-w-3xl mx-auto mt-10 md:mt-14"><h3 className="font-display text-lg md:text-xl font-bold text-neutral-900 mb-4 text-center">{t.pricing.optionalTitle}</h3><div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">{pricing.optionalFees.map((fee, i) => (<div key={i} className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 text-center"><h4 className="font-semibold text-neutral-900 text-sm mb-1">{fee.label}</h4><div className="font-display text-lg md:text-xl font-bold text-primary-600 my-1.5">{fee.amount}</div><p className="text-[11px] text-neutral-400">{fee.frequency}</p><p className="text-[11px] text-neutral-500 mt-1.5">{fee.note}</p></div>))}</div></div></ScrollReveal>
        <ScrollReveal delay={0.3}><div className="max-w-lg mx-auto mt-10 md:mt-12 p-5 md:p-6 rounded-2xl bg-white border border-neutral-200"><h4 className="font-semibold text-neutral-900 text-sm md:text-base mb-3">{t.pricing.paymentTitle}</h4><ul className="space-y-2">{pricing.paymentOptions.map((opt, i) => (<li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-600"><Check size={15} className="text-emerald-500 shrink-0" />{opt}</li>))}</ul></div></ScrollReveal>
        <ScrollReveal delay={0.35}><div className="text-center mt-10 md:mt-14 space-y-4"><Button variant="primary" size="lg" to="/registration" className="text-sm md:text-base">{t.pricing.cta}</Button><p className="text-neutral-400 text-xs">{t.pricing.questions} <a href={waLinkFor('pricing')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium"><MessageCircle size={12} />{t.pricing.chatLink}</a></p><p className="text-blue-600 text-[11px] max-w-xs mx-auto mt-2 font-medium">{t.registration.finalPaymentNote}</p><p className="text-neutral-300 text-[11px] max-w-xs mx-auto">{t.pricing.allPlaceholders}</p></div></ScrollReveal>
      </div>
    </section>
  )
}
function Row({ title, subtitle, amount, frequency }) {
  return (<div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 md:p-6 flex flex-row items-center justify-between gap-3 hover:border-primary-200 hover:shadow-sm transition-all duration-300"><div className="min-w-0"><h3 className="font-semibold text-neutral-900 text-sm md:text-base leading-tight">{title}</h3><p className="text-neutral-500 text-xs mt-0.5 hidden sm:block">{subtitle}</p></div><div className="text-right shrink-0"><span className="font-display text-lg sm:text-xl md:text-2xl font-bold text-neutral-900">{amount}</span><p className="text-[11px] text-neutral-400">{frequency}</p></div></div>)
}
