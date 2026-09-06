import { cn } from '../../utils/cn'

/**
 * Badge — DS V2 §09/§17. Status label: radius xs, 13px, Inter 500,
 * semantic text+bg pairs only. Closed vocabulary:
 *   available → « Disponible » / open levels  (success)
 *   planned   → « En cours » / « À confirmer » (warning)
 *   info      → neutral note                   (primary on primary-light)
 * Legacy V1 names are mapped so untouched sections keep rendering.
 */
const VARIANTS = {
  available: 'bg-success-light text-success',
  planned: 'bg-warning-light text-warning',
  info: 'bg-primary-light text-primary',
}
const LEGACY = { default: 'info', primary: 'info', accent: 'planned', success: 'available' }

export default function Badge({ children, variant = 'info', className, ...props }) {
  const v = VARIANTS[variant] ? variant : LEGACY[variant] || 'info'
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-xs px-2 py-0.5 text-caption font-medium leading-[1.5]', VARIANTS[v], className)}
      {...props}
    >
      {children}
    </span>
  )
}
