import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={cn(
        'mb-10 sm:mb-14 md:mb-20',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {label && (
        <span
          className={cn(
            'inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4 px-3 py-1.5 rounded-full',
            light
              ? 'bg-white/10 text-white/80'
              : 'bg-primary-50 text-primary-600'
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          'font-display font-bold leading-[1.12] text-balance',
          light ? 'text-white' : 'text-neutral-900'
        )}
        style={{ fontSize: 'clamp(1.5rem, 3.5vw + 0.5rem, 3.5rem)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3 sm:mt-5 leading-relaxed max-w-xl text-balance text-sm sm:text-base md:text-lg',
            align === 'center' && 'mx-auto',
            light ? 'text-white/60' : 'text-neutral-500'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
