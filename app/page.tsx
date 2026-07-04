import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/home/hero'
import { Services } from '@/components/home/services'
import { Stats } from '@/components/home/stats'
import { Features } from '@/components/home/features'
import { Testimonials } from '@/components/home/testimonials'
import { Faq, FinalCta } from '@/components/home/faq'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Features />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  )
}
