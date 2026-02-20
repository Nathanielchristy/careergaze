"use client"

import { 
  Rocket, ShieldCheck, Zap, ArrowRight, 
  Code2, GraduationCap, Building2, 
  Cpu, Network, BarChart3, Globe2, Plus, 
  TrendingUp, Layers
} from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 bg-[#fafafa] text-slate-900 relative overflow-hidden">
      {/* Brand Aesthetic: Subtle top-right glow using Logo Lime */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#A7FF00]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION: THE BRAND SYNERGY */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-32">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
               <div className="w-12 h-[2px] bg-[#005A8D]" />
               <span className="text-xs font-black uppercase tracking-[0.4em] text-[#005A8D]">Foundational Identity</span>
            </motion.div>
            
            <h2 className="text-6xl lg:text-[100px] font-black tracking-tighter leading-[0.85] text-slate-900">
              Engineering <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] via-[#22C55E] to-[#A7FF00]">
                Total Synergy.
              </span>
            </h2>
          </div>
          <div className="lg:max-w-xs lg:pt-10">
             <p className="text-slate-500 text-lg leading-relaxed font-medium border-l-4 border-[#22C55E] pl-6">
               Careergize architects the bridge between <span className="text-slate-900 font-bold">raw technical talent</span> and <span className="text-slate-900 font-bold">corporate excellence</span>.
             </p>
          </div>
        </div>

        {/* BENTO GRID: BRANDED SOLUTIONS */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* PRIMARY CARD: THE ECOSYSTEM (Deep Corporate Blue Focus) */}
          <div className="lg:col-span-7 bg-[#005A8D] text-white rounded-[3rem] p-12 relative overflow-hidden shadow-2xl shadow-[#005A8D]/20 group">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-12 backdrop-blur-md">
                <Layers size={14} className="text-[#A7FF00]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Unified Framework</span>
              </div>
              
              <h3 className="text-4xl font-black mb-6 tracking-tight">Technical Ecosystem Architecture</h3>
              <p className="text-blue-100/80 text-xl max-w-lg leading-relaxed mb-10">
                We build high-performance SEO portfolios and custom enterprise solutions that function as <span className="text-[#A7FF00] font-bold underline decoration-2 underline-offset-4">competitive assets.</span>
              </p>
              
              <div className="flex items-center gap-6">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#005A8D] bg-slate-200" />
                    ))}
                 </div>
                 <span className="text-xs font-bold text-blue-200 uppercase tracking-tighter">Joined by 100+ High Achievers</span>
              </div>
            </div>
            {/* Abstract Vector */}
            <Cpu size={350} className="absolute -bottom-10 -right-10 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
          </div>

          {/* SECONDARY CARD: SEO DOMINANCE (Lime Focus) */}
          <div className="lg:col-span-5 bg-white border-2 border-slate-100 rounded-[3rem] p-12 flex flex-col justify-between hover:border-[#A7FF00]/50 transition-all duration-500 shadow-xl shadow-slate-200/50">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#A7FF00] flex items-center justify-center mb-8 shadow-lg shadow-[#A7FF00]/30">
                <TrendingUp className="text-slate-900" size={32} />
              </div>
              <h3 className="text-3xl font-black leading-tight mb-4">Digital Dominance</h3>
              <p className="text-slate-500 font-medium text-lg leading-snug">
                SEO is not an afterthought. We engineer search authority into your digital DNA, ensuring you lead the conversation.
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
               <span className="text-sm font-black text-[#005A8D]">RANKING POTENTIAL</span>
               <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    className="h-full bg-[#22C55E]" 
                  />
               </div>
               <span className="text-xs font-bold text-[#22C55E]">95%</span>
            </div>
          </div>

          {/* PILLAR TRIO: USING LOGO GREEN & BLUE */}
          {[
            { icon: <Network size={28} />, color: "#22C55E", title: "Global Network", desc: "Connecting talent to tier-1 corporate breakthroughs." },
            { icon: <BarChart3 size={28} />, color: "#005A8D", title: "Analytics First", desc: "Data-driven roadmaps to bypass career plateaus." },
            { icon: <Code2 size={28} />, color: "#A7FF00", title: "Elite Code", desc: "Custom software built for the future of work." }
          ].map((item, i) => (
            <div key={i} className="lg:col-span-4 bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all group">
               <div 
                 className="w-12 h-12 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"
                 style={{ backgroundColor: `${item.color}15`, color: item.color }}
               >
                 {item.icon}
               </div>
               <h4 className="text-xl font-black mb-3">{item.title}</h4>
               <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FOOTER CTA: HIGH-IMPACT GRADIENT */}
        <div className="mt-32 p-1 rounded-[3rem] bg-gradient-to-r from-[#005A8D] via-[#22C55E] to-[#A7FF00]">
           <div className="bg-white rounded-[2.9rem] px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                 <h4 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                   Ready to <span className="text-[#005A8D]">Energize</span> your future?
                 </h4>
                 <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Join the Careergize Collective Today</p>
              </div>
              
              <button className="px-12 py-6 bg-[#005A8D] text-white font-black rounded-2xl hover:bg-slate-900 transition-all flex items-center gap-4 shadow-xl shadow-[#005A8D]/20">
                 START YOUR JOURNEY
                 <ArrowRight size={20} />
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}