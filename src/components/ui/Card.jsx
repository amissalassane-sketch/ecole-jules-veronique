import { cn } from '../../utils/cn'

/**
 * Card — Design System V2 §11. Four types, no more.
 *
 *  default : white · 1px border · radius md · padding 24/32 · no shadow
 *  program : default + 3px primary left rule (§09) · padding 24/32 · one per programme
 *  stat    : no bg · no border · bordered left rule · number + label
 *  notice  : tinted surface · 1px tinted border · optional icon · used for
 *            info / warning / success / error messages
 *
 * Depth comes from structure (borders, spacing), never from shadow.
 */

const TYPES = {
  default: 'bg-white border border-border rounded-md p-6 md:p-8',
  program: 'bg-white border border-border border-l-[3px] border-l-primary rounded-md p-6 md:p-8',
  stat: 'border-l-2 border-gold pl-5 py-1',
  notice: 'rounded-md border p-4 md:p-5',
}

const TONES = {
  info: 'bg-primary-light border-primary/25 text-text-1',
  success: 'bg-success-light border-success/30 text-text-1',
  warning: 'bg-warning-light border-warning/30 text-text-1',
  error: 'bg-error-light border-error/30 text-text-1',
}

export default function Card({
  as: Tag = 'div',
  type = 'default',
  tone = 'info',
  interactive = false,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        TYPES[type] || TYPES.default,
        type === 'notice' && (TONES[tone] || TONES.info),
        interactive &&
          'transition-[border-color,transform] duration-[200ms] ease-out hover:border-border-strong motion-safe:hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** Stat card content helper: big Playfair figure + Inter label. */
export function StatCard({ value, label, className, ...props }) {
  return (
    <Card type="stat" className={className} {...props}>
      <p className="font-display font-semibold text-stat text-text-1 tabular-nums">{value}</p>
      <p className="mt-1 text-body-sm text-text-2">{label}</p>
    </Card>
  )
}

/** Notice card with optional Lucide icon (size 20, stroke 1.75). */
const NOTICE_ICON = {
  info: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}

export function NoticeCard({ tone = 'info', icon: Icon, title, children, className, ...props }) {
  return (
    <Card type="notice" tone={tone} role={tone === 'error' ? 'alert' : 'status'} className={cn('flex items-start gap-3', className)} {...props}>
      {Icon && <Icon size={20} strokeWidth={1.75} className={cn('mt-0.5 shrink-0', NOTICE_ICON[tone])} aria-hidden="true" />}
      <div className="min-w-0">
        {title && <p className="font-semibold text-body-sm text-text-1">{title}</p>}
        {children && <div className={cn('text-body-sm text-text-2', title && 'mt-1')}>{children}</div>}
      </div>
    </Card>
  )
}
