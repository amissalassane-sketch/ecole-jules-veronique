import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Class-name helper. Filters falsy values, then resolves Tailwind conflicts
 * (e.g. a caller's `px-8` wins over a component's default `px-5`).
 *
 * tailwind-merge must be told about the DS V2 type scale (tokens.css
 * `--text-*`), otherwise `text-h2` / `text-eyebrow` / `text-quote` … are
 * mistaken for colours and dropped whenever a `text-<colour>` follows.
 */
const FONT_SIZES = ['display', 'h1', 'h2', 'h3', 'h4', 'lead', 'body', 'body-sm', 'caption', 'eyebrow', 'stat', 'quote']

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: FONT_SIZES }],
    },
  },
})

export function cn(...classes) {
  return twMerge(classes.filter(Boolean).join(' '))
}
