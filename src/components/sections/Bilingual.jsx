import { useState } from 'react'
import { BookOpen, Languages } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import Quote from '../ui/Quote'
import Divider from '../ui/Divider'
import ScrollReveal from '../animations/ScrollReveal'
import { bilingualSchedule } from '../../data/schedule'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/cn'

/**
 * Le bilinguisme au quotidien — DS V2 §08 type S6 "Statement Ink".
 *
 *  ink · Eyebrow → H2 → Quote (the single place that says 50/50) → lead
 *  → « Exemple de semaine »: ONE compact table (Jour / Matin / Après-midi)
 *    with a group selector, instead of two 8-row cards (≈ 3 phone screens)
 *  → 2 benefits that no other section says (two teachers and the two
 *    systems already live in « Nos engagements »).
 * English = gold-light, French = white. Data: schedule.js — nothing invented.
 */
const BENEFIT_ICONS = [Languages, BookOpen]

function langLabel(value, language) {
  if (language !== 'en') return value
  if (value === 'Français') return 'French'
  if (value === 'Anglais') return 'English'
  return value
}

export default function Bilingual() {
  const t = useT()
  const { language } = useLanguage()
  const b = t.bilingual
  const [groupId, setGroupId] = useState(bilingualSchedule[0].id)
  const group = bilingualSchedule.find((g) => g.id === groupId) || bilingualSchedule[0]

  const benefits = [
    { title: b.cognitiveTitle, desc: b.cognitiveDesc },
    { title: b.culturalTitle, desc: b.culturalDesc },
  ]
  const cell = (v) => (
    <span className={v === 'Anglais' ? 'text-gold-light' : 'text-text-inverse'}>{langLabel(v, language)}</span>
  )

  return (
    <Section id="bilingual" tone="ink" aria-labelledby="bilingual-title">
      {/* ── Header + statement ── */}
      <ScrollReveal>
        <div className="max-w-[44rem]">
          <Eyebrow tone="ink">{b.label}</Eyebrow>
          <h2 id="bilingual-title" className="mt-3 lg:mt-4 font-display font-semibold text-h2 text-text-inverse text-balance max-w-[22ch]">
            {b.title}
          </h2>
        </div>
        <Quote tone="ink" className="mt-8 md:mt-10">
          {b.quote}
        </Quote>
        <p className="mt-6 md:mt-8 text-lead text-text-inverse-2 max-w-[60ch] text-pretty">{b.howItWorksDesc}</p>
      </ScrollReveal>

      {/* ── Sample week: one table, one group at a time ── */}
      <ScrollReveal delay={0.08} className="mt-10 md:mt-12 lg:mt-14">
        <div className="max-w-[40rem] rounded-md border border-border-inverse bg-ink-2 p-4 sm:p-6">
          <h3 className="font-display font-semibold text-h4 text-text-inverse">{b.balanceTitle}</h3>

          <div role="group" aria-label={b.balanceTitle} className="mt-4 grid grid-cols-2 gap-1 rounded-sm border border-border-inverse p-1">
            {bilingualSchedule.map((g) => {
              const active = g.id === group.id
              return (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setGroupId(g.id)}
                  className={cn(
                    'min-h-11 rounded-xs px-2 text-caption sm:text-body-sm font-medium leading-tight transition-colors duration-(--duration-fast)',
                    active ? 'bg-white text-ink' : 'text-text-inverse-2 hover:text-text-inverse'
                  )}
                >
                  {language === 'en' ? g.groupEn : g.group}
                </button>
              )
            })}
          </div>

          <table className="mt-4 w-full text-body-sm">
            <caption className="sr-only">{`${b.balanceTitle} : ${language === 'en' ? group.groupEn : group.group}`}</caption>
            <thead>
              <tr className="text-left text-eyebrow font-semibold uppercase text-text-inverse-3">
                <th scope="col" className="py-2 pr-3 font-semibold">{b.day}</th>
                <th scope="col" className="py-2 pr-3 font-semibold">{b.morning}</th>
                <th scope="col" className="py-2 font-semibold">{b.afternoon}</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr key={row.day} className="border-t border-border-inverse">
                  <th scope="row" className="py-2.5 pr-3 text-left font-medium text-text-inverse-2">{language === 'en' ? row.dayEn : row.day}</th>
                  <td className="py-2.5 pr-3">{cell(row.morning)}</td>
                  <td className="py-2.5">{cell(row.afternoon)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-caption text-text-inverse-3 max-w-[70ch]">{b.scheduleNote}</p>
      </ScrollReveal>

      {/* ── 2 benefits on hairlines (no cards) ── */}
      <ScrollReveal delay={0.08} className="mt-12 md:mt-14 lg:mt-16">
        <Divider tone="ink" />
        <ul className="grid sm:grid-cols-2 gap-x-8 lg:gap-x-12">
          {benefits.map((item, i) => {
            const Icon = BENEFIT_ICONS[i]
            return (
              <li key={item.title} className="flex items-start gap-4 py-6 md:py-7 border-b border-border-inverse">
                <Icon size={24} strokeWidth={1.75} className="mt-px shrink-0 text-gold-light" aria-hidden="true" />
                <div className="min-w-0">
                  <h4 className="text-text-inverse text-balance">{item.title}</h4>
                  <p className="mt-2 text-body-sm text-text-inverse-2 max-w-[50ch] text-pretty">{item.desc}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </ScrollReveal>
    </Section>
  )
}
