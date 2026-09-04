import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Progress indicator for the registration flow.
 *
 * Mobile (<640px): the 6 labels ("Vérification", "Programme"…) cannot fit on a
 * 360px screen, so we show a compact dot rail plus the current step label.
 * No horizontal scrolling.
 *
 * Tablet+ (≥640px): full numbered stepper with labels underneath.
 */
export default function Stepper({ currentStep, labels }) {
  const steps = labels || ['Parent', 'Child', 'Program', 'Review', 'Finalize', 'Done']
  const total = steps.length
  const current = Math.min(Math.max(currentStep, 0), total - 1)
  const pct = total > 1 ? (current / (total - 1)) * 100 : 0

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-valuetext={`${steps[current]} — ${current + 1}/${total}`}
    >
      {/* ── Mobile: progress bar + current label ── */}
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between mb-2 gap-3">
          <span className="text-sm font-semibold text-primary-700 truncate">
            {steps[current]}
          </span>
          <span className="text-xs font-medium text-neutral-400 shrink-0 tabular-nums">
            {current + 1}/{total}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-600 transition-all duration-500 ease-out"
            style={{ width: `${Math.max(pct, 4)}%` }}
          />
        </div>
      </div>

      {/* ── Tablet & desktop: full stepper ── */}
      <div className="hidden sm:flex items-start justify-between gap-1">
        {steps.map((label, i) => {
          const isCompleted = i < current
          const isCurrent = i === current
          const isLast = i === total - 1

          return (
            <div key={label} className="flex items-start flex-1 min-w-0 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 min-w-0">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all duration-300',
                    isCompleted && 'bg-emerald-500 text-white',
                    isCurrent && 'bg-primary-600 text-white ring-2 ring-primary-100 ring-offset-1',
                    !isCompleted && !isCurrent && 'bg-neutral-100 text-neutral-400'
                  )}
                >
                  {isCompleted ? <Check size={15} /> : i + 1}
                </div>
                <span
                  className={cn(
                    'text-[11px] font-semibold text-center leading-tight px-0.5 hyphens-auto',
                    isCurrent && 'text-primary-600',
                    isCompleted && 'text-emerald-600',
                    !isCompleted && !isCurrent && 'text-neutral-400'
                  )}
                >
                  {label}
                </span>
              </div>

              {!isLast && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mt-[18px] mx-1 rounded-full transition-colors duration-300',
                    i < current ? 'bg-emerald-400' : 'bg-neutral-200'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
