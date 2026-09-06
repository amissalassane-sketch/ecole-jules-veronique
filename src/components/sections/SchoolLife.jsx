import { Building2, BookOpen, Computer, Dumbbell, Utensils, ShieldCheck, Gamepad2 } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import IconTile from '../ui/IconTile'
import Divider from '../ui/Divider'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import ScrollReveal from '../animations/ScrollReveal'
import { activities } from '../../data/activities'
import { facilities } from '../../data/facilities'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Vie scolaire & cadre — DS V2 §08 S2 + S4 (blueprint §17 row 6).
 * Merges the former StudentLife + Facilities sections.
 *
 *  paper · Eyebrow → H2 · MediaPlaceholder band 4:3 → 16:9 → 21:9 ≥ lg (future courtyard/class photo)
 *  · 2 columns: cycle label (h3, styled H4 — no heading level skipped) + bulleted list (no cards)
 *  · Divider · H3 « Installations » + Card/Default grid (IconTile → H4 →
 *    Body Small, Badge available / planned). Status = badge, never a card colour.
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

      {/* ── Band: future photo of the courtyard / a classroom (§13, 16:9) ── */}
      <ScrollReveal delay={0.08} className="mt-10 md:mt-12 lg:mt-16">
        <MediaPlaceholder ratio={null} label={t.studentLife.photo} className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" />
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

      {/* ── Facilities: H3 + Card/Default grid ── */}
      {/* Grid: 1 col <640 · 2 col 640–1279 · 4 col ≥1280. Deviation from DS S4
          "2 ≥480" documented: at 480–639 two 172 px-wide cards forced 4-line H4s
          ("Salles de classes spacieuses et aérées"); at 1024 four columns did the
          same — mobile designed, not compressed. */}
      {/* id on the static wrapper (not inside the animated motion.div) so the
          anchor offset is not shifted by the 12 px reveal rise. */}
      <div id="facilities" className="mt-10 md:mt-12">
        <ScrollReveal delay={0.08}>
          <h3 className="font-display font-semibold text-h3 text-text-1">{t.facilities.label}</h3>
          <ul className="mt-6 md:mt-8 grid gap-4 md:gap-5 lg:gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {facilities.map((f) => {
              const Icon = ICONS[f.icon] || Building2
              const planned = f.status === 'planned'
              return (
                <Card as="li" key={f.id} className="flex flex-col p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <IconTile icon={Icon} size="sm" />
                    <Badge variant={planned ? 'planned' : 'available'}>{planned ? t.facilities.planned : t.facilities.confirmed}</Badge>
                  </div>
                  <h4 className="mt-5 text-text-1 text-balance">{en ? f.nameEn : f.name}</h4>
                  <p className="mt-2 text-body-sm text-text-2 text-pretty">{en ? f.descriptionEn : f.description}</p>
                </Card>
              )
            })}
          </ul>
        </ScrollReveal>
      </div>
    </Section>
  )
}
