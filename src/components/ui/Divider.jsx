import { cn } from '../../utils/cn'

/**
 * Divider — 1px hairline. `tone="ink"` for dark surfaces.
 * Decorative by default (role="presentation"); pass `decorative={false}`
 * to expose it as a real <hr> separator.
 */
export default function Divider({ tone = 'light', decorative = true, className, ...props }) {
  return (
    <hr
      role={decorative ? 'presentation' : undefined}
      aria-hidden={decorative || undefined}
      className={cn('border-0 border-t', tone === 'ink' ? 'border-border-inverse' : 'border-border', className)}
      {...props}
    />
  )
}
