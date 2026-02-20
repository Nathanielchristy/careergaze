'use client'

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Zap, ArrowUpRight, Code2, GraduationCap, 
  Terminal, BarChart3, Globe, Layers, CheckCircle2,
  Cpu, MousePointer2, Sparkles
} from "lucide-react"

const sectors = [
  {
    id: "students",
    title: "Career Architecture",
    subtitle: "Professional DNA Engineering",
    accent: "#A7FF00",
    path: "/services/college-admission", // Your specific redirect link
    description: "Architecting the transition from academic theory to industrial dominance through elite mentorship.",
    features: [
      { title: "Internships 2026", desc: "Industrial training on live production environments.", status: "STARTED" },
      { title: "Admission Strategy", desc: "Ivy-League and Global Top-tier university placement.", status: "ENROLLING" },
      { title: "Full-Stack Mastery", desc: "Direct mentorship from Senior Software Engineers.", status: "LIVE" }
    ],
    cta: "Join the Cohort"
  },
  {
    id: "corporate",
    title: "Engineering Solutions",
    subtitle: "Enterprise Grade Systems",
    accent: "#005A8D",
    path: "/services/web-development", // Defaulting to web-dev for corporate
    description: "Deploying high-performance technical assets that drive operational efficiency and market authority.",
    features: [
      { title: "Cloud Architecture", desc: "Scalable Next.js systems & custom ERP integration.", status: "STABLE" },
      { title: "SEO Authority", desc: "Semantic search optimization & authority building.", status: "RANKING" },
      { title: "Tech Transformation", desc: "Modernizing legacy stacks into cloud-native ecosystems.", status: "SECURE" }
    ],
    cta: "Request Tech Audit"
  }
]

export default function Services() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="services" className="py-32 bg-[#05070A] text-slate-200 overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A7FF00]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#005A8D]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.9] mb-4">
              Two Worlds. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A7FF00] via-white to-[#005A8D]">
                One Standard.
              </span>
            </h2>
            <p className="text-slate-400 font-medium max-w-md italic border-l-2 border-white/10 pl-4 mt-6">
              Engineering talent for the corporate world, while building the tech that runs it.
            </p>
          </motion.div>
          
          {/* SECTOR SWITCHER */}
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-3xl shadow-2xl">
            {sectors.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-500 overflow-hidden ${
                  activeTab === idx ? 'text-slate-900' : 'text-slate-500 hover:text-white'
                }`}
              >
                {activeTab === idx && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{s.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: DESCRIPTIVE LAYER */}
          <div className="lg:col-span-6 space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  {activeTab === 0 ? <GraduationCap className="text-[#A7FF00]" /> : <Terminal className="text-[#005A8D]" />}
                  {sectors[activeTab].title}
                </h3>
                <p className="text-slate-400 leading-relaxed max-w-lg mb-10">
                  {sectors[activeTab].description}
                </p>

                <div className="grid gap-4">
                  {sectors[activeTab].features.map((f, i) => (
                    <Link key={i} href={sectors[activeTab].path}>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
                      >
                        <div className={`mt-1 p-2 rounded-lg bg-white/5 transition-colors duration-500 group-hover:bg-white group-hover:text-black`}>
                          <CheckCircle2 size={16} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-white group-hover:text-[#A7FF00] transition-colors">{f.title}</h4>
                            <span className={`text-[8px] font-black border px-2 py-0.5 rounded transition-colors duration-500 ${
                              activeTab === 0 ? 'border-[#A7FF00]/30 text-[#A7FF00]' : 'border-[#005A8D]/30 text-[#005A8D]'
                            }`}>
                              {f.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <Link href={sectors[activeTab].path}>
              <button className="flex items-center gap-4 group mt-8">
                <span className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center group-hover:bg-[#A7FF00] group-hover:-rotate-12 transition-all duration-500">
                  <ArrowUpRight size={24} />
                </span>
                <span className="text-lg font-bold tracking-tight border-b border-white/20 pb-1 group-hover:border-[#A7FF00] transition-all">
                  {sectors[activeTab].cta}
                </span>
              </button>
            </Link>
          </div>

          {/* RIGHT: THE CORE ENGINE VISUAL */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-dashed border-white/10 rounded-full"
              />
              
              <div className="relative z-10 w-full h-full p-8">
                <div className="w-full h-full rounded-[3rem] bg-white/[0.01] border border-white/10 backdrop-blur-2xl flex items-center justify-center relative overflow-hidden group shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.2, opacity: 0 }}
                      className="text-center relative z-20"
                    >
                      {activeTab === 0 ? (
                        <div className="space-y-4">
                          <Zap size={80} className="text-[#A7FF00] mx-auto filter drop-shadow-[0_0_15px_rgba(167,255,0,0.4)]" />
                          <h4 className="text-2xl font-black italic tracking-widest opacity-80">GENERATE_TALENT</h4>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Cpu size={80} className="text-[#005A8D] mx-auto filter drop-shadow-[0_0_15px_rgba(0,90,141,0.4)]" />
                          <h4 className="text-2xl font-black italic tracking-widest opacity-80">OPTIMIZE_SYSTEMS</h4>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute top-0 left-0 p-6 opacity-20"><Code2 size={40} /></div>
                  <div className="absolute bottom-0 right-0 p-6 opacity-20"><BarChart3 size={40} /></div>
                </div>
              </div>

              {/* Floating Status Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 right-6 bg-white p-6 rounded-2xl text-slate-900 shadow-2xl z-30 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-1.5 bg-[#22C55E] rounded-md"><MousePointer2 size={12} className="text-white" /></div>
                  <span className="text-[10px] font-black uppercase tracking-tighter">SEO Authority</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#22C55E] w-[98%]" />
                  </div>
                  <p className="text-[9px] font-bold text-slate-500 leading-none">Market Share: High</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="mt-32 py-12 border-y border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#05070A] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#05070A] to-transparent z-10" />
        
        <div className="flex gap-24 animate-marquee whitespace-nowrap">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex gap-24 items-center">
                <span className="text-2xl font-black text-white tracking-widest flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#A7FF00]" /> INTERNSHIPS OPEN
                </span>
                <span className="text-2xl font-black text-transparent stroke-white/20 tracking-widest italic" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                   SEO DRIVEN SOLUTIONS
                </span>
                <span className="text-2xl font-black text-white/40 tracking-widest flex items-center gap-3 uppercase">
                   <div className="w-2 h-2 rounded-full bg-[#005A8D]" /> Enterprise Grade
                </span>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}