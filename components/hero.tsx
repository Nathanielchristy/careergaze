"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react"

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false)
  
  const scrollToSection = (id: string) => {
    setIsOpen(false)
    if (id === "about" || id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.getElementById(id)
    if (element) {
      const offset = 80 
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white selection:bg-[#A7FF00]/30">
      <h2 className="sr-only">Hero Section - Careergize Expert Mentorship</h2>
      
      {/* Brand-Specific Background Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#005A8D]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#A7FF00]/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <article className="max-w-2xl text-center lg:text-left">
            <header>
              {/* Trust Badge - Custom Logo Colors */}
            

              {/* H1 - Gradient focus on 'Success' */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.95]">
                Your Path to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] to-[#22C55E]">Success</span>
                <br />
                <span className="text-slate-400">Starts Here.</span>
              </h1>
            </header>

           <p className="text-lg sm:text-xl text-slate-600 mb-10 text-balance leading-relaxed font-medium">
  <span className="text-slate-900 font-bold">Empowering students and businesses</span> with 
  <span className="text-slate-900 font-bold"> elite college admissions</span>, 
  <span className="text-slate-900 font-bold"> web development</span>, and 
  <span className="text-slate-900 font-bold"> digital growth solutions</span> designed to fuel your success.
</p>

            {/* CTAs - Utilizing the vibrant Lime Green for primary action */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center lg:justify-start">
              <Button
                size="lg"
                aria-label="Schedule a free consultation"
                className="bg-[#005A8D] hover:bg-[#004a75] text-white rounded-2xl px-8 h-16 text-lg font-bold shadow-xl shadow-blue-100 transition-all hover:-translate-y-1 flex items-center gap-2 border-none"
                 onClick={() => scrollToSection("cta")}
              >
                Get Started
                <ArrowRight size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-8 h-16 text-lg font-bold border-2 border-[#A7FF00] text-slate-900 hover:bg-[#A7FF00] transition-all"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators - Styled with brand accents */}
            <dl className="grid grid-cols-3 gap-8 border-t border-slate-100 pt-10">
              <div className="flex flex-col gap-1">
                <dt className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students</dt>
                <dd className="text-4xl font-black text-slate-900 tracking-tighter">100+</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success</dt>
                <dd className="text-4xl font-black text-[#22C55E] tracking-tighter">95%</dd>
                <div className="h-1 w-12 bg-[#A7FF00] rounded-full mt-1" />
              </div>
              {/* Countries Tab - Blue Accent */}
  <div className="flex flex-col gap-1">
    <dt className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Countries</dt>
    <dd className="text-4xl font-black text-[#005A8D] tracking-tighter">10+</dd>
    <div className="h-1 w-12 bg-[#005A8D]/20 rounded-full mt-1" />
  </div>
            </dl>
          </article>

          {/* Right Image - Framed with Logo Gradient */}
          <div className="relative hidden lg:block group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#005A8D]/20 to-[#A7FF00]/20 rounded-[3rem] blur-2xl transition-opacity group-hover:opacity-100 opacity-70" aria-hidden="true" />
            
            <figure className="relative p-2 bg-gradient-to-br from-[#005A8D] via-[#22C55E] to-[#A7FF00] rounded-[2.8rem] shadow-2xl">
              <div className="bg-white rounded-[2.3rem] overflow-hidden">
                <img
                  src="/professional-team-collaborating-on-career-growth-w.jpg"
                  alt="Mentorship team collaborating on college admissions strategy and digital branding"
                  width={800}
                  height={600}
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              {/* Floating Success Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 bg-[#A7FF00] rounded-full flex items-center justify-center shadow-lg shadow-[#A7FF00]/20">
                  <Zap size={20} className="text-[#005A8D]" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase leading-none">Growth</p>
                  <p className="text-lg font-black text-slate-900 tracking-tighter">Accelerated</p>
                </div>
              </div>
            </figure>
          </div>
          
        </div>
      </div>
    </section>
  )
}