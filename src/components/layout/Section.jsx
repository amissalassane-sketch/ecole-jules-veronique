import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

/**
 * Section — vertical rhythm + surface, §06/§08.
 *
 * spacing : 'default' 64/80/96 · 'compact' 40/48/64 · 'air' 80/96/128 · 'none'
 * tone    : 'paper' (default) · 'linen' · 'white' · 'ink' (dark, sets .on-ink
 *           so the global focus ring switches to gold)
 * container : 'page' | 'prose' | 'narrow' | false (render children raw)
 */
const SPACING = {
  default: 'py-section',          /* clamp 64 → 96 */
  compact: 'py-section-compact',  /* clamp 40 → 64 */
  air: 'py-section-air',          /* clamp 80 → 128 */
  none: '',
}
const TONE = {
  paper: 'bg-paper text-text-1',
  linen: 'bg-linen text-text-1',
  white: 'bg-white text-text-1',
  ink: 'bg-ink text-text-inverse on-ink',
}
const CONTAINER = {
  page: 'container-page',
  prose: 'container-prose',
  narrow: 'container-narrow',
}

const Section = forwardRef(function Section(
  { as: Tag = 'section', spacing = 'default', tone = 'paper', container = 'page', className, innerClassName, children, ...props },
  ref
) {
  const inner = container ? <div className={cn(CONTAINER[container] || CONTAINER.page, innerClassName)}>{children}</div> : children
  return (
    <Tag ref={ref} data-tone={tone === 'ink' ? 'ink' : undefined} className={cn(SPACING[spacing] ?? SPACING.default, TONE[tone] || TONE.paper, className)} {...props}>
      {inner}
    </Tag>
  )
})

export default Section

/** Standalone container when a Section is not wanted. */
export function Container({ as: Tag = 'div', size = 'page', className, children, ...props }) {
  return (
    <Tag className={cn(CONTAINER[size] || CONTAINER.page, className)} {...props}>
      {children}
    </Tag>
  )
}
