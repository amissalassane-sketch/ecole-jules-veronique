import { twMerge } from 'tailwind-merge'

/**
 * Class-name helper. Filters falsy values, then resolves Tailwind conflicts
 * (e.g. a caller's `px-8` wins over a component's default `px-5`).
 */
export function cn(...classes) {
  return twMerge(classes.filter(Boolean).join(' '))
}
