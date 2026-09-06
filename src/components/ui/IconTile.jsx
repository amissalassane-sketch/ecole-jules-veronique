import { cn } from '../../utils/cn'

/**
 * IconTile — §12. A Lucide icon on a quiet tinted square.
 * sizes: sm 40px/icon 20 · md 48px/icon 24 · lg 56px/icon 28
 * tones: primary (primary-light bg) · gold (gold-light/20 on ink) · neutral (linen)
 * Purely decorative: the icon is aria-hidden; label the parent instead.
 */
const SIZES = {
  sm: { box: 'h-10 w-10 rounded-sm', icon: 20 },
  md: { box: 'h-12 w-12 rounded-md', icon: 24 },
  lg: { box: 'h-14 w-14 rounded-md', icon: 28 },
}
const TONES = {
  primary: 'bg-primary-light text-primary',
  gold: 'bg-gold-light/20 text-gold-light',
  neutral: 'bg-linen text-text-2',
}

export default function IconTile({ icon: Icon, size = 'md', tone = 'primary', className, ...props }) {
  const s = SIZES[size] || SIZES.md
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center', s.box, TONES[tone] || TONES.primary, className)}
      aria-hidden="true"
      {...props}
    >
      {Icon && <Icon size={s.icon} strokeWidth={1.75} />}
    </span>
  )
}
