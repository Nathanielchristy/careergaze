'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { 
  ArrowLeft, CheckCircle2, Cpu, Stethoscope, BookOpen, 
  Building2, DollarSign, Palette, ExternalLink, ShieldCheck, 
  Target, Zap, X, Info, LogIn, ClipboardCheck, Rocket, MessageSquare
} from 'lucide-react'
import Link from 'next/link'

// --- Animation Helper ---
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
)

// --- Branded Internship Popup ---
const InternshipPopup = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-[#0f172a] rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] border border-white/10"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X size={24} />
            </button>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Registration Live
            </div>

            <h2 className="text-4xl font-black text-white tracking-tighter leading-none mb-4">
              Elite Internships <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Started.</span>
            </h2>
            
            <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5">
              <div className="space-y-4">
                {[
                  { step: "1", t: "Register", d: "Create your student profile." },
                  { step: "2", t: "Enroll", d: "Apply for 2026 tracks." },
                  { step: "3", t: "Launch", d: "Access the tech dashboard." }
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500 text-black text-[10px] flex items-center justify-center font-black">{s.step}</div>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-tighter">{s.t}</p>
                      <p className="text-[11px] text-slate-400">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/register"><Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black h-14 rounded-2xl font-black text-lg">REGISTER NOW</Button></Link>
              <Link href="/login"><Button variant="ghost" className="w-full text-slate-400 hover:text-white font-bold">Already enrolled? Login</Button></Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function CollegeAdmissionPage() {
  const tracks = [
    { icon: Cpu, title: 'Engineering', desc: 'IIT/NIT specialization. JEE/GATE counseling.', highlights: ['IIT Strategy', 'Branch Audit'] },
    { icon: Stethoscope, title: 'Medical', desc: 'Expert NEET guidance for top medical colleges.', highlights: ['NEET Analysis', 'MBBS Path'] },
    { icon: DollarSign, title: 'Management', desc: 'Elite B-School roadmaps and profile building.', highlights: ['CAT/GMAT Prep', 'MBA Strategy'] },
    { icon: Building2, title: 'Commerce', desc: 'Strategic entry into SRCC and premier finance hubs.', highlights: ['CA Guidance', 'Finance Hubs'] },
    { icon: Palette, title: 'Arts & Design', desc: 'Portfolio audit for NID, NIFT, and Liberal Arts.', highlights: ['Portfolio Audit', 'Design Coaching'] },
    { icon: BookOpen, title: 'Nursing', desc: 'Full guidance for clinical education and careers.', highlights: ['B.Sc Nursing', 'Global Paths'] },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <InternshipPopup />

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-[10px] overflow-hidden relative">
                <Image src="/logo.jpeg" alt="Careergize" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <span className="font-black text-2xl tracking-tighter text-white leading-none">Careergize<span className="text-cyan-400">.</span></span>
          </Link>
          <Link href="/"><Button variant="ghost" className="font-black text-xs tracking-widest text-slate-400 hover:text-cyan-400 gap-2"><ArrowLeft size={16} /> BACK</Button></Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Target size={14} /> Global Admissions 2026
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Strategize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Future.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg font-medium">
              Elite guidance for top-tier admissions and technical internships. We architect your path from classroom to boardroom.
            </p>
            <Link href="/contact"><Button className="bg-cyan-500 hover:bg-cyan-400 text-black px-10 rounded-2xl h-16 font-black text-lg shadow-2xl shadow-cyan-500/20">BOOK CONSULTATION</Button></Link>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-[2.8rem] overflow-hidden aspect-[1/1] sm:aspect-[4/5]">
                  <img
                    src="/collegetwo.jpg"
                    alt="Careergize Students"
                    className="w-full h-full object-cover"
                  />
                </div>


          </FadeIn>
        </div>
      </section>

      {/* TRACKS GRID */}
      <section className="py-32 bg-[#0B1120] px-6 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em] mb-4">Admissions</h2>
            <h3 className="text-5xl font-black tracking-tighter">Specialized Guidance Tracks</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-cyan-500/30 transition-all group h-full">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <track.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-black mb-4 tracking-tight">{track.title}</h4>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">{track.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {track.highlights.map((h, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-cyan-400 uppercase tracking-widest">{h}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNSHIP BRIDGE */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#0f172a] to-[#020617] rounded-[3.5rem] p-12 lg:p-24 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] -mr-40 -mt-40" />
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-5xl lg:text-7xl font-black leading-none tracking-tighter mb-8">
                Build. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Not Just Learn.</span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed mb-10 font-medium">
                Our 2026 internship provides deep-tech exposure and industry mentorship. This is the blueprint for your digital dominance.
              </p>
              <ul className="space-y-4 mb-10">
                {['Industry Certifications', 'Real-world Tech Exposure', 'Network Access'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-white font-bold tracking-tight">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/20">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/internship"><Button className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 rounded-2xl h-16 font-black text-lg">ENROLL NOW <ExternalLink className="ml-3" /></Button></Link>
            </div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 group">
              <img src="/team-support-mentoring-professional-guidance.jpg" className="w-full group-hover:scale-105 transition-transform duration-700" alt="Mentorship" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { i: Target, t: 'Precision Mapping', d: 'Every session is a targeted strike toward your specific academic goal.' },
              { i: ShieldCheck, t: 'Validated Records', d: 'Hundreds of admits into Ivy League and Fortune 500 tech roles.' },
              { i: Zap, t: 'Real-Time Support', d: 'On-demand mentorship from the first consultation to final admission.' },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="p-10 bg-white/5 border border-white/5 rounded-[2.5rem] hover:bg-white/[0.07] transition-all group">
                  <item.i className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{item.t}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">{item.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="p-16 rounded-[3.5rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 relative">
              <h2 className="text-5xl font-black tracking-tighter mb-6 leading-none">Ready to Architect Your <span className="text-cyan-400">Success?</span></h2>
              <p className="text-slate-400 text-xl font-medium mb-12 max-w-xl mx-auto">Connect with our lead strategists for a free audit of your career roadmap today.</p>
              <Link href="/contact"><Button className="bg-cyan-500 hover:bg-cyan-400 text-black px-12 rounded-2xl h-16 font-black text-xl shadow-[0_20px_50px_rgba(34,197,94,0.2)]">GET STARTED NOW</Button></Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-8 mb-8 text-slate-500">
             {/* <Linkedin className="hover:text-cyan-400 cursor-pointer" />
             <Instagram className="hover:text-cyan-400 cursor-pointer" />
             <Twitter className="hover:text-cyan-400 cursor-pointer" /> */}
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">© 2026 Careergize blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}