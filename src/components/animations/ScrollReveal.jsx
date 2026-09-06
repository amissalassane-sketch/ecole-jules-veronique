import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { cn } from '../../utils/cn'

/* DS V2 §14 — reveal = opacity + 12px rise, 400ms, once, ease-out.
   Other variants are kept for API compatibility but all use the same
   small offsets; MotionConfig reducedMotion="user" disables the transform. */
const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 12 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
}

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.4,
  threshold = 0.15,
  className,
  as: Component = 'div',
  once = true,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold, once })

  return (
    <Component ref={ref} className={cn(className)}>
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={variants[variant]}
        transition={{ duration, delay, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </Component>
  )
}
