import { cn } from '../../utils/cn'

/**
 * Eyebrow — §05 : Inter 600 · 13px · uppercase · tracking .08em · gold-deep
 * (gold-light on ink) · optional 24px hairline before the label.
 */
export default function Eyebrow({ as: Tag = 'p', tone = 'light', rule = true, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        'text-eyebrow font-semibold uppercase',
        tone === 'ink' ? 'text-gold-light' : 'text-gold-deep',
        rule && 'eyebrow-rule',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
