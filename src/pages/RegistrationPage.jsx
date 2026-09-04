import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Pencil, CreditCard, MapPin, Phone, MessageCircle, Clock, Building2 } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Stepper from '../components/registration/Stepper'
import FormField from '../components/registration/FormField'
import { programs } from '../data/programs'
import { pricing } from '../data/pricing'
import { school } from '../data/school'
import { waLinkFor } from '../utils/contact'
import { useT } from '../hooks/useT'
import { isPaymentAvailable } from '../services/payment/paymentService'

const gradeOptions=programs.flatMap((p)=>p.grades.map((g)=>({value:g,label:g+'\u2014 '+p.name})))
const programOptions=programs.map((p)=>({value:p.id,label:p.name+' ('+p.ages+')'}))

export default function RegistrationPage(){const tr=useT().registration;const t=tr
const[step,setStep]=useState(0)
const[choice,setChoice]=useState(null) // 'online' | 'school' | null
const[editingStep,setEditingStep]=useState(null)
const[formData,setFormData]=useState({parentFirstName:'',parentLastName:'',parentPhone:'',parentEmail:'',parentAddress:'',childFirstName:'',childLastName:'',childDob:'',childGrade:'',childPreviousSchool:'',selectedProgram:'',includeCafeteria:false,includeTransport:false})
const[errors,setErrors]=useState({})
const upd=useCallback((e)=>{const{name,value,type,checked}=e.target;setFormData(p=>({...p,[name]:type==='checkbox'?checked:value}));if(errors[name])setErrors(p=>({...p,[name]:''}))},[errors])
const validateStep=useCallback(()=>{const e={};if(step===0){if(!formData.parentFirstName.trim())e.parentFirstName=t.required;if(!formData.parentLastName.trim())e.parentLastName=t.required;if(!formData.parentPhone.trim())e.parentPhone=t.required;if(!formData.parentEmail.trim())e.parentEmail=t.required;else if(!/\S+@\S+\.\S+/.test(formData.parentEmail))e.parentEmail=t.invalidEmail}if(step===1){if(!formData.childFirstName.trim())e.childFirstName=t.required;if(!formData.childLastName.trim())e.childLastName=t.required;if(!formData.childDob)e.childDob=t.required;if(!formData.childGrade)e.childGrade=t.selectGrade}if(step===2){if(!formData.selectedProgram)e.selectedProgram=t.selectProgram}setErrors(e);return Object.keys(e).length===0},[step,formData,t])
const nextStep=useCallback(()=>{if(validateStep())setStep(s=>Math.min(s+1,5))},[validateStep])
const prevStep=useCallback(()=>{setChoice(null);setStep(s=>Math.max(s-1,0))},[])
const goToEditStep=useCallback((ts)=>{setEditingStep(ts);setStep(ts)},[])
const returnToReview=useCallback(()=>{if(editingStep!==null){setStep(3);setEditingStep(null)}},[editingStep])
const spd=programs.find(p=>p.id===formData.selectedProgram)
const sprc=pricing.tuition.find(t=>t.program===spd?.name)
const totalSteps=6
const handleChoice=(c)=>{setChoice(c);setStep(5)}
const appRef=useMemo(()=>'REG-'+String(Date.now()).slice(-6),[])
const waHelpLink=waLinkFor('help')
const stepperLabels=t.stepLabels||['Parent','Child','Program','Review','Finalize','Done']
const paymentReady=isPaymentAvailable()

const waContextMsg=useMemo(()=>{const tmpl=t.waMsgPreReg||'Hello';return tmpl.replace('[PARENT_NAME]',formData.parentFirstName+' '+formData.parentLastName).replace('[CHILD_NAME]',formData.childFirstName+' '+formData.childLastName).replace('[GRADE]',formData.childGrade).replace('[PROGRAM]',spd?.name||'').replace('[NOM_PARENT]',formData.parentFirstName+' '+formData.parentLastName).replace('[NOM_ENFANT]',formData.childFirstName+' '+formData.childLastName).replace('[CLASSE]',formData.childGrade).replace('[PROGRAMME]',spd?.name||'')},[formData,spd,t.waMsgPreReg])
const waPreReg='https://wa.me/'+(school.whatsapp||'').replace(/[^0-9]/g,'')+'?text='+encodeURIComponent(waContextMsg)

return(<><Navbar/><main className="pt-24 sm:pt-28 pb-20 min-h-screen-dynamic bg-surface"><div className="container-page max-w-2xl">
<div className="mb-5 sm:mb-8"><h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">{t.title}</h1><p className="text-neutral-500 text-xs sm:text-sm">{t.subtitle}</p></div>
<div className="mb-4 sm:mb-6"><Stepper currentStep={step} labels={stepperLabels}/></div>
<div className="flex items-center justify-between mb-3 sm:mb-5"><p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em]">{t.stepOf.replace('{current}',step+1).replace('{total}',totalSteps)}</p>{step<5&&(<a href={waHelpLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"><MessageCircle size={13}/>{t.needHelp}</a>)}</div>
<div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 md:p-8 mb-6 shadow-sm"><AnimatePresence mode="wait"><motion.div key={step+choice||''} initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}} transition={{duration:0.25}}>
{step===0&&<SP t={t} fd={formData} up={upd} err={errors} sc={school}/>}
{step===1&&<SC t={t} fd={formData} up={upd} err={errors} go={gradeOptions}/>}
{step===2&&<SPR t={t} fd={formData} up={upd} err={errors} po={programOptions} spd={spd} sprc={sprc}/>}
{step===3&&<SR t={t} fd={formData} gts={goToEditStep} spd={spd} sprc={sprc} school={school}/>}
{step===4&&<SChoice t={t} fd={formData} spd={spd} sprc={sprc} school={school} paymentReady={paymentReady} onChoice={handleChoice}/>}
{step===5&&<SFinal t={t} fd={formData} appRef={appRef} spd={spd} school={school} waPreReg={waPreReg} choice={choice}/>}
</motion.div></AnimatePresence></div>
{step<5&&(<div className="flex justify-between items-center"><Button variant="ghost" size="md" onClick={editingStep!==null?returnToReview:prevStep} disabled={step===0&&editingStep===null} className="text-sm"><ArrowLeft size={15}/>{editingStep!==null?t.backToReview:t.back}</Button><Button variant="primary" size="lg" onClick={editingStep!==null?returnToReview:nextStep} className="text-sm">{editingStep!==null?t.done:t.continue}<ArrowRight size={15}/></Button></div>)}
</div></main><Footer/></>)
}

function SP({t,fd,up,err,sc}){return(<div className="space-y-4 sm:space-y-5"><h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.parentTitle}</h2><p className="text-neutral-500 text-xs sm:text-sm mb-1">{t.parentSubtitle}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"><FormField label={t.parentFirstName} name="parentFirstName" value={fd.parentFirstName} onChange={up} placeholder={t.parentFirstNamePlaceholder} required error={err.parentFirstName}/><FormField label={t.parentLastName} name="parentLastName" value={fd.parentLastName} onChange={up} placeholder={t.parentLastNamePlaceholder} required error={err.parentLastName}/><FormField label={t.parentPhone} name="parentPhone" type="tel" value={fd.parentPhone} onChange={up} placeholder={sc.countryCode+' XX XX XX XX'} required error={err.parentPhone}/><FormField label={t.parentEmail} name="parentEmail" type="email" value={fd.parentEmail} onChange={up} placeholder={t.parentEmailPlaceholder} required error={err.parentEmail}/></div><FormField label={t.parentAddress} name="parentAddress" value={fd.parentAddress} onChange={up} placeholder={t.parentAddressPlaceholder}/></div>)}

function SC({t,fd,up,err,go}){return(<div className="space-y-4 sm:space-y-5"><h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.childTitle}</h2><p className="text-neutral-500 text-xs sm:text-sm mb-1">{t.childSubtitle}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"><FormField label={t.childFirstName} name="childFirstName" value={fd.childFirstName} onChange={up} placeholder={t.childFirstNamePlaceholder} required error={err.childFirstName}/><FormField label={t.childLastName} name="childLastName" value={fd.childLastName} onChange={up} placeholder={t.childLastNamePlaceholder} required error={err.childLastName}/><FormField label={t.childDob} name="childDob" type="date" value={fd.childDob} onChange={up} required error={err.childDob}/><FormField label={t.childGrade} name="childGrade" type="select" value={fd.childGrade} onChange={up} options={go} placeholder={t.selectGrade} required error={err.childGrade}/></div><FormField label={t.childPrevSchool} name="childPreviousSchool" value={fd.childPreviousSchool} onChange={up} placeholder={t.childPrevSchoolPlaceholder}/></div>)}

function SPR({t,fd,up,err,po,spd,sprc}){return(<div className="space-y-4 sm:space-y-5"><h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.programTitle}</h2><p className="text-neutral-500 text-xs sm:text-sm mb-1">{t.programSubtitle}</p><FormField label={t.selectProgram} name="selectedProgram" type="select" value={fd.selectedProgram} onChange={up} options={po} placeholder={t.chooseProgram} required error={err.selectedProgram}/>{spd&&<motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="p-4 sm:p-6 rounded-2xl bg-surface-alt border border-neutral-200 mt-3"><h3 className="font-semibold text-neutral-900 text-sm sm:text-base mb-1.5">{spd.name}</h3><p className="text-neutral-600 text-xs sm:text-sm mb-3">{spd.description}</p><div className="flex flex-wrap gap-1.5 mb-3">{spd.languages.map(l=>(<span key={l} className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-[11px] font-medium">{l}</span>))}<span className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-600 text-[11px] font-medium">{spd.schedule}</span></div>{sprc&&<div className="pt-3 border-t border-neutral-200 flex justify-between items-center"><span className="text-xs sm:text-sm text-neutral-500">{t.programPeriod}</span><span className="font-display text-lg sm:text-xl font-bold text-neutral-900">{sprc.amount}</span></div>}</motion.div>}</div>)}

function SR({t,fd,gts,spd,sprc,school}){return(<div className="space-y-4 sm:space-y-5"><h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.reviewTitle}</h2><p className="text-neutral-500 text-xs sm:text-sm mb-1">{t.reviewSubtitle}</p>
<div className="p-4 sm:p-5 rounded-xl bg-surface-alt"><div className="flex items-center justify-between mb-2.5"><h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.12em]">{t.reviewParent}</h3><button onClick={()=>gts(0)} className="text-[11px] font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 touch-target rounded-lg px-2 py-1"><Pencil size={11}/>{t.reviewEdit}</button></div><div className="grid grid-cols-2 gap-2 text-xs sm:text-sm"><div><span className="text-neutral-500">{t.reviewName}</span> <span className="font-medium text-neutral-800">{fd.parentFirstName} {fd.parentLastName}</span></div><div><span className="text-neutral-500">{t.reviewPhone}</span> <span className="font-medium text-neutral-800">{fd.parentPhone}</span></div><div><span className="text-neutral-500">{t.reviewEmail}</span> <span className="font-medium text-neutral-800">{fd.parentEmail}</span></div><div><span className="text-neutral-500">{t.reviewAddress}</span> <span className="font-medium text-neutral-800">{fd.parentAddress||'\u2014'}</span></div></div></div>
<div className="p-4 sm:p-5 rounded-xl bg-surface-alt"><div className="flex items-center justify-between mb-2.5"><h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.12em]">{t.reviewChild}</h3><button onClick={()=>gts(1)} className="text-[11px] font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 touch-target rounded-lg px-2 py-1"><Pencil size={11}/>{t.reviewEdit}</button></div><div className="grid grid-cols-2 gap-2 text-xs sm:text-sm"><div><span className="text-neutral-500">{t.reviewName}</span> <span className="font-medium text-neutral-800">{fd.childFirstName} {fd.childLastName}</span></div><div><span className="text-neutral-500">{t.reviewDob}</span> <span className="font-medium text-neutral-800">{fd.childDob||'\u2014'}</span></div><div><span className="text-neutral-500">{t.reviewGrade}</span> <span className="font-medium text-neutral-800">{fd.childGrade||'\u2014'}</span></div><div><span className="text-neutral-500">{t.reviewPrevSchool}</span> <span className="font-medium text-neutral-800">{fd.childPreviousSchool||'\u2014'}</span></div></div></div>
{spd&&<div className="p-4 sm:p-5 rounded-xl bg-primary-50/60 border border-primary-100"><div className="flex items-center justify-between mb-3"><h3 className="text-[11px] font-semibold text-primary-500 uppercase tracking-[0.12em]">{t.reviewProgram}</h3><button onClick={()=>gts(2)} className="text-[11px] font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 touch-target rounded-lg px-2 py-1"><Pencil size={11}/>{t.reviewEdit}</button></div><div className="mb-3"><p className="font-semibold text-neutral-900 text-sm">{spd.name}</p><p className="text-neutral-500 text-xs">{spd.ages} &bull; {school.schoolYear}</p></div>{sprc&&<div className="pt-3 border-t border-primary-100/60 flex justify-between items-center"><span className="text-xs sm:text-sm text-neutral-500">{t.programPeriod}</span><span className="font-display text-lg font-bold text-neutral-900">{sprc.amount}</span></div>}<p className="text-[11px] text-blue-600 font-medium mt-3">{t.reviewFinalNote}</p></div>}</div>)}

// ── STEP 4: Choose how to finalize ──
function SChoice({t,fd,spd,sprc,school,paymentReady,onChoice}){
  return(<div className="space-y-5">
    <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.choiceTitle}</h2>
    <p className="text-neutral-500 text-xs sm:text-sm mb-1">{t.choiceSubtitle}</p>

    {/* Option A: Pay Online */}
    <button onClick={()=>onChoice('online')} className="w-full text-left p-5 sm:p-6 rounded-2xl border-2 border-neutral-200 hover:border-accent-400 bg-white hover:shadow-md transition-all duration-300 group cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center shrink-0 group-hover:bg-accent-200 transition-colors"><CreditCard size={22}/></div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">{t.payOnlineTitle}</h3>
          <p className="text-neutral-500 text-sm mb-3">{t.payOnlineDesc}</p>
          {sprc&&<div className="inline-block px-4 py-2 rounded-xl bg-accent-50 text-accent-700 font-display text-lg font-bold">{sprc.amount}</div>}
          {!paymentReady&&<p className="text-amber-600 text-xs mt-2 font-medium">{t.providerNotConfigured}</p>}
        </div>
        <ArrowRight size={20} className="text-neutral-300 group-hover:text-accent-500 shrink-0 mt-1 transition-colors"/>
      </div>
    </button>

    {/* Option B: Finalize at School */}
    <button onClick={()=>onChoice('school')} className="w-full text-left p-5 sm:p-6 rounded-2xl border-2 border-neutral-200 hover:border-primary-300 bg-white hover:shadow-md transition-all duration-300 group cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors"><Building2 size={22}/></div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">{t.schoolFinalizeTitle}</h3>
          <p className="text-neutral-500 text-sm mb-3">{t.schoolFinalizeDesc}</p>
          <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1"><MapPin size={12}/>{school.address}</span>
            <span className="inline-flex items-center gap-1"><Phone size={12}/>{school.phone}</span>
            <span className="inline-flex items-center gap-1"><Clock size={12}/>{school.openingHours.weekdays}</span>
          </div>
        </div>
        <ArrowRight size={20} className="text-neutral-300 group-hover:text-primary-500 shrink-0 mt-1 transition-colors"/>
      </div>
    </button>
  </div>)
}

// ── STEP 5: Confirmation ──
function SFinal({t,fd,appRef,spd,school,waPreReg,choice}){
  const isOnline=choice==='online'
  const mq=school.address.replace(/\[|\]/g,'').replace(/\s+/g,'+')
  const mu='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(mq)
  return(<div className="space-y-5 text-center">
<motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',damping:12,stiffness:150}} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6" style={{backgroundColor:isOnline?'#fef3c7':'#d1fae5'}}><Check size={30} style={{color:isOnline?'#d97706':'#059669'}}/></motion.div>
<h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{isOnline?t.payOnlineConfirmTitle:t.schoolConfirmTitle}</h2>
<p className="text-neutral-500 text-xs sm:text-sm mb-6 max-w-md mx-auto">{isOnline?t.payOnlineConfirmDesc:t.schoolConfirmDesc} <strong>{fd.childFirstName} {fd.childLastName}</strong>.</p>

{/* Reference card */}
<div className="max-w-xs mx-auto p-4 sm:p-6 rounded-2xl bg-surface-alt border border-neutral-200 space-y-2.5 text-left">
<DR label={t.finalRefLabel} value={appRef} mono/>
<DR label={t.finalChildLabel} value={fd.childFirstName+' '+fd.childLastName}/>
<DR label={t.finalGradeLabel} value={fd.childGrade||'\u2014'}/>
{spd&&<DR label={t.finalProgramLabel} value={spd.name}/>}
<DR label={t.finalYearLabel} value={school.schoolYear}/>
<DR label={t.finalDateLabel} value={new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}/>
<DR label={t.finalStatusLabel} value={isOnline?t.statusPending:t.statusPreReg} badge/>
</div>

{/* Online payment: provider not configured notice */}
{isOnline&&<div className="max-w-sm mx-auto p-4 rounded-xl bg-amber-50 border border-amber-200 text-left">
  <p className="text-amber-800 text-xs sm:text-sm font-medium mb-2">{t.providerNotConfiguredTitle}</p>
  <p className="text-amber-700 text-xs">{t.providerNotConfiguredDesc}</p>
  <p className="text-amber-600 text-[11px] mt-2">{t.providerNotConfiguredNote}</p>
</div>}

{/* School finalization: info card */}
{!isOnline&&<div className="max-w-sm mx-auto p-4 rounded-xl bg-surface-alt border border-neutral-200 text-left space-y-2">
  <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.12em]">{school.shortName}</p>
  <div className="space-y-1.5 text-xs sm:text-sm text-neutral-600">
    <div className="flex items-start gap-2"><MapPin size={13} className="text-neutral-400 shrink-0 mt-0.5"/><span>{school.address}</span></div>
    <div className="flex items-center gap-2"><Phone size={13} className="text-neutral-400 shrink-0"/><a href={'tel:'+school.phone} className="hover:text-primary-600">{school.phone}</a></div>
    <div className="flex items-center gap-2"><Clock size={13} className="text-neutral-400 shrink-0"/><span>{school.openingHours.weekdays}</span></div>
  </div>
  <p className="text-[11px] text-blue-600 font-medium pt-1">{t.finalPaymentNote}</p>
</div>}

{/* What happens next */}
<div className="max-w-md mx-auto mt-8"><h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900 mb-5 text-left">{t.finalNextTitle}</h3><div className="space-y-4">
  {isOnline?[
    {n:'01',ti:t.nextStep1Title,de:t.nextStep1Desc},
    {n:'02',ti:t.nextStep2Title,de:t.nextStep2Desc},
    {n:'03',ti:t.nextStep3Title,de:t.nextStep3Desc},
    {n:'04',ti:t.nextStep4Title,de:t.nextStep4Desc},
  ]:[
    {n:'01',ti:t.finalStep1Title,de:t.finalStep1Desc},
    {n:'02',ti:t.finalStep2Title,de:t.finalStep2Desc},
    {n:'03',ti:t.finalStep3Title,de:t.finalStep3Desc},
    {n:'04',ti:t.finalStep4Title,de:t.finalStep4Desc},
  ].map((s,i)=>(<div key={i} className="flex gap-3 text-left"><div className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">{s.n}</div><div><h4 className="font-semibold text-neutral-900 text-sm mb-0.5">{s.ti}</h4><p className="text-neutral-500 text-xs">{s.de}</p></div></div>))}</div></div>

{/* CTAs */}
<div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
  <Button variant="primary" size="md" href={waPreReg} target="_blank" rel="noopener noreferrer" className="text-sm bg-emerald-600 hover:bg-emerald-700"><MessageCircle size={15}/>{t.finalCtaSecondary}</Button>
  <Button variant="outline" size="md" href={'tel:'+school.phone} className="text-sm"><Phone size={15}/>{school.phone}</Button>
  <Button variant="ghost" size="md" to="/" className="text-sm">{t.finalCtaHome}</Button>
</div></div>)}
function DR({label,value,mono,badge}){return(<div className="flex justify-between items-center text-xs sm:text-sm"><span className="text-neutral-500">{label}</span>{badge?<span className="font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px]">{value}</span>:<span className={'font-medium text-neutral-800'+(mono?' font-mono text-[11px]':'')}>{value}</span>}</div>)}
