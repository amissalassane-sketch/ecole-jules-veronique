import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Accordion — DS V2 §08 (S8) / §16, re-skinned (same API: items [{id, question, answer}]).
 *
 *  · items stacked on hairlines (no card per item — §09 rule of existence)
 *  · question Inter 600 17 px (DS S8) · answer Body text-2
 *  · trigger = <button> inside <h3>, min 44 px, aria-expanded + aria-controls,
 *    panel role="region" aria-labelledby ; Escape closes the open item
 *  · ChevronDown 20 rotates 180° ; panel height 280 ms ease-in-out (§14 tokens) ;
 *    reduced motion handled by MotionConfig at the root
 */
const EASE_IN_OUT = [0.4, 0, 0.2, 1]

export default function Accordion({ items, className }) {
  const [openId, setOpenId] = useState(null)
  const uid = useId()

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))
  const onKeyDown = (e, id) => {
    if (e.key === 'Escape' && openId === id) {
      e.preventDefault()
      setOpenId(null)
    }
  }

  return (
    <div className={cn('border-t border-border', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        const triggerId = `${uid}-${item.id}-trigger`
        const panelId = `${uid}-${item.id}-panel`
        return (
          <div key={item.id} className="border-b border-border">
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => onKeyDown(e, item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full min-h-[44px] flex items-start justify-between gap-4 py-4 md:py-5 text-left cursor-pointer text-text-1 hover:text-primary transition-colors duration-[120ms] ease-out"
              >
                <span className="font-body font-semibold text-[1.0625rem] leading-[1.4] text-balance">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: EASE_IN_OUT }}
                  className="shrink-0 mt-0.5 text-text-3"
                  aria-hidden="true"
                >
                  <ChevronDown size={20} strokeWidth={1.75} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_IN_OUT }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 md:pb-6 pr-9 text-body text-text-2 max-w-[62ch] text-pretty">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
