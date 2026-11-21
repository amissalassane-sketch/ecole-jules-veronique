import { cn } from '../../utils/cn'

/**
 * Logo — the school crest (public/logo-96.webp · logo-192.webp, transparent).
 * Decorative next to the wordmark: the link around it carries the accessible name.
 */
const BASE = import.meta.env.BASE_URL

export default function Logo({ size = 44, className }) {
  return (
    <img
      src={`${BASE}logo-96.webp`}
      srcSet={`${BASE}logo-96.webp 96w, ${BASE}logo-192.webp 192w`}
      sizes={`${size}px`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      decoding="async"
      className={cn('shrink-0 object-contain', className)}
      style={{ width: size, height: size }}
    />
  )
}
