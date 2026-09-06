import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Introduction from '../components/sections/Introduction'
import Commitments from '../components/sections/Commitments'
import Programs from '../components/sections/Programs'
import Bilingual from '../components/sections/Bilingual'
import SchoolLife from '../components/sections/SchoolLife'
import Admission from '../components/sections/Admission'
import FAQ from '../components/sections/FAQ'
import Contact from '../components/sections/Contact'
import FinalCTA from '../components/sections/FinalCTA'

export default function HomePage() {
  // Route-level scroll reset is handled once by <ScrollToTop /> in App.jsx.

  return (
    <>
      <Navbar />
      <main>
        {/* STAGE 1 — Attention */}
        <Hero />

        {/* STAGE 2 — Understanding */}
        {/* L'école (S2 Editorial Split) — merges the former Introduction + Statistics (DS V2 §17, row 2) */}
        <Introduction />
        {/* Nos engagements (S3 Editorial List) — merges the former WhyChoose + TeamProfile (DS V2 §17, row 3) */}
        <Commitments />

        {/* STAGE 3 — Trust & Explore */}
        <Programs />
        <Bilingual />

        {/* STAGE 4 — Projection */}
        {/* Vie scolaire & cadre (S2+S4) — merges the former StudentLife + Facilities (DS V2 §17, row 6) */}
        <SchoolLife />

        {/* STAGE 5 — Decision */}
        {/* Admission (S7 Process Split) — merges the former Methodology + RegistrationProcess + Pricing (DS V2 §24, row 7); anchors #registration-process + #pricing kept */}
        <Admission />
        {/* Testimonials: kept out of the Home until ≥ 2 verified testimonials exist (DS V2 §24). Component preserved. */}
        {/* FAQ (S8) — absorbs DigitalVision as one entry; Contact (S9) owns #contact (DS V2 §24 rows 8–9) */}
        <FAQ />
        <Contact />

        {/* STAGE 6 — Action */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
