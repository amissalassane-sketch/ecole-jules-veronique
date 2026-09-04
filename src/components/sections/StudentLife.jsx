import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Palette, Users, Calendar, Sparkles } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import { activities, activityImages } from '../../data/activities'

const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'Sports', label: 'Sports', icon: Trophy },
  { id: 'Arts', label: 'Arts', icon: Palette },
  { id: 'Events', label: 'Events', icon: Calendar },
  { id: 'Academics', label: 'Academics', icon: Users },
]

export default function StudentLife() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? activityImages
    : activityImages.filter((img) => img.category === activeCategory)

  return (
    <section id="student-life" className="py-section bg-surface-alt">
      <div className="container-page">
        <SectionHeading
          label="Student Life"
          title="Beyond the classroom"
          subtitle="Sports, arts, clubs, and events that inspire passion, build character, and create lasting memories."
        />

        {/* Category filter — horizontal scroll on mobile */}
        <div className="mb-8 md:mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 md:justify-center md:overflow-visible md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:bg-primary-50 border border-neutral-200'
                }`}
              >
                <cat.icon size={14} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery — 2-col mobile, 3-col md+ */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-surface-alt flex items-center justify-center">
                  <div className="text-center text-primary-250/50">
                    <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-primary-100/30" />
                    <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-primary-300/40">
                      [Photo]
                    </span>
                  </div>
                </div>
                {/* Hover overlay — desktop only via group-hover */}
                <div className="absolute inset-0 bg-primary-900/0 md:group-hover:bg-primary-900/30 transition-colors duration-300 flex items-end p-3 sm:p-4">
                  <span className="text-white text-xs sm:text-sm font-medium opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 translate-y-2 md:group-hover:translate-y-0">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Activity lists — 2x2 grid on mobile, 4-col on lg */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <ActivityList icon={Trophy} iconColor="text-accent-500" title="Sports" items={activities.sports} delay={0} />
          <ActivityList icon={Palette} iconColor="text-rose-500" title="Arts" items={activities.arts} delay={0.1} />
          <ActivityList icon={Users} iconColor="text-emerald-500" title="Clubs" items={activities.clubs} delay={0.2} />
          <ActivityList icon={Calendar} iconColor="text-violet-500" title="Events" items={activities.events} delay={0.3} />
        </div>
      </div>
    </section>
  )
}

function ActivityList({ icon: Icon, iconColor, title, items, delay }) {
  return (
    <ScrollReveal delay={delay}>
      <h4 className="flex items-center gap-2 font-semibold text-neutral-900 mb-2.5 text-sm sm:text-base">
        <Icon size={15} className={iconColor} /> {title}
      </h4>
      <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-600">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary-400 shrink-0" /> {item}
          </li>
        ))}
      </ul>
    </ScrollReveal>
  )
}
