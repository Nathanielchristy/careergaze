"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowUpRight, GraduationCap, MapPin, 
  CheckCircle2, Globe2, School, Landmark, 
  Compass, ShieldCheck, Trophy, Users2
} from "lucide-react"

const sectors = [
  {
    id: "admissions",
    title: "Global Admissions",
    subtitle: "India's #1 Ivy-League Gateway",
    accent: "#D4AF37", // Gold
    path: "/services/college-admission",
    description: "Tailored for Indian aspirants. We bridge the gap between Indian high-school curricula (CBSE/ICSE/IB) and the world's most prestigious universities.",
    features: [
      { title: "Ivy & Oxbridge Strategy", desc: "Specialized profiling for the world's top 1% institutions.", status: "ELITE" },
      { title: "Scholarship Mastery", desc: "Access to ₹50Cr+ in exclusive financial aid for Indian students.", status: "FUNDED" },
      { title: "Visa & PR Pathways", desc: "99.2% success rate in student visa processing for USA, UK, & Canada.", status: "GUARANTEED" }
    ],
    cta: "Consult an Expert"
  },
  {
    id: "career",
    title: "Career Architecture",
    subtitle: "Corporate Strategy",
    accent: "#002147", // Navy
    path: "/services/career-consulting",
    description: "Beyond the degree. We build the digital and technical assets Indian professionals need to lead in global markets like London, NYC, and Dubai.",
    features: [
      { title: "Global Portfolio Build", desc: "Design a technical brand that beats international ATS systems.", status: "LIVE" },
      { title: "Skill Up-Grading", desc: "Curated roadmaps for high-concurrency tech and finance roles.", status: "GROWTH" },
      { title: "MNC Networking", desc: "Direct access to our alumni network in Fortune 500 companies.", status: "ACTIVE" }
    ],
    cta: "Build My Profile"
  },
  {
    id: "marketing",
    title: "Institutional Growth",
    subtitle: "Brand Dominance",
    accent: "#22C55E", // Emerald
    path: "/services/digital-marketing",
    description: "Positioning Indian educational brands as global leaders through data-driven SEO and sophisticated narrative-building.",
    features: [
      { title: "Global Recruitment", desc: "Scaling international student intake for Indian universities.", status: "SCALED" },
      { title: "SEO Authority", desc: "Ranking for high-intent academic keywords on a global scale.", status: "RANKING" },
      { title: "Content Psychology", desc: "Story-driven UI/UX designed for academic trust and conversion.", status: "PRO" }
    ],
    cta: "Scale My Brand"
  }
]

export default function Services() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="services" className="py-32 bg-[#020817] text-slate-200 overflow-hidden relative font-sans">
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ backgroundColor: sectors[activeTab].accent }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-[0.07] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">The Indian Authority in Education</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-serif font-medium text-white leading-tight mb-4">
              Strategic <br />
              <span className="italic text-[#D4AF37]">Advancement.</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-md border-l-2 border-[#D4AF37]/30 pl-6 mt-6">
              Careergize is India’s premier consultancy for students and professionals aiming for undisputed global authority.
            </p>
          </motion.div>
          
          {/* SECTOR SWITCHER */}
          <div className="flex bg-[#002147]/50 p-2 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
            {sectors.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 lg:px-10 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-500 ${
                  activeTab === idx ? 'text-[#002147]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === idx && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#D4AF37]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{s.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="lg:col-span-6 space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/20">
                    {sectors[activeTab].subtitle}
                  </span>
                </div>
                <h3 className="text-4xl font-serif font-bold text-white mb-6 flex items-center gap-4">
                  {sectors[activeTab].title}
                </h3>
                <p className="text-slate-400 leading-relaxed max-w-lg mb-12 text-lg">
                  {sectors[activeTab].description}
                </p>

                <div className="grid gap-4">
                  {sectors[activeTab].features.map((f, i) => (
                    <Link key={i} href={sectors[activeTab].path}>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex items-start gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/20 transition-all"
                      >
                        <div className="mt-1 p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:text-[#002147]">
                          <ShieldCheck size={20} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-white transition-colors">{f.title}</h4>
                            <span className="text-[9px] font-black border border-[#D4AF37]/20 px-2.5 py-1 rounded text-[#D4AF37] bg-[#D4AF37]/5">
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
              <button className="flex items-center gap-6 group mt-12">
                <span className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#002147] flex items-center justify-center group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700 shadow-xl shadow-[#D4AF37]/20">
                  <ArrowUpRight size={28} />
                </span>
                <span className="text-xl font-serif italic text-white group-hover:text-[#D4AF37] transition-all">
                  {sectors[activeTab].cta}
                </span>
              </button>
            </Link>
          </div>

          {/* RIGHT: THE CORE VISUAL */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square flex items-center justify-center">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/5 rounded-full"
              />
              
              <div className="relative z-10 w-full h-full p-12 lg:p-24">
                <div className="w-full h-full rounded-full border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-3xl flex items-center justify-center relative overflow-hidden group shadow-inner">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.1, opacity: 0 }}
                      className="text-center relative z-20"
                    >
                      {activeTab === 0 ? (
                        <School size={120} className="text-[#D4AF37] mx-auto opacity-80 filter drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]" />
                      ) : activeTab === 1 ? (
                        <Compass size={120} className="text-[#005A8D] mx-auto opacity-80" />
                      ) : (
                        <Trophy size={120} className="text-[#22C55E] mx-auto opacity-80" />
                      )}
                      <div className="mt-8 flex flex-col items-center">
                        <div className="h-px w-12 bg-[#D4AF37] mb-4" />
                        <h4 className="text-[10px] font-black tracking-[0.6em] text-white/40 uppercase">India to Global</h4>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* LIVE DATA OVERLAY */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-20 right-0 bg-[#002147] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-2xl z-30 hidden lg:block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Admissions Tracker</span>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-serif text-white">Fall 2026 Intake</p>
                  <p className="text-[11px] font-bold text-[#D4AF37]">840+ Indian Success Stories</p>
                </div>
              </motion.div>

               {/* FLOATING LOCATION TAG */}
               <div className="absolute bottom-10 left-0 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                  <MapPin size={14} className="text-[#D4AF37]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Headquarters: New Delhi</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* REFINED MARQUEE */}
      <div className="mt-32 py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="flex gap-24 animate-marquee whitespace-nowrap">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="flex gap-24 items-center">
                <span className="text-sm font-bold text-[#D4AF37] tracking-[0.4em] flex items-center gap-6">
                   <GraduationCap size={20} /> TOP INDIAN PLACEMENTS 2026
                </span>
                <span className="text-sm font-bold text-white/40 tracking-[0.4em] flex items-center gap-6">
                   <Globe2 size={20} /> GLOBAL REACH
                </span>
                <span className="text-sm font-bold text-[#22C55E] tracking-[0.4em] flex items-center gap-6">
                   <Users2 size={20} /> 15,000+ CAREERS EMPOWERED
                </span>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}