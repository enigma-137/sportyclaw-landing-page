import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { WhySportyClaw } from "@/components/why-sportyclaw"
import { TelegramSection } from "@/components/telegram-section"
import { Testimonials } from "@/components/testimonials"
import { Performance } from "@/components/performance"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"
import { Starfield } from "@/components/starfield"
import { AmbientLights } from "@/components/ambient-lights"

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Starfield />
      <AmbientLights />
      <CursorGlow />
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhySportyClaw />
      <TelegramSection />
      <Testimonials />
      <Performance />
      <FinalCta />
      <Footer />
    </main>
  )
}
