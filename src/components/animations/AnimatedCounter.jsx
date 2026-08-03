import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useCountUp } from '../../hooks/useCountUp'
import { cn } from '../../utils/cn'

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  light = false,
  className,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })
  const count = useCountUp(value, 2200, isVisible)

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className={cn(
        'font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-2 tabular-nums',
        light ? 'text-white' : 'text-primary-600'
      )}>
        {prefix}{count}{suffix}
      </div>
      <p className={cn(
        'text-sm md:text-base font-medium',
        light ? 'text-white/60' : 'text-neutral-600'
      )}>
        {label}
      </p>
    </div>
  )
}
