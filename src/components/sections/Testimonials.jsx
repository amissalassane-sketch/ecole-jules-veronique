import { Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { useT } from '../../hooks/useT'

export default function Testimonials() {
  const t = useT()

  return (
    <section className="py-section bg-surface-alt">
      <div className="container-page">
        <SectionHeading label={t.testimonials.label} title={t.testimonials.title} subtitle={t.testimonials.subtitle} />
        <ScrollReveal>
          <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-dashed border-neutral-300 p-8 sm:p-10 text-center">
            <Quote size={28} className="text-primary-200 mx-auto mb-4" />
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">{t.testimonials.empty}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
