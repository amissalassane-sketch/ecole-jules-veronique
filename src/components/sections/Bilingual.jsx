import { BookOpen, GraduationCap, Languages, Users } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import Quote from '../ui/Quote'
import Divider from '../ui/Divider'
import ScrollReveal from '../animations/ScrollReveal'
import { bilingualSchedule } from '../../data/schedule'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Le bilinguisme au quotidien — DS V2 §08 type S6 "Statement Ink"
 * (blueprint §17 row 5). Second strong beat of the page.
 *
 *  ink · Eyebrow gold-light → H2 white (8 col) → Quote italic on gold rule
 *  → lead inverse-2 → timetable: 2 groups on ink-2, one accent colour
 *  (English = gold-light, French = white) → 4 benefits 2×2 on hairlines.
 *  < 480 px the table becomes a <dl> per day. Target height ≤ 1200 px desktop.
 *
 * Removed: blobs, macOS window, pulsing quote, glass cards, 2nd header.
 * Data: schedule.js + t.bilingual.* — nothing invented.
 */
const BENEFIT_ICONS = [Languages, BookOpen, Users, GraduationCap]

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

  const benefits = [
    { title: b.cognitiveTitle, desc: b.cognitiveDesc },
    { title: b.culturalTitle, desc: b.culturalDesc },
    { title: b.communicationTitle, desc: b.communicationDesc },
    { title: b.futureTitle, desc: b.futureDesc },
  ]

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

      {/* ── Timetable ── */}
      <ScrollReveal delay={0.08} className="mt-10 md:mt-12 lg:mt-16">
        <h3 className="font-display font-semibold text-h3 text-text-inverse">{b.balanceTitle}</h3>
        <div className="mt-6 grid gap-4 md:gap-5 lg:grid-cols-2 lg:gap-6">
          {bilingualSchedule.map((group) => (
            <ScheduleGroup key={group.id} group={group} t={b} language={language} />
          ))}
        </div>
        <p className="mt-4 text-caption text-text-inverse-3 max-w-[70ch]">{b.scheduleNote}</p>
      </ScrollReveal>

      {/* ── 4 benefits on hairlines (no cards) ── */}
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

/** One group: <table> ≥ 480 px, <dl> per day below (§08 S6). */
function ScheduleGroup({ group, t, language }) {
  const name = language === 'en' ? group.groupEn : group.group
  const cell = (v) => (
    <span className={v === 'Anglais' ? 'text-gold-light' : 'text-text-inverse'}>{langLabel(v, language)}</span>
  )
  return (
    <div className="rounded-md border border-border-inverse bg-ink-2 p-5 md:p-6">
      <h4 className="text-text-inverse">{name}</h4>

      {/* ≥ xs : table */}
      <table className="hidden xs:table mt-4 w-full text-body-sm">
        <thead>
          <tr className="text-left text-eyebrow font-semibold uppercase text-text-inverse-3">
            <th scope="col" className="py-2 pr-4 font-semibold">{t.day}</th>
            <th scope="col" className="py-2 pr-4 font-semibold">{t.morning}</th>
            <th scope="col" className="py-2 font-semibold">{t.afternoon}</th>
          </tr>
        </thead>
        <tbody>
          {group.rows.map((row) => (
            <tr key={row.day} className="border-t border-border-inverse">
              <th scope="row" className="py-3 pr-4 text-left font-medium text-text-inverse-2">{language === 'en' ? row.dayEn : row.day}</th>
              <td className="py-3 pr-4">{cell(row.morning)}</td>
              <td className="py-3">{cell(row.afternoon)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* < xs : one <dl> per day */}
      <dl className="xs:hidden mt-4 text-body-sm">
        {group.rows.map((row) => (
          <div key={row.day} className="border-t border-border-inverse py-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1">
            <dt className="col-span-2 font-medium text-text-inverse-2">{language === 'en' ? row.dayEn : row.day}</dt>
            <dd className="text-caption text-text-inverse-3">{t.morning}</dd>
            <dd className="text-right">{cell(row.morning)}</dd>
            <dd className="text-caption text-text-inverse-3">{t.afternoon}</dd>
            <dd className="text-right">{cell(row.afternoon)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
