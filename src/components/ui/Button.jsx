import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Button — Design System V2 §10.
 *
 * Variants (7):  primary · primaryOnInk · secondary · secondaryOnInk ·
 *                tertiary · text · icon
 * Sizes:         sm 40 · md 48 · lg 56  (md/lg → 52px and full width ≤ 480px)
 * Radius sm (8) · Inter 600 · no shadow · focus ring via global :focus-visible.
 *
 * Renders <Link> when `to` is set, <a> when `href` is set, else <button>.
 * Legacy V1 variant names are still accepted (mapped below) so existing
 * sections keep working until each one is migrated in Phase 2.2+.
 */

const LEGACY = {
  accent: 'primaryOnInk',
  outline: 'secondary',
  outlineWhite: 'secondaryOnInk',
  ghost: 'text',
  ghostWhite: 'secondaryOnInk',
}

const variants = {
  primary:
    'bg-primary text-text-inverse hover:bg-primary-dark active:bg-primary-dark active:translate-y-px',
  primaryOnInk:
    /* One brand accent: bordeaux on white over dark sections (gold stays for hairlines). */
    'bg-white text-primary hover:bg-primary-light active:bg-primary-light active:translate-y-px',
  secondary:
    'bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary-light active:bg-primary-light active:border-primary-dark',
  secondaryOnInk:
    'bg-transparent text-text-inverse border-[1.5px] border-white/40 hover:border-white hover:bg-white/8 active:bg-white/8',
  tertiary:
    'bg-linen text-text-1 hover:bg-border active:bg-border',
  text:
    'bg-transparent text-primary underline underline-offset-4 decoration-1 hover:text-primary-dark hover:decoration-2',
  icon:
    'bg-transparent text-text-2 hover:bg-linen active:bg-border',
}

/* Heights: sm 40 · md 48 · lg 56. Below 480px md/lg are 52px.
   Full width on mobile is decided by the caller (`className="w-full xs:w-auto"`). */
const sizes = {
  sm: 'h-10 px-4 text-[15px] gap-2',
  md: 'h-[52px] xs:h-12 px-5 text-[15px] gap-2',
  lg: 'h-[52px] xs:h-14 px-6 text-base gap-2',
  xl: 'h-[52px] xs:h-14 px-6 text-base gap-2', // legacy alias → lg
}

const iconSizes = {
  sm: 'h-10 w-10',
  md: 'h-11 w-11',
  lg: 'h-12 w-12',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    href,
    to,
    className,
    disabled = false,
    loading = false,
    type = 'button',
    ...props
  },
  ref
) {
  const v = LEGACY[variant] || variant
  const isIcon = v === 'icon'
  const isText = v === 'text'

  const classes = cn(
    'inline-flex items-center justify-center font-semibold rounded-sm select-none cursor-pointer',
    'transition-[background-color,border-color,color,transform] duration-[120ms] ease-out',
    'disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none',
    'aria-busy:pointer-events-none',
    variants[v],
    isIcon ? cn('p-0', iconSizes[size] || iconSizes.md) : sizes[size] || sizes.md,
    isText && 'px-1',
    className
  )

  const content = loading ? (
    <>
      <Loader2 size={20} strokeWidth={2} className="animate-spin motion-reduce:hidden" aria-hidden="true" />
      <span className="sr-only">…</span>
      <span className="opacity-0 motion-reduce:opacity-100" aria-hidden={!loading}>{children}</span>
    </>
  ) : (
    children
  )

  if (to && !disabled) {
    return (
      <Link ref={ref} to={to} className={classes} aria-busy={loading || undefined} {...props}>
        {content}
      </Link>
    )
  }

  if (href && !disabled) {
    return (
      <a ref={ref} href={href} className={classes} aria-busy={loading || undefined} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </button>
  )
})

export default Button
