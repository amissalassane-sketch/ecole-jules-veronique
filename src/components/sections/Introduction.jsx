import { MapPin, ShieldCheck } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import Divider from '../ui/Divider'
import { NoticeCard } from '../ui/Card'
import ScrollReveal from '../animations/ScrollReveal'
import { school } from '../../data/school'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

/**
 * L'école — DS V2 §08 type S2 "Editorial Split" (blueprint §17 row 2).
 * Merges the former Introduction + Statistics sections.
 *
 *  media 5 col ‖ Eyebrow → H2 → 2 ¶ → 4 facts (<dl> on hairlines) → meta
 *  paper · 5/7 · media on top < lg (3:2 → 4:5)
 *
 * Facts are non-numeric school facts, laid out as a definition list on
 * hairlines — not as "stats" cards, no icon per fact (§09, §12).
 * Every value comes from school.js / translations — nothing invented.
 * One transparency Notice (approvals in progress) per §16 "Institutionnel".
 */
export default function Introduction() {
  const t = useT()
  const { language } = useLanguage()

  const facts = [
    { label: t.intro.facts.founded, value: school.foundingYear },
    { label: t.intro.facts.levels, value: t.intro.facts.levelsValue },
    { label: t.intro.facts.languages, value: school.languages.join(' · ') },
    { label: t.intro.facts.balance, value: t.intro.facts.balanceValue },
  ]
  const accreditation = language === 'en' ? school.accreditationEn : school.accreditation

  return (
    <Section id="school" tone="paper" aria-labelledby="school-title">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-(--grid-gutter) lg:items-start">
        {/* ── Media (future photo, §13 "Split 4:5") ── */}
        <ScrollReveal className="lg:col-span-5">
          <MediaPlaceholder
            ratio={null}
            label={t.intro.schoolPhoto}
            className="aspect-[3/2] lg:aspect-[4/5]"
          />
        </ScrollReveal>

        {/* ── Editorial column ── */}
        <ScrollReveal delay={0.08} className="mt-10 lg:mt-0 lg:col-span-7 lg:pl-6 xl:pl-12">
          <Eyebrow>{t.intro.label}</Eyebrow>
          <h2
            id="school-title"
            className="mt-3 lg:mt-4 font-display font-semibold text-h2 text-text-1 text-balance max-w-[22ch]"
          >
            {t.intro.title}
          </h2>
          <div className="mt-4 lg:mt-5 space-y-4 lg:space-y-5 text-body text-text-2 max-w-[65ch] text-pretty">
            <p>{t.intro.mission}</p>
            <p>{t.intro.patronage}</p>
          </div>

          {/* ── Facts: definition list on hairlines (replaces the Statistics band) ── */}
          <dl
            aria-label={t.intro.factsLabel}
            className="mt-10 lg:mt-12 grid grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-8 max-w-[40rem]"
          >
            {facts.map((f) => (
              <div key={f.label} className="border-t border-border pt-4 min-w-0">
                <dt className="text-caption text-text-3">{f.label}</dt>
                <dd className="mt-2 font-display font-semibold text-h4 text-text-1 leading-tight tabular-nums text-pretty">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-caption text-text-3 max-w-[50ch]">{t.intro.factsNote}</p>

          <Divider className="mt-8" />

          {/* ── Meta: address + one transparency notice (approvals) ── */}
          <address className="mt-6 not-italic flex items-start gap-3 text-body-sm text-text-2 max-w-[65ch]">
            <MapPin size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-text-3" aria-hidden="true" />
            <span>
              <span className="sr-only">{t.intro.addressLabel} </span>
              {school.address}
            </span>
          </address>
          <NoticeCard tone="warning" icon={ShieldCheck} role="note" className="mt-4">
            {accreditation}
          </NoticeCard>
        </ScrollReveal>
      </div>
    </Section>
  )
}
