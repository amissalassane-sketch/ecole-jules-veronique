import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, BookOpen, Languages, Target, ChevronRight, Layers3 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { programs, getProgramDescription, getProgramObjectives, getProgramSubjects, getProgramName } from '../../data/programs'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

export default function Programs() {
  const t = useT()
  const { language } = useLanguage()
  const [activeProgram, setActiveProgram] = useState(0)
  const program = programs[activeProgram]
  const programName = getProgramName(program, language)

  return (
    <section id="programs" className="py-section bg-surface">
      <div className="container-page">
        <SectionHeading label={t.programs.label} title={t.programs.title} subtitle={t.programs.subtitle} />

        <div className="mb-8 md:mb-12" role="tablist" aria-label={t.programs.label}>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 lg:justify-center lg:overflow-visible lg:pb-0 scrollbar-none">
            {programs.map((item, i) => {
              const name = getProgramName(item, language)
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveProgram(i)}
                  role="tab"
                  aria-selected={activeProgram === i}
                  className={`shrink-0 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeProgram === i
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-200'
                  }`}
                >
                  {name}
                  <span className="ml-1.5 opacity-70 font-normal text-xs">{item.ages}</span>
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={program.id + language}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:col-span-2">
                <div
                  className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden relative"
                  style={{ backgroundColor: program.color + '15' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center" style={{ color: program.color }}>
                      <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                      <span className="block text-[11px] font-semibold tracking-[0.15em] uppercase opacity-60">
                        {t.programs.programPhoto}
                      </span>
                      <span className="block text-xs opacity-50 mt-2">{programName}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs font-semibold shadow-sm">
                    {program.ages}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
                    {t.programs.availability}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                  {programName}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-xl">
                  {getProgramDescription(program, language)}
                </p>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-6 md:mb-8">
                  <Detail icon={Languages} label={t.programs.languages} value={program.languages.join(' • ')} />
                  <Detail icon={Clock} label={t.programs.schedule} value={program.schedule} />
                  <Detail icon={BookOpen} label={t.programs.grades} value={program.grades.join(', ')} />
                  <Detail icon={Target} label={t.programs.objectives} value={getProgramObjectives(program, language)} />
                </div>

                <div className="mb-6 md:mb-8">
                  <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em] mb-2.5">{t.programs.subjects}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {getProgramSubjects(program, language).map((subject) => (
                      <span key={subject} className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-700">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 text-xs text-neutral-500">
                    <Layers3 size={14} className="text-primary-500" />
                    {t.programs.systems}: {t.programs.systemsValue}
                  </span>
                </div>

                <div className="rounded-xl bg-primary-50/70 border border-primary-100 p-4 mb-6">
                  <p className="text-[11px] font-semibold text-primary-700 uppercase tracking-[0.12em] mb-2">{t.programs.diplomasTitle}</p>
                  <p className="text-xs sm:text-sm text-neutral-700">{t.programs.nationalDiplomas}</p>
                  <p className="text-xs sm:text-sm text-neutral-700 mt-1">{t.programs.internationalDiplomas}</p>
                  <p className="text-[11px] text-primary-700 mt-2">{t.programs.diplomaNote}</p>
                </div>

                <Button variant="primary" size="md" to="/registration" className="text-sm">
                  {t.programs.requestInfo}
                  <ChevronRight size={15} />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-neutral-500 text-xs mt-10 max-w-2xl mx-auto">
          {t.programs.secondaryNote}
        </p>
      </div>
    </section>
  )
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={16} className="text-primary-500 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-xs sm:text-sm text-neutral-700 break-words">{value}</p>
      </div>
    </div>
  )
}
