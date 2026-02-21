"use client"

import { 
  ArrowUpRight, 
  ChevronRight, 
  Fingerprint, 
  Globe, 
  Lock, 
  Maximize, 
  Zap,
  Activity,
  Command,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

export default function KineticAbout() {
  return (
    <section id="about" className="py-24 lg:py-44 bg-[#020617] text-white relative overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP TIER: BRAND PHILOSOPHY */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-32">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A7FF00]/10 border border-[#A7FF00]/20 text-[#A7FF00] text-xs font-bold tracking-widest uppercase mb-6"
            >
              <Activity size={14} /> The Careergize Standard
            </motion.div>
            <h2 className="text-6xl lg:text-8xl font-black tracking-[ -0.04em] leading-none mb-8">
              Protocol for <br />
              <span className="text-[#A7FF00]">Hyper-Growth.</span>
            </h2>
          </div>
          <div className="lg:max-w-sm pb-4">
            <p className="text-slate-400 text-lg leading-relaxed border-l border-slate-800 pl-8">
              We bridge the gap between <span className="text-white font-semibold">theoretical code</span> and <span className="text-white font-semibold">deployed impact</span>. Our framework is engineered to scale human capital at the speed of the market.
            </p>
          </div>
        </div>

        {/* MIDDLE TIER: FEATURE ARCHITECTURE */}
        <div className="grid lg:grid-cols-3 gap-1px bg-slate-800 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* Card 1: SEO & Authority */}
          <div className="bg-[#020617] p-12 hover:bg-slate-900/50 transition-colors group">
            <div className="mb-20 flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[#A7FF00]">
                <Globe size={20} />
              </div>
              <ArrowUpRight className="text-slate-700 group-hover:text-[#A7FF00] transition-colors" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Algorithmic <br />Dominance</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Beyond simple keywords. We deploy semantic mapping and technical SEO audits to ensure your digital presence commands the first page.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">INDEXING</span>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">SEMANTICS</span>
            </div>
          </div>

          {/* Card 2: Development & Systems */}
          <div className="bg-[#020617] p-12 hover:bg-slate-900/50 transition-colors group relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#22C55E] to-transparent" />
            <div className="mb-20 flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[#22C55E]">
                <Command size={20} />
              </div>
              <ArrowUpRight className="text-slate-700 group-hover:text-[#22C55E] transition-colors" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Enterprise <br />Buildouts</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Custom software solutions designed for high-concurrency and global scale. We build the tools that internal corporate teams rely on.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">NEXT.JS</span>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">AWS</span>
            </div>
          </div>

          {/* Card 3: Placement & Talent */}
          <div className="bg-[#020617] p-12 hover:bg-slate-900/50 transition-colors group">
            <div className="mb-20 flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[#005A8D]">
                <Fingerprint size={20} />
              </div>
              <ArrowUpRight className="text-slate-700 group-hover:text-[#005A8D] transition-colors" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Strategic <br />Onboarding</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Our mentorship pipeline isn't a course—it's a corporate simulation. We produce candidates that Tier-1 companies compete for.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">B2B RELATIONS</span>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">PLACEMENT</span>
            </div>
          </div>
        </div>

        {/* BOTTOM TIER: DATA-DRIVEN VALIDATION */}
        <div className="mt-12 grid lg:grid-cols-4 gap-6">
          <div className="bg-[#0f172a] p-8 rounded-[2rem] border border-slate-800 flex flex-col justify-between">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Global Reach</span>
            <div className="mt-4">
              <h4 className="text-4xl font-black text-white">10+</h4>
              <p className="text-slate-500 text-xs">Countries Served</p>
            </div>
          </div>
          
          <div className="bg-[#A7FF00] p-8 rounded-[2rem] border border-slate-800 lg:col-span-2 flex items-center justify-between group cursor-pointer overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-slate-900 text-3xl font-black tracking-tighter uppercase leading-none">
                Start the <br />Acceleration
              </h4>
            </div>
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-[#A7FF00] group-hover:scale-110 transition-transform relative z-10">
              <Plus size={32} />
            </div>
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duraton-500" />
          </div>

          <div className="bg-[#0f172a] p-8 rounded-[2rem] border border-slate-800 flex flex-col justify-between">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Efficiency Rate</span>
            <div className="mt-4">
              <h4 className="text-4xl font-black text-white">98%</h4>
              <p className="text-slate-500 text-xs">Project Completion</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}