import { Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { testimonials } from '../../data/testimonials'
import { useT } from '../../hooks/useT'

export default function Testimonials() {
  const t = useT()
  return (
    <section className="py-section bg-surface-alt">
      <div className="container-page">
        <SectionHeading
          label={t.testimonials.label}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.08}>
              <article className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 h-full flex flex-col border border-neutral-100 hover:shadow-md transition-shadow duration-300">
                <Quote size={24} className="text-primary-200 mb-3 sm:mb-4 shrink-0" />
                <blockquote className="text-neutral-600 leading-relaxed flex-1 text-xs sm:text-sm md:text-base mb-5 sm:mb-6">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <footer className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <span className="font-semibold text-primary-600 text-sm">
                      {t.firstName.charAt(0)}{t.lastName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">
                      {t.firstName} {t.lastName}
                    </p>
                    <p className="text-neutral-400 text-xs">
                      {t.role} — {t.childGrade}
                    </p>
                  </div>
                </footer>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-neutral-350 text-[11px] mt-8 max-w-sm mx-auto">
            {t.testimonials.placeholderNote}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
