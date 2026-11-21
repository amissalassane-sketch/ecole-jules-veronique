import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, FileText, Languages, Target } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import Button from '../ui/Button'
import Card, { NoticeCard } from '../ui/Card'
import Tabs, { TabPanel } from '../ui/Tabs'
import ScrollReveal from '../animations/ScrollReveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { programs, getProgramDescription, getProgramObjectives, getProgramName, getProgramSchedule, getGradeLabel } from '../../data/programs'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Programmes — DS V2 §08 type S5 "Program Showcase" (blueprint §17 row 4).
 *
 *  linen · Eyebrow → H2 → lead
 *  ≥ lg : Tabs (underline) → one Card/Program (photo slot hidden until the school sends photos)
 *  < lg : no tabs — the 3 Card/Program stacked (nothing hidden behind a swipe)
 *  then ONE Notice info « Parcours et examens » (secondary note said once).
 *
 * Card/Program: 3px primary left rule · Badge « Niveaux ouverts » · H3 Playfair
 * · Body · meta <dl> (icon 16 + caption) · classes as chips radius xs · Text link.
 * No colour per programme, no age pills, no shadow. Data: src/data/programs.js.
 */
const EASE_IN_OUT = [0.4, 0, 0.2, 1]

export default function Programs() {
  const t = useT()
  const { language } = useLanguage()
  const isDesktop = useMediaQuery('(min-width: 64rem)')
  const [activeId, setActiveId] = useState(programs[0].id)
  const active = programs.find((p) => p.id === activeId) || programs[0]

  /* #programs-<id> (from the Paths cards) opens that programme's tab, then
     scrolls to the section — the hash itself matches no element. */
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace('#programs-', '')
      if (!window.location.hash.startsWith('#programs-') || !programs.some((p) => p.id === id)) return
      setActiveId(id)
      document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const tabItems = programs.map((p) => ({ id: p.id, label: getProgramName(p, language) }))

  return (
    <Section id="programs" tone="linen" aria-labelledby="programs-title">
      <ScrollReveal>
        <div className="max-w-[44rem]">
          <Eyebrow>{t.programs.label}</Eyebrow>
          <h2 id="programs-title" className="mt-3 lg:mt-4 font-display font-semibold text-h2 text-text-1 text-balance max-w-[22ch]">
            {t.programs.title}
          </h2>
          <p className="mt-4 lg:mt-5 text-lead text-text-2 max-w-[60ch] text-pretty">{t.programs.subtitle}</p>
          {/* Said once for all programmes (they share languages and hours). */}
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-body-sm">
            <div className="flex items-center gap-2">
              <Languages size={16} strokeWidth={1.75} className="shrink-0 text-primary" aria-hidden="true" />
              <dt className="sr-only">{t.programs.languages}</dt>
              <dd className="text-text-1">{t.programs.languagesValue}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} strokeWidth={1.75} className="shrink-0 text-primary" aria-hidden="true" />
              <dt className="sr-only">{t.programs.schedule}</dt>
              <dd className="text-text-1">{getProgramSchedule(programs[0], language)}</dd>
            </div>
          </dl>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mt-10 md:mt-12 lg:mt-16">
        {isDesktop ? (
          <>
            <Tabs items={tabItems} value={active.id} onChange={setActiveId} label={t.programs.label} />
            <TabPanel id={active.id} className="mt-8 rounded-md">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: EASE_IN_OUT }}
              >
                <ProgramCard program={active} language={language} t={t} withMedia />
              </motion.div>
            </TabPanel>
          </>
        ) : (
          <ul className="flex flex-col gap-4 md:gap-5">
            {programs.map((p) => (
              <ProgramCard key={p.id} as="li" program={p} language={language} t={t} />
            ))}
          </ul>
        )}
      </ScrollReveal>

      {/* One transparency notice for pathways / examinations (§17: once per subject) */}
      <ScrollReveal delay={0.08} className="mt-8 md:mt-10">
        <NoticeCard tone="info" icon={FileText} title={t.programs.diplomasTitle} role="note">
          <ul className="space-y-1">
            <li>{t.programs.nationalDiplomas}</li>
            <li>{t.programs.internationalDiplomas}</li>
            <li>{`${t.programs.systems}${language === 'en' ? ': ' : '\u202f: '}${t.programs.systemsValue}`}</li>
          </ul>
        </NoticeCard>
      </ScrollReveal>
    </Section>
  )
}

function ProgramCard({ program, language, t, withMedia = false, as }) {
  const name = getProgramName(program, language)
  const meta = [
    { icon: Target, label: t.programs.objectives, value: getProgramObjectives(program, language) },
  ]

  return (
    <Card as={as} type="program" className={withMedia ? 'lg:p-8' : undefined}>
      <div>
        <h3 className="font-display font-semibold text-h3 text-text-1 text-balance">{name}</h3>
        <p className="mt-3 text-body text-text-2 max-w-[60ch] text-pretty">{getProgramDescription(program, language)}</p>

        <dl className="mt-5">
          {meta.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 min-w-0">
              <Icon size={16} strokeWidth={1.75} className="mt-[3px] shrink-0 text-primary" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="text-caption text-text-3">{label}</dt>
                <dd className="mt-0.5 text-body-sm text-text-1 text-pretty">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <p className="text-caption text-text-3">{t.programs.grades}</p>
          <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${t.programs.grades}, ${name}`}>
            {program.grades.map((g) => (
              <li key={g} className="rounded-xs bg-primary-light px-2 py-0.5 text-caption font-medium text-primary">
                {getGradeLabel(g, language)}
              </li>
            ))}
          </ul>
        </div>

        <Button variant="text" size="md" to="/registration" className="mt-4 -ml-1">
          {t.programs.requestInfo}
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </div>
    </Card>
  )
}
