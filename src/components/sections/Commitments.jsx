import { GraduationCap, ShieldCheck } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import Card from '../ui/Card'
import IconTile from '../ui/IconTile'
import ScrollReveal from '../animations/ScrollReveal'
import { useT } from '../../hooks/useT'

/**
 * Nos engagements — DS V2 §08 type S3 "Editorial List" (blueprint §17 row 3).
 * Merges the former WhyChoose + TeamProfile sections.
 *
 *  paper + top hairline (same background as L'école → rule, no double padding)
 *  header 8 col (Eyebrow → H2) → numbered list 01–05 in 2 col on hairlines
 *  (Playfair gold-deep numeral · H4 · Body Small) → H3 + 2 Card/Default.
 *
 * No colour tiles, no chips, no icon per item; icons only on the two
 * authorisation cards (GraduationCap / ShieldCheck, §12 vocabulary).
 * Every string comes from translations — nothing invented.
 */
export default function Commitments() {
  const t = useT()
  const c = t.commitments

  return (
    <Section id="commitments" tone="paper" spacing="none" aria-labelledby="commitments-title">
      <div className="border-t border-border py-section">
        {/* ── Header, 8 col ── */}
        <ScrollReveal>
          <div className="max-w-[44rem]">
            <Eyebrow>{c.label}</Eyebrow>
            <h2
              id="commitments-title"
              className="mt-3 lg:mt-4 font-display font-semibold text-h2 text-text-1 text-balance max-w-[22ch]"
            >
              {c.title}
            </h2>
          </div>
        </ScrollReveal>

        {/* ── Numbered editorial list ── */}
        <ScrollReveal delay={0.08}>
          <ol className="mt-10 md:mt-12 lg:mt-16 grid gap-x-(--grid-gutter) lg:grid-cols-2 lg:gap-x-12">
            {c.items.map((item, i) => (
              <li
                key={item.title}
                className="grid grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[3.5rem_minmax(0,1fr)] gap-x-3 md:gap-x-4 border-t border-border py-6 md:py-7"
              >
                <span
                  aria-hidden="true"
                  className="font-display font-semibold text-[1.5rem] md:text-[1.75rem] leading-none text-gold-deep tabular-nums"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-body font-semibold text-h4 text-text-1 text-balance">{item.title}</h3>
                  <p className="mt-2 text-body-sm text-text-2 max-w-[60ch] text-pretty">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        {/* ── Authorised staff: H3 + 2 Card/Default (repeated, comparable units — §09) ── */}
        <ScrollReveal delay={0.08} className="mt-12 md:mt-14 lg:mt-16">
          <h3 className="font-display font-semibold text-h3 text-text-1 max-w-[30ch]">{c.staffTitle}</h3>
          <ul className="mt-6 md:mt-8 grid gap-4 md:gap-5 lg:gap-6 sm:grid-cols-2">
            {c.staff.map((s, i) => {
              const Icon = i === 0 ? GraduationCap : ShieldCheck
              return (
                <Card as="li" key={s.title}>
                  <IconTile icon={Icon} size="sm" />
                  <h4 className="mt-5 text-text-1 text-balance">{s.title}</h4>
                  <p className="mt-2 text-body-sm text-text-2 text-pretty">{s.desc}</p>
                </Card>
              )
            })}
          </ul>
        </ScrollReveal>
      </div>
    </Section>
  )
}
