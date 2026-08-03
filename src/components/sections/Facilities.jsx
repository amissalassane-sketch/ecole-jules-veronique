import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { facilities } from '../../data/facilities'
import { useT } from '../../hooks/useT'

export default function Facilities() {
  const t = useT()
  const [selectedIndex, setSelectedIndex] = useState(null)

  const close = useCallback(() => setSelectedIndex(null), [])
  const prev = useCallback(() => setSelectedIndex((i) => (i > 0 ? i - 1 : facilities.length - 1)), [])
  const next = useCallback(() => setSelectedIndex((i) => (i < facilities.length - 1 ? i + 1 : 0)), [])

  // Keyboard nav for lightbox
  useEffect(() => {
    if (selectedIndex === null) return
    const handler = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedIndex, close, prev, next])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedIndex])

  return (
    <section className="py-section bg-white">
      <div className="container-page">
        <SectionHeading
          label={t.facilities.label}
          title={t.facilities.title}
          subtitle={t.facilities.subtitle}
        />

        {/* Gallery — 2-col mobile, 3-col sm, 4-col lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {facilities.map((facility, i) => (
            <ScrollReveal
              key={facility.id}
              delay={i * 0.06}
              className={i === 0 ? 'col-span-2 sm:col-span-1 sm:row-span-2' : ''}
            >
              <button
                onClick={() => setSelectedIndex(i)}
                className={`relative w-full text-left group cursor-pointer rounded-xl md:rounded-2xl overflow-hidden ${
                  i === 0 ? 'aspect-[4/3] sm:aspect-auto sm:h-full' : 'aspect-square'
                }`}
                aria-label={`View ${facility.name}`}
              >
                {/* Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-surface-alt to-primary-50" />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/55 via-neutral-900/5 to-transparent md:group-hover:from-neutral-900/65 transition-colors duration-300" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                  <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base leading-tight">
                    {facility.name}
                  </h3>
                  <p className="text-white/60 text-[10px] sm:text-xs mt-0.5 md:mt-1 line-clamp-2 hidden md:block md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {facility.description}
                  </p>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox — works on all sizes */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing ${facilities[selectedIndex].name}`}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10 touch-target"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Prev / Next — large touch targets */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10 touch-target"
              aria-label="Previous facility"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10 touch-target"
              aria-label="Next facility"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-primary-200 to-surface-alt flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center text-primary-300 p-8">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary-100/50" />
                <p className="text-sm sm:text-lg font-medium opacity-35">{facilities[selectedIndex].name}</p>
                <p className="text-xs opacity-25 mt-1">{t.facilities.photoReplace}</p>
              </div>
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-center text-white max-w-md px-4">
              <h4 className="font-display text-lg sm:text-xl font-bold mb-1">
                {facilities[selectedIndex].name}
              </h4>
              <p className="text-white/55 text-xs sm:text-sm max-w-sm mx-auto hidden sm:block">
                {facilities[selectedIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
