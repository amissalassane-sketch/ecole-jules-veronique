import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import Accordion from '../ui/Accordion'
import Button from '../ui/Button'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { school } from '../../data/school'
import { faqItems } from '../../data/faq'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

export default function FAQ() {
  const t = useT()
  const { language } = useLanguage()
  const items = faqItems[language].map((item, index) => ({ ...item, id: `faq-${index}` }))

  return (
    <section id="faq" className="py-section bg-white">
      <div className="container-page">
        <SectionHeading label={t.faq.label} title={t.faq.title} subtitle={t.faq.subtitle} />

        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <Accordion items={items} />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div id="contact" className="mt-10 md:mt-14 text-center p-6 sm:p-8 rounded-2xl bg-surface-alt">
              <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900 mb-1.5">{t.faq.stillQuestions}</h3>
              <p className="text-neutral-500 text-xs sm:text-sm mb-5 max-w-sm mx-auto">{t.faq.stillQuestionsDesc}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                <Button variant="outline" size="md" href={`mailto:${school.email}`} className="text-sm">
                  <Mail size={15} />
                  {school.email}
                </Button>
                <Button variant="primary" size="md" href={`tel:${school.phone}`} className="text-sm">
                  <Phone size={15} />
                  {school.phone}
                </Button>
                <Button variant="outline" size="md" href={waLinkFor('general')} target="_blank" rel="noopener noreferrer" className="text-sm">
                  <MessageCircle size={15} />
                  {t.nav.whatsapp}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
