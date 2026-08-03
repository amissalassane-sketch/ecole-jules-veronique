import { useLanguage } from '../../context/LanguageContext'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher({ dark = false, compact = false, className = '' }) {
  const { language, setLanguage } = useLanguage()
  const active = dark
    ? 'px-2 py-1 rounded-md bg-white text-primary-900 text-xs font-bold shadow-sm'
    : 'px-2 py-1 rounded-md bg-primary-600 text-white text-xs font-bold shadow-sm'
  const inactive = dark
    ? 'px-2 py-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors'
    : 'px-2 py-1 rounded-md text-neutral-500 hover:text-primary-600 hover:bg-primary-50 text-xs font-medium transition-colors'

  if (compact) {
    const fn = dark ? 'text-white/70 hover:text-white' : 'text-neutral-500 hover:text-primary-600'
    return (
      <div className={`inline-flex items-center gap-0.5 ${className}`}>
        <button onClick={() => setLanguage('en')} className={`px-2 py-1.5 rounded text-xs font-bold transition-colors ${language==='en'?'bg-primary-600 text-white':fn}`}>EN</button>
        <button onClick={() => setLanguage('fr')} className={`px-2 py-1.5 rounded text-xs font-bold transition-colors ${language==='fr'?'bg-primary-600 text-white':fn}`}>FR</button>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} role="radiogroup" aria-label="Changer la langue">
      <Globe size={14} className={dark ? 'text-white/50' : 'text-neutral-400'} />
      <div className="inline-flex items-center gap-1 rounded-lg border border-white/20 p-0.5">
        <button onClick={() => setLanguage('en')} className={language === 'en' ? active : inactive} aria-pressed={language === 'en'}>EN</button>
        <button onClick={() => setLanguage('fr')} className={language === 'fr' ? active : inactive} aria-pressed={language === 'fr'}>FR</button>
      </div>
    </div>
  )
}
