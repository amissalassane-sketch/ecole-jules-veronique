import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, MapPin, Phone, MessageCircle, Clock, Banknote, ExternalLink } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Card, { NoticeCard } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import IconTile from '../components/ui/IconTile'
import Stepper from '../components/registration/Stepper'
import FormField from '../components/registration/FormField'
import { programs, getProgramName } from '../data/programs'
import { school } from '../data/school'
import { waLinkFor } from '../utils/contact'
import { useT } from '../hooks/useT'
import { useLanguage } from '../context/LanguageContext'

/**
 * Pré-inscription — DS V2 §08 « Page Header » + « Form Panel » (blueprint §24 row 12).
 * Re-skin only: state, validation, 6-step flow, review/edit, WhatsApp prefill
 * and routes are unchanged. paper page · narrow container · H1 > H2 step
 * (styled H3) · ONE Card/Default panel · inputs 48 · errors as Notice-style
 * messages · Primary / Text actions · V2 tokens only (no legacy V1 colours or radii).
 *
 * Phase 3.2 — geometry & visual hierarchy only (no copy, no business logic):
 *  · P0-04 deterministic arrival: every step change scrolls the step anchor
 *    (stepper) to a fixed offset under the fixed header — never mid-card, never
 *    in the footer (measured arrivals were 754/727/554/894/731 px at 390×844).
 *  · P0-01 first invalid field receives focus + is centred in the viewport;
 *    inline error messages and validation rules untouched.
 *  · Fold budget @390: compact route header (H1 → H3 scale, muted) so the step
 *    title (H2 scale) becomes the dominant operational element (§05 tokens only).
 *  · Step 6: action block moved directly under the status block (CTA in fold).
 *  · Step 5: nav action demoted to Secondary so the card holds the one Primary.
 *  · Step 4: program group rows sit side-by-side ≥ sm for instant comparison.
 */
export default function RegistrationPage() {
  const t = useT().registration
  const { language } = useLanguage()
  const [step, setStep] = useState(0)
  const [choice, setChoice] = useState(null)
  const [editingStep, setEditingStep] = useState(null)
  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: '',
    childFirstName: '',
    childLastName: '',
    childDob: '',
    childGrade: '',
    childPreviousSchool: '',
    selectedProgram: '',
  })
  const [errors, setErrors] = useState({})

  /* Phase 3.2 (P0-04) — deterministic arrival on step change. The anchor is the
     stepper wrapper: its document position never depends on the animating card
     content, so scrolling to it at commit time is stable (no late jump). The
     previous behaviour kept the browser's scroll offset, landing the parent
     mid-card or inside the footer (measured: 754/727/554/894/731 px @390×844). */
  const stepAnchorRef = useRef(null)
  const firstRenderRef = useRef(true)
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    const anchor = stepAnchorRef.current
    if (!anchor) return
    const headerH = document.querySelector('header')?.getBoundingClientRect().height || 0
    const top = anchor.getBoundingClientRect().top + window.scrollY - (headerH + 12)
    const y = Math.max(top, 0)
    try {
      window.scrollTo({ top: y, behavior: 'instant' })
    } catch {
      window.scrollTo(0, y)
    }
  }, [step, editingStep])

  const gradeOptions = useMemo(
    () => programs.flatMap((program) => program.grades.map((grade) => ({
      value: grade,
      label: `${grade} — ${getProgramName(program, language)}`,
    }))),
    [language]
  )
  const programOptions = useMemo(
    () => programs.map((program) => ({ value: program.id, label: getProgramName(program, language) })),
    [language]
  )

  const updateField = useCallback((event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: '' }))
  }, [errors])

  const validateStep = useCallback(() => {
    const nextErrors = {}
    if (step === 0) {
      if (!formData.parentFirstName.trim()) nextErrors.parentFirstName = t.required
      if (!formData.parentLastName.trim()) nextErrors.parentLastName = t.required
      if (!formData.parentPhone.trim()) nextErrors.parentPhone = t.required
      if (!formData.parentEmail.trim()) nextErrors.parentEmail = t.required
      else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) nextErrors.parentEmail = t.invalidEmail
    }
    if (step === 1) {
      if (!formData.childFirstName.trim()) nextErrors.childFirstName = t.required
      if (!formData.childLastName.trim()) nextErrors.childLastName = t.required
      if (!formData.childDob) nextErrors.childDob = t.required
      if (!formData.childGrade) nextErrors.childGrade = t.selectGrade
    }
    if (step === 2 && !formData.selectedProgram) nextErrors.selectedProgram = t.selectProgram
    setErrors(nextErrors)
    return nextErrors
  }, [step, formData, t])

  const nextStep = useCallback(() => {
    const nextErrors = validateStep()
    if (Object.keys(nextErrors).length > 0) {
      /* Phase 3.2 (P0-01): a rejected submit moves focus + viewport to the first
         invalid control (DOM order = visual order). Messages, rules and wording
         are untouched; the field is centred so its inline error stays visible. */
      requestAnimationFrame(() => {
        const first = document.querySelector('main [aria-invalid="true"]')
        if (!first) return
        first.focus({ preventScroll: true })
        try {
          first.scrollIntoView({ block: 'center', behavior: 'instant' })
        } catch {
          first.scrollIntoView(true)
        }
      })
      return
    }
    setStep((current) => Math.min(current + 1, 5))
  }, [validateStep])

  const previousStep = useCallback(() => {
    setChoice(null)
    setStep((current) => Math.max(current - 1, 0))
  }, [])

  const goToEditStep = useCallback((targetStep) => {
    setEditingStep(targetStep)
    setStep(targetStep)
  }, [])

  const returnToReview = useCallback(() => {
    if (editingStep !== null) {
      setStep(3)
      setEditingStep(null)
    }
  }, [editingStep])

  const program = programs.find((item) => item.id === formData.selectedProgram)
  const totalSteps = 6
  const appRef = useMemo(() => `REG-${String(Date.now()).slice(-6)}`, [])
  const waHelpLink = waLinkFor('help')
  const stepperLabels = t.stepLabels

  const waContextMessage = useMemo(() => {
    const template = t.waMsgPreReg || ''
    return template
      .replace('[PARENT_NAME]', `${formData.parentFirstName} ${formData.parentLastName}`)
      .replace('[CHILD_NAME]', `${formData.childFirstName} ${formData.childLastName}`)
      .replace('[GRADE]', formData.childGrade)
      .replace('[PROGRAM]', program ? getProgramName(program, language) : '')
      .replace('[NOM_PARENT]', `${formData.parentFirstName} ${formData.parentLastName}`)
      .replace('[NOM_ENFANT]', `${formData.childFirstName} ${formData.childLastName}`)
      .replace('[CLASSE]', formData.childGrade)
      .replace('[PROGRAMME]', program ? getProgramName(program, language) : '')
  }, [formData, program, language, t.waMsgPreReg])

  const waPreReg = `https://wa.me/${school.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waContextMessage)}`
  const handleContactChoice = () => {
    setChoice('school')
    setStep(5)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen-dynamic bg-paper pt-[calc(var(--header-h)+1.5rem)] md:pt-[calc(var(--header-h)+3.5rem)] pb-16 md:pb-24">
        <div className="container-narrow">
          {/* ── Page header ── Phase 3.2: the route H1 introduces the journey at
              H3 scale / muted (it repeated identically on all 6 screens and
              out-ranked the operational step title); the step H2 now carries
              the H2 scale. Tokens only — no copy, no palette change. */}
          <header className="pb-5 md:pb-6">
            <h1 className="font-display font-semibold text-h3 text-text-2 text-balance">{t.title}</h1>
            <p className="mt-2 text-body-sm md:text-lead text-text-2 text-pretty max-w-[60ch]">{t.subtitle}</p>
          </header>

          {/* Scroll anchor for the deterministic arrival (P0-04). */}
          <div ref={stepAnchorRef}>
            <Stepper currentStep={step} labels={stepperLabels} />
          </div>
          <div className="mt-3 mb-4 md:mb-6 flex min-h-11 items-center justify-between gap-4">
            <p className="text-eyebrow font-semibold uppercase text-text-3">
              {t.stepOf.replace('{current}', step + 1).replace('{total}', totalSteps)}
            </p>
            {step < 5 && (
              <Button variant="text" size="md" href={waHelpLink} target="_blank" rel="noopener noreferrer" className="-mr-1 h-11">
                <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                {t.needHelp}
              </Button>
            )}
          </div>

          {/* ── Form panel: the ONE card ── */}
          <Card className="p-5 sm:p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step}-${choice || ''}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {step === 0 && <ParentStep t={t} formData={formData} onChange={updateField} errors={errors} school={school} />}
                {step === 1 && <ChildStep t={t} formData={formData} onChange={updateField} errors={errors} options={gradeOptions} />}
                {step === 2 && <ProgramStep t={t} formData={formData} onChange={updateField} errors={errors} options={programOptions} program={program} language={language} />}
                {step === 3 && <ReviewStep t={t} formData={formData} onEdit={goToEditStep} program={program} language={language} school={school} />}
                {step === 4 && <ContactStep t={t} school={school} onContact={handleContactChoice} />}
                {step === 5 && <FinalStep t={t} formData={formData} appRef={appRef} program={program} language={language} school={school} waPreReg={waPreReg} choice={choice} />}
              </motion.div>
            </AnimatePresence>
          </Card>

          {step < 5 && (
            <div className="mt-6 flex flex-col-reverse gap-3 xs:flex-row xs:items-center xs:justify-between">
              <Button
                variant="text"
                size="md"
                onClick={editingStep !== null ? returnToReview : previousStep}
                disabled={step === 0 && editingStep === null}
                className="self-start xs:self-auto -ml-1"
              >
                <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
                {editingStep !== null ? t.backToReview : t.back}
              </Button>
              {/* Phase 3.2 (§7): on the contact step the card already holds the
                  single Primary action; the nav action is demoted to Secondary
                  so the screen no longer shows two competing primaries. Button,
                  label and behaviour are unchanged — hierarchy only. */}
              <Button
                variant={editingStep === null && step === 4 ? 'secondary' : 'primary'}
                size="lg"
                onClick={editingStep !== null ? returnToReview : nextStep}
                className="w-full xs:w-auto"
              >
                {editingStep !== null ? t.done : t.continue}
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

/* Step heading: h2 in the page outline. Phase 3.2: H2 scale (was H3) so the
   current step title is the dominant operational element of the screen. */
function StepHeading({ title, subtitle }) {
  return (
    <div>
      <h2 className="font-display font-semibold text-h2 text-text-1 text-balance">{title}</h2>
      {subtitle && <p className="mt-2 text-body-sm text-text-2 text-pretty">{subtitle}</p>}
    </div>
  )
}

function ParentStep({ t, formData, onChange, errors, school }) {
  return (
    <div className="space-y-6">
      <StepHeading title={t.parentTitle} subtitle={t.parentSubtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={t.parentFirstName} name="parentFirstName" value={formData.parentFirstName} onChange={onChange} placeholder={t.parentFirstNamePlaceholder} required error={errors.parentFirstName} />
        <FormField label={t.parentLastName} name="parentLastName" value={formData.parentLastName} onChange={onChange} placeholder={t.parentLastNamePlaceholder} required error={errors.parentLastName} />
        <FormField label={t.parentPhone} name="parentPhone" type="tel" value={formData.parentPhone} onChange={onChange} placeholder={`${school.countryCode} …`} required error={errors.parentPhone} />
        <FormField label={t.parentEmail} name="parentEmail" type="email" value={formData.parentEmail} onChange={onChange} placeholder={t.parentEmailPlaceholder} required error={errors.parentEmail} />
      </div>
      <FormField label={t.parentAddress} name="parentAddress" value={formData.parentAddress} onChange={onChange} placeholder={t.parentAddressPlaceholder} />
    </div>
  )
}

function ChildStep({ t, formData, onChange, errors, options }) {
  return (
    <div className="space-y-6">
      <StepHeading title={t.childTitle} subtitle={t.childSubtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={t.childFirstName} name="childFirstName" value={formData.childFirstName} onChange={onChange} placeholder={t.childFirstNamePlaceholder} required error={errors.childFirstName} />
        <FormField label={t.childLastName} name="childLastName" value={formData.childLastName} onChange={onChange} placeholder={t.childLastNamePlaceholder} required error={errors.childLastName} />
        <FormField label={t.childDob} name="childDob" type="date" value={formData.childDob} onChange={onChange} required error={errors.childDob} />
        <FormField label={t.childGrade} name="childGrade" type="select" value={formData.childGrade} onChange={onChange} options={options} placeholder={t.selectGrade} required error={errors.childGrade} />
      </div>
      <FormField label={t.childPrevSchool} name="childPreviousSchool" value={formData.childPreviousSchool} onChange={onChange} placeholder={t.childPrevSchoolPlaceholder} />
    </div>
  )
}

function ProgramStep({ t, formData, onChange, errors, options, program, language }) {
  const tp = useT().programs
  return (
    <div className="space-y-6">
      <StepHeading title={t.programTitle} subtitle={t.programSubtitle} />
      <FormField label={t.selectProgram} name="selectedProgram" type="select" value={formData.selectedProgram} onChange={onChange} options={options} placeholder={t.chooseProgram} required error={errors.selectedProgram} />
      {program && (
        <div className="border-t border-border pt-5">
          <h3 className="font-body font-semibold text-h4 text-text-1">{getProgramName(program, language)}</h3>
          <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 text-body-sm">
            <div>
              <dt className="text-caption text-text-3">{t.childGrade}</dt>
              <dd className="text-text-1">{program.grades.join(' · ')}</dd>
            </div>
            <div>
              <dt className="text-caption text-text-3">{tp.schedule}</dt>
              <dd className="text-text-1">{program.schedule}</dd>
            </div>
          </dl>
          <p className="mt-4 text-caption text-text-3">{t.reviewFinalNote}</p>
        </div>
      )}
    </div>
  )
}

function ReviewStep({ t, formData, onEdit, program, language, school }) {
  return (
    <div className="space-y-6">
      <StepHeading title={t.reviewTitle} subtitle={t.reviewSubtitle} />
      <div className="divide-y divide-border border-y border-border">
        <ReviewGroup title={t.reviewParent} onEdit={() => onEdit(0)} editLabel={t.reviewEdit}>
          <ReviewRow label={t.reviewName} value={`${formData.parentFirstName} ${formData.parentLastName}`} />
          <ReviewRow label={t.reviewPhone} value={formData.parentPhone} />
          <ReviewRow label={t.reviewEmail} value={formData.parentEmail} />
          {formData.parentAddress && <ReviewRow label={t.reviewAddress} value={formData.parentAddress} />}
        </ReviewGroup>
        <ReviewGroup title={t.reviewChild} onEdit={() => onEdit(1)} editLabel={t.reviewEdit}>
          <ReviewRow label={t.reviewName} value={`${formData.childFirstName} ${formData.childLastName}`} />
          <ReviewRow label={t.reviewDob} value={formData.childDob || '—'} />
          <ReviewRow label={t.reviewGrade} value={formData.childGrade || '—'} />
          {formData.childPreviousSchool && <ReviewRow label={t.reviewPrevSchool} value={formData.childPreviousSchool} />}
        </ReviewGroup>
        {program && (
          <ReviewGroup title={t.reviewProgram} onEdit={() => onEdit(2)} editLabel={t.reviewEdit}>
            {/* Phase 3.2 (§8): program and class·year sit side by side from sm
                so the two halves of the pedagogical choice compare at a glance.
                Values and labels untouched; no coherence rule introduced here. */}
            <div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              <ReviewRow label={t.finalProgramLabel} value={getProgramName(program, language)} />
              <ReviewRow label={t.finalYearLabel} value={`${formData.childGrade} · ${school.schoolYear}`} />
            </div>
          </ReviewGroup>
        )}
      </div>
      <p className="text-caption text-text-3">{t.reviewFinalNote}</p>
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

function ReviewRow({ label, value }) {
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] xs:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-x-4 text-body-sm">
      <dt className="text-text-3">{label}</dt>
      <dd className="text-text-1 break-words">{value}</dd>
    </div>
  )
}

function ContactStep({ t, school, onContact }) {
  return (
    <div className="space-y-6">
      <StepHeading title={t.choiceTitle} subtitle={t.choiceSubtitle} />
      <div className="border-t border-border pt-5">
        <h3 className="font-body font-semibold text-h4 text-text-1">{t.schoolFinalizeTitle}</h3>
        <p className="mt-2 text-body-sm text-text-2 text-pretty">{t.schoolFinalizeDesc}</p>
        <ul className="mt-5 space-y-2 text-body-sm text-text-2">
          <li className="flex items-start gap-3">
            <MapPin size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
            <span>{school.address}</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
            <a href={`tel:${school.phone}`} className="inline-flex min-h-11 items-center text-text-1 underline-offset-4 hover:underline tabular-nums">{school.phone}</a>
          </li>
          <li className="flex items-start gap-3">
            <Clock size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
            <span>{school.openingHours.label}</span>
          </li>
        </ul>
      </div>
      {/* Phase 3.2 (§7): the single Primary action now directly follows the
          contact coordinates it acts on; the bank-payment notice closes the
          step as context. Order only — no text, no behaviour changed. */}
      <Button variant="primary" size="lg" onClick={onContact} className="w-full xs:w-auto">
        {t.contactAdmissions}
        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
      </Button>
      <NoticeCard tone="info" icon={Banknote} title={t.bankPaymentTitle} role="note">
        {t.bankPaymentDesc}
      </NoticeCard>
    </div>
  )
}

function FinalStep({ t, formData, appRef, program, language, school, waPreReg }) {
  const mapQuery = encodeURIComponent(school.address)
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
  const date = new Date().toLocaleDateString(language === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const nextSteps = [
    { title: t.finalStep1Title, desc: t.finalStep1Desc },
    { title: t.finalStep2Title, desc: t.finalStep2Desc },
    { title: t.finalStep3Title, desc: t.finalStep3Desc },
    { title: t.finalStep4Title, desc: t.finalStep4Desc },
  ]

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-start gap-4">
        <IconTile icon={Check} size="md" />
        <div>
          <h2 className="font-display font-semibold text-h2 text-text-1 text-balance">{t.schoolConfirmTitle}</h2>
          <p className="mt-2 text-body-sm text-text-2 text-pretty">
            {t.schoolConfirmDesc} <strong className="font-semibold text-text-1">{formData.childFirstName} {formData.childLastName}</strong>.
          </p>
        </div>
      </div>

      <dl className="divide-y divide-border border-y border-border">
        <DetailRow label={t.finalRefLabel} value={appRef} mono />
        <DetailRow label={t.finalChildLabel} value={`${formData.childFirstName} ${formData.childLastName}`} />
        <DetailRow label={t.finalGradeLabel} value={formData.childGrade || '—'} />
        {program && <DetailRow label={t.finalProgramLabel} value={getProgramName(program, language)} />}
        <DetailRow label={t.finalYearLabel} value={school.schoolYear} />
        <DetailRow label={t.finalDateLabel} value={date} />
        <DetailRow label={t.finalStatusLabel} value={<Badge variant="planned">{t.statusPreReg}</Badge>} />
      </dl>

      {/* Phase 3.2 (§6): the main action now follows the status block directly so
          it lands in the first viewport (measured 1614 px from document top
          before, ~2 folds below the arrival point at 390×844). Texts, targets and
          behaviour untouched; the payment notice and the 01–04 list follow it. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button variant="primary" size="lg" href={waPreReg} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
          {t.finalCtaSecondary}
        </Button>
        <Button variant="secondary" size="lg" href={mapLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          {t.finalCtaPrimary}
          <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
        <Button variant="text" size="md" to="/" className="self-start sm:self-auto sm:ml-auto -ml-1 sm:-ml-0">
          {t.finalCtaHome}
        </Button>
      </div>

      <NoticeCard tone="info" icon={Banknote} title={t.finalNextTitle} role="note">
        {t.finalPaymentNote}
      </NoticeCard>

      <ol className="space-y-5">
        {nextSteps.map((item, index) => (
          <li key={item.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3">
            <span aria-hidden="true" className="font-display font-semibold text-[1.5rem] leading-none text-gold-deep tabular-nums pt-0.5">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-body font-semibold text-h4 text-text-1">{item.title}</h3>
              <p className="mt-1 text-body-sm text-text-2">{item.desc}</p>
            </div>
          </li>
        ))}
      </ol>

    </div>
  )
}

function DetailRow({ label, value, mono = false }) {
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] xs:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] gap-x-4 py-3 text-body-sm">
      <dt className="text-text-3">{label}</dt>
      <dd className={mono ? 'font-mono text-caption text-text-1 self-center' : 'text-text-1 self-center'}>{value}</dd>
    </div>
  )
}
