import { Banknote, HelpCircle, MessageCircle, Utensils, BusFront, Clock3 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import ScrollReveal from '../animations/ScrollReveal'
import { pricing } from '../../data/pricing'
import { admission } from '../../data/admission'
import { school } from '../../data/school'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

export default function Pricing() {
  const t = useT()
  const { language } = useLanguage()
  const futurePaymentOptions = language === 'en' ? pricing.futurePaymentOptionsEn : pricing.futurePaymentOptions

  return (
    <section id="pricing" className="py-section bg-surface">
      <div className="container-page">
        <SectionHeading label={t.pricing.label} title={t.pricing.title} subtitle={t.pricing.subtitle} />

        <ScrollReveal>
          <div className="max-w-2xl mx-auto mb-8 md:mb-12 p-4 md:p-5 rounded-2xl bg-amber-50 border border-amber-200">
            <p className="text-amber-900 text-sm font-semibold flex items-center justify-center gap-2 text-center">
              <HelpCircle size={16} className="shrink-0" />
              {t.pricing.notPublished}
            </p>
            <p className="text-amber-800/80 text-xs sm:text-sm text-center mt-2">{pricing.note}</p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <ScrollReveal>
            <InfoCard icon={Banknote} title={t.pricing.paymentTitle}>
              <p>{t.pricing.bankPayment}</p>
              <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-primary-700 bg-primary-50 rounded-full px-2.5 py-1">
                <Banknote size={12} />
                {language === 'en' ? pricing.paymentOptionsEn[0] : pricing.paymentOptions[0]}
              </span>
            </InfoCard>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <InfoCard icon={Utensils} title={language === 'en' ? 'Cafeteria' : 'Cantine'}>
              <p>{t.pricing.cafeteria}</p>
            </InfoCard>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <InfoCard icon={BusFront} title={language === 'en' ? 'Transportation' : 'Transport'}>
              <p>{t.pricing.transport}</p>
            </InfoCard>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="max-w-2xl mx-auto mt-8 md:mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200">
            <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">{t.pricing.requiredFeesTitle}</h3>
            <p className="text-neutral-500 text-xs sm:text-sm mb-4">{t.pricing.requiredFeesNote}</p>
            <div className="flex flex-wrap gap-2">
              {admission.requiredPayments.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-lg bg-surface-alt border border-neutral-200 text-xs text-neutral-700">{item}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="max-w-2xl mx-auto mt-8 md:mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200">
            <div className="flex items-start gap-3">
              <Clock3 size={18} className="text-accent-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm sm:text-base mb-1">
                  {language === 'en' ? 'Possible future payment methods' : 'Moyens de paiement envisagés'}
                </h3>
                <p className="text-neutral-500 text-xs sm:text-sm">
                  {t.pricing.futurePayment} <strong className="text-neutral-700">{futurePaymentOptions.join(' · ')}</strong>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10 md:mt-14 space-y-4">
            <Button variant="primary" size="lg" to="/registration" className="text-sm md:text-base">
              {t.pricing.cta}
            </Button>
            <p className="text-neutral-400 text-xs">
              {t.pricing.questions}{' '}
              <a href={waLinkFor('pricing')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium">
                <MessageCircle size={12} />{t.pricing.chatLink}
              </a>
            </p>
            <p className="text-neutral-400 text-[11px] max-w-md mx-auto inline-flex items-center gap-1.5">
              <Clock3 size={12} />
              {language === 'en' ? `School open ${school.openingHours.label}` : `École ouverte ${school.openingHours.label}`}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="h-full bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6">
      <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
        <Icon size={18} />
      </div>
      <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">{title}</h3>
      <div className="text-neutral-600 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
