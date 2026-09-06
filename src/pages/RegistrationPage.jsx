import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, MapPin, Phone, Mail, Info, MessageCircle, Clock, Banknote, ExternalLink } from 'lucide-react'
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
import { waLinkFor, phoneLink } from '../utils/contact'
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
 *
 * Phase 3.4 — coherence class ↔ program (functional, data-driven):
 *  · programs[].grades are disjoint ⇒ the class determines the program; the
 *    class select (step 2) derives selectedProgram, step 3 confirms/informs
 *    instead of offering a second independent choice;
 *  · validation: class must exist in programs.js; program must equal the
 *    derived one (invariant, refused + focusable alert otherwise);
 *  · leaving an edit session re-validates the edited step first;
 *  · review groups class + program side by side (one pedagogical choice).
 *
 * Phase 3.5 — transmission, contact & écran final (functional/UX):
 *  · REG-XXXXXX removed: generated at mount, never persisted nor transmitted
 *    — an administrative file number the school could not exploit;
 *  · dead `choice` state removed (set once, read nowhere but a motion key);
 *  · step 5 lists only real configured channels (WhatsApp / tel: / mailto: /
 *    directions), each performing the action it announces; the fake
 *    « Contacter les admissions » button is gone; nav Primary returns;
 *  · WhatsApp draft now carries every collected value with a real use
 *    (parent contact block, child identity + class, program, year); optional
 *    lines vanish when empty; closing line states nothing was auto-sent;
 *  · final screen: transparency notice before the CTA (« rien n'a encore été
 *    envoyé »), CTA label = the real action, post-click state limited to what
 *    the browser verifies (link activated → « completes inside WhatsApp »).
 */
/* Phase 3.4 — classe → programme. In programs.js the `grades` lists of the
   three programs are disjoint (Crèche/Garderie · Niveau 1/2 · CI…CM2), so every
   class belongs to exactly one program: the program can always be derived from
   the chosen class, and an inconsistent pair becomes impossible to express.
   No new business category, no invented data — pure read of programs.js. */
function programForGrade(grade) {
  return programs.find((program) => program.grades.includes(grade)) || null
}

export default function RegistrationPage() {
  const t = useT().registration
  const { language } = useLanguage()
  const [step, setStep] = useState(0)
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

  const updateField = useCallback((event) => {
    const { name, value } = event.target
    setFormData((previous) => {
      const next = { ...previous, [name]: value }
      /* Phase 3.4: choosing (or changing) a class re-derives the program — the
         single source of truth is the class, so the pair stays coherent
         everywhere (review, final screen, WhatsApp prefill). */
      if (name === 'childGrade') next.selectedProgram = programForGrade(value)?.id || ''
      return next
    })
    if (name === 'childGrade') {
      setErrors((previous) => ({ ...previous, childGrade: '', selectedProgram: '' }))
    } else if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }))
    }
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
      /* Phase 3.4: a class is valid only if programs.js actually offers it —
         the grade lists are the only class vocabulary that exists. */
      else if (!programForGrade(formData.childGrade)) nextErrors.childGrade = t.selectGrade
    }
    /* Phase 3.4: the program step no longer chooses anything — it confirms the
       program derived from the class. The coherence invariant is validated
       here anyway: any drift (stale state, future code path) is refused and
       surfaced on the confirmation screen itself. */
    if (step === 2) {
      const derived = programForGrade(formData.childGrade)
      if (!derived || formData.selectedProgram !== derived.id) nextErrors.selectedProgram = t.selectProgram
    }
    setErrors(nextErrors)
    return nextErrors
  }, [step, formData, t])

  /* Phase 3.2 (P0-01) focus helper, extended in 3.4: a coherence alert carries
     tabIndex=-1 so it can receive focus like a field error. */
  const focusFirstInvalid = useCallback(() => {
    requestAnimationFrame(() => {
      const first = document.querySelector('main [aria-invalid="true"], main [role="alert"][tabindex="-1"]')
      if (!first) return
      first.focus({ preventScroll: true })
      try {
        first.scrollIntoView({ block: 'center', behavior: 'instant' })
      } catch {
        first.scrollIntoView(true)
      }
    })
  }, [])

  const nextStep = useCallback(() => {
    const nextErrors = validateStep()
    if (Object.keys(nextErrors).length > 0) {
      /* Phase 3.2 (P0-01): a rejected submit moves focus + viewport to the first
         invalid control (DOM order = visual order). Messages, rules and wording
         are untouched; the field is centred so its inline error stays visible. */
      focusFirstInvalid()
      return
    }
    setStep((current) => Math.min(current + 1, 5))
  }, [validateStep, focusFirstInvalid])

  const previousStep = useCallback(() => {
    setStep((current) => Math.max(current - 1, 0))
  }, [])

  const goToEditStep = useCallback((targetStep) => {
    setEditingStep(targetStep)
    setStep(targetStep)
  }, [])

  /* Phase 3.4 (§9): leaving an edit session always re-validates the step first —
     an emptied required field or an incoherent pair keeps the parent on the
     step (error visible + focused) instead of leaking into the review. */
  const returnToReview = useCallback(() => {
    if (editingStep === null) return
    const nextErrors = validateStep()
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid()
      return
    }
    setStep(3)
    setEditingStep(null)
  }, [editingStep, validateStep, focusFirstInvalid])

  const program = programs.find((item) => item.id === formData.selectedProgram)
  const totalSteps = 6
  /* Phase 3.3 (§10): while editing a review group the journey indicator keeps
     showing the review position (Étape 4 sur 6) instead of jumping back to the
     edited step — re-opening a group must never read like travelling backwards
     through the form. The card's « Modifier » badge carries the mode. */
  const shownStep = editingStep !== null ? 3 : step
  const waHelpLink = waLinkFor('help')
  const stepperLabels = t.stepLabels

  /* Phase 3.5 (§7): the WhatsApp draft carries every collected value that has a
     real use for the first exchange with the school — parent contact block,
     child identity + class, derived program, school year — and nothing else.
     Optional lines (address, previous school) vanish when empty so no
     half-filled line ever reaches the draft. The closing line states the
     truth of this site: nothing was sent automatically. */
  const formatDob = (iso) => {
    if (!iso) return ''
    const d = new Date(`${iso}T00:00:00`)
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString(language === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  const waContextMessage = useMemo(() => {
    const template = t.waMsgPreReg || ''
    const values = {
      YEAR: school.schoolYear,
      PARENT_NAME: `${formData.parentFirstName} ${formData.parentLastName}`.trim(),
      PARENT_PHONE: formData.parentPhone,
      PARENT_EMAIL: formData.parentEmail,
      PARENT_ADDRESS: formData.parentAddress,
      CHILD_NAME: `${formData.childFirstName} ${formData.childLastName}`.trim(),
      CHILD_DOB: formatDob(formData.childDob),
      GRADE: formData.childGrade,
      CHILD_PREV_SCHOOL: formData.childPreviousSchool,
      PROGRAM: program ? getProgramName(program, language) : '',
    }
    return template
      .replace(/\[([A-Z_]+)\]/g, (match, key) => values[key] ?? match)
      .split('\n')
      .filter((line) => !/:\s*$/.test(line))
      .join('\n')
  }, [formData, program, language, t.waMsgPreReg])

  const waPreReg = `https://wa.me/${school.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waContextMessage)}`

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
            <Stepper currentStep={shownStep} labels={stepperLabels} />
          </div>
          <div className="mt-3 mb-4 md:mb-6 flex min-h-11 items-center justify-between gap-4">
            <p className="text-eyebrow font-semibold uppercase text-text-3">
              {t.stepOf.replace('{current}', shownStep + 1).replace('{total}', totalSteps)}
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
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {step === 0 && <ParentStep t={t} formData={formData} onChange={updateField} errors={errors} school={school} editing={editingStep === 0} editLabel={t.reviewEdit} />}
                {step === 1 && <ChildStep t={t} formData={formData} onChange={updateField} errors={errors} options={gradeOptions} editing={editingStep === 1} editLabel={t.reviewEdit} />}
                {step === 2 && <ProgramStep t={t} formData={formData} errors={errors} program={program} language={language} editing={editingStep === 2} editLabel={t.reviewEdit} />}
                {step === 3 && <ReviewStep t={t} formData={formData} onEdit={goToEditStep} program={program} language={language} school={school} />}
                {step === 4 && <ContactStep t={t} school={school} />}
                {step === 5 && <FinalStep t={t} formData={formData} program={program} language={language} school={school} waPreReg={waPreReg} />}
              </motion.div>
            </AnimatePresence>
          </Card>

          {/* Phase 3.5 (§13, cas G): the final screen now also offers the text
              « Retour » action (data stays in memory), so noticing a mistake
              after the draft no longer forces leaving the journey. The nav
              Primary only exists below the final step — the final screen keeps
              its single WhatsApp primary inside the card. */}
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
            {step < 5 && (
              /* Phase 3.5: the contact step no longer holds a card-level
                 primary (its channels are real links), so the nav action is
                 the single Primary of the screen again — one primary per
                 screen, label « Continuer » describing the real action. */
              <Button
                variant="primary"
                size="lg"
                onClick={editingStep !== null ? returnToReview : nextStep}
                className="w-full xs:w-auto"
              >
                {editingStep !== null ? t.done : t.continue}
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/* Step heading: h2 in the page outline. Phase 3.2: H2 scale (was H3) so the
   current step title is the dominant operational element of the screen.
   Phase 3.3: the title/subtitle pair gets a 12 px gap (was 8) for a calmer
   stack, and an editing session opens with an « Modifier » info badge — the DS
   status vocabulary makes the mode explicit without touching wording or flow. */
function StepHeading({ title, subtitle, editing = false, editLabel }) {
  return (
    <div>
      {editing && (
        <div className="mb-3">
          <Badge variant="info">{editLabel}</Badge>
        </div>
      )}
      <h2 className="font-display font-semibold text-h2 text-text-1 text-balance">{title}</h2>
      {subtitle && <p className="mt-3 text-body-sm text-text-2 text-pretty">{subtitle}</p>}
    </div>
  )
}

function ParentStep({ t, formData, onChange, errors, school, editing = false, editLabel }) {
  return (
    <div className="space-y-6">
      <StepHeading title={t.parentTitle} subtitle={t.parentSubtitle} editing={editing} editLabel={editLabel} />
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

function ChildStep({ t, formData, onChange, errors, options, editing = false, editLabel }) {
  return (
    <div className="space-y-6">
      <StepHeading title={t.childTitle} subtitle={t.childSubtitle} editing={editing} editLabel={editLabel} />
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

/* Phase 3.4 (§7): the program is derived from the class (programs[].grades are
   disjoint), so this step confirms and informs instead of offering a second,
   independent choice that could contradict the class. The chosen class is
   restated next to the program it determines; the coherence alert (defensive,
   unreachable through the UI) is focusable like a field error. */
function ProgramStep({ t, formData, errors, program, language, editing = false, editLabel }) {
  const tp = useT().programs
  return (
    <div className="space-y-6">
      <StepHeading title={t.programTitle} subtitle={t.programSubtitle} editing={editing} editLabel={editLabel} />
      {program && (
        <div className="border-t border-border pt-5">
          <h3 className="font-body font-semibold text-h4 text-text-1">{getProgramName(program, language)}</h3>
          <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 text-body-sm">
            <div>
              <dt className="text-caption text-text-3">{t.childGrade}</dt>
              <dd className="font-medium text-text-1">{formData.childGrade}</dd>
            </div>
            <div>
              <dt className="text-caption text-text-3">{tp.schedule}</dt>
              {/* Phase 3.6 (§8/§9): in EN the day names are translated (the fact
                  stays in programs.js); the time format convention is pending
                  school validation and stays site-consistent meanwhile. */}
              <dd className="text-text-1">{language === 'en' ? tp.scheduleEn || program.schedule : program.schedule}</dd>
            </div>
          </dl>
          <p className="mt-4 text-caption text-text-3">{t.reviewFinalNote}</p>
        </div>
      )}
      {errors.selectedProgram && (
        <p role="alert" tabIndex={-1} className="flex items-start gap-2 text-body-sm text-error">
          {errors.selectedProgram}
        </p>
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
          {/* Phase 3.3 (§11): the paired contact lines sit side by side ≥ sm,
              like the program group — the summary scans in two columns; the
              address stays a full-width contextual line. Values untouched. */}
          <div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            <ReviewRow label={t.reviewPhone} value={formData.parentPhone} />
            <ReviewRow label={t.reviewEmail} value={formData.parentEmail} />
          </div>
          {formData.parentAddress && <ReviewRow label={t.reviewAddress} value={formData.parentAddress} secondary />}
        </ReviewGroup>
        <ReviewGroup title={t.reviewChild} onEdit={() => onEdit(1)} editLabel={t.reviewEdit}>
          <ReviewRow label={t.reviewName} value={`${formData.childFirstName} ${formData.childLastName}`} />
          <ReviewRow label={t.reviewDob} value={formData.childDob || '—'} />
          {formData.childPreviousSchool && <ReviewRow label={t.reviewPrevSchool} value={formData.childPreviousSchool} secondary />}
        </ReviewGroup>
        {program && (
          <ReviewGroup title={t.reviewProgram} onEdit={() => onEdit(1)} editLabel={t.reviewEdit}>
            {/* Phase 3.4 (§10): class and program are one pedagogical choice —
                they are read side by side so the parent answers « yes, that is
                the class and program I chose » in one glance. Editing this
                group opens the step that holds the class (the program follows
                from it). The year row no longer repeats the class. */}
            <div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              <ReviewRow label={t.reviewGrade} value={formData.childGrade || '—'} />
              <ReviewRow label={t.finalProgramLabel} value={getProgramName(program, language)} />
            </div>
            <ReviewRow label={t.finalYearLabel} value={school.schoolYear} secondary />
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

/* Phase 3.3: values read at a glance — primary values take Inter 500 text-1,
   contextual lines (address, previous school) step down to the quieter text-2.
   Labels keep caption text-3; wording and content untouched. */
function ReviewRow({ label, value, secondary = false }) {
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] xs:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-x-4 text-body-sm">
      <dt className="text-text-3">{label}</dt>
      <dd className={secondary ? 'text-text-2 break-words' : 'font-medium text-text-1 break-words'}>{value}</dd>
    </div>
  )
}

/* Phase 3.5 (§5, §13): « Contacter l'administration » now lists exactly the
   channels that exist in school.js / contact.js — WhatsApp, tel:, mailto:,
   directions — and each row performs the action it announces. The former
   « Contacter les admissions » button only advanced the step and contacted
   nobody: removed. Advancing to the prepared message stays the nav Primary. */
function ContactStep({ t, school }) {
  const mapQuery = encodeURIComponent(school.address)
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
  return (
    <div className="space-y-6">
      <StepHeading title={t.choiceTitle} subtitle={t.choiceSubtitle} />
      <ul className="space-y-2 border-t border-border pt-5 text-body-sm text-text-2">
        <li className="flex items-start gap-3">
          <MessageCircle size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
          {/* Phase 3.6 (§13): the channel name is visible so this row can never
              be read as the phone row — the link then shows the real number. */}
          <span className="flex flex-wrap items-center gap-x-2">
            <span className="text-text-3">WhatsApp</span>
            <a href={waLinkFor('admissions')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-text-1 underline-offset-4 hover:underline tabular-nums">{school.whatsapp}</a>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Phone size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
          <a href={phoneLink} className="inline-flex min-h-11 items-center text-text-1 underline-offset-4 hover:underline tabular-nums">{school.phone}</a>
        </li>
        <li className="flex items-start gap-3">
          <Mail size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
          <a href={`mailto:${school.email}`} className="inline-flex min-h-11 items-center break-all text-text-1 underline-offset-4 hover:underline">{school.email}</a>
        </li>
        <li className="flex items-start gap-3">
          <MapPin size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{school.address}</span>
            <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-text-1 underline underline-offset-4 hover:decoration-2">
              {t.finalCtaPrimary}
              <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Clock size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
          <span>{school.openingHours.label}</span>
        </li>
      </ul>
      <NoticeCard tone="info" icon={Banknote} title={t.bankPaymentTitle} role="note">
        {t.bankPaymentDesc}
      </NoticeCard>
    </div>
  )
}

/* Phase 3.5 (§10, §14): three distinct states, never merged —
   1 « prepared » (badge + title, always true here),
   2 the action (open WhatsApp with the draft),
   3 after the click: only what the browser can verify — the link was
     activated — worded as « sending completes inside WhatsApp », never as
     « sent ». The REG-XXXXXX reference was removed (§4): generated at mount
     from Date.now(), never persisted, never transmitted, so the school could
     not exploit it; displaying it as « Référence de demande » implied an
     administrative file that does not exist. */
function FinalStep({ t, formData, program, language, school, waPreReg }) {
  const [waOpened, setWaOpened] = useState(false)
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

      {/* Phase 3.3 (§12): reading order of the final screen — 1 status, 2 child,
          3 class, 4 programme, then the main action. The administrative context
          (reference, school year, date) moves below the action as a quiet
          secondary block: still present, same values, same behaviour — it just
          stops competing with the summary at the top of the fold. */}
      <dl className="divide-y divide-border border-y border-border">
        <DetailRow label={t.finalStatusLabel} value={<Badge variant="planned">{t.statusPreReg}</Badge>} />
        <DetailRow label={t.finalChildLabel} value={`${formData.childFirstName} ${formData.childLastName}`} />
        <DetailRow label={t.finalGradeLabel} value={formData.childGrade || '—'} />
        {program && <DetailRow label={t.finalProgramLabel} value={getProgramName(program, language)} />}
      </dl>

      {/* Phase 3.2 (§6): the main action follows the status block directly so it
          lands in the first viewport. Phase 3.5 (§12): its label describes the
          real action — hand the prepared message to WhatsApp. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button variant="primary" size="lg" href={waPreReg} target="_blank" rel="noopener noreferrer" onClick={() => setWaOpened(true)} className="w-full sm:w-auto">
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

      {/* Phase 3.5 (§11): the state before the action, stated plainly — nothing
          left the browser yet. Placed directly under the CTA it captions: the
          badge + title above carry state 1, the CTA stays in the first
          viewport (measured: putting this notice above pushed the CTA below
          the fold at 320 px). */}
      <NoticeCard tone="warning" icon={Info} title={t.finalTransparencyTitle}>
        {t.finalTransparencyBody}
      </NoticeCard>

      {/* Phase 3.5 (§10 state 3): shown only after the parent activated the
          WhatsApp link — the one thing the browser can verify. role=status so
          assistive tech announces it; wording stops at « completes inside
          WhatsApp », never « sent ». */}
      {waOpened && (
        <p role="status" className="flex items-start gap-2 text-body-sm text-text-2">
          <Info size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
          {t.waOpenedNote}
        </p>
      )}

      {/* Phase 3.3 (§12): quiet administrative context, one notch down.
          Phase 3.5: the REG reference is gone (§4) — year + preparation date
          are the only factual context left. */}
      <dl className="divide-y divide-border border-y border-border">
        <DetailRow label={t.finalYearLabel} value={school.schoolYear} quiet />
        <DetailRow label={t.finalDateLabel} value={date} quiet />
      </dl>

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

/* Phase 3.3: primary values take Inter 500; the quiet rows (administrative
   context below the action) step down a notch — tighter padding, caption
   scale, muted values — without ever disappearing. */
function DetailRow({ label, value, quiet = false }) {
  return (
    <div className={`grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] xs:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] gap-x-4 ${quiet ? 'py-2.5 text-caption' : 'py-3 text-body-sm'}`}>
      <dt className="text-text-3">{label}</dt>
      <dd className={quiet ? 'text-text-2 self-center' : 'font-medium text-text-1 self-center'}>
        {value}
      </dd>
    </div>
  )
}
