import { useScrollReveal } from '../../hooks/useScrollReveal'
import { cn } from '../../utils/cn'

/**
 * ScrollReveal — content is ALWAYS visible (mobile review, Nov 2026): on a slow
 * phone, or if JavaScript fails, nothing may stay hidden. The only effect is a
 * 10 px rise that settles when the block enters the viewport (`.reveal` in
 * index.css, removed under prefers-reduced-motion). Plain CSS, no framer-motion.
 * `variant` and `duration` are accepted for API compatibility and ignored.
 */
// eslint-disable-next-line no-unused-vars
export default function ScrollReveal({ children, variant, duration, delay = 0, threshold = 0.15, className, as: Component = 'div', once = true }) {
  const { ref, isVisible } = useScrollReveal({ threshold, once })

  return (
    <Component ref={ref} className={cn(className)}>
      <div
        className="reveal"
        data-shown={isVisible ? '' : undefined}
        style={delay ? { transitionDelay: `${delay}s` } : undefined}
      >
        {children}
      </div>
    </Component>
  )
}
