import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import { school } from '../../data/school'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'

/**
 * Hero — DS V2 §08 type S1 "Hero Ink".
 * Eyebrow (open year) → Display H1 (descriptive) → Lead → 2 CTA ‖ facts block.
 * Plain ink background, one vertical gold hairline on the left margin.
 * The facts block (ink-2, 4:5 on desktop) is the future photo slot (§13).
 * No blobs, gradients, dot grids, trust badges, scroll arrows or loops.
 */
const EASE = [0.2, 0.8, 0.2, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: EASE },
})

export default function Hero() {
  const t = useT()

  // Every value comes from school.js — nothing invented.
  const facts = [
    { label: t.hero.levelsLabel, value: t.hero.levelsValue },
    { label: t.hero.languagesLabel, value: t.hero.languagesValue },
    { label: t.hero.hoursLabel, value: t.hero.hoursValue },
    { label: t.hero.yearLabel, value: school.schoolYear },
  ]

  return (
    <section
      className="relative bg-ink text-text-inverse on-ink flex items-center"
      data-tone="ink"
      style={{ minHeight: 'min(88dvh, 820px)' }}
      aria-labelledby="hero-title"
    >
      <div className="container-page w-full pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+3.5rem)] pb-16 md:pb-20 lg:pb-24">
        {/* Vertical gold hairline on the left margin (only decorative element allowed, §08) */}
        <div className="relative lg:grid lg:grid-cols-12 lg:gap-x-(--grid-gutter) lg:items-center">
          <span
            aria-hidden="true"
            className="hidden lg:block absolute -left-6 xl:-left-8 top-2 bottom-2 w-px bg-gold"
          />

          {/* ── Editorial column ── */}
          <div className="lg:col-span-6 max-w-[40rem]">
            <motion.div {...rise(0)}>
              <Eyebrow tone="ink">{t.hero.eyebrow.replace('{year}', school.schoolYear)}</Eyebrow>
            </motion.div>

            <motion.h1
              id="hero-title"
              {...rise(0.06)}
              className="mt-6 font-display font-bold text-display text-text-inverse text-balance"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p {...rise(0.12)} className="mt-6 text-lead text-text-inverse-2 max-w-[34rem] text-pretty">
              {t.hero.lead}
            </motion.p>

            <motion.div {...rise(0.18)} className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button variant="primaryOnInk" size="lg" to="/registration" className="w-full sm:w-auto whitespace-nowrap">
                {t.hero.enroll}
              </Button>
              <Button
                variant="secondaryOnInk"
                size="lg"
                href={waLinkFor('admissions')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto whitespace-nowrap"
              >
                <MessageCircle size={20} aria-hidden="true" />
                {t.hero.talkToAdmissions}
              </Button>
            </motion.div>
          </div>

          {/* ── Facts block = future photo slot (4:5 desktop) ── */}
          <motion.div
            {...rise(0.24)}
            className="mt-14 lg:mt-0 lg:col-span-5 lg:col-start-8"
          >
            <dl
              aria-label={t.hero.factsLabel}
              className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-2 lg:gap-y-10 lg:rounded-lg lg:bg-ink-2 lg:p-8 xl:p-10"
            >
              {facts.map((f) => (
                <div key={f.label} className="border-t border-gold pt-4 min-w-0">
                  <dt className="text-caption text-text-inverse-3">{f.label}</dt>
                  <dd className="mt-2 font-display font-semibold text-[20px] md:text-[22px] xl:text-[26px] text-text-inverse leading-tight tabular-nums">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
