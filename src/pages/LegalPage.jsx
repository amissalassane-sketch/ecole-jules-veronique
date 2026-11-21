import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { school } from '../data/school'
import { useT } from '../hooks/useT'

/**
 * Mentions légales et confidentialité — one page, bilingual.
 * It only states what the site really does: the pre-registration form keeps
 * the answers in the browser and hands a message to WhatsApp; nothing is
 * stored or sent by the site, no cookies, no audience measurement.
 */
export default function LegalPage() {
  const t = useT().legal
  return (
    <>
      <Navbar />
      <main className="min-h-screen-dynamic bg-paper pt-[calc(var(--header-h)+3rem)] pb-24">
        <article className="container-prose">
          <h1 className="font-display font-semibold text-h1 text-text-1 text-balance">{t.title}</h1>

          {t.sections.map((section) => (
            <section key={section.title} className="mt-10 border-t border-border pt-8">
              <h2 className="font-display font-semibold text-h3 text-text-1">{section.title}</h2>
              <div className="mt-4 space-y-3 text-body text-text-2 text-pretty max-w-[65ch]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph
                      .replace('{name}', school.officialName)
                      .replace('{address}', school.address)
                      .replace('{whatsapp}', school.whatsapp)
                      .replace('{email}', school.email)}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <p className="mt-12 text-caption text-text-3">{t.updated}</p>
        </article>
      </main>
      <Footer />
    </>
  )
}
