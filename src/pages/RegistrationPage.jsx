import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Pencil, MapPin, Phone, MessageCircle, Clock, Building2, Banknote } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Stepper from '../components/registration/Stepper'
import FormField from '../components/registration/FormField'
import { programs, getProgramName } from '../data/programs'
import { school } from '../data/school'
import { waLinkFor } from '../utils/contact'
import { useT } from '../hooks/useT'
import { useLanguage } from '../context/LanguageContext'

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
    return Object.keys(nextErrors).length === 0
  }, [step, formData, t])

  const nextStep = useCallback(() => {
    if (validateStep()) setStep((current) => Math.min(current + 1, 5))
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
      <main className="pt-24 sm:pt-28 pb-20 min-h-screen-dynamic bg-surface">
        <div className="container-page max-w-2xl">
          <div className="mb-5 sm:mb-8">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">{t.title}</h1>
            <p className="text-neutral-500 text-xs sm:text-sm">{t.subtitle}</p>
          </div>

          <div className="mb-4 sm:mb-6"><Stepper currentStep={step} labels={stepperLabels} /></div>
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em]">
              {t.stepOf.replace('{current}', step + 1).replace('{total}', totalSteps)}
            </p>
            {step < 5 && (
              <a href={waHelpLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                <MessageCircle size={13} />{t.needHelp}
              </a>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 md:p-8 mb-6 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div key={`${step}-${choice || ''}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                {step === 0 && <ParentStep t={t} formData={formData} onChange={updateField} errors={errors} school={school} />}
                {step === 1 && <ChildStep t={t} formData={formData} onChange={updateField} errors={errors} options={gradeOptions} />}
                {step === 2 && <ProgramStep t={t} formData={formData} onChange={updateField} errors={errors} options={programOptions} program={program} language={language} />}
                {step === 3 && <ReviewStep t={t} formData={formData} onEdit={goToEditStep} program={program} language={language} school={school} />}
                {step === 4 && <ContactStep t={t} school={school} onContact={handleContactChoice} />}
                {step === 5 && <FinalStep t={t} formData={formData} appRef={appRef} program={program} language={language} school={school} waPreReg={waPreReg} choice={choice} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {step < 5 && (
            <div className="flex justify-between items-center">
              <Button variant="ghost" size="md" onClick={editingStep !== null ? returnToReview : previousStep} disabled={step === 0 && editingStep === null} className="text-sm">
                <ArrowLeft size={15} />{editingStep !== null ? t.backToReview : t.back}
              </Button>
              <Button variant="primary" size="lg" onClick={editingStep !== null ? returnToReview : nextStep} className="text-sm">
                {editingStep !== null ? t.done : t.continue}<ArrowRight size={15} />
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

function ParentStep({ t, formData, onChange, errors, school }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.parentTitle}</h2>
      <p className="text-neutral-500 text-xs sm:text-sm mb-1">{t.parentSubtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
    <div className="space-y-4 sm:space-y-5">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.childTitle}</h2>
      <p className="text-neutral-500 text-xs sm:text-sm mb-1">{t.childSubtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
  return (
    <div className="space-y-4 sm:space-y-5">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.programTitle}</h2>
      <p className="text-neutral-500 text-xs sm:text-sm mb-1">{t.programSubtitle}</p>
      <FormField label={t.selectProgram} name="selectedProgram" type="select" value={formData.selectedProgram} onChange={onChange} options={options} placeholder={t.chooseProgram} required error={errors.selectedProgram} />
      {program && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 rounded-2xl bg-surface-alt border border-neutral-200 mt-3">
          <h3 className="font-semibold text-neutral-900 text-sm sm:text-base mb-1.5">{getProgramName(program, language)}</h3>
          <div className="flex flex-wrap gap-1.5">
            {program.grades.map((grade) => <span key={grade} className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-[11px] font-medium">{grade}</span>)}
            <span className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-600 text-[11px] font-medium">{program.schedule}</span>
          </div>
          <p className="text-neutral-500 text-xs mt-3">{t.reviewFinalNote}</p>
        </motion.div>
      )}
    </div>
  )
}

function ReviewStep({ t, formData, onEdit, program, language, school }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.reviewTitle}</h2>
        <p className="text-neutral-500 text-xs sm:text-sm">{t.reviewSubtitle}</p>
      </div>
      <ReviewCard title={t.reviewParent} onEdit={() => onEdit(0)} editLabel={t.reviewEdit}>
        <p>{t.reviewName} <strong>{formData.parentFirstName} {formData.parentLastName}</strong></p>
        <p>{t.reviewPhone} <strong>{formData.parentPhone}</strong></p>
        <p>{t.reviewEmail} <strong>{formData.parentEmail}</strong></p>
        {formData.parentAddress && <p>{t.reviewAddress} <strong>{formData.parentAddress}</strong></p>}
      </ReviewCard>
      <ReviewCard title={t.reviewChild} onEdit={() => onEdit(1)} editLabel={t.reviewEdit}>
        <p>{t.reviewName} <strong>{formData.childFirstName} {formData.childLastName}</strong></p>
        <p>{t.reviewDob} <strong>{formData.childDob || '—'}</strong></p>
        <p>{t.reviewGrade} <strong>{formData.childGrade || '—'}</strong></p>
        {formData.childPreviousSchool && <p>{t.reviewPrevSchool} <strong>{formData.childPreviousSchool}</strong></p>}
      </ReviewCard>
      {program && (
        <ReviewCard title={t.reviewProgram} onEdit={() => onEdit(2)} editLabel={t.reviewEdit} tone="primary">
          <p className="font-semibold text-neutral-900">{getProgramName(program, language)}</p>
          <p className="text-neutral-500">{formData.childGrade} · {school.schoolYear}</p>
          <p className="text-[11px] text-blue-600 font-medium mt-3">{t.reviewFinalNote}</p>
        </ReviewCard>
      )}
    </div>
  )
}

function ReviewCard({ title, onEdit, editLabel, tone = 'neutral', children }) {
  return (
    <div className={`p-4 sm:p-5 rounded-xl border ${tone === 'primary' ? 'bg-primary-50/60 border-primary-100' : 'bg-surface-alt border-neutral-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.12em]">{title}</h3>
        <button onClick={onEdit} className="text-[11px] font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 touch-target rounded-lg px-2 py-1">
          <Pencil size={11} />{editLabel}
        </button>
      </div>
      <div className="space-y-1 text-xs sm:text-sm text-neutral-600">{children}</div>
    </div>
  )
}

function ContactStep({ t, school, onContact }) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.choiceTitle}</h2>
      <p className="text-neutral-500 text-xs sm:text-sm mb-1">{t.choiceSubtitle}</p>
      <div className="p-5 sm:p-6 rounded-2xl border-2 border-primary-200 bg-primary-50/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0"><Building2 size={22} /></div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">{t.schoolFinalizeTitle}</h3>
            <p className="text-neutral-600 text-sm mb-4">{t.schoolFinalizeDesc}</p>
            <div className="space-y-2 text-xs text-neutral-600">
              <span className="flex items-start gap-2"><MapPin size={13} className="text-primary-500 shrink-0" />{school.address}</span>
              <a href={`tel:${school.phone}`} className="flex items-center gap-2 hover:text-primary-600"><Phone size={13} className="text-primary-500 shrink-0" />{school.phone}</a>
              <span className="flex items-center gap-2"><Clock size={13} className="text-primary-500 shrink-0" />{school.openingHours.label}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-primary-100 flex items-start gap-2 text-xs text-primary-800">
              <Banknote size={14} className="shrink-0 mt-0.5" />
              {t.bankPaymentDesc}
            </div>
          </div>
        </div>
        <Button variant="primary" size="md" onClick={onContact} className="w-full mt-5 text-sm">
          <MessageCircle size={15} />{t.contactAdmissions}<ArrowRight size={15} />
        </Button>
      </div>
    </div>
  )
}

function FinalStep({ t, formData, appRef, program, language, school, waPreReg }) {
  const mapQuery = encodeURIComponent(school.address)
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
  const date = new Date().toLocaleDateString(language === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="space-y-5 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12, stiffness: 150 }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 bg-emerald-100">
        <Check size={30} className="text-emerald-600" />
      </motion.div>
      <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{t.schoolConfirmTitle}</h2>
      <p className="text-neutral-500 text-xs sm:text-sm mb-6 max-w-md mx-auto">{t.schoolConfirmDesc} <strong>{formData.childFirstName} {formData.childLastName}</strong>.</p>

      <div className="max-w-xs mx-auto p-4 sm:p-6 rounded-2xl bg-surface-alt border border-neutral-200 space-y-2.5 text-left">
        <DetailRow label={t.finalRefLabel} value={appRef} mono />
        <DetailRow label={t.finalChildLabel} value={`${formData.childFirstName} ${formData.childLastName}`} />
        <DetailRow label={t.finalGradeLabel} value={formData.childGrade || '—'} />
        {program && <DetailRow label={t.finalProgramLabel} value={getProgramName(program, language)} />}
        <DetailRow label={t.finalYearLabel} value={school.schoolYear} />
        <DetailRow label={t.finalDateLabel} value={date} />
        <DetailRow label={t.finalStatusLabel} value={t.statusPreReg} badge />
      </div>

      <div className="max-w-sm mx-auto p-4 rounded-xl bg-primary-50 border border-primary-100 text-left">
        <p className="text-primary-900 text-xs sm:text-sm font-semibold mb-2">{t.finalNextTitle}</p>
        <p className="text-primary-800 text-xs">{t.finalPaymentNote}</p>
      </div>

      <div className="max-w-md mx-auto mt-8">
        <div className="space-y-4 text-left">
          {[
            { title: t.finalStep1Title, desc: t.finalStep1Desc },
            { title: t.finalStep2Title, desc: t.finalStep2Desc },
            { title: t.finalStep3Title, desc: t.finalStep3Desc },
            { title: t.finalStep4Title, desc: t.finalStep4Desc },
          ].map((item, index) => (
            <div key={item.title} className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">{String(index + 1).padStart(2, '0')}</div>
              <div><h4 className="font-semibold text-neutral-900 text-sm mb-0.5">{item.title}</h4><p className="text-neutral-500 text-xs">{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="primary" size="md" href={waPreReg} target="_blank" rel="noopener noreferrer" className="text-sm bg-emerald-600 hover:bg-emerald-700"><MessageCircle size={15} />{t.finalCtaSecondary}</Button>
        <Button variant="outline" size="md" href={mapLink} target="_blank" rel="noopener noreferrer" className="text-sm"><MapPin size={15} />{t.finalCtaPrimary}</Button>
        <Button variant="ghost" size="md" to="/" className="text-sm">{t.finalCtaHome}</Button>
      </div>
    </div>
  )
}

function DetailRow({ label, value, mono = false, badge = false }) {
  return (
    <div className="flex justify-between items-center gap-3 text-xs sm:text-sm">
      <span className="text-neutral-500">{label}</span>
      {badge ? <span className="font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px]">{value}</span> : <span className={`font-medium text-neutral-800 text-right ${mono ? 'font-mono text-[11px]' : ''}`}>{value}</span>}
    </div>
  )
}
