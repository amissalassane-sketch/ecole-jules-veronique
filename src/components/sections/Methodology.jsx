import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, Lightbulb, FlaskConical, TrendingUp } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { useT } from '../../hooks/useT'

const icons = [Search, Lightbulb, FlaskConical, TrendingUp]
const grads = ['from-primary-400 to-primary-600','from-accent-400 to-accent-600','from-emerald-400 to-emerald-600','from-violet-400 to-violet-600']
const nums = ['01','02','03','04']

export default function Methodology() {
  const t = useT()
  const containerRef = useRef(null)
  return (
    <section ref={containerRef} className="py-section bg-white relative overflow-hidden">
      <div className="container-page">
        <SectionHeading label={t.methodology.label} title={t.methodology.title} subtitle={t.methodology.subtitle} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          <div className="hidden lg:block lg:sticky lg:top-28">
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-primary-50 to-surface-alt overflow-hidden">
              <motion.div className="absolute top-1/4 left-1/4 w-28 lg:w-32 h-28 lg:h-32 rounded-full bg-primary-200/40" animate={{scale:[1,1.08,1],x:[0,8,0],y:[0,-8,0]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}/>
              <motion.div className="absolute bottom-1/3 right-1/4 w-20 lg:w-24 h-20 lg:h-24 rounded-full bg-accent-200/50" animate={{scale:[1,1.12,1],x:[0,-12,0],y:[0,8,0]}} transition={{duration:10,repeat:Infinity,ease:'easeInOut',delay:1}}/>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center"><Lightbulb size={32} className="text-accent-500"/></div>
              </div>
            </div>
          </div>
          <div className="space-y-10 sm:space-y-14 md:space-y-20">
            {[0,1,2,3].map((i) => { const Ico = icons[i]; return (
              <motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:0.5,delay:i*0.08}} className="flex gap-4 sm:gap-5">
                <div className="shrink-0"><div className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${grads[i]} flex items-center justify-center shadow-md`}><Ico size={18} className="text-white sm:size-[20px]"/></div></div>
                <div className="min-w-0 pt-0.5">
                  <div className="flex items-baseline gap-2.5 mb-1.5">
                    <span className="text-[11px] font-bold text-primary-400 tracking-[0.12em] shrink-0">{nums[i]}</span>
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900">{t.methodology['step'+(i+1)+'Title']}</h3>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">{t.methodology['step'+(i+1)+'Desc']}</p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </div>
    </section>
  )
}
