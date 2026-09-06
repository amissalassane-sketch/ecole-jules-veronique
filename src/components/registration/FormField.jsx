import { ChevronDown, AlertCircle } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * FormField — DS V2 Form Panel (re-skin, same API + `autoComplete`).
 *
 *  label Inter 500 15 text-1 · required mark = text + aria (not colour alone)
 *  input 48 px · radius sm · border-strong · bg white · text 16 (no iOS zoom)
 *  focus = global :focus-visible ring · error = border error + Notice-style
 *  message (AlertCircle 16 + text, role=alert) wired via aria-invalid /
 *  aria-describedby. Select uses a Lucide ChevronDown, no data-URI.
 */
const AUTOCOMPLETE = {
  parentFirstName: 'given-name',
  parentLastName: 'family-name',
  parentPhone: 'tel',
  parentEmail: 'email',
  parentAddress: 'street-address',
  childFirstName: 'off',
  childLastName: 'off',
  childDob: 'off',
}

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  options,
  autoComplete,
  className,
}) {
  const inputId = `field-${name}`
  const errorId = `${inputId}-error`
  const ac = autoComplete ?? AUTOCOMPLETE[name]

  const base = cn(
    'w-full h-12 px-4 rounded-sm border bg-white text-base text-text-1 leading-none',
    'placeholder:text-text-3 transition-[border-color] duration-(--duration-fast) ease-out',
    'hover:border-text-3',
    error ? 'border-error' : 'border-border-strong',
    className
  )
  const a11y = {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    'aria-required': required || undefined,
  }

  return (
    <div>
      <label htmlFor={inputId} className="block text-[15px] font-medium text-text-1 mb-2">
        {label}
        {required && <span className="text-text-3" aria-hidden="true">{'\u00a0*'}</span>}
      </label>

      {type === 'select' ? (
        <div className="relative">
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={cn(base, 'appearance-none pr-11 cursor-pointer')}
            {...a11y}
          >
            <option value="">{placeholder || '—'}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown
            size={20}
            strokeWidth={1.75}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-3"
            aria-hidden="true"
          />
        </div>
      ) : type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={cn(base, 'h-auto py-3 leading-normal resize-y')}
          {...a11y}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={ac}
          className={base}
          inputMode={type === 'tel' ? 'tel' : type === 'email' ? 'email' : type === 'number' ? 'numeric' : undefined}
          {...a11y}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-2 flex items-start gap-2 text-caption text-error">
          <AlertCircle size={16} strokeWidth={1.75} className="mt-px shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
