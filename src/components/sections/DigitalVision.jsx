import { FileText, GraduationCap, MessageCircle, ShieldCheck, Clock } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import Badge from '../ui/Badge'
import { useT } from '../../hooks/useT'

export default function DigitalVision() {
  const t = useT()

  const cards = [
    { icon: FileText, titleKey: 'card1Title', descKey: 'card1Desc' },
    { icon: GraduationCap, titleKey: 'card2Title', descKey: 'card2Desc' },
    { icon: MessageCircle, titleKey: 'card3Title', descKey: 'card3Desc' },
    { icon: ShieldCheck, titleKey: 'card4Title', descKey: 'card4Desc' },
  ]

  return (
    <section className="py-section bg-surface-alt">
      <div className="container-page">
        <SectionHeading
          label={t.digitalVision.label}
          title={t.digitalVision.title}
          subtitle={t.digitalVision.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {cards.map((card, i) => (
            <ScrollReveal key={card.titleKey} delay={i * 0.08}>
              <div className="relative h-full bg-white rounded-2xl p-6 sm:p-7 border border-neutral-100">
                <Badge variant="accent" className="absolute top-5 right-5 sm:top-6 sm:right-6">
                  <Clock size={12} />
                  {t.digitalVision.badge}
                </Badge>
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                  <card.icon size={20} />
                </div>
                <h3 className="font-display text-base md:text-lg font-bold text-neutral-900 mb-2 pr-16">
                  {t.digitalVision[card.titleKey]}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  {t.digitalVision[card.descKey]}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="mt-8 md:mt-10 text-center text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto">
            {t.digitalVision.note}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
