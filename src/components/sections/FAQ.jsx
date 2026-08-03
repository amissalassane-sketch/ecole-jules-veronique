import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import Accordion from '../ui/Accordion'
import Button from '../ui/Button'
import { Mail, Phone } from 'lucide-react'
import { school } from '../../data/school'
import { useT } from '../../hooks/useT'

export default function FAQ() {
  const t = useT()
  const faqItems = Array.isArray(t?.faq?.items)
    ? t.faq.items.map((item, index) => ({ id: `faq-${index}`, question: item.question, answer: item.answer }))
    : []

  return (
    <section id="faq" className="py-section bg-white">
      <div className="container-page">
        <SectionHeading
          label={t.faq.label}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />

        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <Accordion items={faqItems} />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-10 md:mt-14 text-center p-6 sm:p-8 rounded-2xl bg-surface-alt">
              <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900 mb-1.5">
                {t.faq.stillQuestions}
              </h3>
              <p className="text-neutral-500 text-xs sm:text-sm mb-5 max-w-sm mx-auto">
                {t.faq.stillQuestionsDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" size="md" href={`mailto:${school.email}`} className="text-sm">
                  <Mail size={15} />
                  {school.email}
                </Button>
                <Button variant="primary" size="md" href={`tel:${school.phone}`} className="text-sm">
                  <Phone size={15} />
                  {school.phone}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
