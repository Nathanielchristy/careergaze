"use client"

import { Rocket, ShieldCheck, Zap, Globe, ArrowRight, Star } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Abstract Logo-Inspired Background Accents */}
      <div className="absolute top-0 right-0 p-10 hidden lg:block">
        <span className="text-[12rem] font-black text-slate-50 leading-none select-none">
          CG
        </span>
      </div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#A7FF00]/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#005A8D]/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* 01. THE MANIFESTO */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-[#005A8D] to-[#A7FF00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#005A8D]">
                the manifesto
              </span>
            </div>
            
            <h2 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-10">
              Excellence <br />
              is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] to-[#22C55E]">non-negotiable.</span>
            </h2>

            <p className="text-2xl text-slate-600 font-medium leading-snug max-w-2xl mb-12">
              Careergize is a premium ecosystem where <span className="text-slate-900 underline decoration-[#A7FF00] decoration-4 underline-offset-4">elite engineering</span> meets 
              strategic <span className="text-slate-900 underline decoration-[#005A8D] decoration-4 underline-offset-4">career architecture</span>.
            </p>

            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-4 group">
                <div className="flex items-center gap-2">
                  <Star className="fill-[#005A8D] text-[#005A8D] w-4 h-4" />
                  <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 group-hover:text-[#005A8D] transition-colors">Digital Authority</h3>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">
                  We create digital assets inspired by growth-centric design that dominate search rankings and command attention.
                </p>
              </div>
              <div className="space-y-4 group">
                <div className="flex items-center gap-2">
                  <Star className="fill-[#22C55E] text-[#22C55E] w-4 h-4" />
                  <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 group-hover:text-[#22C55E] transition-colors">Career Mastery</h3>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Our blueprint for Ivy League admissions and C-suite pivots is built on the same upward trajectory as our logo.
                </p>
              </div>
            </div>
          </div>

          {/* 02. THE IMPACT BOX */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="relative group">
              {/* Main Visual with Logo Gradient Border */}
              <div className="aspect-[4/5] rounded-[2.5rem] p-1 bg-gradient-to-br from-[#005A8D] via-[#22C55E] to-[#A7FF00] shadow-2xl transition-all duration-700">
                <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-white">
                    <img 
                    src="/expert-mentorship-session-with-career-advisor-and-.jpg" 
                    alt="Careergize leadership consulting"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-700"
                    />
                </div>
              </div>

              {/* Floating "Why Careergize" Interactive Card */}
              <div className="absolute -bottom-10 -left-10 right-10 bg-slate-900 p-8 rounded-3xl shadow-2xl border-t-4 border-[#A7FF00]">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-white text-3xl font-black leading-tight tracking-tighter">
                    why <br /><span className="text-[#A7FF00]">careergize?</span>
                  </h4>
                  <div className="p-3 bg-gradient-to-br from-[#005A8D] to-[#22C55E] rounded-2xl">
                    <Zap className="text-white fill-white w-6 h-6" />
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "SEO-Driven Development",
                    "Elite University Network",
                    "Global Career Strategy"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/90 font-bold text-sm">
                      <ShieldCheck size={16} className="text-[#A7FF00]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 03. TRUST FOOTER */}
        <div className="mt-32 pt-12 border-t border-slate-100 flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-4 text-slate-900 font-black text-xl tracking-tighter hover:text-[#005A8D] transition-all"
            >
              Start the collaboration
              <span className="w-14 h-14 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#005A8D] group-hover:to-[#22C55E] group-hover:border-transparent group-hover:text-white transition-all">
                <ArrowRight size={24} />
              </span>
            </button>
          </div>
          
          <div className="flex gap-12">
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Global Reach</p>
              <p className="text-xl font-bold text-slate-900 italic font-serif">10+countries</p>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#A7FF00]/30" />
            </div>
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Happy Clients</p>
              <p className="text-xl font-bold text-slate-900 italic font-serif">100+</p>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#005A8D]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}