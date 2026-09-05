import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Introduction from '../components/sections/Introduction'
import WhyChoose from '../components/sections/WhyChoose'
import TeamProfile from '../components/sections/TeamProfile'
import Statistics from '../components/sections/Statistics'
import Programs from '../components/sections/Programs'
import Methodology from '../components/sections/Methodology'
import Bilingual from '../components/sections/Bilingual'
import StudentLife from '../components/sections/StudentLife'
import Facilities from '../components/sections/Facilities'
import DigitalVision from '../components/sections/DigitalVision'
import ContactStrip from '../components/sections/ContactStrip'
import Pricing from '../components/sections/Pricing'
import RegistrationProcess from '../components/sections/RegistrationProcess'
import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'
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
        <Introduction />
        <WhyChoose />
        <TeamProfile />
        <Statistics />

        {/* STAGE 3 — Trust & Explore */}
        <Programs />
        <Methodology />
        <Bilingual />

        {/* STAGE 4 — Projection */}
        <StudentLife />
        <Facilities />

        {/* Forward-looking, clearly marked as a future/prospective project — never operational */}
        <DigitalVision />

        {/* Contact-first touchpoint — for parents who want to talk before deciding */}
        <ContactStrip />

        {/* STAGE 5 — Decision */}
        <Pricing />
        <RegistrationProcess />
        <Testimonials />
        <FAQ />

        {/* STAGE 6 — Action */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
