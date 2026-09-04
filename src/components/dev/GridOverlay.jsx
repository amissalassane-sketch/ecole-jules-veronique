import { useEffect, useState } from 'react'

/**
 * Development-only responsive grid overlay.
 *
 * Press  Ctrl + G  (or Cmd + G) to toggle. Renders the live 4/8/12 column grid
 * on top of the page so column, margin and gutter alignment can be verified
 * visually at any viewport width. Excluded from production builds.
 */
export default function GridOverlay() {
  const [on, setOn] = useState(false)
  const [info, setInfo] = useState({ w: 0, cols: 0, margin: '0', gutter: '0' })

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'g') {
        e.preventDefault()
        setOn((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!on) return
    const read = () => {
      const cs = getComputedStyle(document.documentElement)
      setInfo({
        w: window.innerWidth,
        cols: parseInt(cs.getPropertyValue('--grid-columns'), 10) || 0,
        margin: cs.getPropertyValue('--grid-margin').trim(),
        gutter: cs.getPropertyValue('--grid-gutter').trim(),
      })
    }
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [on])

  if (!on) return null

  const device = info.w >= 1280 ? 'Desktop' : info.w >= 768 ? 'Tablet' : 'Mobile'

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="container-page h-full">
        <div className="grid-page h-full">
          {Array.from({ length: info.cols }).map((_, i) => (
            <div key={i} className="h-full bg-pink-500/20 border-x border-pink-500/30" />
          ))}
        </div>
      </div>

      <div className="fixed bottom-3 left-3 rounded-lg bg-neutral-900/90 px-3 py-2 font-mono text-[11px] leading-relaxed text-white shadow-lg">
        <div className="font-semibold text-pink-400">{device}</div>
        <div>{info.w}px · {info.cols} cols</div>
        <div>margin {info.margin} · gutter {info.gutter}</div>
        <div className="mt-1 text-white/40">Ctrl/Cmd + G to hide</div>
      </div>
    </div>
  )
}
