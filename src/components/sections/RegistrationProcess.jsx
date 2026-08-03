import { ClipboardList, UserCheck, FileText, CheckCircle, CreditCard, PartyPopper } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import Button from '../ui/Button'
import { useT } from '../../hooks/useT'

export default function RegistrationProcess() {
  const t = useT()
  const steps = [
    { icon: ClipboardList, title: t.regProcess.step1Title, description: t.regProcess.step1Desc },
    { icon: UserCheck, title: t.regProcess.step2Title, description: t.regProcess.step2Desc },
    { icon: FileText, title: t.regProcess.step3Title, description: t.regProcess.step3Desc },
    { icon: CheckCircle, title: t.regProcess.step4Title, description: t.regProcess.step4Desc },
    { icon: CreditCard, title: t.regProcess.step5Title, description: t.regProcess.step5Desc },
    { icon: PartyPopper, title: t.regProcess.step6Title, description: t.regProcess.step6Desc },
  ]
  return (
    <section id="registration-process" className="py-section bg-white">
      <div className="container-page">
        <SectionHeading
          label={t.regProcess.label}
          title={t.regProcess.title}
          subtitle={t.regProcess.subtitle}
        />

        <div className="max-w-4xl mx-auto">
          {/* Mobile: 1-col | sm: 2-col | lg: 3-col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 rounded-2xl bg-surface-alt hover:bg-primary-50/50 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                      <step.icon size={15} className="text-primary-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-sm mb-1">{step.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-10 md:mt-14">
              <p className="text-neutral-500 text-xs sm:text-sm mb-4">
                {t.regProcess.ready}
              </p>
              <Button variant="accent" size="lg" to="/registration" className="text-sm md:text-base">
                {t.regProcess.startNow}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
