import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Info, MessageCircle, Phone, RotateCcw } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Logo from '../components/ui/Logo'
import FormField from '../components/registration/FormField'
import { programs, getProgramName, getGradeLabel } from '../data/programs'
import { school } from '../data/school'
import { waLinkFor, phoneLink } from '../utils/contact'
import { cn } from '../utils/cn'
import { useT } from '../hooks/useT'
import { useLanguage } from '../context/LanguageContext'

/**
 * Préinscription — 3 screens (review UX/produit, Nov 2026):
 *   1 Vos coordonnées → 2 Votre enfant → 3 Vérifier et envoyer sur WhatsApp.
 *
 * Layout (« Ninth » reference): one white shell, a green panel that carries the
 * journey (logo, title, the 3 steps) beside the form ≥ lg, a compact band
 * above it on mobile. Nothing is sent by this site: the last screen hands a
 * ready-written message to WhatsApp, and no « Terminé » tick is ever shown
 * before that hand-off — the sent state only says what the browser can know
 * (WhatsApp was opened) and that the parent still has to tap Send.
 *
 * Kept from the previous flow: class → programme derivation (programs[].grades
 * are disjoint), ?classe= preset from the home page, « Besoin d'aide ? » on
 * every screen, « Modifier » links on the review, focus on the first error.
 */

/* « 10 mai 2020 » / « 10 May 2020 » — never the raw ISO value on screen. */
function formatDate(iso, language) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString(language === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function programForGrade(grade) {
  return programs.find((program) => program.grades.includes(grade)) || null
}

/* Benin numbers: 10 digits starting with 01 since 2024 (8 digits before), with
   or without +229. A number with another country code (parent abroad) only
   needs a plausible length. */
function beninDigits(value) {
  const digits = value.replace(/\D/g, '')
  return digits.startsWith('229') && digits.length > 10 ? digits.slice(3) : digits
}

/* '' when valid, otherwise which problem: 'prefix' (10 digits not starting
   with 01) or 'incomplete'. */
function phoneProblem(value) {
  const raw = value.trim()
  if (raw.startsWith('+') && !raw.replace(/\D/g, '').startsWith('229')) {
    const n = raw.replace(/\D/g, '').length
    return n >= 8 && n <= 15 ? '' : 'incomplete'
  }
  const digits = beninDigits(raw)
  if (digits.length === 10) return digits.startsWith('01') ? '' : 'prefix'
  return digits.length === 8 ? '' : 'incomplete'
}

/* « +229 01 97 00 00 00 » for display: Benin numbers grouped by two. */
function formatPhone(value) {
  const raw = value.trim()
  if (raw.startsWith('+') && !raw.replace(/\D/g, '').startsWith('229')) return raw
  const digits = beninDigits(raw)
  if (digits.length !== 10 && digits.length !== 8) return raw
  const grouped = digits.match(/.{1,2}/g).join(' ')
  return raw.startsWith('+') || raw.replace(/\D/g, '').startsWith('229') ? `+229 ${grouped}` : grouped
}

/* Usual age at the start of the school year (Benin). Only used for a gentle,
   non-blocking hint when the gap is 2 years or more — repeats and early
   starts are real, so it never stops the request. */
const USUAL_AGE = { 'Niveau 1': 4, 'Niveau 2': 5, CI: 6, CP: 7, CE1: 8, CE2: 9, CM1: 10, CM2: 11 }

function ageAtSchoolStart(iso, schoolYear) {
  const birth = new Date(`${iso}T00:00:00`)
  const startYear = parseInt(schoolYear, 10)
  if (Number.isNaN(birth.getTime()) || Number.isNaN(startYear)) return null
  const start = new Date(startYear, 8, 1)
  let age = start.getFullYear() - birth.getFullYear()
  if (start < new Date(start.getFullYear(), birth.getMonth(), birth.getDate())) age -= 1
  return age
}

/* A child of the school is born in the past and is at most 15. */
function isPlausibleDob(iso) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return false
  const now = new Date()
  const oldest = new Date(now.getFullYear() - 15, now.getMonth(), now.getDate())
  return d <= now && d >= oldest
}

const TOTAL_STEPS = 3
const SEND_STEP = 2

export default function RegistrationPage() {
  const t = useT().registration
  const { language } = useLanguage()
  const [step, setStep] = useState(0)
  const [editing, setEditing] = useState(false)
  const [sent, setSent] = useState(false)
  /* ?classe=<grade> (from the home « Par où commencer » cards) pre-selects the
     class; ignored unless it exists in programs.js. */
  const [searchParams] = useSearchParams()
  const presetGrade = programForGrade(searchParams.get('classe')) ? searchParams.get('classe') : ''
  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: '',
    childFirstName: '',
    childLastName: '',
    childDob: '',
    childGrade: presetGrade,
    childPreviousSchool: '',
  })
  const [errors, setErrors] = useState({})

  /* Every screen change lands on the top of the form, under the fixed header. */
  const formTopRef = useRef(null)
  const firstRenderRef = useRef(true)
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    const anchor = formTopRef.current
    if (!anchor) return
    const headerH = document.querySelector('header')?.getBoundingClientRect().height || 0
    const top = anchor.getBoundingClientRect().top + window.scrollY - (headerH + 12)
    if (top < window.scrollY) window.scrollTo({ top: Math.max(top, 0), behavior: 'instant' })
  }, [step, sent])

  const program = programForGrade(formData.childGrade)
  const gradeOptions = useMemo(
    () => programs.flatMap((p) => p.grades.map((grade) => ({ value: grade, label: `${getGradeLabel(grade, language)}, ${getProgramName(p, language)}` }))),
    [language]
  )

  const updateField = useCallback((event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => (previous[name] ? { ...previous, [name]: '' } : previous))
  }, [])

  const validate = useCallback((target) => {
    const e = {}
    if (target === 0) {
      if (!formData.parentFirstName.trim()) e.parentFirstName = t.required
      if (!formData.parentLastName.trim()) e.parentLastName = t.required
      if (!formData.parentPhone.trim()) e.parentPhone = t.required
      else if (phoneProblem(formData.parentPhone)) e.parentPhone = phoneProblem(formData.parentPhone) === 'prefix' ? t.invalidPhonePrefix : t.invalidPhone
      if (formData.parentEmail.trim() && !/\S+@\S+\.\S+/.test(formData.parentEmail)) e.parentEmail = t.invalidEmail
    }
    if (target === 1) {
      if (!formData.childFirstName.trim()) e.childFirstName = t.required
      if (!formData.childLastName.trim()) e.childLastName = t.required
      if (!formData.childDob) e.childDob = t.required
      else if (!isPlausibleDob(formData.childDob)) e.childDob = t.invalidDob
      if (!programForGrade(formData.childGrade)) e.childGrade = t.selectGrade
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }, [formData, t])

  const focusFirstInvalid = useCallback(() => {
    requestAnimationFrame(() => {
      const first = document.querySelector('main [aria-invalid="true"]')
      if (!first) return
      first.focus({ preventScroll: true })
      first.scrollIntoView({ block: 'center', behavior: 'instant' })
    })
  }, [])

  const goNext = useCallback(() => {
    if (!validate(step)) {
      focusFirstInvalid()
      return
    }
    setStep(editing ? SEND_STEP : step + 1)
    setEditing(false)
  }, [validate, step, editing, focusFirstInvalid])

  const goBack = useCallback(() => {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
  }, [])

  const editStep = useCallback((target) => {
    setSent(false)
    setEditing(true)
    setStep(target)
  }, [])

  /* The message is written for the school: a clear request first, then the
     details. Lines whose value is empty (optional fields) are dropped. */
  const waMessage = useMemo(() => {
    const values = {
      YEAR: school.schoolYear,
      CHILD_NAME: `${formData.childFirstName} ${formData.childLastName}`.trim(),
      GRADE: getGradeLabel(formData.childGrade, language),
      PROGRAM: program ? getProgramName(program, language) : '',
      CHILD_DOB: formatDate(formData.childDob, language),
      CHILD_PREV_SCHOOL: formData.childPreviousSchool.trim(),
      PARENT_NAME: `${formData.parentFirstName} ${formData.parentLastName}`.trim(),
      PARENT_PHONE: formatPhone(formData.parentPhone),
      PARENT_EMAIL: formData.parentEmail.trim(),
      PARENT_ADDRESS: formData.parentAddress.trim(),
    }
    return t.waMsgPreReg
      .replace(/\[([A-Z_]+)\]/g, (match, key) => values[key] ?? match)
      .split('\n')
      .filter((line) => !/:\s*$/.test(line))
      .join('\n')
  }, [formData, program, language, t.waMsgPreReg])
  const waLink = `https://wa.me/${school.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}`

  const stepLabels = t.stepLabels

  return (
    <>
      <Navbar />
      <main className="min-h-screen-dynamic bg-linen pt-[calc(var(--header-h)+1rem)] md:pt-[calc(var(--header-h)+2.5rem)] pb-16 md:pb-24">
        <div className="container-page">
          <div className="rounded-[20px] md:rounded-[28px] bg-white p-2 md:p-3 shadow-medium lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-3">
            <JourneyPanel t={t} step={step} labels={stepLabels} />

            <section ref={formTopRef} aria-labelledby="step-title" className="px-3 pt-6 pb-4 sm:px-5 md:px-8 md:pt-8 lg:px-10 lg:py-10">
              <div className="flex min-h-11 items-center justify-between gap-4">
                <p className="text-eyebrow font-semibold uppercase text-text-3">
                  {t.stepOf.replace('{current}', step + 1).replace('{total}', TOTAL_STEPS)}
                </p>
                <Button variant="text" size="md" href={waLinkFor('help')} target="_blank" rel="noopener noreferrer" className="-mr-1 h-11">
                  <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                  {t.needHelp}
                </Button>
              </div>
              <div className="mt-2 h-1 rounded-pill bg-linen" aria-hidden="true">
                <div
                  className="h-full rounded-pill bg-primary transition-[width] duration-(--duration-panel) ease-out"
                  style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${step}-${sent}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                  className="mt-6 md:mt-8"
                >
                  {step === 0 && <ParentStep t={t} formData={formData} onChange={updateField} errors={errors} editing={editing} />}
                  {step === 1 && <ChildStep t={t} formData={formData} onChange={updateField} errors={errors} options={gradeOptions} program={program} language={language} editing={editing} />}
                  {step === SEND_STEP && !sent && (
                    <SendStep t={t} formData={formData} program={program} language={language} onEdit={editStep} waLink={waLink} onSend={() => setSent(true)} />
                  )}
                  {step === SEND_STEP && sent && (
                    <SentStep t={t} waLink={waLink} onEdit={() => setSent(false)} />
                  )}
                </motion.div>
              </AnimatePresence>

              {step < SEND_STEP && (
                <div className="mt-8 flex flex-col-reverse gap-3 xs:flex-row xs:items-center xs:justify-between">
                  {step > 0 && !editing ? (
                    <Button variant="text" size="md" onClick={goBack} className="self-start xs:self-auto -ml-1">
                      <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
                      {t.back}
                    </Button>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                  <Button variant="primary" size="lg" onClick={goNext} className="w-full xs:w-auto">
                    {editing ? t.backToReview : t.continue}
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </Button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/* The green panel: logo, title and the 3-step journey. Vertical list beside the
   form ≥ lg, a compact row of 3 steps above it on smaller screens. */
function JourneyPanel({ t, step, labels }) {
  return (
    <aside
      className="relative overflow-hidden rounded-[14px] md:rounded-[20px] bg-ink text-text-inverse on-ink p-5 sm:p-6 lg:p-10 lg:h-[38rem] lg:self-start lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] flex flex-col"
      style={{
        backgroundImage:
          'radial-gradient(60% 45% at 85% 10%, rgb(227 176 53 / 0.28), transparent 70%), radial-gradient(80% 60% at 0% 100%, rgb(20 83 45 / 0.9), transparent 70%)',
      }}
    >
      <div className="flex items-center gap-3">
        <Logo size={48} />
        <span className="inline-flex items-center rounded-pill border border-white/25 bg-white/10 px-3 py-1 text-caption font-medium">
          {t.eyebrow.replace('{year}', school.schoolYear)}
        </span>
      </div>

      <h1 className="mt-5 lg:mt-auto font-display font-semibold text-h3 lg:text-h1 text-text-inverse text-balance">{t.title}</h1>
      <p className="mt-3 hidden sm:block text-body-sm lg:text-body text-text-inverse-2 text-pretty max-w-[44ch]">{t.subtitle}</p>

      <ol className="mt-5 sm:mt-6 lg:mt-10 grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3">
        {labels.map((label, index) => {
          // The send step is never ticked: the site cannot know the parent tapped Send in WhatsApp.
          const done = index < step
          const active = index === step
          return (
            <li
              key={label}
              aria-current={active ? 'step' : undefined}
              className={cn(
                'flex flex-col gap-1.5 rounded-[12px] border p-2.5 sm:p-3 lg:flex-row lg:items-center lg:gap-3 lg:p-4 transition-colors duration-(--duration-base)',
                active ? 'border-white bg-white text-text-1' : 'border-white/15 bg-white/[0.06] text-text-inverse-2'
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-caption font-semibold',
                  active && 'bg-primary text-text-inverse',
                  done && 'bg-gold-light text-ink',
                  !active && !done && 'border border-white/40'
                )}
              >
                {done ? <Check size={14} strokeWidth={3} /> : index + 1}
              </span>
              <span className={cn('text-caption sm:text-body-sm leading-tight', active && 'font-semibold')}>
                <span className="lg:hidden">{t.stepLabelsShort[index]}</span>
                <span className="hidden lg:inline">{label}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}

function StepHeading({ title, subtitle, editing, editLabel }) {
  return (
    <div>
      {editing && (
        <div className="mb-3">
          <Badge variant="info">{editLabel}</Badge>
        </div>
      )}
      <h2 id="step-title" className="font-display font-semibold text-h2 text-text-1 text-balance">{title}</h2>
      {subtitle && <p className="mt-2 text-body-sm md:text-body text-text-2 text-pretty">{subtitle}</p>}
    </div>
  )
}

function ParentStep({ t, formData, onChange, errors, editing }) {
  return (
    <div className="space-y-6">
      <StepHeading title={t.parentTitle} subtitle={t.parentSubtitle} editing={editing} editLabel={t.reviewEdit} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={t.parentFirstName} name="parentFirstName" value={formData.parentFirstName} onChange={onChange} placeholder={t.parentFirstNamePlaceholder} required error={errors.parentFirstName} />
        <FormField label={t.parentLastName} name="parentLastName" value={formData.parentLastName} onChange={onChange} placeholder={t.parentLastNamePlaceholder} required error={errors.parentLastName} />
      </div>
      <FormField label={t.parentPhone} name="parentPhone" type="tel" value={formData.parentPhone} onChange={onChange} placeholder={t.parentPhonePlaceholder} required error={errors.parentPhone} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={t.parentEmail} name="parentEmail" type="email" value={formData.parentEmail} onChange={onChange} placeholder={t.parentEmailPlaceholder} error={errors.parentEmail} />
        <FormField label={t.parentAddress} name="parentAddress" value={formData.parentAddress} onChange={onChange} placeholder={t.parentAddressPlaceholder} />
      </div>
    </div>
  )
}

function ChildStep({ t, formData, onChange, errors, options, program, language, editing }) {
  return (
    <div className="space-y-6">
      <StepHeading title={t.childTitle} subtitle={t.childSubtitle} editing={editing} editLabel={t.reviewEdit} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={t.childFirstName} name="childFirstName" value={formData.childFirstName} onChange={onChange} placeholder={t.childFirstNamePlaceholder} required error={errors.childFirstName} />
        <FormField label={t.childLastName} name="childLastName" value={formData.childLastName} onChange={onChange} placeholder={t.childLastNamePlaceholder} required error={errors.childLastName} />
        <FormField label={t.childDob} name="childDob" type="date" value={formData.childDob} onChange={onChange} required error={errors.childDob} />
        <div>
          <FormField label={t.childGrade} name="childGrade" type="select" value={formData.childGrade} onChange={onChange} options={options} placeholder={t.selectGrade} required error={errors.childGrade} />
          <AgeHint t={t} formData={formData} language={language} />
          {program && (
            <p className="mt-2 text-body-sm text-text-2" aria-live="polite">
              {t.programLabel}{language === 'en' ? ': ' : ' : '}<span className="font-medium text-text-1">{getProgramName(program, language)}</span>
            </p>
          )}
        </div>
      </div>
      <FormField label={t.childPrevSchool} name="childPreviousSchool" value={formData.childPreviousSchool} onChange={onChange} placeholder={t.childPrevSchoolPlaceholder} />
    </div>
  )
}

function AgeHint({ t, formData, language }) {
  const usual = USUAL_AGE[formData.childGrade]
  if (!usual || !formData.childDob || !isPlausibleDob(formData.childDob)) return null
  const age = ageAtSchoolStart(formData.childDob, school.schoolYear)
  if (age === null || Math.abs(age - usual) < 2) return null
  return (
    <p className="mt-2 flex items-start gap-2 text-body-sm text-warning" role="status">
      <Info size={16} strokeWidth={1.75} className="mt-1 shrink-0" aria-hidden="true" />
      <span>{t.ageHint.replace('{age}', age).replace('{grade}', getGradeLabel(formData.childGrade, language))}</span>
    </p>
  )
}

function SendStep({ t, formData, program, language, onEdit, waLink, onSend }) {
  return (
    <div className="space-y-6">
      <StepHeading title={t.sendTitle} subtitle={t.sendSubtitle} />
      <div className="divide-y divide-border border-y border-border">
        <ReviewGroup title={t.reviewParent} onEdit={() => onEdit(0)} editLabel={t.reviewEdit}>
          <ReviewRow label={t.reviewParentName} value={`${formData.parentFirstName} ${formData.parentLastName}`} />
          <ReviewRow label={t.reviewPhone} value={formatPhone(formData.parentPhone)} />
          {formData.parentEmail && <ReviewRow label={t.reviewEmail} value={formData.parentEmail} secondary />}
          {formData.parentAddress && <ReviewRow label={t.reviewAddress} value={formData.parentAddress} secondary />}
        </ReviewGroup>
        <ReviewGroup title={t.reviewChild} onEdit={() => onEdit(1)} editLabel={t.reviewEdit}>
          <ReviewRow label={t.reviewChildName} value={`${formData.childFirstName} ${formData.childLastName}`} />
          <ReviewRow label={t.reviewDob} value={formatDate(formData.childDob, language)} />
          <ReviewRow label={t.reviewGrade} value={program ? `${getGradeLabel(formData.childGrade, language)}, ${getProgramName(program, language)}` : formData.childGrade} />
          <ReviewRow label={t.reviewYear} value={school.schoolYear} secondary />
          {formData.childPreviousSchool && <ReviewRow label={t.reviewPrevSchool} value={formData.childPreviousSchool} secondary />}
        </ReviewGroup>
      </div>

      <div>
        <Button variant="primary" size="lg" href={waLink} target="_blank" rel="noopener noreferrer" onClick={onSend} className="w-full">
          <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
          {t.sendCta}
        </Button>
        <p className="mt-3 text-caption text-text-3 text-center text-pretty">{t.sendHint}</p>
      </div>
    </div>
  )
}

/* After the WhatsApp hand-off: the browser only knows WhatsApp was opened, so
   the screen asks the parent to finish there — never « envoyé ». */
function SentStep({ t, waLink, onEdit }) {
  return (
    <div className="space-y-8">
      <div role="status">
        <h2 id="step-title" className="font-display font-semibold text-h2 text-text-1 text-balance">{t.sentTitle}</h2>
        <p className="mt-2 text-body text-text-2 text-pretty">{t.sentBody}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button variant="primary" size="lg" href={waLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <RotateCcw size={18} strokeWidth={2} aria-hidden="true" />
          {t.sentRetry}
        </Button>
        <Button variant="secondary" size="lg" href={phoneLink} className="w-full sm:w-auto">
          <Phone size={18} strokeWidth={2} aria-hidden="true" />
          {t.sentCall}
        </Button>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="font-display font-semibold text-h4 text-text-1">{t.nextTitle}</h3>
        <ol className="mt-5 space-y-5">
          {t.nextSteps.map((item, index) => (
            <li key={item.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3">
              <span aria-hidden="true" className="font-display font-semibold text-[1.5rem] leading-none text-gold-deep tabular-nums pt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-body font-semibold text-text-1">{item.title}</p>
                <p className="mt-1 text-body-sm text-text-2">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Button variant="text" size="md" onClick={onEdit} className="-ml-1">
        <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        {t.sentEdit}
      </Button>
    </div>
  )
}

/* Review = groups on hairlines (a summary is not a repeated card unit — §09). */
function ReviewGroup({ title, onEdit, editLabel, children }) {
  return (
    <section className="py-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-eyebrow font-semibold uppercase text-gold-deep">{title}</h3>
        <Button variant="text" size="md" onClick={onEdit} className="-mr-1">
          {editLabel}
        </Button>
      </div>
      <dl className="mt-3 space-y-1.5">{children}</dl>
    </section>
  )
}

function ReviewRow({ label, value, secondary = false }) {
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] xs:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-x-4 text-body-sm">
      <dt className="text-text-3">{label}</dt>
      <dd className={secondary ? 'text-text-2 break-words' : 'font-medium text-text-1 break-words'}>{value}</dd>
    </div>
  )
}
