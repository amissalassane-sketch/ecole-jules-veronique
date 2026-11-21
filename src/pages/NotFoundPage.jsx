import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Logo from '../components/ui/Logo'
import { useT } from '../hooks/useT'

/* Any unknown address (old link, typo): say so plainly and offer the two
   destinations a parent is looking for. */
export default function NotFoundPage() {
  const t = useT().notFound
  return (
    <>
      <Navbar />
      <main className="min-h-screen-dynamic bg-paper pt-[calc(var(--header-h)+4rem)] pb-24">
        <div className="container-narrow text-center">
          <Logo size={88} className="mx-auto" />
          <h1 className="mt-8 font-display font-semibold text-h1 text-text-1 text-balance">{t.title}</h1>
          <p className="mt-4 text-lead text-text-2 text-pretty">{t.body}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:justify-center">
            <Button variant="primary" size="lg" to="/">{t.home}</Button>
            <Button variant="secondary" size="lg" to="/registration">{t.enroll}</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
