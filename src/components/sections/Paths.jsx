import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import Card from '../ui/Card'
import ScrollReveal from '../animations/ScrollReveal'
import { programs, getProgramName } from '../../data/programs'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Par où commencer — orientation by the parent's situation, right under the Hero.
 *
 *  paper · Eyebrow → H2 → lead · one Card/Default per programme (3, from programs.js)
 *  · H3 = the situation (« Mon enfant entre en primaire »)
 *  · class chips = links to /registration?classe=<grade> (class pre-selected,
 *    program derived there) · Text link → #programs-<id> opens that programme's tab.
 *  Grid: 1 col < md · 3 col ≥ md. Nothing invented: grades come from programs.js.
 */
export default function Paths() {
  const t = useT()
  const { language } = useLanguage()

  return (
    <Section id="paths" tone="paper" spacing="compact" aria-labelledby="paths-title">
      <ScrollReveal>
        <div className="max-w-[44rem]">
          <Eyebrow>{t.paths.label}</Eyebrow>
          <h2 id="paths-title" className="mt-3 lg:mt-4 font-display font-semibold text-h2 text-text-1 text-balance max-w-[24ch]">
            {t.paths.title}
          </h2>
          <p className="mt-4 text-lead text-text-2 max-w-[60ch] text-pretty">{t.paths.subtitle}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mt-8 md:mt-10">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
          {programs.map((program) => {
            const name = getProgramName(program, language)
            return (
              <Card as="li" key={program.id} className="flex flex-col border-t-[3px] border-t-primary">
                <p className="text-caption font-semibold uppercase tracking-[.08em] text-gold-deep">{name}</p>
                <h3 className="mt-2 font-display font-semibold text-h4 text-text-1 text-balance">{t.paths.situations[program.id]}</h3>

                <p className="mt-5 text-caption text-text-3">{t.paths.classesLabel}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {program.grades.map((grade) => (
                    <li key={grade}>
                      <Link
                        to={`/registration?classe=${encodeURIComponent(grade)}`}
                        aria-label={t.paths.enrollIn.replace('{grade}', grade)}
                        className="inline-flex min-h-[44px] items-center rounded-sm border border-border bg-white px-3.5 text-body-sm font-medium text-text-1 transition-colors duration-[120ms] ease-out hover:border-primary hover:bg-primary-light hover:text-primary"
                      >
                        {grade}
                      </Link>
                    </li>
                  ))}
                </ul>

                <a
                  href={`#programs-${program.id}`}
                  className="mt-auto pt-6 inline-flex min-h-[44px] items-center gap-2 self-start text-body-sm font-semibold text-primary underline underline-offset-4 decoration-1 hover:text-primary-dark hover:decoration-2"
                >
                  {t.paths.seeProgram}
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </a>
              </Card>
            )
          })}
        </ul>
      </ScrollReveal>
    </Section>
  )
}
