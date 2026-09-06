import { cn } from '../../utils/cn'

/**
 * Quote — DS V2 §05/§09. Playfair 600 italic, clamp 24 → 36, max 40ch,
 * one vertical gold hairline on the left. No decorative quotation marks,
 * no frame. `tone="ink"` for dark surfaces.
 */
export default function Quote({ children, cite, tone = 'light', className, ...props }) {
  const ink = tone === 'ink'
  return (
    <figure className={cn('border-l border-gold pl-6 md:pl-8', ink && 'border-gold-light', className)} {...props}>
      <blockquote className={cn('font-display font-semibold italic text-quote text-balance max-w-[40ch]', ink ? 'text-text-inverse' : 'text-text-1')}>
        {children}
      </blockquote>
      {cite && <figcaption className={cn('mt-4 text-caption', ink ? 'text-text-inverse-3' : 'text-text-3')}>{cite}</figcaption>}
    </figure>
  )
}
