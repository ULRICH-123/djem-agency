import { useLenis } from './lib/gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Services from './components/Services'
import Approach from './components/Approach'
import WhyUs from './components/WhyUs'
import Technologies from './components/Technologies'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'
import CookieBanner from './components/CookieBanner'

export default function App() {
  useLenis()
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <Services />
      <Approach />
      <WhyUs />
      <Technologies />
      <CTA />
      <Footer />
      <WhatsApp />
      <CookieBanner />
    </>
  )
}
