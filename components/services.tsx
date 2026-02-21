'use client'

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Zap, ArrowUpRight, Code2, GraduationCap, 
  Terminal, BarChart3, Globe, Layers, CheckCircle2,
  Cpu, MousePointer2, Sparkles, BookOpen, School
} from "lucide-react"

const sectors = [
  {
    id: "admissions",
    title: "Global Admissions",
    subtitle: "Academic Onboarding",
    accent: "#A7FF00",
    path: "/services/college-admission", // Redirect link updated
    description: "Your gateway to premier institutions. We manage the complexity of global applications and university tie-ups for the 2026 session.",
    features: [
      { title: "Direct Enrollment", desc: "Fast-track processing for partner universities.", status: "OPEN" },
      { title: "Ivy-League Strategy", desc: "Expert profiling for global top-tier placement.", status: "LIVE" },
      { title: "Documentation Hub", desc: "End-to-end visa and application paperwork.", status: "SECURE" }
    ],
    cta: "Start Application"
  },
  {
    id: "engineering",
    title: "Web Development",
    subtitle: "Enterprise Infrastructure",
    accent: "#005A8D",
    path: "/services/web-development",
    description: "Deploying high-concurrency systems and custom-built SaaS platforms optimized for the modern cloud.",
    features: [
      { title: "Next.js 15 Stacks", desc: "Server-side optimized enterprise applications.", status: "FAST" },
      { title: "Cloud Integration", desc: "Scalable AWS/Vercel architecture deployments.", status: "STABLE" },
      { title: "Code Audits", desc: "Security and performance optimization protocols.", status: "SECURE" }
    ],
    cta: "Build My Project"
  },
  {
    id: "marketing",
    title: "Digital Growth",
    subtitle: "Market Dominance",
    accent: "#22C55E",
    path: "/services/digital-marketing",
    description: "Data-driven authority building through technical SEO and semantic search dominance.",
    features: [
      { title: "SEO Dominance", desc: "Ranking on high-intent commercial keywords.", status: "RANKING" },
      { title: "Performance Ads", desc: "ROI-focused Meta and Google ad management.", status: "ACTIVE" },
      { title: "Brand Identity", desc: "Digital storytelling and UI/UX psychology.", status: "PRO" }
    ],
    cta: "Analyze My Brand"
  }
]

export default function Services() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="services" className="py-32 bg-[#05070A] text-slate-200 overflow-hidden relative">
      {/* Dynamic Background Glow that changes color based on activeTab */}
      <motion.div 
        animate={{ backgroundColor: sectors[activeTab].accent }}
        className="absolute top-0 left-1/4 w-96 h-96 opacity-[0.05] rounded-full blur-[150px] pointer-events-none transition-colors duration-700" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight text-white leading-[0.9] mb-4">
              Integrated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A7FF00] via-white to-[#005A8D]">
                Ecosystems.
              </span>
            </h2>
            <p className="text-slate-400 font-medium max-w-md italic border-l-2 border-white/10 pl-4 mt-6">
              Three pillars of modern industry: Education, Engineering, and Growth. 
            </p>
          </motion.div>
          
          {/* SECTOR SWITCHER (Three-Way) */}
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-3xl shadow-2xl">
            {sectors.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 lg:px-10 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-500 ${
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
                <h3 className="text-4xl font-black text-white mb-4 flex items-center gap-4">
                  {activeTab === 0 && <School className="text-[#A7FF00]" size={32} />}
                  {activeTab === 1 && <Terminal className="text-[#005A8D]" size={32} />}
                  {activeTab === 2 && <BarChart3 className="text-[#22C55E]" size={32} />}
                  {sectors[activeTab].title}
                </h3>
                <p className="text-slate-400 leading-relaxed max-w-lg mb-10 text-lg">
                  {sectors[activeTab].description}
                </p>

                <div className="grid gap-4">
                  {sectors[activeTab].features.map((f, i) => (
                    <Link key={i} href={sectors[activeTab].path}>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all"
                      >
                        <div className="mt-1 p-2 rounded-lg bg-white/5 transition-colors duration-500 group-hover:bg-[#A7FF00] group-hover:text-black">
                          <CheckCircle2 size={16} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-white group-hover:text-white transition-colors">{f.title}</h4>
                            <span className="text-[8px] font-black border border-white/20 px-2 py-0.5 rounded text-white/40 group-hover:border-white/50">
                              {f.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{f.desc}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <Link href={sectors[activeTab].path}>
              <button className="flex items-center gap-4 group mt-8">
                <span className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center group-hover:bg-[#A7FF00] group-hover:-rotate-12 transition-all duration-500 shadow-xl shadow-white/5">
                  <ArrowUpRight size={24} />
                </span>
                <span className="text-lg font-bold tracking-tight border-b border-white/10 pb-1 group-hover:border-[#A7FF00] transition-all">
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
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-dashed border-white/5 rounded-full"
              />
              
              <div className="relative z-10 w-full h-full p-8 lg:p-16">
                <div className="w-full h-full rounded-[4rem] bg-white/[0.01] border border-white/10 backdrop-blur-3xl flex items-center justify-center relative overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.1, opacity: 0 }}
                      className="text-center relative z-20"
                    >
                      {activeTab === 0 ? (
                        <GraduationCap size={100} className="text-[#A7FF00] mx-auto opacity-50 filter drop-shadow-[0_0_20px_rgba(167,255,0,0.3)]" />
                      ) : activeTab === 1 ? (
                        <Cpu size={100} className="text-[#005A8D] mx-auto opacity-50 filter drop-shadow-[0_0_20px_rgba(0,90,141,0.3)]" />
                      ) : (
                        <BarChart3 size={100} className="text-[#22C55E] mx-auto opacity-50 filter drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
                      )}
                      <h4 className="mt-6 text-xs font-black italic tracking-[0.5em] text-white/30 uppercase">System_Mode_{activeTab}</h4>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* FLOATING DATA CARD */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-10 right-10 bg-white p-5 rounded-3xl text-slate-900 shadow-2xl z-30 border border-white/20 hidden lg:block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  <span className="text-[10px] font-black uppercase">Live Updates</span>
                </div>
                <p className="text-[11px] font-bold text-slate-600">2026 Batch Intake: 84% Full</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="mt-32 py-10 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="flex gap-24 animate-marquee whitespace-nowrap">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="flex gap-24 items-center">
                <span className="text-xl font-black text-white/20 tracking-widest flex items-center gap-4">
                   <School size={20} /> ADMISSIONS STARTED 2026
                </span>
                <span className="text-xl font-black text-white tracking-widest flex items-center gap-4">
                   <Code2 size={20} className="text-[#005A8D]" /> ENTERPRISE WEB DEV
                </span>
                <span className="text-xl font-black text-white/20 tracking-widest flex items-center gap-4">
                   <Sparkles size={20} className="text-[#A7FF00]" /> SEO RANKING PRO
                </span>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}