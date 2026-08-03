import { cn } from '../../utils/cn'

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
  className,
}) {
  const inputId = `field-${name}`

  const baseClasses = cn(
    'w-full px-4 py-3 rounded-xl border bg-white text-neutral-900 text-sm transition-all duration-200',
    'placeholder:text-neutral-400',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    error
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-neutral-200 hover:border-neutral-300',
    className
  )

  // Touch-friendly min height
  const touchClasses = 'min-h-[46px]'

  return (
    <div>
      <label htmlFor={inputId} className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
      </label>

      {type === 'select' ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={cn(baseClasses, touchClasses, 'appearance-none bg-no-repeat')}
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%23a3a3a3' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundPosition: 'right 14px center' }}
        >
          <option value="">{placeholder || 'Select...'}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={cn(baseClasses, 'resize-y')}
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
          className={cn(baseClasses, touchClasses)}
          inputMode={
            type === 'tel' ? 'tel' :
            type === 'email' ? 'email' :
            type === 'number' ? 'numeric' :
            type === 'date' ? undefined :
            'text'
          }
        />
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
