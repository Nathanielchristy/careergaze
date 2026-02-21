"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target, Zap, Briefcase, ChevronRight } from "lucide-react"
import Link from 'next/link'

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false)
  
  const scrollToSection = (id: string) => {
    setIsOpen(false)
    if (id === "home") {
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
    <section className="relative overflow-hidden bg-white selection:bg-[#A7FF00]/30">
      
      {/* --- ADVANCED MOVING ANNOUNCEMENT BAR --- */}
      <div className="bg-[#005A8D] py-3 overflow-hidden whitespace-nowrap border-b border-[#004a75] relative z-50">
        <div className="flex animate-marquee hover:pause items-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-10 px-4">
              <span className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-[0.2em]">
                
                Internships Open 2026
              </span>
              <span className="text-[#A7FF00] font-bold text-xs uppercase italic">Enroll Now</span>
              <span className="h-1.5 w-1.5 bg-white/30 rounded-full" />
              <span className="text-white/80 font-medium text-xs uppercase tracking-widest">Global Remote Opportunities</span>
              <span className="h-1.5 w-1.5 bg-white/30 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <h2 className="sr-only">Hero Section - Careergize Expert Mentorship</h2>
      
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#005A8D]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#A7FF00]/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <article className="max-w-2xl text-center lg:text-left">
            <header>
              {/* Refined Badge */}
              <div 
                onClick={() => scrollToSection("internships")}
                className="group inline-flex items-center gap-2 px-1 py-1 pr-4 rounded-full bg-slate-50 border border-slate-200 mb-8 cursor-pointer hover:border-[#A7FF00] transition-all"
              >
                <span className="bg-[#005A8D] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  Live
                </span>
                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">Summer Internships 2026</span>
                <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.95]">
                Your Path to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] to-[#22C55E]">Success</span>
                <br />
                <span className="text-slate-400">Starts Here.</span>
              </h1>
            </header>

            <p className="text-lg sm:text-xl text-slate-600 mb-10 text-balance leading-relaxed font-medium">
              <span className="text-slate-900 font-bold">Empowering students and businesses</span> with 
              <span className="text-[#005A8D] font-bold"> elite college admissions</span>, 
              <span className="text-[#22C55E] font-bold"> high-impact internships</span>, and 
              <span className="text-slate-900 font-bold"> digital growth solutions</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#005A8D] hover:bg-[#004a75] text-white rounded-2xl px-8 h-16 text-lg font-bold shadow-xl shadow-blue-100 transition-all hover:-translate-y-1 flex items-center gap-2"
                onClick={() => scrollToSection("cta")}
              >
                Contact US
                <ArrowRight size={20} />
              </Button>
<Button
  asChild
  size="lg"
  variant="outline"
  className="rounded-2xl px-8 h-16 text-lg font-bold border-2 border-[#A7FF00] text-slate-900 hover:bg-[#A7FF00] transition-all"
>
  <Link href="/internship-2026/view-intership">
    View Internships
  </Link>
</Button>
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-slate-100 pt-10">
              <div className="flex flex-col gap-1">
                <dt className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students</dt>
                <dd className="text-3xl font-black text-slate-900 tracking-tighter">100+</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success</dt>
                <dd className="text-3xl font-black text-[#22C55E] tracking-tighter">95%</dd>
              </div>
              <div className="flex flex-col gap-1 cursor-pointer group" onClick={() => scrollToSection("internships")}>
                <dt className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#005A8D] transition-colors text-[#005A8D]">Internships</dt>
                <dd className="text-3xl font-black text-[#005A8D] tracking-tighter">25+</dd>
                <div className="h-1 w-8 bg-[#005A8D] rounded-full" />
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projects</dt>
                <dd className="text-3xl font-black text-slate-900 tracking-tighter">10+</dd>
              </div>
            </dl>
          </article>

          <div className="relative hidden lg:block group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#005A8D]/20 to-[#A7FF00]/20 rounded-[3rem] blur-2xl opacity-70" aria-hidden="true" />
            
            <figure className="relative p-2 bg-gradient-to-br from-[#005A8D] via-[#22C55E] to-[#A7FF00] rounded-[2.8rem] shadow-2xl">
              <div className="bg-white rounded-[2.3rem] overflow-hidden">
                <img
                  src="/professional-team-collaborating-on-career-growth-w.jpg"
                  alt="Internship and mentorship team"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <div 
                onClick={() => scrollToSection("internships")}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="w-10 h-10 bg-[#005A8D] rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                  <Briefcase size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase leading-none">Openings</p>
                  <p className="text-lg font-black text-slate-900 tracking-tighter">Apply Now</p>
                </div>
              </div>

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

      {/* --- CSS ANIMATIONS --- */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 25s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}