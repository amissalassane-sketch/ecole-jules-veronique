import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function Stepper({ currentStep, labels }) {
  const steps = labels || ['Parent','Child','Program','Documents','Review','Application','Finalization']
  return (
    <div className="w-full overflow-x-auto scrollbar-none">
      <div className="flex justify-center min-w-max px-1 pb-1">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center">
            {steps.map((label, i) => {
              const isCompleted = i < currentStep
              const isCurrent = i === currentStep
              const isLast = i === steps.length - 1
              return (
                <div key={i} className="flex items-center">
                  <div className={cn('w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 text-xs sm:text-sm font-bold transition-all duration-300',isCompleted&&'bg-emerald-500 text-white',isCurrent&&'bg-primary-600 text-white ring-2 ring-primary-100 ring-offset-1',!isCompleted&&!isCurrent&&'bg-neutral-100 text-neutral-400')}>
                    {isCompleted ? <Check size={14} /> : i + 1}
                  </div>
                  {!isLast && <div className={cn('h-0.5 w-6 sm:w-8 md:w-10 mx-0.5 sm:mx-1 shrink-0 transition-colors duration-300 rounded-full',i<currentStep?'bg-emerald-400':'bg-neutral-200')} />}
                </div>
              )
            })}
          </div>
          <div className="flex">
            {steps.map((label, i) => {
              const isCompleted = i < currentStep
              const isCurrent = i === currentStep
              const isLast = i === steps.length - 1
              return (
                <div key={i} className="flex">
                  <span className={cn('w-8 h-8 sm:w-9 sm:h-9 flex items-start justify-center text-[9px] sm:text-[10px] font-semibold whitespace-nowrap transition-colors pt-1',isCurrent&&'text-primary-600',isCompleted&&'text-emerald-600',!isCompleted&&!isCurrent&&'text-neutral-400')}>{label}</span>
                  {!isLast && <div className="w-7 sm:w-9 md:w-11 shrink-0" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
