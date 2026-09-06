import { Image as ImageIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * MediaPlaceholder — §13. Explicit, honest slot for a real photo that the
 * school has not supplied yet. Linen surface, dashed border, caption
 * describing WHAT photo is expected. Never a fake/stock/AI image.
 *
 * ratio: '4/3' | '3/2' | '16/9' | '1/1' | '3/4'
 */
export default function MediaPlaceholder({ label, ratio = '4/3', className, ...props }) {
  return (
    <figure
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border-strong bg-linen text-text-3 p-4 text-center',
        className
      )}
      style={{ aspectRatio: ratio }}
      {...props}
    >
      <ImageIcon size={24} strokeWidth={1.75} aria-hidden="true" />
      {label && <figcaption className="text-caption max-w-[28ch]">{label}</figcaption>}
    </figure>
  )
}
