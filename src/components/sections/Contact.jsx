import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import IconTile from '../ui/IconTile'
import Button from '../ui/Button'
import ScrollReveal from '../animations/ScrollReveal'
import { school } from '../../data/school'
import { waLinkFor, phoneLink } from '../../utils/contact'
import { useT } from '../../hooks/useT'

/**
 * Contact — DS V2 §08 type S9 "Contact Strip" (blueprint §24 row 9).
 * Replaces the former ContactStrip band + the contact block nested in the FAQ.
 * Owns the `#contact` anchor (Navbar « Contact », Footer « Visiter l'école »).
 *
 *  paper + top hairline (FAQ above is paper too) · compact spacing
 *  Eyebrow → H2 → Body · 3 columns: IconTile → caption label → H4 value
 *  (tabular numbers) → Tertiary button (uniform, 44 px) · meta line: address + hours.
 *  No WhatsApp green, no mixed button styles. Data: school.js + existing copy.
 */
export default function Contact() {
  const t = useT()
  const channels = [
    {
      icon: Phone,
      label: t.footer.phoneLabel,
      value: school.phone,
      action: t.nav.call,
      href: phoneLink,
    },
    {
      icon: MessageCircle,
      label: t.nav.whatsapp,
      value: school.whatsapp,
      action: t.contactStrip.chat,
      href: waLinkFor('visit'),
      external: true,
    },
    {
      icon: Mail,
      label: t.footer.emailLabel,
      value: school.email,
      action: t.contactStrip.email,
      href: `mailto:${school.email}`,
    },
  ]

  return (
    <Section id="contact" tone="paper" spacing="none" aria-labelledby="contact-title">
      <div className="border-t border-border py-section-compact">
        <ScrollReveal>
          <div className="max-w-[44rem]">
            <Eyebrow>{t.nav.contact}</Eyebrow>
            <h2 id="contact-title" className="mt-3 lg:mt-4 font-display font-semibold text-h2 text-text-1 text-balance max-w-[24ch]">
              {t.contactStrip.title}
            </h2>
            <p className="mt-4 text-body text-text-2 max-w-[60ch] text-pretty">{t.contactStrip.subtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="mt-8 md:mt-10">
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-x-(--grid-gutter)">
            {channels.map((c) => (
              <li key={c.label} className="flex flex-col items-start">
                <IconTile icon={c.icon} size="sm" />
                <p className="mt-4 text-caption text-text-3">{c.label}</p>
                <p className="mt-1 text-text-1 font-body font-semibold text-h4 tabular-nums break-all">{c.value}</p>
                <Button
                  variant="tertiary"
                  size="md"
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="mt-4 w-full xs:w-auto"
                >
                  {c.action}
                </Button>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {/* Address + hours — kept (blueprint "préserver"), once, no card */}
        <ScrollReveal delay={0.12} className="mt-8 md:mt-10">
          <dl className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10 text-body-sm text-text-2">
            <div className="flex items-start gap-2">
              <dt className="sr-only">{t.footer.addressLabel}</dt>
              <MapPin size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
              <dd>{school.address}</dd>
            </div>
            <div className="flex items-start gap-2">
              <dt className="sr-only">{t.footer.openHoursLabel}</dt>
              <Clock size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-text-3" aria-hidden="true" />
              <dd>{t.footer.openHours}</dd>
            </div>
          </dl>
        </ScrollReveal>
      </div>
    </Section>
  )
}
