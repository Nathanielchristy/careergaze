import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import WhyChoose from "@/components/why-choose"
import HowItWorks from "@/components/how-it-works"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  )
}
