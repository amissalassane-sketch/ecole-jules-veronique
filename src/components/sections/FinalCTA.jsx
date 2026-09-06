import { MessageCircle } from 'lucide-react'
import Section from '../layout/Section'
import Eyebrow from '../ui/Eyebrow'
import Button from '../ui/Button'
import ScrollReveal from '../animations/ScrollReveal'
import { school } from '../../data/school'
import { waLinkFor } from '../../utils/contact'
import { useT } from '../../hooks/useT'

/**
 * CTA final — DS V2 §08 type S10 "CTA Ink" (blueprint §24 row 10).
 *
 *  ink uni (no gradient, no blobs, no shadow) · prose container · air spacing
 *  Eyebrow gold-light (existing « Admission » string — the year is already in the H2) → H2 centred (≤ 2 lines) → Lead → Primary on Ink
 *  « Préinscrire mon enfant » + Secondary on Ink « Parler aux admissions ».
 *  3 → 2 CTA ; the 30 % contact line is gone (Contact section + Footer carry it).
 *  Gold hairline at the bottom = the Footer's top signature rule (§19).
 */
export default function FinalCTA() {
  const t = useT()
  return (
    <Section tone="ink" spacing="air" container="prose" aria-labelledby="final-cta-title">
      <ScrollReveal>
        <div className="text-center">
          <Eyebrow tone="ink" rule={false}>{t.nav.admission}</Eyebrow>
          <h2
            id="final-cta-title"
            className="mt-4 font-display font-semibold text-h2 text-text-inverse text-balance mx-auto max-w-[24ch]"
          >
            {/* Phase 3.6: year injected from school.schoolYear (was hard-coded). */}
            {t.finalCta.title.replace('{year}', school.schoolYear)}
          </h2>
          <p className="mt-5 text-lead text-text-inverse-2 text-pretty mx-auto max-w-[36rem]">
            {t.finalCta.subtitle.replace('{year}', school.schoolYear)}
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:justify-center gap-3">
            <Button variant="primaryOnInk" size="lg" to="/registration" className="w-full sm:w-auto whitespace-nowrap">
              {t.nav.enroll}
            </Button>
            <Button
              variant="secondaryOnInk"
              size="lg"
              href={waLinkFor('enroll')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto whitespace-nowrap"
            >
              <MessageCircle size={20} aria-hidden="true" />
              {t.finalCta.talk}
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  )
}
