import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/cn'

/**
 * LanguageSwitcher — DS V2 §18. Segmented EN/FR control, radius pill,
 * each option 44 × 32 px visually, `aria-pressed` + `lang` on every option.
 * Touch target (§17 « langue 44 px », a11y > aesthetics): an invisible
 * ::before extends each option's hit area to 44 × 44 without changing the
 * 32 px pill the header/footer are built around (2.12 decision).
 *
 * tone: 'light' (white / paper surfaces) · 'ink' (transparent header, footer)
 * `dark` is kept as an alias of tone="ink" for existing callers (Footer).
 */
const OPTIONS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
]

export default function LanguageSwitcher({ tone, dark = false, className }) {
  const { language, setLanguage } = useLanguage()
  const onInk = tone === 'ink' || dark

  return (
    <div
      role="group"
      aria-label={language === 'fr' ? 'Langue du site' : 'Site language'}
      className={cn(
        'inline-flex items-center rounded-pill border p-0.5',
        onInk ? 'border-border-inverse' : 'border-border bg-white',
        className
      )}
    >
      {OPTIONS.map((o) => {
        const active = language === o.code
        return (
          <button
            key={o.code}
            type="button"
            lang={o.code}
            aria-pressed={active}
            aria-label={o.name}
            onClick={() => setLanguage(o.code)}
            className={cn(
              'relative min-w-11 h-8 px-3 rounded-pill text-caption font-semibold leading-none cursor-pointer',
              "before:content-[''] before:absolute before:inset-x-0 before:-inset-y-1.5",
              'transition-colors duration-(--duration-fast) ease-out',
              active
                ? onInk
                  ? 'bg-white text-ink'
                  : 'bg-primary text-text-inverse'
                : onInk
                  ? 'text-text-inverse-2 hover:text-text-inverse'
                  : 'text-text-2 hover:text-text-1'
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
