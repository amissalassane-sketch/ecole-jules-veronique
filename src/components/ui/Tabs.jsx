import { useRef } from 'react'
import { cn } from '../../utils/cn'

/**
 * Tabs — DS V2 §08 (S5) / §16. Text tabs on a hairline, selected = 2px
 * primary underline. No pills. Automatic activation, roving tabindex,
 * ← → Home End. Each tab controls `${id}-panel`; render the panel with
 * <TabPanel id={id}>.
 *
 * items: [{ id, label }] · value: active id · onChange(id) · label: tablist name
 */
export default function Tabs({ items, value, onChange, label, className }) {
  const refs = useRef([])

  const focusAt = (i) => {
    const n = items.length
    const next = (i + n) % n
    refs.current[next]?.focus()
    onChange(items[next].id)
  }

  const onKeyDown = (e, i) => {
    const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: items.length - 1 }
    if (map[e.key] === undefined) return
    e.preventDefault()
    focusAt(map[e.key])
  }

  return (
    <div role="tablist" aria-label={label} className={cn('flex gap-x-8 border-b border-border', className)}>
      {items.map((item, i) => {
        const selected = item.id === value
        return (
          <button
            key={item.id}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`${item.id}-tab`}
            aria-selected={selected}
            aria-controls={`${item.id}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              '-mb-px min-h-[44px] px-1 pb-3 pt-2 font-medium text-[15px] border-b-2 cursor-pointer',
              'transition-[color,border-color] duration-[120ms] ease-out',
              selected ? 'text-text-1 border-primary' : 'text-text-2 border-transparent hover:text-text-1'
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export function TabPanel({ id, className, children, ...props }) {
  return (
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab`} tabIndex={0} className={className} {...props}>
      {children}
    </div>
  )
}
