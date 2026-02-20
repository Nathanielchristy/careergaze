"use client"

import { 
  Rocket, ShieldCheck, Zap, ArrowRight, 
  Code2, GraduationCap, Building2, 
  Cpu, Network, BarChart3, Globe2 
} from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#050A10] relative overflow-hidden text-white">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: `radial-gradient(#22C55E 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-3xl">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A7FF00]/10 border border-[#A7FF00]/20 text-[#A7FF00] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A7FF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A7FF00]"></span>
              </span>
              The New World Order
            </div> */}
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
              Engineering <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A7FF00] via-[#22C55E] to-[#005A8D]">
                Total Synergy.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg max-w-sm leading-relaxed border-l-2 border-[#A7FF00]/30 pl-6 mb-2">
            We dismantle the wall between academic theory and corporate reality through high-performance technical architecture.
          </p>
        </div>

        {/* BENTO GRID: THE SOLUTIONS ARCHITECTURE */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* BIG CARD: THE BRIDGE */}
          <div className="lg:col-span-8 bg-slate-900/50 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group hover:border-[#A7FF00]/40 transition-all duration-500">
            <div className="relative z-10">
              <div className="flex gap-4 mb-20">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                  <GraduationCap className="text-[#A7FF00]" size={32} />
                </div>
                <div className="h-[2px] w-20 bg-gradient-to-r from-[#A7FF00] to-[#005A8D] self-center opacity-30" />
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                  <Building2 className="text-[#005A8D]" size={32} />
                </div>
              </div>

              

              <h3 className="text-4xl font-black mb-6">Unified Technical Ecosystem</h3>
              <p className="text-slate-400 text-xl max-w-xl leading-relaxed">
                Whether it's an <span className="text-white">SEO-driven portfolio</span> for a student or a <span className="text-white">custom CRM solution</span> for a firm, our code is built to solve the challenges of the "New World" market.
              </p>
            </div>
            {/* Abstract Tech Graphic */}
            <div className="absolute top-0 right-0 opacity-20 group-hover:opacity-40 transition-opacity">
              <Cpu size={300} strokeWidth={0.5} className="translate-x-1/4 -translate-y-1/4" />
            </div>
          </div>

          {/* SIDE CARD: SEO POWER */}
          <div className="lg:col-span-4 bg-[#A7FF00] rounded-[3rem] p-10 text-slate-900 flex flex-col justify-between group">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center">
                <Globe2 className="text-[#A7FF00]" size={32} />
              </div>
              <h3 className="text-3xl font-black leading-tight">Digital Dominance Architecture</h3>
              <p className="font-bold text-slate-800 leading-tight">
                Our solutions are SEO-native. We don't just build sites; we build search-ranking authorities that command attention globally.
              </p>
            </div>
            <div className="pt-8 flex items-center gap-4 border-t border-slate-900/10">
              <span className="text-6xl font-black opacity-20">#1</span>
              <p className="text-xs font-black uppercase tracking-tighter">Ranking Potential <br /> Guaranteed</p>
            </div>
          </div>

          {/* LOWER GRID: CORE PILLARS */}
          <div className="lg:col-span-4 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 hover:bg-slate-900 transition-colors">
            <Network className="text-[#22C55E] mb-6" size={40} />
            <h4 className="text-xl font-black mb-3">Student-to-Corp Network</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Proprietary pipelines that funnel high-skilled technical talent directly into corporate breakthrough projects.
            </p>
          </div>

          <div className="lg:col-span-4 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 hover:bg-slate-900 transition-colors">
            <BarChart3 className="text-[#005A8D] mb-6" size={40} />
            <h4 className="text-xl font-black mb-3">Data-Driven Strategy</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leveraging advanced analytics to overcome career plateaus and operational inefficiencies in real-time.
            </p>
          </div>

          <div className="lg:col-span-4 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 hover:bg-slate-900 transition-colors">
            <Code2 className="text-[#A7FF00] mb-6" size={40} />
            <h4 className="text-xl font-black mb-3">Elite Engineering</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bespoke software development focused on scalability, security, and the future of automated work.
            </p>
          </div>
        </div>

        {/* FINAL MANIFESTO CTA */}
        <div className="mt-20 py-12 border-y border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
          <h4 className="text-2xl md:text-4xl font-black tracking-tighter text-center md:text-left">
            Excellence is not a goal. <br />
            <span className="text-[#A7FF00]">It's our baseline.</span>
          </h4>
          <button 
            className="group relative flex items-center gap-6 px-10 py-5 bg-white text-slate-900 font-black rounded-full overflow-hidden hover:pr-14 transition-all"
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10">Partner with Careergize</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#A7FF00] to-[#22C55E] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </section>
  );
}