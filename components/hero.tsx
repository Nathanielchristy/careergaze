"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, GraduationCap, School, CheckCircle, ChevronRight, Star } from "lucide-react"
import Link from 'next/link'

export default function AdmissionHero() {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] selection:bg-[#003366]/20">
      
      {/* --- ELITE ANNOUNCEMENT BAR --- */}
      <div className="bg-[#002147] py-3 overflow-hidden whitespace-nowrap border-b border-[#D4AF37]/30 relative z-50">
        <div className="flex animate-marquee hover:pause items-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-10 px-4">
              <span className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-[0.2em]">
                <Star size={12} fill="#D4AF37" />
                Admissions Open 2026-27
              </span>
              <span className="text-white font-medium text-xs uppercase tracking-widest">Limited Priority Seats Available</span>
              <span className="h-1 w-1 bg-[#D4AF37] rounded-full" />
              <span className="text-white/80 font-medium text-xs uppercase tracking-widest">Global University Partners</span>
              <span className="h-1 w-1 bg-[#D4AF37] rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <article className="max-w-2xl text-center lg:text-left">
            <header>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003366]/5 border border-[#003366]/10 mb-8">
                <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-xs font-bold text-[#003366] uppercase tracking-wider">Counseling Status: Active</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-[#002147] mb-6 leading-[1.1]">
                Secure Your <br />
                <span className="italic font-normal text-[#005A8D]">Dream College</span> Seat.
              </h1>
            </header>

            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Navigate the 2026 admission cycle with confidence. Get 1:1 mentorship from 
              <span className="text-[#002147] font-bold"> expert counselors</span> for India's 
              most prestigious universities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#002147] hover:bg-[#003366] text-white rounded-full px-10 h-16 text-lg font-semibold shadow-2xl transition-all hover:-translate-y-1"
              >
                Start Application
                <ArrowUpRight size={20} className="ml-2" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-10 h-16 text-lg font-semibold border-2 border-[#002147] text-[#002147] hover:bg-[#002147] hover:text-white transition-all"
              >
                <Link href="/universities">Explore Universities</Link>
              </Button>
            </div>

            {/* STATS STRIP */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-slate-200">
              {[
                { label: "Admit Rate", val: "98%" },
                { label: "Placements", val: "500+" },
                { label: "Colleges", val: "150+" },
                { label: "Scholarships", val: "10Cr+" }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#002147]">{stat.val}</p>
                </div>
              ))}
            </div>
          </article>

          {/* RIGHT VISUALS (Styled like your image) */}
          <div className="relative">
            {/* Decorative Background Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            
            <figure className="relative z-10">
              {/* Main Image with Gold Border Frame */}
              <div className="relative p-3 rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
                <div className="overflow-hidden rounded-[1.5rem] aspect-[4/5] lg:aspect-auto">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                    alt="Students on campus"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating "Verified Partner" Badge */}
                <div className="absolute top-12 -left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#002147] rounded-full flex items-center justify-center">
                    <School size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Recognized</p>
                    <p className="text-sm font-bold text-[#002147]">Verified Partner</p>
                  </div>
                </div>

                {/* Floating "Expert Support" Badge */}
                <div className="absolute bottom-12 -right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <CheckCircle size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Assistance</p>
                    <p className="text-sm font-bold text-[#002147]">Expert Support</p>
                  </div>
                </div>
              </div>
            </figure>
          </div>
          
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}