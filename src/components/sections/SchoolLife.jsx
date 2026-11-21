import { Building2, BookOpen, Computer, Dumbbell, Utensils, ShieldCheck, Gamepad2 } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import Card from '../ui/Card'
import IconTile from '../ui/IconTile'
import Divider from '../ui/Divider'
import ScrollReveal from '../animations/ScrollReveal'
import { activities } from '../../data/activities'
import { facilities } from '../../data/facilities'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Vie scolaire & cadre — DS V2 §08 S2 + S4 (blueprint §17 row 6).
 * Merges the former StudentLife + Facilities sections.
 *
 *  paper · Eyebrow → H2 (the courtyard/class photo band returns with real photos)
 *  · 2 columns: cycle label (h3, styled H4 — no heading level skipped) + bulleted list (no cards)
 *  · Divider · H3 « Installations » + Card/Default grid (IconTile → H4 →
 *    Body Small on ≥ 640 px). No status badge: every listed facility is available.
 *
 * Data: activities.js, facilities.js — nothing invented.
 */
const ICONS = { building: Building2, book: BookOpen, computer: Computer, sport: Dumbbell, food: Utensils, shield: ShieldCheck, play: Gamepad2 }

export default function SchoolLife() {
  const t = useT()
  const { language } = useLanguage()
  const en = language === 'en'
  const groups = [activities.younger, activities.older]

  return (
    <Section id="student-life" tone="paper" aria-labelledby="student-life-title">
      <ScrollReveal>
        <div className="max-w-[44rem]">
          <Eyebrow>{t.studentLife.label}</Eyebrow>
          <h2 id="student-life-title" className="mt-3 lg:mt-4 font-display font-semibold text-h2 text-text-1 text-balance max-w-[26ch]">
            {t.studentLife.title}
          </h2>
        </div>
      </ScrollReveal>

      {/* ── Activities by cycle: 2 columns, H4 + list, no cards ── */}
      <ScrollReveal delay={0.08} className="mt-10 md:mt-12">
        <div className="grid gap-8 md:grid-cols-2 md:gap-x-12">
          {groups.map((group) => {
            const items = en ? group.itemsEn : group.items
            return (
              <div key={group.label} className="border-t border-border pt-5">
                <h3 className="font-body font-semibold text-h4 text-text-1">{en ? group.labelEn : group.label}</h3>
                <ul className="mt-4 columns-1 xs:columns-2 gap-x-8 text-body-sm text-text-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 py-1.5 break-inside-avoid">
                      <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </ScrollReveal>

      <Divider className="mt-12 md:mt-14 lg:mt-16" />

      {/* ── Facilities: compact 2-column grid, icon + name (+ short line from
          640 px). No status badge: every listed facility is available. ── */}
      <div id="facilities" className="mt-10 md:mt-12">
        <ScrollReveal delay={0.08}>
          <h3 className="font-display font-semibold text-h3 text-text-1">{t.facilities.label}</h3>
          <ul className="mt-6 md:mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
            {facilities.map((f) => {
              const Icon = ICONS[f.icon] || Building2
              return (
                <Card as="li" key={f.id} className="flex flex-col p-4 sm:p-5 md:p-6">
                  <IconTile icon={Icon} size="sm" />
                  <h4 className="mt-3 sm:mt-4 text-body-sm sm:text-h4 font-semibold text-text-1 text-balance">{en ? f.nameEn : f.name}</h4>
                  <p className="mt-2 hidden sm:block text-body-sm text-text-2 text-pretty">{en ? f.descriptionEn : f.description}</p>
                </Card>
              )
            })}
          </ul>
        </ScrollReveal>
      </div>
    </Section>
  )
}
