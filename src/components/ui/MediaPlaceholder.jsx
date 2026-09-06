import { Image as ImageIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * MediaPlaceholder — §13. Explicit, honest slot for a real photo that the
 * school has not supplied yet. Linen surface, dashed border, radius lg (§11:
 * images / media), icon 32 (§12: placeholder size), caption describing WHAT
 * photo is expected. Never a fake/stock/AI image.
 *
 * ratio: '4/3' | '3/2' | '16/9' | '1/1' | '4/5' | '3/4' — or `null` to drive the
 *        aspect ratio from `className` (responsive ratios, e.g. 3:2 → 4:5).
 */
export default function MediaPlaceholder({ label, ratio = '4/3', className, ...props }) {
  return (
    <figure
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong bg-linen text-text-3 p-4 text-center',
        className
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
      {...props}
    >
      <ImageIcon size={32} strokeWidth={1.75} aria-hidden="true" />
      {label && <figcaption className="text-caption max-w-[28ch]">{label}</figcaption>}
    </figure>
  )
}
