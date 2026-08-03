import { motion } from 'framer-motion'
import { Globe, Sparkles, Brain, MessageSquareText } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { school } from '../../data/school'
import { useT } from '../../hooks/useT'

export default function Bilingual() {
  const t = useT()
  const benefits = [
    { icon: Brain, title: t.bilingual.cognitiveTitle, description: t.bilingual.cognitiveDesc },
    { icon: Globe, title: t.bilingual.culturalTitle, description: t.bilingual.culturalDesc },
    { icon: MessageSquareText, title: t.bilingual.communicationTitle, description: t.bilingual.communicationDesc },
    { icon: Sparkles, title: t.bilingual.futureTitle, description: t.bilingual.futureDesc },
  ]
  return (
    <section id="bilingual" className="py-section bg-primary-950 text-white relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary-600/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent-500/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: 'clamp(30px, 4vw, 40px) clamp(30px, 4vw, 40px)' }}
        />
      </div>

      <div className="container-page relative z-10">
        <SectionHeading
          label={t.bilingual.label}
          title={t.bilingual.title}
          subtitle={t.bilingual.subtitle}
          light
        />

        {/* Quote visual */}
        <ScrollReveal className="mb-14 md:mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-8 md:p-12 text-center overflow-hidden">
              <div className="absolute top-3 left-4 sm:top-4 sm:left-6 flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
              </div>
              <motion.blockquote
                className="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mt-4 sm:mt-6 text-balance"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                &ldquo;{t.bilingual.quote}&rdquo;
              </motion.blockquote>
              <div className="mt-5 flex justify-center gap-4 text-xs sm:text-sm text-white/45 font-medium">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-400 shrink-0" />
                  {school.languages[0]}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-300 shrink-0" />
                  {school.languages[1]}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* How it works */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 text-center">
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-3">{t.bilingual.howItWorksTitle}</h3>
          <p className="text-white/55 leading-relaxed text-sm sm:text-base">
            {t.bilingual.howItWorksDesc}
          </p>
        </div>

        {/* Benefits — 2x2 mobile, 4-col desktop */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 sm:p-6 h-full hover:bg-white/10 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                  <b.icon size={18} className="text-accent-400" />
                </div>
                <h4 className="font-semibold text-white text-sm sm:text-base mb-1.5">{b.title}</h4>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{b.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
