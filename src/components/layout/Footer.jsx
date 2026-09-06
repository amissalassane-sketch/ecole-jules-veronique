import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { school } from '../../data/school'
import { waLinkFor, phoneLink } from '../../utils/contact'
import { useT } from '../../hooks/useT'
import Eyebrow from '../ui/Eyebrow'
import Button from '../ui/Button'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { cn } from '../../utils/cn'

/**
 * Footer — DS V2 §19 (blueprint §24 row 11). ONE JSX for every breakpoint.
 *
 *  ink · 1 px gold signature rule on top · padding 64/80/96 · bottom band 24
 *  Desktop 12 col : 4 brand (monogram + Playfair name + Body Small inverse-2 +
 *  Secondary on Ink « Préinscrire mon enfant ») · 2 « L'école » · 2 « Admission »
 *  · 4 « Contact » (Lucide 16, text 15 inverse-2, targets 44).
 *  Mobile : brand → contact → the two link columns side by side → band (one DOM).
 *  Socials: rendered only when a URL exists in school.js (none today → nothing,
 *  no brand asset needed). Legal links hidden while they are '#'. Nothing invented.
 */
const LINK = 'inline-flex items-center min-h-11 text-[15px] text-text-inverse-2 hover:text-text-inverse transition-colors duration-(--duration-base) rounded-sm'

export default function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  const schoolLinks = [
    { label: t.footer.about, href: '#school' },
    { label: t.nav.programs, href: '#programs' },
    { label: t.nav.studentLife, href: '#student-life' },
    { label: t.footer.faqLink, href: '#faq' },
  ]
  const admissionLinks = [
    { label: t.footer.howToApply, href: '#registration-process' },
    { label: t.footer.tuitionFees, href: '#pricing' },
    { label: t.nav.contact, href: '#contact' },
  ]
  const contactItems = [
    { icon: Phone, label: t.footer.phoneLabel, value: school.phone, href: phoneLink },
    { icon: MessageCircle, label: t.nav.whatsapp, value: school.whatsapp, href: waLinkFor('general'), external: true },
    { icon: Mail, label: t.footer.emailLabel, value: school.email, href: `mailto:${school.email}` },
    { icon: MapPin, label: t.footer.addressLabel, value: school.address },
    { icon: Clock, label: t.footer.openHours, value: t.footer.openHours },
  ]
  const legalLinks = [
    { label: t.footer.privacyPolicy, href: school.legalInfo.privacyPolicy },
    { label: t.footer.termsConditions, href: school.legalInfo.termsOfService },
  ].filter((l) => l.href && l.href !== '#')
  const socials = [
    { label: 'Facebook', href: school.socialMedia.facebook },
    { label: 'Instagram', href: school.socialMedia.instagram },
  ].filter((s) => s.href)

  return (
    <footer className="bg-ink text-text-inverse on-ink border-t border-gold-light" data-tone="ink">
      <div className="container-page py-section">
        <div className="grid grid-cols-2 gap-x-(--grid-gutter) gap-y-10 lg:grid-cols-12">
          {/* ── Brand · 4 col ── */}
          <div className="col-span-2 lg:col-span-4 lg:pr-8">
            <Link
              to="/"
              className="inline-flex items-center gap-3 min-h-11 -ml-1 pl-1 pr-2 rounded-sm"
              aria-label={`${school.shortName} — ${t.nav.home}`}
            >
              <span
                aria-hidden="true"
                className="flex items-center justify-center w-9 h-9 rounded-sm bg-gold-light text-ink font-display font-bold text-[20px] leading-none"
              >
                {school.shortName.charAt(0)}
              </span>
              <span className="font-display font-semibold text-[18px] leading-none text-text-inverse">{school.shortName}</span>
            </Link>
            <p className="mt-4 text-body-sm text-text-inverse-2 max-w-[40ch] text-pretty">{t.footer.description}</p>
            <Button variant="secondaryOnInk" size="md" to="/registration" className="mt-6 w-full xs:w-auto whitespace-nowrap">
              {t.nav.enroll}
            </Button>
          </div>

          {/* ── Contact · 4 col (2nd on mobile per §19, last on desktop) ── */}
          <div className="col-span-2 lg:order-last lg:col-span-4">
            <Eyebrow tone="ink" rule={false} as="h2" className="font-body">{t.footer.contactHeading}</Eyebrow>
            <ul className="mt-4 space-y-1">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <item.icon size={16} strokeWidth={1.75} className="mt-[14px] shrink-0 text-text-inverse-3" aria-hidden="true" />
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className={cn(LINK, 'break-all tabular-nums')}
                    >
                      <span className="sr-only">{item.label}{'\u00a0: '}</span>
                      {item.value}
                    </a>
                  ) : (
                    <span className="inline-flex items-center min-h-11 text-[15px] text-text-inverse-2">
                      <span className="sr-only">{item.label}{'\u00a0: '}</span>
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {socials.length > 0 && (
              <ul className="mt-4 flex gap-4">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ── L'école · 2 col ── */}
          <nav aria-labelledby="footer-school" className="col-span-1 lg:col-span-2">
            <Eyebrow tone="ink" rule={false} as="h2" id="footer-school" className="font-body">{t.footer.schoolHeading}</Eyebrow>
            <ul className="mt-4 space-y-1">
              {schoolLinks.map((l) => (
                <li key={l.href}><a href={l.href} className={LINK}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          {/* ── Admission · 2 col ── */}
          <nav aria-labelledby="footer-admission" className="col-span-1 lg:col-span-2">
            <Eyebrow tone="ink" rule={false} as="h2" id="footer-admission" className="font-body">{t.nav.admission}</Eyebrow>
            <ul className="mt-4 space-y-1">
              {admissionLinks.map((l) => (
                <li key={l.href}><a href={l.href} className={LINK}>{l.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ── Bottom band ── */}
      <div className="border-t border-border-inverse">
        <div
          className="container-page py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <p className="text-caption text-text-inverse-3">
            &copy; {year} {school.name}. {t.footer.allRights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <a key={l.label} href={l.href} className={cn(LINK, 'text-caption')}>{l.label}</a>
            ))}
            <LanguageSwitcher tone="ink" />
          </div>
        </div>
      </div>
    </footer>
  )
}
