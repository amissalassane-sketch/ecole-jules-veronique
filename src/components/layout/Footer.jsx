import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowUpRight, MessageCircle, Globe, ExternalLink } from 'lucide-react'
import { school } from '../../data/school'
import { waLink } from '../../utils/contact'
import { useT } from '../../hooks/useT'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import Button from '../ui/Button'

export default function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  const exploreLinks = [
    { key: 'about', href: '#school' },
    { key: 'programsHeading', href: '#programs' },
    { key: 'studentLife', href: '#student-life' },
    { key: 'tuitionFees', href: '#pricing' },
    { key: 'faqLink', href: '#faq' },
  ]

  const admissionsLinks = [
    { key: 'howToApply', href: '#registration-process' },
    { key: 'bookVisitLink', href: '#contact' },
    { key: 'schoolCalendar', href: '#programs' },
  ]

  const contactInfo = [
    { icon: Phone, value: school.phone, href: 'tel:' + school.phone },
    { icon: MessageCircle, value: school.whatsapp, href: waLink, external: true },
    { icon: Mail, value: school.email, href: 'mailto:' + school.email },
    { icon: MapPin, value: school.address, href: null },
    { icon: Clock, value: school.openingHours.weekdays, href: null },
  ]

  const socialLinks = [
    { icon: Globe, href: school.socialMedia.facebook, label: 'Facebook' },
    { icon: ExternalLink, href: school.socialMedia.instagram, label: 'Instagram' },
  ].filter((social) => social.href)

  return (
    <footer className="bg-primary-950 text-white">
      <div className="container-page py-10 sm:py-14 md:py-20">

        {/* ── DESKTOP (lg+) : 4-column grid ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                <span className="font-display font-bold text-xl text-white">{school.shortName.charAt(0)}</span>
              </div>
              <span className="font-display font-bold text-xl text-white">{school.shortName}</span>
            </Link>
            <p className="text-white/50 leading-relaxed text-sm max-w-sm mb-6">{t.footer.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outlineWhite" size="sm" to="/registration">{t.footer.enroll}<ArrowUpRight size={14} /></Button>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/20 text-white/60 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors"><MessageCircle size={14} />{t.footer.whatsapp}</a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-white mb-4 text-xs tracking-[0.15em] uppercase">{t.footer.explore}</h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (<li key={link.key}><a href={link.href} className="text-white/45 hover:text-white text-sm transition-colors duration-300">{t.nav[link.key] || t.footer[link.key]}</a></li>))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-white mb-4 text-xs tracking-[0.15em] uppercase">{t.footer.admissionsHeading}</h4>
            <ul className="space-y-2.5">
              {admissionsLinks.map((link) => (<li key={link.key}><a href={link.href} className="text-white/45 hover:text-white text-sm transition-colors duration-300">{t.footer[link.key]}</a></li>))}
              <li><a href={waLink} target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white text-sm transition-colors duration-300">{t.footer.contactHeading}</a></li>
            </ul>
          </div>
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-white text-xs tracking-[0.15em] uppercase">{t.footer.contactHeading}</h4>
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-[11px] uppercase tracking-wider font-medium">{t.footer.language}</span>
                <LanguageSwitcher dark />
              </div>
            </div>
            <ul className="space-y-3">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <item.icon size={14} className="text-white/30 shrink-0 mt-0.5" />
                  {item.href ? (<a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="text-white/45 hover:text-white text-sm transition-colors duration-300 break-all">{item.value}</a>) : (<span className="text-white/45 text-sm">{item.value}</span>)}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (<a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-colors" aria-label={social.label}><social.icon size={16} /></a>))}
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET (lg-) : Compact sections ── */}
        <div className="lg:hidden space-y-6">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-2 group">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                <span className="font-display font-bold text-lg text-white">{school.shortName.charAt(0)}</span>
              </div>
              <span className="font-display font-bold text-lg text-white">{school.shortName}</span>
            </Link>
            <p className="text-white/40 leading-relaxed text-xs max-w-xs">{t.footer.description}</p>
          </div>

          {/* Contact — 2-col grid */}
          <div>
            <h4 className="font-semibold text-white mb-2.5 text-[11px] tracking-[0.15em] uppercase">{t.footer.contactHeading}</h4>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-2 min-w-0">
                  <item.icon size={13} className="text-white/30 shrink-0 mt-0.5" />
                  {item.href ? (
                    <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="text-white/35 hover:text-white text-xs transition-colors duration-300 break-all">{item.value}</a>
                  ) : (
                    <span className="text-white/35 text-xs break-all">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation — combined 2-col grid */}
          <div>
            <h4 className="font-semibold text-white mb-2.5 text-[11px] tracking-[0.15em] uppercase">{t.footer.explore}</h4>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-1">
              {exploreLinks.map((link) => (
                <a key={link.key} href={link.href} className="text-white/35 hover:text-white text-sm transition-colors duration-300 py-1.5 touch-target rounded">{t.nav[link.key] || t.footer[link.key]}</a>
              ))}
              {admissionsLinks.map((link) => (
                <a key={link.key} href={link.href} className="text-white/35 hover:text-white text-sm transition-colors duration-300 py-1.5 touch-target rounded">{t.footer[link.key]}</a>
              ))}
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-white text-sm transition-colors duration-300 py-1.5 touch-target rounded">{t.footer.contactHeading}</a>
            </div>
          </div>

          {/* CTA + WhatsApp */}
          <div className="flex items-center gap-3">
            <Button variant="outlineWhite" size="sm" to="/registration" className="flex-1 justify-center text-xs">{t.footer.enroll}<ArrowUpRight size={13} /></Button>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/20 text-white/50 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors touch-target shrink-0"><MessageCircle size={14} />{t.footer.whatsapp}</a>
          </div>

          {/* Language + Social */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="text-white/20 text-[11px] uppercase tracking-wider font-medium">{t.footer.language}</span>
              <LanguageSwitcher dark />
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (<a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/12 transition-colors" aria-label={social.label}><social.icon size={14} /></a>))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="container-page py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs text-white/20"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
          <p>&copy; {year} {school.name}. {t.footer.allRights}</p>
          <div className="flex items-center gap-4 sm:gap-5">
            <a href={school.legalInfo.privacyPolicy} className="hover:text-white/40 transition-colors">{t.footer.privacyPolicy}</a>
            <a href={school.legalInfo.termsOfService} className="hover:text-white/40 transition-colors">{t.footer.termsConditions}</a>
            <span className="text-white/12">{school.legalInfo.registrationNumber}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
