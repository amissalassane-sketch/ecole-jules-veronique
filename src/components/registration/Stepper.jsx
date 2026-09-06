import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Stepper — registration progress (re-skin on V2 tokens, same API).
 *
 *  < 640 : current label (Inter 600 15) + 2 px primary rail. Phase 3.3: the
 *          « n/total » fraction was dropped here — the « Étape n sur 6 » caption
 *          immediately below already carried it (visual duplicate); screen
 *          readers keep the fraction via aria-valuetext.
 *  ≥ 640 : numbered 32 px discs — done = primary + Check 16, current = primary
 *          with 2 px primary-light ring, upcoming = linen/text-3 — connected by
 *          1 px hairlines; labels caption 13. No emerald, no rounded-full pills
 *          beyond the disc itself, state also conveyed by number/check + label.
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
      {/* ── Mobile: label + rail ── */}
      <div className="sm:hidden">
        <span className="mb-2 block truncate text-[15px] font-semibold text-text-1">{steps[current]}</span>
        <div className="h-0.5 w-full bg-border overflow-hidden">
          <div
            className="h-full bg-primary transition-[width] duration-(--duration-panel) ease-out"
            style={{ width: `${Math.max(pct, 4)}%` }}
          />
        </div>
      </div>

      {/* ── Tablet & desktop ── */}
      <ol className="hidden sm:flex items-start justify-between gap-1">
        {steps.map((label, i) => {
          const done = i < current
          const active = i === current
          const last = i === total - 1
          return (
            <li key={label} className="flex items-start flex-1 min-w-0 last:flex-none" aria-current={active ? 'step' : undefined}>
              <div className="flex flex-col items-center gap-2 min-w-0">
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-pill text-caption font-semibold tabular-nums',
                    'transition-colors duration-(--duration-base)',
                    done && 'bg-primary text-text-inverse',
                    active && 'bg-primary text-text-inverse ring-2 ring-primary-light ring-offset-2 ring-offset-paper',
                    !done && !active && 'bg-linen text-text-3'
                  )}
                  aria-hidden="true"
                >
                  {done ? <Check size={16} strokeWidth={2} /> : i + 1}
                </span>
                <span
                  className={cn(
                    'text-caption text-center leading-tight px-0.5 hyphens-auto',
                    active ? 'font-semibold text-text-1' : done ? 'text-text-2' : 'text-text-3'
                  )}
                >
                  {label}
                </span>
              </div>
              {!last && (
                <span
                  aria-hidden="true"
                  className={cn('h-px flex-1 mt-4 mx-2 transition-colors duration-(--duration-base)', i < current ? 'bg-primary' : 'bg-border')}
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
