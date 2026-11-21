import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import MobileMenu from './MobileMenu'
import MobileCtaBar from './MobileCtaBar'
import { school } from '../../data/school'
import { useT } from '../../hooks/useT'

/* Minimum scroll movement (px) before the bottom bar reacts — kills flicker. */
const SCROLL_JITTER = 8
/* Header turns solid after this much scroll (§18). */
const SOLID_AFTER = 24

/* DS V2 §18 — 5 links. `#registration-process` is the current Admission
   anchor; Phase 2.8 merges Methodology + Process + Pricing under it. */
const NAV_LINKS = [
  { href: '#school', key: 'school' },
  { href: '#programs', key: 'programs' },
  { href: '#student-life', key: 'studentLife' },
  { href: '#registration-process', key: 'admission' },
  { href: '#contact', key: 'contact' },
]

export default function Navbar() {
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(true)
  const [activeHash, setActiveHash] = useState('')
  const triggerRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isRegistration = location.pathname === '/registration'

  /* ── Scroll state (solid header + anti-flicker CTA bar) — logic preserved ── */
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      const delta = y - lastY

      setScrolled(y > SOLID_AFTER)

      // Ignore micro-scrolls (trackpad jitter, momentum tail, rubber-banding)
      // so the bar can never flicker on a 1px movement.
      if (Math.abs(delta) < SCROLL_JITTER) return

      const doc = document.documentElement
      const nearBottom = y + window.innerHeight >= doc.scrollHeight - 140

      // Hide only while actively scrolling DOWN, past the hero, and not at the
      // very end of the page (the final CTA already lives there).
      setShowBottomBar(!(y > 320 && delta > 0 && !nearBottom))
      lastY = y
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active section (gold rule under the current link) ── */
  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === 'undefined') return
    const targets = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    if (!targets.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActiveHash(`#${visible[0].target.id}`)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isHome])

  // Reserve room for the fixed mobile CTA bar ONCE PER ROUTE — never during
  // scroll. Showing/hiding the bar must not reflow the document, otherwise the
  // scroll position jumps and re-triggers this effect in a loop.
  useEffect(() => {
    document.body.classList.toggle('has-mobile-cta', !isRegistration)
    return () => document.body.classList.remove('has-mobile-cta')
  }, [isRegistration])

  useEffect(() => { setMobileOpen(false) }, [location])

  // Scroll lock that PRESERVES the scroll position while the menu is open.
  // Setting only overflow:hidden lets iOS Safari snap the page back to the top
  // when the drawer closes. This is temporary, inline, and fully reverted on
  // close — it never touches html/body overflow rules (P0 scroll fix).
  useEffect(() => {
    if (!mobileOpen) return

    const y = window.scrollY
    const { body } = document
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflowY: body.style.overflowY,
    }

    body.style.position = 'fixed'
    body.style.top = `-${y}px`
    body.style.width = '100%'
    body.style.overflowY = 'scroll' // keep the scrollbar gutter → no layout shift

    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.width = prev.width
      body.style.overflowY = prev.overflowY
      window.scrollTo({ top: y, left: 0, behavior: 'instant' })
    }
  }, [mobileOpen])

  const closeMenu = useCallback(() => setMobileOpen(false), [])

  /* Transparent only on the home hero (ink) before scrolling. */
  const transparent = isHome && !scrolled && !mobileOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b',
          'transition-[background-color,border-color,box-shadow] duration-(--duration-base) ease-out',
          transparent
            ? 'bg-transparent border-border-inverse on-ink'
            : 'bg-white border-border shadow-subtle'
        )}
        data-tone={transparent ? 'ink' : undefined}
      >
        <div className="container-page flex items-center justify-between gap-3 lg:gap-6 h-[60px] lg:h-[72px]">
          {/* ── Brand ── */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 min-h-11 -ml-1 pl-1 pr-2 rounded-sm"
            aria-label={`${school.shortName}, ${t.nav.home}`}
          >
            <Logo size={44} />
            <span
              className={cn(
                // < 480 px (switcher + hamburger) and 1024–1279 px (5 French links +
                // CTA) cannot host the 180 px wordmark: monogram only, the accessible
                // name stays in aria-label. Wordmark from 480 px and again from 1280 px.
                'hidden xs:inline lg-only:hidden font-display font-semibold text-[18px] leading-none whitespace-nowrap transition-colors duration-(--duration-base)',
                transparent ? 'text-text-inverse' : 'text-text-1'
              )}
            >
              {school.shortName}
            </span>
          </Link>

          {/* ── Desktop navigation ── */}
          <nav aria-label={t.nav.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const active = isHome && activeHash === link.href
                return (
                  <li key={link.href}>
                    <a
                      href={isHome ? link.href : `/${link.href}`}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'relative flex items-center h-11 px-2 xl:px-3 text-[15px] font-medium rounded-sm whitespace-nowrap',
                        'transition-colors duration-(--duration-fast)',
                        // underline drawn with a pseudo-element: hover = 2 px current colour, active = gold rule
                        'after:absolute after:left-2 after:right-2 xl:after:left-3 xl:after:right-3 after:bottom-1.5 after:h-0.5 after:rounded-pill after:bg-current after:opacity-0 after:transition-opacity after:duration-(--duration-fast)',
                        'hover:after:opacity-100',
                        active && 'after:opacity-100',
                        transparent
                          ? cn('text-text-inverse-2 hover:text-text-inverse', active && 'text-text-inverse after:bg-gold-light')
                          : cn('text-text-2 hover:text-text-1', active && 'text-text-1 after:bg-gold')
                      )}
                    >
                      {t.nav[link.key]}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ── Desktop actions ── */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            <LanguageSwitcher tone={transparent ? 'ink' : 'light'} />
            <Button variant={transparent ? 'primaryOnInk' : 'primary'} size="sm" to="/registration" className="whitespace-nowrap">
              {t.nav.enroll}
            </Button>
          </div>

          {/* ── Mobile actions: switch + hamburger (icon button, no solid fill) ── */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <LanguageSwitcher tone={transparent ? 'ink' : 'light'} />
            <Button
              ref={triggerRef}
              variant="icon"
              size="md"
              onClick={() => setMobileOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
              className={cn('-mr-2', transparent ? 'text-text-inverse hover:bg-white/8 active:bg-white/8' : 'text-text-1')}
            >
              <Menu size={24} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        open={mobileOpen}
        onClose={closeMenu}
        links={NAV_LINKS}
        isHome={isHome}
        triggerRef={triggerRef}
      />

      {!isRegistration && <MobileCtaBar show={showBottomBar && !mobileOpen} />}
    </>
  )
}
