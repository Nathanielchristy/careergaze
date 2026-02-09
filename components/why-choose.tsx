'use client'

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Sparkles, Users2, LineChart, ShieldCheck, Cpu, Zap, ArrowUpRight } from "lucide-react"
import Link from 'next/link'

const reasons = [
  {
    title: "Expert Team",
    description: "Work with industry professionals who have a proven track record in education and tech.",
    icon: <Users2 className="w-5 h-5" />,
    color: "#005A8D" // Blue
  },
  {
    title: "Proven Results",
    description: "Our students get into top-tier universities, and our clients see real business growth.",
    icon: <LineChart className="w-5 h-5" />,
    color: "#22C55E" // Mid-Green
  },
  {
    title: "Personalized Strategy",
    description: "No generic templates. Every solution is custom-built for your specific goals.",
    icon: <Sparkles className="w-5 h-5" />,
    color: "#A7FF00" // Lime
  },
  {
    title: "24/7 Priority Support",
    description: "End-to-end guidance from your first consultation through project completion.",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "#005A8D"
  },
  {
    title: "Modern Tech Stack",
    description: "We use Next.js, AI, and the latest digital tools to keep you ahead of the curve.",
    icon: <Cpu className="w-5 h-5" />,
    color: "#22C55E"
  },
  {
    title: "Fair & Transparent",
    description: "High-value solutions with competitive pricing and zero hidden fees.",
    icon: <Zap className="w-5 h-5" />,
    color: "#A7FF00"
  },
]

export default function WhyChoose() {
  return (
    <section id="why" className="py-24 bg-white relative overflow-hidden">
      {/* Background Brand Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A7FF00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-10 h-[2px] bg-[#005A8D]" />
               <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#005A8D]">
                The Careergize Edge
              </h2>
            </div>
            <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
              Why leading minds <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] to-[#22C55E]">Choose Careergize.</span>
            </h3>
          </div>
          <div className="max-w-sm">
            <p className="text-lg text-slate-500 font-medium leading-relaxed italic border-l-4 border-[#A7FF00] pl-6">
              "We don't just provide services; we architect the upward trajectory of your professional life."
            </p>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="group relative transition-all duration-300"
            >
              <div className="flex flex-col gap-6">
                {/* Icon Container with Logo-Style Circular Energy */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg shadow-transparent group-hover:shadow-indigo-100 group-hover:-translate-y-1"
                  style={{ 
                    backgroundColor: 'white',
                    border: `2px solid ${reason.color}20`,
                  }}
                >
                  <div style={{ color: reason.color }}>
                    {reason.icon}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-[#005A8D] transition-colors">
                    {reason.title}
                  </h4>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm sm:text-base">
                    {reason.description}
                  </p>
                </div>
                
                {/* Animated Growth Line */}
                <div className="relative w-full h-[2px] bg-slate-100 overflow-hidden">
                  <div 
                    className="absolute inset-0 w-0 group-hover:w-full transition-all duration-700 ease-in-out" 
                    style={{ backgroundColor: reason.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout - High Impact Gradient Box */}
        <div className="mt-24 p-1 rounded-[3rem] bg-gradient-to-r from-[#005A8D] via-[#22C55E] to-[#A7FF00] shadow-2xl shadow-[#A7FF00]/20">
          <div className="bg-slate-900 rounded-[2.8rem] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative">
            
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#A7FF00]/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            
            <div className="relative z-10 text-center lg:text-left">
              <h4 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
                Ready to transform <br className="hidden md:block"/> your <span className="text-[#A7FF00]">future?</span>
              </h4>
              <p className="text-slate-400 font-medium text-lg">
                Join 100+ high-achievers scaling their growth with our blueprint.
              </p>
            </div>
           <Link href="/get-blueprint">
  <button className="group relative z-10 px-10 py-5 bg-white hover:bg-[#A7FF00] text-slate-900 font-black rounded-2xl transition-all flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 lowercase tracking-tighter">
    get your free blueprint
    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
  </button>
</Link>
          </div>
        </div>
      </div>
    </section>
  )
}