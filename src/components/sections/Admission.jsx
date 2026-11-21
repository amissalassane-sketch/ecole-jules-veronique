import { Banknote, Check, ExternalLink, Utensils } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import Card, { NoticeCard } from '../ui/Card'
import Button from '../ui/Button'
import ScrollReveal from '../animations/ScrollReveal'
import { pricing } from '../../data/pricing'
import { admission } from '../../data/admission'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Admission — DS V2 §08 type S7 "Process Split" (blueprint §24 row 7).
 * Merges the former Methodology + RegistrationProcess + Pricing sections:
 * the pathway is told once.
 *
 *  linen · header 8 col (Eyebrow → H2)
 *  · 7 col : steps 01–06 — Playfair gold-deep numeral + vertical hairline +
 *    title (h3 styled H4) + Body Small. No cards, no icons per step.
 *  · 5 col sticky (≥ lg) : ONE Card/Default « Pièces à fournir » (list, Check 16)
 *    → Notice warning fees (#pricing anchor, transparency said once)
 *    → Notice info cafeteria / transport → Primary CTA + Text link « Demander les tarifs ».
 *  Mobile : panel under the steps, not sticky.
 *
 * Anchors kept: #registration-process (Navbar « Admission », Footer) and
 * #pricing (Footer « Frais ») — ids sit on static wrappers, outside the
 * animated reveal, so the offset is never shifted by the 12 px rise.
 * Data: translations regProcess.* / pricing.*, pricing.js, admission.js — nothing invented.
 */
export default function Admission() {
  const t = useT()
  const { language } = useLanguage()
  const en = language === 'en'
  const r = t.regProcess

  const steps = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: r[`step${n}Title`],
    desc: r[`step${n}Desc`],
  }))

  return (
    <Section id="registration-process" tone="linen" aria-labelledby="admission-title">
      {/* ── Header, 8 col ── */}
      <ScrollReveal>
        <div className="max-w-[44rem]">
          <Eyebrow>{r.label}</Eyebrow>
          <h2 id="admission-title" className="mt-3 lg:mt-4 font-display font-semibold text-h2 text-text-1 text-balance max-w-[24ch]">
            {r.title}
          </h2>
        </div>
      </ScrollReveal>

      <div className="mt-10 md:mt-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-(--grid-gutter)">
        {/* ── Steps 01–06, 7 col: numeral + vertical hairline ── */}
        <ScrollReveal delay={0.08} className="lg:col-span-7">
          <ol className="max-w-[40rem]">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] md:grid-cols-[3.5rem_minmax(0,1fr)]"
              >
                <span
                  aria-hidden="true"
                  className="font-display font-semibold text-[1.5rem] md:text-[1.75rem] leading-none text-gold-deep tabular-nums pt-0.5"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={`border-l border-border-strong pl-5 md:pl-6 ${i < steps.length - 1 ? 'pb-8 md:pb-10' : 'pb-0'}`}>
                  <h3 className="font-body font-semibold text-h4 text-text-1 text-balance">{step.title}</h3>
                  <p className="mt-2 text-body-sm text-text-2 max-w-[52ch] text-pretty">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        {/* ── Panel, 5 col, sticky ≥ lg ── */}
        <div className="mt-12 lg:mt-0 lg:col-span-5 lg:col-start-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <ScrollReveal delay={0.16}>
            {/* The ONE card of the section: a repeated-unit list worth framing (§09) */}
            <Card>
              <h3 className="font-body font-semibold text-h4 text-text-1">{r.documentsTitle}</h3>
              <p className="mt-2 text-body-sm text-text-2 text-pretty">{r.documentsIntro}</p>
              <ul className="mt-5 space-y-3">
                {r.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-body-sm text-text-1">
                    <Check size={16} strokeWidth={2} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>

          {/* Fees — one transparency Notice per subject (§16). #pricing sits on this
              static wrapper (outside the animated reveal) so the anchor offset is exact. */}
          <div id="pricing" className="mt-4">
            <ScrollReveal delay={0.2}>
              <NoticeCard tone="info" icon={Banknote} title={t.pricing.notPublished} role="note">
                <p>{en ? pricing.noteEn : pricing.note}</p>
                <p className="mt-2">
                  {t.pricing.bankPayment}
                </p>
                <p className="mt-3 font-semibold text-text-1">{t.pricing.requiredFeesTitle}</p>
                <p className="mt-1 text-caption text-text-3">{t.pricing.requiredFeesNote}</p>
                <ul className="mt-2 list-disc pl-4 space-y-0.5 text-body-sm text-text-2">
                  {(en ? admission.requiredPaymentsEn : admission.requiredPayments).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </NoticeCard>

              <NoticeCard tone="info" icon={Utensils} title={t.pricing.optionalTitle} role="note" className="mt-4">
                <p>{t.pricing.cafeteria}</p>
                <p className="mt-1">{t.pricing.transport}</p>
              </NoticeCard>

              {/* Actions: the single Primary + one Text link */}
              <div className="mt-8 flex flex-col xs:flex-row xs:flex-wrap xs:items-center gap-3 xs:gap-x-6">
                <Button variant="primary" size="lg" to="/registration" className="w-full xs:w-auto whitespace-nowrap">
                  {t.nav.enroll}
                </Button>
                <Button
                  variant="text"
                  size="md"
                  href={waLinkFor('pricing')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-ml-1 xs:ml-0 self-start xs:self-auto"
                >
                  {t.pricing.cta}
                  <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
