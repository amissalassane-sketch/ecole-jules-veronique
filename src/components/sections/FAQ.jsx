import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import ScrollReveal from '../animations/ScrollReveal'
import Accordion from '../ui/Accordion'
import { faqItems } from '../../data/faq'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Questions fréquentes — DS V2 §08 type S8 "Accordion" (blueprint §24 row 8).
 * Absorbs the former DigitalVision section as ONE FAQ entry (faq.js, last item).
 *
 *  paper · narrow container · Eyebrow → H2 → Accordion (questions 17/600 on hairlines).
 *  The nested "still have questions" contact block moved to the Contact section (S9).
 *  Data: faq.js — nothing invented.
 */
export default function FAQ() {
  const t = useT()
  const { language } = useLanguage()
  const items = faqItems[language].map((item, index) => ({ ...item, id: `faq-${index}` }))

  return (
    <Section id="faq" tone="paper" container="narrow" aria-labelledby="faq-title">
      <ScrollReveal>
        <Eyebrow>{t.faq.label}</Eyebrow>
        <h2 id="faq-title" className="mt-3 lg:mt-4 font-display font-semibold text-h2 text-text-1 text-balance">
          {t.faq.title}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.08} className="mt-8 md:mt-10 lg:mt-12">
        <Accordion items={items} />
      </ScrollReveal>
    </Section>
  )
}
